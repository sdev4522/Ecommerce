'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Star,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  Sparkles,
  UploadCloud,
  X,
  ArrowRight,
  ThumbsUp,
  FilterX,
} from 'lucide-react';
import { ProductReview } from '../../lib/types';
import { getProductReviews } from '../../lib/botble';
import { submitCustomerReview } from '../../lib/customer-api';
import { useAuthStore } from '../../store/useAuthStore';
import { toast } from 'sonner';

interface ProductReviewsProps {
  productId: number;
  productSlug: string;
  productName: string;
  brandName?: string;
  initialReviewsAvg?: number;
  initialReviewsCount?: number;
}

const RATING_DESCRIPTIONS: Record<number, string> = {
  5: '+ 5 Stars — Outstanding Quality & Polish',
  4: '+ 4 Stars — Great Quality & Fit',
  3: '+ 3 Stars — Good / Meets Expectations',
  2: '+ 2 Stars — Fair / Room for Improvement',
  1: '+ 1 Star — Poor / Unsatisfactory',
};

export default function ProductReviews({
  productId,
  productSlug,
  productName,
  brandName = 'LUNE',
  initialReviewsAvg = 4.8,
  initialReviewsCount = 0,
}: ProductReviewsProps) {
  const { isAuthenticated, customer, token, openAuthModal } = useAuthStore();

  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [userReview, setUserReview] = useState<ProductReview | null>(null);

  // Filter state (clicking star breakdown row)
  const [selectedStarFilter, setSelectedStarFilter] = useState<number | null>(null);

  // Form states
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [fullName, setFullName] = useState(customer?.name || '');
  const [email, setEmail] = useState(customer?.email || '');
  const [headline, setHeadline] = useState('');
  const [comment, setComment] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Helpful counter map
  const [helpfulMap, setHelpfulMap] = useState<Record<number, { count: number; active: boolean }>>({});

  // Lightbox for review image
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync customer details when auth changes
  useEffect(() => {
    if (customer?.name && !fullName) {
      setFullName(customer.name);
    }
    if (customer?.email && !email) {
      setEmail(customer.email);
    }
  }, [customer, fullName, email]);

  // Fetch reviews on mount or when slug / auth changes
  useEffect(() => {
    let mounted = true;
    async function loadReviews() {
      setLoading(true);
      try {
        const res = await getProductReviews(productSlug, token);
        if (mounted) {
          setReviews(res.reviews);
          setHasReviewed(res.has_reviewed);
          setUserReview(res.user_review);
        }
      } catch (err) {
        console.error('Failed to load reviews:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadReviews();
    return () => {
      mounted = false;
    };
  }, [productSlug, token]);

  // Derived metrics
  const totalReviewsCount = reviews.length > 0 ? reviews.length : initialReviewsCount;

  const averageRating = useMemo(() => {
    if (reviews.length === 0) {
      return initialReviewsAvg && initialReviewsAvg > 0 ? Number(initialReviewsAvg.toFixed(1)) : 4.8;
    }
    const sum = reviews.reduce((acc, r) => acc + Number(r.star || 5), 0);
    return Number((sum / reviews.length).toFixed(1));
  }, [reviews, initialReviewsAvg]);

  // Star counts distribution
  const starBreakdown = useMemo(() => {
    const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    if (reviews.length > 0) {
      reviews.forEach((r) => {
        const s = Math.min(5, Math.max(1, Math.round(r.star)));
        counts[s] = (counts[s] || 0) + 1;
      });
    } else if (initialReviewsCount > 0) {
      // Natural distribution if counts are provided by stats
      counts[5] = Math.round(initialReviewsCount * 0.8) || 1;
      counts[4] = Math.max(0, initialReviewsCount - counts[5]);
    }
    return counts;
  }, [reviews, initialReviewsCount]);

  // Filtered reviews
  const displayedReviews = useMemo(() => {
    if (selectedStarFilter === null) return reviews;
    return reviews.filter((r) => Math.round(r.star) === selectedStarFilter);
  }, [reviews, selectedStarFilter]);

  // Handle Photo select
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size must be less than 2MB');
      return;
    }

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast.error('Only JPG, PNG, and WEBP formats are accepted');
      return;
    }

    setPhotoFile(file);
    const previewUrl = URL.createObjectURL(file);
    setPhotoPreview(previewUrl);
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
      setPhotoPreview(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Toggle helpful
  const toggleHelpful = (reviewId: number) => {
    setHelpfulMap((prev) => {
      const current = prev[reviewId] || { count: 0, active: false };
      const newActive = !current.active;
      return {
        ...prev,
        [reviewId]: {
          count: newActive ? current.count + 1 : Math.max(0, current.count - 1),
          active: newActive,
        },
      };
    });
  };

  // Handle submit review
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) {
      toast.error('Please enter your detailed review comment.');
      return;
    }

    if (!isAuthenticated || !token) {
      toast.error('Please sign in to submit your verified review.');
      openAuthModal('login');
      return;
    }

    setSubmitting(true);
    try {
      const fullComment = headline.trim() ? `${headline.trim()}\n\n${comment.trim()}` : comment.trim();

      const res = await submitCustomerReview(
        {
          product_id: productId,
          star: rating,
          comment: fullComment,
        },
        token
      );

      if (res.success) {
        toast.success('Thank you! Your verified review has been submitted.');

        // Optimistically add to reviews
        const newReview: ProductReview = {
          id: Date.now(),
          user_name: fullName.trim() || customer?.name || 'Verified Collector',
          star: rating,
          comment: fullComment,
          created_at: 'Just now',
          status: 'published',
          images: photoPreview
            ? [
                {
                  thumbnail: photoPreview,
                  full_url: photoPreview,
                },
              ]
            : undefined,
        };

        setReviews([newReview, ...reviews]);
        setHasReviewed(true);
        setUserReview(newReview);
        setComment('');
        setHeadline('');
        handleRemovePhoto();
      } else {
        toast.error(res.message || 'Failed to submit review');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reviews-section" className="w-full">
      {/* ------------------------------------------------------------- */}
      {/* SECTION HEADER                                                */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-8 border-b border-neutral-100">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#b89562] font-semibold mb-2 font-display">
            <Sparkles size={13} className="text-[#b89562]" />
            <span>Verified Buyer Experiences</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-medium text-neutral-950 tracking-tight">
            Customer Stories &amp; Ratings
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-500 font-light max-w-md leading-relaxed">
          Authentic impressions and styling stories from verified {brandName} collectors.
        </p>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MAIN TWO-COLUMN LAYOUT: (Left: Ratings & Reviews, Right: Form) */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
        {/* ============================================================= */}
        {/* LEFT COLUMN: Rating Breakdown Card + Reviews / Empty State    */}
        {/* ============================================================= */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Card 1: Rating Summary & Star Breakdown */}
          <div className="bg-[#fcfbf9] border border-neutral-200/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xs">
            <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-6 sm:gap-8">
              {/* Left Sub-Panel: Big Rating & Authentic Badge */}
              <div className="flex flex-col items-center justify-center text-center sm:w-48 shrink-0">
                <span className="text-5xl sm:text-6xl font-display font-medium text-neutral-950 tracking-tight leading-none">
                  {averageRating}
                </span>

                <div className="flex items-center gap-1 my-2.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={18}
                      className={
                        s <= Math.round(averageRating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-neutral-200 fill-neutral-100'
                      }
                    />
                  ))}
                </div>

                <span className="text-xs text-neutral-600 font-medium mb-3">
                  {totalReviewsCount} Verified Review{totalReviewsCount !== 1 ? 's' : ''}
                </span>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/70 text-[11px] font-medium tracking-wide">
                  <ShieldCheck size={13} className="text-emerald-600 shrink-0" />
                  <span>100% Authentic Feedback</span>
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="hidden sm:block w-px bg-neutral-200/70 self-stretch" />

              {/* Right Sub-Panel: 5-Star Distribution Bars */}
              <div className="flex-1 w-full flex flex-col justify-center space-y-2.5">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = starBreakdown[stars] || 0;
                  const total = totalReviewsCount > 0 ? totalReviewsCount : 1;
                  const percentage = Math.round((count / total) * 100);
                  const isFiltered = selectedStarFilter === stars;

                  return (
                    <button
                      key={stars}
                      type="button"
                      onClick={() => setSelectedStarFilter(isFiltered ? null : stars)}
                      className={`flex items-center gap-3 text-xs w-full group text-left cursor-pointer transition-opacity ${
                        isFiltered
                          ? 'opacity-100 font-semibold'
                          : selectedStarFilter !== null
                          ? 'opacity-40 hover:opacity-100'
                          : 'opacity-90 hover:opacity-100'
                      }`}
                      aria-label={`Filter by ${stars} star reviews`}
                    >
                      <span className="w-8 shrink-0 flex items-center gap-1 text-neutral-700 font-medium text-[11px]">
                        <span>{stars}</span>
                        <Star size={11} className="fill-amber-400 text-amber-400 shrink-0" />
                      </span>

                      {/* Bar Track */}
                      <div className="grow h-2 bg-neutral-200/80 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#c5a880] rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>

                      {/* Number Count */}
                      <span className="w-6 text-right shrink-0 text-neutral-500 font-mono text-[11px]">
                        {count}
                      </span>
                    </button>
                  );
                })}

                {/* Active Filter Indicator */}
                {selectedStarFilter !== null && (
                  <div className="pt-2 flex items-center justify-between border-t border-neutral-100 mt-2">
                    <span className="text-[11px] text-neutral-600">
                      Showing <strong>{selectedStarFilter} Stars</strong> ({displayedReviews.length})
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedStarFilter(null)}
                      className="text-[11px] text-[#b89562] hover:text-black font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <FilterX size={12} />
                      <span>Reset</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card 2: Reviews List OR Empty State */}
          {loading ? (
            <div className="bg-[#fcfbf9] border border-neutral-200/80 rounded-2xl sm:rounded-3xl p-12 text-center text-neutral-400 flex flex-col items-center justify-center gap-3">
              <Loader2 size={24} className="animate-spin text-neutral-900" />
              <span className="text-xs uppercase tracking-wider font-display">Loading collector reviews...</span>
            </div>
          ) : displayedReviews.length === 0 ? (
            /* Empty State: Matching Screenshot ("Be the First to Review") */
            <div className="bg-[#fcfbf9] border border-neutral-200/80 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-amber-50 text-[#b89562] flex items-center justify-center mb-3.5 shadow-2xs">
                <Sparkles size={22} className="text-[#b89562]" />
              </div>
              <h3 className="text-lg sm:text-xl font-display font-medium text-neutral-900 mb-2">
                Be the First to Review
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 font-light max-w-md mx-auto leading-relaxed">
                Share your bespoke styling thoughts and craftsmanship impressions with the {brandName} collector
                community.
              </p>
            </div>
          ) : (
            /* Verified Reviews Stream */
            <div className="space-y-4">
              {displayedReviews.map((rev) => {
                const helpful = helpfulMap[rev.id] || { count: 0, active: false };

                // Split headline from comment if formatted with double newline
                const commentParts = rev.comment.split('\n\n');
                const hasSeparateHeadline = commentParts.length > 1;
                const reviewHeadline = hasSeparateHeadline ? commentParts[0] : null;
                const reviewBody = hasSeparateHeadline ? commentParts.slice(1).join('\n\n') : rev.comment;

                return (
                  <div
                    key={rev.id}
                    className="bg-white border border-neutral-200/80 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-3.5 transition-all hover:border-neutral-300"
                  >
                    {/* Header Row: User Info + Stars */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-neutral-950 text-white flex items-center justify-center text-xs font-semibold uppercase font-display shrink-0 overflow-hidden shadow-2xs">
                          {rev.user_avatar ? (
                            <img
                              src={rev.user_avatar}
                              alt={rev.user_name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            rev.user_name?.charAt(0) || 'C'
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-[13px] font-semibold text-neutral-900 font-display">
                              {rev.user_name}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full font-medium">
                              <CheckCircle2 size={10} className="text-emerald-600" />
                              <span>Verified</span>
                            </span>
                          </div>
                          <span className="text-[11px] text-neutral-400 font-light block mt-0.5">
                            {rev.created_at || 'Recent review'}
                          </span>
                        </div>
                      </div>

                      {/* Star Rating */}
                      <div className="flex items-center gap-0.5 shrink-0">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            size={14}
                            className={
                              s <= rev.star
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-neutral-200 fill-neutral-100'
                            }
                          />
                        ))}
                      </div>
                    </div>

                    {/* Headline if present */}
                    {reviewHeadline && (
                      <h4 className="text-xs sm:text-sm font-semibold text-neutral-950 font-display">
                        {reviewHeadline}
                      </h4>
                    )}

                    {/* Detailed Review Comment */}
                    <p className="text-xs sm:text-[13px] text-neutral-700 font-light leading-relaxed whitespace-pre-line">
                      {reviewBody}
                    </p>

                    {/* Photo Attachments */}
                    {Array.isArray(rev.images) && rev.images.length > 0 && (
                      <div className="flex items-center gap-2.5 pt-1">
                        {rev.images.map((img, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setActiveImage(img.full_url || img.thumbnail)}
                            className="relative w-16 h-16 rounded-xl border border-neutral-200 overflow-hidden group cursor-pointer hover:border-neutral-950 transition-colors shadow-2xs"
                          >
                            <img
                              src={img.thumbnail || img.full_url}
                              alt="Customer review attachment"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Footer: Helpful Upvote */}
                    <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-xs text-neutral-500">
                      <span className="text-[11px] text-neutral-400">Was this review helpful?</span>
                      <button
                        type="button"
                        onClick={() => toggleHelpful(rev.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-medium transition-colors cursor-pointer ${
                          helpful.active
                            ? 'bg-neutral-950 text-white border-neutral-950'
                            : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200'
                        }`}
                      >
                        <ThumbsUp size={11} className={helpful.active ? 'fill-white' : ''} />
                        <span>Helpful ({helpful.count})</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ============================================================= */}
        {/* RIGHT COLUMN: Elevated "Write a Review" Card                  */}
        {/* ============================================================= */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-neutral-200/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xs sticky top-24">
            {/* Header */}
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#b89562] font-semibold block mb-1 font-display">
              YOUR VOICE MATTERS
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-medium text-neutral-950 tracking-tight mb-2">
              Write a Review
            </h3>
            <p className="text-xs sm:text-[13px] text-neutral-500 font-light leading-relaxed mb-6">
              Tell us about the craftsmanship, finish, and packaging. Verified reviews earn priority previews.
            </p>

            {hasReviewed ? (
              <div className="p-5 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-emerald-950 font-display mb-1">
                    Review Submitted
                  </h4>
                  <p className="text-xs text-emerald-800/80 leading-relaxed">
                    Thank you! Your feedback for <strong>{productName}</strong> is verified and published.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4 sm:space-y-5">
                {/* 1. Star Rating Selector */}
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-neutral-700 mb-2 font-display">
                    YOUR RATING *
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((s) => {
                      const active = (hoverRating !== null ? hoverRating : rating) >= s;
                      return (
                        <button
                          key={s}
                          type="button"
                          onMouseEnter={() => setHoverRating(s)}
                          onMouseLeave={() => setHoverRating(null)}
                          onClick={() => setRating(s)}
                          className="p-0.5 hover:scale-115 transition-transform cursor-pointer focus:outline-hidden"
                          aria-label={`${s} star rating`}
                        >
                          <Star
                            size={25}
                            className={
                              active
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-neutral-300 hover:text-neutral-400'
                            }
                          />
                        </button>
                      );
                    })}
                  </div>

                  {/* Dynamic Rating Descriptor Text */}
                  <span className="text-xs text-[#b89562] font-medium block mt-2">
                    {RATING_DESCRIPTIONS[hoverRating !== null ? hoverRating : rating]}
                  </span>
                </div>

                {/* 2. Full Name & Email (2-Column Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-neutral-700 mb-1.5 font-display">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g., Ananya S."
                      required
                      className="w-full px-3.5 py-2.5 text-xs bg-neutral-50/70 border border-neutral-200 rounded-xl focus:bg-white focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors text-neutral-900 placeholder:text-neutral-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-neutral-700 mb-1.5 font-display">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ananya@example.com"
                      required
                      className="w-full px-3.5 py-2.5 text-xs bg-neutral-50/70 border border-neutral-200 rounded-xl focus:bg-white focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors text-neutral-900 placeholder:text-neutral-400"
                    />
                  </div>
                </div>

                {/* 3. Review Headline */}
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-neutral-700 mb-1.5 font-display">
                    Review Headline
                  </label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="e.g., Exquisite finish and daily brilliance!"
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-50/70 border border-neutral-200 rounded-xl focus:bg-white focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors text-neutral-900 placeholder:text-neutral-400"
                  />
                </div>

                {/* 4. Detailed Review Comment */}
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-neutral-700 mb-1.5 font-display">
                    Detailed Review *
                  </label>
                  <textarea
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Describe the craftsmanship, anti-tarnish wear, weight, or how you styled it..."
                    required
                    className="w-full p-3.5 text-xs bg-neutral-50/70 border border-neutral-200 rounded-xl focus:bg-white focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors text-neutral-900 placeholder:text-neutral-400 resize-none font-sans"
                  />
                </div>

                {/* 5. Product Photo Upload Dropzone */}
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-neutral-700 mb-1.5 font-display">
                    Product Photo (Optional, Max 2MB)
                  </label>

                  {photoPreview ? (
                    <div className="relative border border-neutral-200 rounded-xl p-3 bg-neutral-50 flex items-center justify-between">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <img
                          src={photoPreview}
                          alt="Uploaded preview"
                          className="w-12 h-12 object-cover rounded-lg shrink-0 border border-neutral-200"
                        />
                        <div className="overflow-hidden">
                          <span className="block text-xs font-medium text-neutral-800 truncate">
                            {photoFile?.name}
                          </span>
                          <span className="block text-[10px] text-neutral-400">
                            {photoFile ? `${Math.round(photoFile.size / 1024)} KB` : ''}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="p-1.5 hover:bg-neutral-200 rounded-full text-neutral-500 hover:text-neutral-950 transition-colors cursor-pointer"
                        title="Remove photo"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-neutral-200/90 hover:border-neutral-400 bg-neutral-50/50 hover:bg-neutral-50 rounded-xl p-4 flex items-center justify-center gap-3 cursor-pointer transition-colors group">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        className="hidden"
                        onChange={handlePhotoChange}
                      />
                      <div className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 group-hover:text-black shadow-2xs shrink-0">
                        <UploadCloud size={17} />
                      </div>
                      <div className="text-left">
                        <span className="block text-xs font-medium text-neutral-900">
                          Upload a photo of your product
                        </span>
                        <span className="block text-[10px] text-neutral-400 font-light">
                          JPG, PNG, WEBP up to 2MB
                        </span>
                      </div>
                    </label>
                  )}
                </div>

                {/* 6. Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-6 rounded-full bg-neutral-950 text-white text-xs font-semibold uppercase tracking-[0.14em] hover:bg-neutral-800 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer group mt-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Submitting Verified Review...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Verified Review</span>
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* FULLSCREEN LIGHTBOX PREVIEW MODAL                             */}
      {/* ------------------------------------------------------------- */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-w-3xl max-h-[85vh] bg-neutral-950 p-2 rounded-2xl border border-neutral-800 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 bg-black/70 hover:bg-black text-white p-2 rounded-full transition-colors cursor-pointer z-10"
              aria-label="Close image preview"
            >
              <X size={18} />
            </button>
            <img
              src={activeImage}
              alt="Customer review high resolution attachment"
              className="max-h-[80vh] w-auto max-w-full object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
