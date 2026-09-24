'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import type { CircularGalleryRef } from '../ui/CircularGallery';

const CircularGallery = dynamic(() => import('../ui/CircularGallery'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-neutral-600">
      <span className="text-xs tracking-widest uppercase animate-pulse">Loading 360° Showcase...</span>
    </div>
  ),
});

interface ShowcaseItem {
  image: string;
  text: string;
}

interface Interactive3DShowcaseProps {
  items: ShowcaseItem[];
}

export default function Interactive3DShowcase({ items }: Interactive3DShowcaseProps) {
  const galleryRef = useRef<CircularGalleryRef | null>(null);

  return (
    <section className="relative w-full bg-white text-black py-14 sm:py-20 overflow-hidden border-t border-neutral-900 select-none">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight text-black">
              Curated Collections
            </h2>
          </div>

          <div className="flex items-center gap-3 sm:self-end">
            {/* Prev / Next Navigation Controls */}
            <div className="flex items-center space-x-1.5 bg-neutral-900 border border-neutral-800 p-1 rounded-full">
              <button
                onClick={() => galleryRef.current?.prev()}
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-white flex items-center justify-center text-white  hover:text-black transition-colors cursor-pointer"
                aria-label="Previous item"
                title="Rotate Left"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => galleryRef.current?.next()}
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-white flex items-center justify-center text-white  hover:text-black transition-colors cursor-pointer"
                aria-label="Next item"
                title="Rotate Right"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <Link
              href="/collections/all"
              className="text-xs font-semibold uppercase tracking-wider bg-white text-neutral-950 px-4 py-2.5 rounded-full hover:bg-neutral-100 transition-colors inline-flex items-center gap-1.5 font-display shadow-xs"
            >
              <span>Shop All</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* 3D WebGL Gallery Container */}
      <div className="relative w-full h-[420px] sm:h-[480px]">
        <CircularGallery
          ref={galleryRef}
          items={items}
          bend={1.5}
          textColor="#000000"
          borderRadius={0.06}
          font="600 17px Inter, Montserrat, sans-serif"
          scrollEase={0.045}
          scrollSpeed={2}
        />
      </div>

    </section>
  );
}
