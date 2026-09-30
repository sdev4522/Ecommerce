'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import ImageGalleryModal from './ImageGalleryModal';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  badge?: string;
  activeImage?: string;
}

export default function ProductGallery({
  images: initialImages,
  productName,
  badge,
  activeImage: externalActiveImage,
}: ProductGalleryProps) {
  // Ensure we have at least one image (memoized to keep dependency reference stable)
  const images = useMemo(
    () => (initialImages.length > 0 ? initialImages : ['/images/placeholder.jpg']),
    [initialImages]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Embla setup for touch-friendly mobile carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: images.length > 1,
    align: 'start',
    skipSnaps: false,
  });

  // Sync embla selection with local index
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Adjust selectedIndex during render when externalActiveImage prop changes (React 19 pattern)
  const [prevExternalActiveImage, setPrevExternalActiveImage] = useState(externalActiveImage);
  if (externalActiveImage !== prevExternalActiveImage) {
    setPrevExternalActiveImage(externalActiveImage);
    if (externalActiveImage) {
      const idx = images.indexOf(externalActiveImage);
      if (idx !== -1 && idx !== selectedIndex) {
        setSelectedIndex(idx);
      }
    }
  }

  // Sync embla carousel position when externalActiveImage changes
  useEffect(() => {
    if (externalActiveImage) {
      const idx = images.indexOf(externalActiveImage);
      if (idx !== -1) {
        emblaApi?.scrollTo(idx);
      }
    }
  }, [externalActiveImage, images, emblaApi]);

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    if (thumbnailRefs.current[selectedIndex]) {
      thumbnailRefs.current[selectedIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [selectedIndex]);

  const selectImage = (idx: number) => {
    setSelectedIndex(idx);
    emblaApi?.scrollTo(idx);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIdx = (selectedIndex + 1) % images.length;
    selectImage(nextIdx);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIdx = (selectedIndex - 1 + images.length) % images.length;
    selectImage(prevIdx);
  };

  // Hover zoom tracker for desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const hasMultiple = images.length > 1;

  return (
    <div className="w-full select-none">
      {/* ------------------------------------------------------------- */}
      {/* DESKTOP GALLERY (Dominant visual top + Horizontal thumbs below) */}
      {/* ------------------------------------------------------------- */}
      <div className="hidden lg:block w-full max-h-screen mx-auto">
        {/* Dominant Main Visual */}
        <div
          className="relative w-full max-w-[min(820px,calc((100vh-220px)*0.9))] mx-auto h-[720px] bg-neutral-100/90 rounded-2xl sm:rounded-3xl overflow-hidden cursor-zoom-in group border border-neutral-200/60 shadow-xs"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseMove={handleMouseMove}
          onClick={() => setLightboxOpen(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative w-full h-full"
            >
              <Image
                src={images[selectedIndex]}
                alt={`${productName} — view ${selectedIndex + 1}`}
                fill
                priority={selectedIndex === 0}
                loading={selectedIndex === 0 ? 'eager' : 'lazy'}
                sizes="(max-width: 1024px) 100vw, 420px"
                className={`object-cover object-top transition-transform duration-300 ${isHovered ? 'scale-135' : 'scale-100'
                  }`}
                style={
                  isHovered
                    ? {
                      transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                    }
                    : undefined
                }
              />
            </motion.div>
          </AnimatePresence>

          {/* Badge */}
          {badge && (
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
              <span className="bg-neutral-950/90 backdrop-blur-xs text-white text-[10px] uppercase tracking-[0.2em] font-medium px-2.5 py-1 rounded-sm">
                {badge}
              </span>
            </div>
          )}

          {/* Controls: Fullscreen / Lightbox trigger */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(true);
            }}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/85 hover:bg-white text-neutral-800 hover:text-black flex items-center justify-center shadow-xs backdrop-blur-xs transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
            title="Expand Fullscreen Lightbox"
            aria-label="Expand Fullscreen Lightbox"
          >
            <Maximize2 size={15} />
          </button>

          {/* Prev/Next arrows on desktop (subtle on hover) */}
          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/85 hover:bg-white text-neutral-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-xs cursor-pointer hover:scale-105"
                aria-label="Previous image"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/85 hover:bg-white text-neutral-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-xs cursor-pointer hover:scale-105"
                aria-label="Next image"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          {/* Counter pill */}
          <div className="absolute bottom-4 right-4 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="bg-neutral-950/75 backdrop-blur-xs text-white/90 text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full">
              {selectedIndex + 1} / {images.length}
            </span>
          </div>
        </div>

        {/* Horizontal Thumbnails Row Below Main Image */}
        {hasMultiple && (
          <div
            className={`mt-2.5 sm:mt-3 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 ${images.length <= 6 ? 'justify-center' : 'justify-start'
              }`}
          >
            {images.map((img, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <button
                  key={idx}
                  ref={(el) => {
                    if (el) thumbnailRefs.current[idx] = el;
                  }}
                  type="button"
                  onClick={() => selectImage(idx)}
                  className={`relative w-12 sm:w-14 lg:w-16 aspect-[4/5] rounded-lg sm:rounded-xl overflow-hidden bg-neutral-100/80 transition-all duration-200 cursor-pointer shrink-0 ${isSelected
                    ? 'border-2 border-neutral-950 ring-2 ring-neutral-950/15 shadow-xs scale-[0.98]'
                    : 'border border-neutral-200/90 hover:border-neutral-400 opacity-70 hover:opacity-100 hover:scale-[1.02]'
                    }`}
                  aria-label={`View product photo ${idx + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${productName} thumbnail ${idx + 1}`}
                    fill
                    sizes="(max-width: 1024px) 20vw, 64px"
                    className="object-cover object-top transition-transform duration-300 hover:scale-105"
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MOBILE GALLERY (Touch Embla Carousel + Thumbnails Row)        */}
      {/* ------------------------------------------------------------- */}
      <div className="lg:hidden w-full mx-auto">
        {/* Main Swipeable View */}
        <div className="relative w-full rounded-2xl overflow-hidden border border-neutral-200/60 shadow-xs bg-neutral-100">
          <div ref={emblaRef} className="overflow-hidden w-full touch-pan-y">
            <div className="flex">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative flex-[0_0_100%] min-w-0 aspect-[4/5] bg-neutral-100 cursor-zoom-in"
                  onClick={() => setLightboxOpen(true)}
                >
                  <Image
                    src={img}
                    alt={`${productName} slide ${idx + 1}`}
                    fill
                    priority={idx === 0}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    sizes="(max-width: 640px) 100vw, 380px"
                    className="object-cover object-top select-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Badge */}
          {badge && (
            <div className="absolute top-3 left-3 z-10 pointer-events-none">
              <span className="bg-neutral-950/90 text-white text-[9px] uppercase tracking-[0.2em] font-medium px-2 py-0.5 rounded-xs">
                {badge}
              </span>
            </div>
          )}

          {/* Mobile Lightbox Button */}
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs text-neutral-800 flex items-center justify-center shadow-xs"
            aria-label="Expand image"
          >
            <Maximize2 size={14} />
          </button>

          {/* Mobile Counter Pill */}
          <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
            <span className="bg-neutral-950/70 backdrop-blur-xs text-white text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full">
              {selectedIndex + 1} / {images.length}
            </span>
          </div>
        </div>

        {/* Mobile Thumbnails Row */}
        {hasMultiple && (
          <div
            className={`mt-2 flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar scroll-smooth pb-0.5 ${images.length <= 5 ? 'justify-center' : 'justify-start'
              }`}
          >
            {images.map((img, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <button
                  key={idx}
                  ref={(el) => {
                    if (el) thumbnailRefs.current[idx] = el;
                  }}
                  type="button"
                  onClick={() => selectImage(idx)}
                  className={`relative w-11 sm:w-12 aspect-[4/5] rounded-lg overflow-hidden bg-neutral-100 transition-all duration-200 cursor-pointer shrink-0 ${isSelected
                    ? 'border-2 border-neutral-950 ring-1 ring-neutral-950/20 shadow-xs scale-[0.98]'
                    : 'border border-neutral-200/90 opacity-70 hover:opacity-100'
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${productName} thumb ${idx + 1}`}
                    fill
                    sizes="48px"
                    className="object-cover object-top"
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <ImageGalleryModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={images}
        initialIndex={selectedIndex}
        productName={productName}
      />
    </div>
  );
}
