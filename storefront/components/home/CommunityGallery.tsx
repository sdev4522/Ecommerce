'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

interface CommunityPost {
  id: string;
  image: string;
  author: string;
  city: string;
  taggedProduct: string;
  productSlug: string;
}

const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=85',
    author: '@ananya.styles',
    city: 'Mumbai',
    taggedProduct: 'Satin Midi Dress',
    productSlug: 'wool-cashmere-overcoat-camel',
  },
  {
    id: 'post-2',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=85',
    author: '@tanya.m',
    city: 'Bengaluru',
    taggedProduct: 'Fluid Wide-Leg Trousers',
    productSlug: 'fluid-wide-leg-pleated-trousers',
  },
  {
    id: 'post-3',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=85',
    author: '@dr.meera',
    city: 'Delhi',
    taggedProduct: 'Relaxed Linen Shirt',
    productSlug: 'heavyweight-boxy-tee-raw-mineral',
  },
  {
    id: 'post-4',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&q=85',
    author: '@riya.captures',
    city: 'Pune',
    taggedProduct: 'Soft Layering Knit',
    productSlug: 'french-terry-hoodie-washed-black',
  },
];

export default function CommunityGallery() {
  return (
    <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-neutral-100">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <svg
              className="w-3.5 h-3.5 text-neutral-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-semibold">
              #WearLune
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display text-neutral-900 font-medium">
            Styled by You
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Real customers styling LUNE essentials across Mumbai, Delhi, Bengaluru, and beyond.
          </p>
        </div>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs uppercase tracking-widest text-neutral-800 hover:text-black font-semibold mt-3 sm:mt-0 inline-flex items-center gap-1 group"
        >
          <span>Follow @LuneStore</span>
          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2">
        {COMMUNITY_POSTS.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative aspect-4/5 bg-neutral-100 overflow-hidden shadow-xs hover:shadow-lg transition-shadow duration-300"
          >
            <Image
              src={post.image}
              alt={post.author}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
            />

            {/* Hover Glassmorphic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end text-white">
              <div className="flex items-center justify-between text-[11px] font-semibold tracking-wider text-white mb-1">
                <span>{post.author}</span>
                <span className="text-white/70 font-normal">{post.city}</span>
              </div>
              <p className="text-xs text-white/90 font-medium line-clamp-1 mb-3">
                Wears {post.taggedProduct}
              </p>
              <Link
                href={`/product/${post.productSlug}`}
                className="inline-flex items-center justify-between text-[10px] uppercase tracking-widest font-semibold bg-white text-neutral-950 py-2 px-3 hover:bg-neutral-200 transition-colors"
              >
                <span>Shop This Piece</span>
                <ArrowUpRight size={12} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
