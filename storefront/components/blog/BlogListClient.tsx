'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, X, Calendar, Clock, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { BlogPost, BlogCategory } from '../../lib/types';
import BlogCard from './BlogCard';

interface BlogListClientProps {
  initialPosts: BlogPost[];
  categories: BlogCategory[];
}

export default function BlogListClient({ initialPosts, categories }: BlogListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  // Filter posts based on category and search
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesCat =
        selectedCategory === 'all' ||
        (post.categories && post.categories.some((c) => c.slug === selectedCategory));

      const matchesSearch =
        !searchQuery.trim() ||
        post.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCat && matchesSearch;
    });
  }, [initialPosts, selectedCategory, searchQuery]);

  // Featured story (first post when no search query and on page 1)
  const isDefaultView = selectedCategory === 'all' && !searchQuery.trim() && currentPage === 1;
  const featuredPost = isDefaultView && filteredPosts.length > 0 ? filteredPosts[0] : null;
  const standardPosts = isDefaultView && filteredPosts.length > 0 ? filteredPosts.slice(1) : filteredPosts;

  // Pagination calculations for standard posts
  const totalPages = Math.max(1, Math.ceil(standardPosts.length / itemsPerPage));
  const paginatedPosts = standardPosts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="w-full space-y-12">
      {/* Category Pills & Search Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-neutral-200">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-4 py-2 text-xs uppercase tracking-[0.16em] font-semibold transition-all shrink-0 cursor-pointer font-display ${
              selectedCategory === 'all'
                ? 'bg-neutral-950 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80'
            }`}
          >
            All Articles
          </button>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.16em] font-semibold transition-all shrink-0 cursor-pointer font-display ${
                  isSelected
                    ? 'bg-neutral-950 text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Search Field */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search articles..."
            className="w-full pl-9 pr-8 py-2 text-xs bg-neutral-50 border border-neutral-300 focus:border-neutral-950 focus:bg-white text-neutral-900 placeholder:text-neutral-400 transition-colors font-sans"
          />
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Featured Story Hero Card */}
      {featuredPost && (
        <section className="bg-neutral-950 text-white border border-neutral-800 overflow-hidden group">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Image Column */}
            <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[420px] overflow-hidden bg-neutral-900">
              <img
                src={featuredPost.image}
                alt={featuredPost.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-4 left-4 bg-white text-neutral-950 text-[10px] uppercase tracking-[0.25em] font-bold px-3 py-1 font-display">
                Featured Cover Story
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs text-neutral-400 font-light">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} />
                    <span>
                      {new Date(featuredPost.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} />
                    <span>{featuredPost.reading_time || '5 min read'}</span>
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-medium text-white tracking-tight leading-snug">
                  <Link href={`/blog/${featuredPost.slug}`} className="hover:text-neutral-300 transition-colors">
                    {featuredPost.name}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed line-clamp-4">
                  {featuredPost.description}
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-800 flex items-center justify-between">
                <span className="text-xs text-neutral-400 font-display">
                  By {typeof featuredPost.author === 'string' ? featuredPost.author : featuredPost.author?.name || 'Editorial Desk'}
                </span>

                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="px-5 py-2.5 bg-white text-neutral-950 hover:bg-neutral-200 text-xs font-semibold uppercase tracking-[0.18em] flex items-center gap-2 transition-colors font-display"
                >
                  <span>Read Story</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Standard Articles Grid */}
      {paginatedPosts.length > 0 ? (
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400 font-display">
              {isDefaultView ? 'Recent Articles' : `Articles (${filteredPosts.length})`}
            </h3>
            <span className="text-xs text-neutral-400 font-light">
              Showing page {currentPage} of {totalPages}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {paginatedPosts.map((post) => (
              <BlogCard key={post.id} post={post} aspect="video" />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-8 border-t border-neutral-200">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-neutral-300 text-xs font-semibold uppercase tracking-wider text-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                Previous
              </button>

              <div className="flex items-center gap-1 mx-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-9 h-9 flex items-center justify-center text-xs font-semibold transition-colors cursor-pointer ${
                      currentPage === pageNum
                        ? 'bg-neutral-950 text-white'
                        : 'border border-neutral-300 text-neutral-800 hover:bg-neutral-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-neutral-300 text-xs font-semibold uppercase tracking-wider text-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                Next
              </button>
            </div>
          )}
        </section>
      ) : (
        <div className="py-24 text-center border border-dashed border-neutral-300 p-8 space-y-4">
          <BookOpen size={36} className="mx-auto text-neutral-300" />
          <h4 className="text-base font-display font-medium text-neutral-900 uppercase tracking-wider">
            No articles match your query
          </h4>
          <p className="text-xs text-neutral-500 font-light max-w-md mx-auto">
            We could not find any articles matching &ldquo;{searchQuery}&rdquo;. Try another topic or reset the category filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-5 py-2.5 bg-neutral-950 text-white text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Editorial Subscription Section */}
      <section className="p-8 sm:p-12 bg-neutral-50 border border-neutral-200 text-center max-w-3xl mx-auto space-y-4">
        <Sparkles size={20} className="mx-auto text-neutral-900" />
        <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block font-display">
          LUNE Journal
        </span>
        <h3 className="text-xl sm:text-2xl font-display font-medium text-neutral-900 tracking-tight">
          Stay Connected with LUNE
        </h3>
        <p className="text-xs text-neutral-600 font-light max-w-md mx-auto leading-relaxed">
          Thoughtful style notes, fabric care guides, and first look at new collections delivered straight to your inbox.
        </p>
        <div className="pt-2">
          <Link
            href="/#newsletter"
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-950 text-white text-xs uppercase tracking-[0.18em] font-semibold hover:bg-neutral-800 transition-colors font-display"
          >
            <span>Subscribe for Updates</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
