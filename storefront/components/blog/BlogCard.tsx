import React from 'react';
import Link from 'next/link';
import { Clock, Calendar, ArrowUpRight } from 'lucide-react';
import { BlogPost } from '../../lib/types';

interface BlogCardProps {
  post: BlogPost;
  aspect?: 'square' | 'video' | 'portrait';
}

export default function BlogCard({ post, aspect = 'video' }: BlogCardProps) {
  const category = post.categories && post.categories.length > 0 ? post.categories[0] : null;
  const authorName = typeof post.author === 'string' ? post.author : post.author?.name || 'Editorial Desk';

  const formattedDate = post.created_at
    ? new Date(post.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recent Issue';

  const aspectClass =
    aspect === 'square'
      ? 'aspect-square'
      : aspect === 'portrait'
      ? 'aspect-[3/4]'
      : 'aspect-[16/10]';

  return (
    <article className="group flex flex-col h-full bg-white border border-neutral-200/80 hover:border-neutral-950 transition-all duration-300">
      {/* Article Image */}
      <Link href={`/blog/${post.slug}`} className={`relative block overflow-hidden bg-neutral-100 ${aspectClass}`}>
        <img
          src={post.image}
          alt={post.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        {category && (
          <span className="absolute top-3 left-3 bg-neutral-950/90 text-white text-[10px] uppercase tracking-[0.2em] font-semibold px-2.5 py-1 font-display backdrop-blur-xs">
            {category.name}
          </span>
        )}
      </Link>

      {/* Article Body */}
      <div className="p-5 sm:p-6 flex flex-col grow justify-between">
        <div className="space-y-3">
          {/* Meta Info */}
          <div className="flex items-center gap-3 text-[11px] text-neutral-400 font-light">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              <span>{formattedDate}</span>
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              <span>{post.reading_time || '4 min read'}</span>
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-display font-medium text-neutral-950 leading-snug group-hover:text-black transition-colors line-clamp-2">
            <Link href={`/blog/${post.slug}`} className="hover:underline underline-offset-4">
              {post.name}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className="text-xs text-neutral-600 font-light leading-relaxed line-clamp-3">
            {post.description}
          </p>
        </div>

        {/* Card Footer */}
        <div className="pt-5 mt-5 border-t border-neutral-100 flex items-center justify-between text-xs">
          <span className="text-[11px] font-medium text-neutral-500 font-display">
            By {authorName}
          </span>

          <Link
            href={`/blog/${post.slug}`}
            className="flex items-center gap-1 text-[11px] uppercase tracking-wider font-semibold text-neutral-950 group-hover:translate-x-0.5 transition-transform font-display"
          >
            <span>Read</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  );
}
