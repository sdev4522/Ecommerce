'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Star, MessageSquare, CheckCircle2, AlertCircle, Loader2, Sparkles, Image as ImageIcon, X } from 'lucide-react';
import { ProductReview } from '../../lib/types';
import { getProductReviews } from '../../lib/botble';
import { submitCustomerReview } from '../../lib/customer-api';
import { useAuthStore } from '../../store/useAuthStore';
import { toast } from 'sonner';

interface ProductReviewsProps {
  productId: number;
  productSlug: string;
  productName: string;
  initialReviewsAvg?: number;
  initialReviewsCount?: number;
}

export default function ProductReviews({
  productId,
  productSlug,
  productName,
  initialReviewsAvg = 5,
  initialReviewsCount = 0,
}: ProductReviewsProps) {
  const { isAuthenticated, customer, token, openAuthModal } = useAuthStore();

  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [userReview, setUserReview] = useState<ProductReview | null>(null);
  
  // Filter state
  const [selectedStarFilter, setSelectedStarFilter] = useState<number | null>(null);

  // Form state
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Lightbox for review image
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Fetch reviews on mount or when auth status changes
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
        console.error("Failed to load reviews:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadReviews();
    return () => {
      mounted = false;
    };
  }, [productSlug, token]);

  // Derived rating metrics
  const totalReviewsCount = reviews.length > 0 ? reviews.length : initialReviewsCount;
  
  const averageRating = useMemo(() => {
    if (reviews.length === 0) return initialReviewsAvg || 5;
    const sum = reviews.reduce((acc, r) => acc + Number(r.star || 5), 0);
    return Number((sum / reviews.length).toFixed(1));
  }, [reviews, initialReviewsAvg]);

  // Star counts distribution
  const starBreakdown = useMemo(() => {
    const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      const s = Math.min(5, Math.max(1, Math.round(r.star)));
      counts[s] = (counts[s] || 0) + 1;
    });
    return counts;
  }, [reviews]);

  // Filtered reviews
  const displayedReviews = useMemo(() => {
    if (selectedStarFilter === null) return reviews;
    return reviews.filter((r) => Math.round(r.star) === selectedStarFilter);
  }, [reviews, selectedStarFilter]);

  // Handle submit review
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !token) {
      toast.error("Please sign in to submit a review");
      openAuthModal("login");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write your experience in the comment field");
      return;
    }

    setSubmitting(true);
    try {
      const res = await submitCustomerReview(
        {
          product_id: productId,
          star: rating,
          comment: comment.trim(),
        },
        token
      );

      if (res.success) {
        toast.success("Thank you! Your review has been submitted.");
        // Optimistically add to reviews
        const newReview: ProductReview = {
          id: Date.now(),
          user_name: customer?.name || "Verified Buyer",
          star: rating,
          comment: comment.trim(),
          created_at: "Just now",
          status: "published",
        };
        setReviews([newReview, ...reviews]);
        setHasReviewed(true);
        setIsWritingReview(false);
        setComment('');
        setRating(5);
      } else {
        toast.error(res.message || "Failed to submit review");
      }
    } catch (err: any) {
      toast.error(err?.message || "An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reviews-section" className="mt-20 pt-16 border-t border-neutral-200">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-neutral-100">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-2 font-display">
            Customer Reviews
          </span>
          <h3 className="text-2xl sm:text-3xl font-display font-medium text-neutral-900 tracking-tight">
            Customer Reviews &amp; Feedback
          </h3>
        </div>

        <div>
          {!hasReviewed ? (
            <button
              onClick={() => {
                if (!isAuthenticated) {
                  openAuthModal("login");
                } else {
                  setIsWritingReview(!isWritingReview);
                }
              }}
              className="px-6 py-3 bg-neutral-950 text-white text-xs uppercase tracking-[0.18em] font-semibold hover:bg-neutral-800 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <MessageSquare size={14} />
              <span>{isWritingReview ? "Cancel Review" : "Write a Review"}</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 bg-neutral-50 border border-neutral-200 text-xs text-neutral-700">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>You have reviewed this product</span>
            </div>
          )}
        </div>
      </div>

      {/* Review Form Drawer/Collapse */}
      {isWritingReview && (
        <div className="my-8 p-6 sm:p-8 bg-neutral-50 border border-neutral-200 transition-all duration-300">
          <div className="max-w-2xl">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 mb-1 font-display">
              Reviewing: {productName}
            </h4>
            <p className="text-xs text-neutral-500 mb-6 font-light">
              Your feedback helps other shoppers find their ideal fit and style.
            </p>

            <form onSubmit={handleSubmitReview} className="space-y-6">
              {/* Star Selector */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-700 mb-2 font-display">
                  Your Rating
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((starVal) => {
                    const isFilled = (hoverRating !== null ? hoverRating : rating) >= starVal;
                    return (
                      <button
                        key={starVal}
                        type="button"
                        onMouseEnter={() => setHoverRating(starVal)}
                        onMouseLeave={() => setHoverRating(null)}
                        onClick={() => setRating(starVal)}
                        className="p-1 hover:scale-110 transition-transform cursor-pointer focus:outline-hidden"
                      >
                        <Star
                          size={24}
                          className={
                            isFilled
                              ? "fill-amber-400 text-amber-400"
                              : "text-neutral-300 hover:text-neutral-400"
                          }
                        />
                      </button>
                    );
                  })}
                  <span className="text-xs font-semibold text-neutral-900 ml-3">
                    {hoverRating !== null ? hoverRating : rating} of 5 Stars
                  </span>
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-700 mb-2 font-display">
                  Your Review
                </label>
                <textarea
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us about the fabric, fit, and how it feels to wear..."
                  className="w-full p-3.5 text-xs bg-white border border-neutral-300 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors text-neutral-900 placeholder:text-neutral-400 resize-none font-sans"
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-neutral-400">
                  Signed as: <strong className="text-neutral-900">{customer?.name || "Customer"}</strong>
                </span>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsWritingReview(false)}
                    className="px-5 py-2.5 text-xs text-neutral-600 hover:text-neutral-950 font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 bg-neutral-950 text-white text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 disabled:opacity-50 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <span>Submit Review</span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Aggregate Score & Rating Distribution Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 my-10 p-6 sm:p-8 bg-neutral-50/70 border border-neutral-200/80">
        {/* Overall Score */}
        <div className="md:col-span-4 flex flex-col justify-center items-center text-center p-4 border-b md:border-b-0 md:border-r border-neutral-200">
          <span className="text-5xl sm:text-6xl font-display font-medium text-neutral-950 tracking-tight">
            {averageRating}
          </span>
          <div className="flex items-center gap-1 my-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={18}
                className={
                  s <= Math.round(averageRating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-neutral-300 fill-neutral-200"
                }
              />
            ))}
          </div>
          <span className="text-xs text-neutral-500 font-light">
            Based on {totalReviewsCount} review{totalReviewsCount !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Breakdown Bars */}
        <div className="md:col-span-8 flex flex-col justify-center space-y-2.5 sm:px-4">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = starBreakdown[stars] || 0;
            const percentage = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : (stars === 5 ? 100 : 0);
            const isSelected = selectedStarFilter === stars;

            return (
              <button
                key={stars}
                onClick={() => setSelectedStarFilter(isSelected ? null : stars)}
                className={`flex items-center gap-3 text-xs w-full group text-left cursor-pointer ${
                  isSelected ? "font-semibold text-neutral-950" : "text-neutral-600"
                }`}
              >
                <span className="w-12 shrink-0 flex items-center gap-1 text-neutral-800">
                  <span>{stars}</span>
                  <Star size={12} className="fill-amber-400 text-amber-400" />
                </span>

                <div className="grow h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-neutral-900 transition-all duration-500 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <span className="w-12 text-right shrink-0 text-neutral-500 font-mono text-[11px]">
                  {count} ({percentage}%)
                </span>
              </button>
            );
          })}

          {selectedStarFilter !== null && (
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-neutral-600">
                Filtering by <strong>{selectedStarFilter} Stars</strong> ({displayedReviews.length} results)
              </span>
              <button
                onClick={() => setSelectedStarFilter(null)}
                className="text-xs text-neutral-900 underline hover:text-black cursor-pointer font-medium"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6 pt-4">
        {loading ? (
          <div className="py-16 text-center text-neutral-400 flex flex-col items-center gap-3">
            <Loader2 size={24} className="animate-spin text-neutral-900" />
            <span className="text-xs tracking-wider uppercase">Loading reviews...</span>
          </div>
        ) : displayedReviews.length === 0 ? (
          <div className="py-16 text-center border border-dashed border-neutral-300 p-8">
            <MessageSquare size={32} className="mx-auto text-neutral-300 mb-3" />
            <h5 className="text-sm font-display font-medium text-neutral-800 uppercase tracking-wider mb-1">
              No reviews yet
            </h5>
            <p className="text-xs text-neutral-500 font-light max-w-sm mx-auto mb-5">
              {selectedStarFilter !== null
                ? `No reviews match the ${selectedStarFilter}-star filter.`
                : "Be the first to review this product."}
            </p>
            {selectedStarFilter !== null ? (
              <button
                onClick={() => setSelectedStarFilter(null)}
                className="text-xs text-neutral-900 underline font-medium cursor-pointer"
              >
                Show all reviews
              </button>
            ) : !isAuthenticated ? (
              <button
                onClick={() => openAuthModal("login")}
                className="px-5 py-2.5 bg-neutral-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-black cursor-pointer"
              >
                Sign In to Review
              </button>
            ) : null}
          </div>
        ) : (
          <div className="divide-y divide-neutral-200">
            {displayedReviews.map((rev) => (
              <div key={rev.id} className="py-7 first:pt-0 last:pb-0 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  {/* Reviewer Info */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-medium uppercase font-display tracking-wider shrink-0 overflow-hidden">
                      {rev.user_avatar ? (
                        <img
                          src={rev.user_avatar}
                          alt={rev.user_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        rev.user_name?.charAt(0) || "C"
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-neutral-900 font-display">
                          {rev.user_name}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full font-medium">
                          <CheckCircle2 size={10} className="text-emerald-600" />
                          Verified
                        </span>
                      </div>
                      <span className="text-[11px] text-neutral-400 font-light block">
                        {rev.created_at || "Recent review"}
                      </span>
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="flex items-center gap-1 shrink-0">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={13}
                        className={
                          star <= rev.star
                            ? "fill-amber-400 text-amber-400"
                            : "text-neutral-200 fill-neutral-100"
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* Comment Text */}
                <p className="text-xs sm:text-[13px] text-neutral-700 font-light leading-relaxed whitespace-pre-line pl-0 sm:pl-12">
                  {rev.comment}
                </p>

                {/* Review Images if present */}
                {Array.isArray(rev.images) && rev.images.length > 0 && (
                  <div className="flex items-center gap-2 pl-0 sm:pl-12 pt-2">
                    {rev.images.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImage(img.full_url || img.thumbnail)}
                        className="relative w-16 h-16 border border-neutral-200 overflow-hidden group cursor-pointer hover:border-neutral-950 transition-colors"
                      >
                        <img
                          src={img.thumbnail || img.full_url}
                          alt="Review attachment"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Image Modal Preview */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setActiveImage(null)}
        >
          <div className="relative max-w-3xl max-h-[85vh] bg-white p-2 border border-neutral-800">
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 bg-black/70 text-white p-1.5 rounded-full hover:bg-black cursor-pointer"
            >
              <X size={18} />
            </button>
            <img
              src={activeImage}
              alt="Full size preview"
              className="max-h-[80vh] w-auto object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
