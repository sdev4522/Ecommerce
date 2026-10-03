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

  // Keyboard navigation for main stage
  const handleKeyDownMain = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      selectImage((selectedIndex + 1) % images.length);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      selectImage((selectedIndex - 1 + images.length) % images.length);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setLightboxOpen(true);
    }
  };

  // Keyboard navigation for vertical thumbnails
  const handleKeyDownThumbnail = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (idx + 1) % images.length;
      selectImage(next);
      thumbnailRefs.current[next]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (idx - 1 + images.length) % images.length;
      selectImage(prev);
      thumbnailRefs.current[prev]?.focus();
    }
  };

  const hasMultiple = images.length > 1;

  return (
    <div className="w-full select-none">
      {/* ------------------------------------------------------------- */}
      {/* DESKTOP GALLERY (Left Vertical Thumbnails + Right Main Stage)  */}
      {/* ------------------------------------------------------------- */}
      <div className="hidden mx-auto lg:flex flex-row gap-3 xl:gap-4 w-full max-w-[800px] items-start">
        {/* Left Vertical Thumbnails Rail */}
        {hasMultiple && (
          <div
            role="tablist"
            aria-label="Product thumbnails"
            className="flex flex-col gap-2.5 w-16 xl:w-20 shrink-0 max-h-[580px] overflow-y-auto no-scrollbar py-0.5"
          >
            {images.map((img, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <button
                  key={idx}
                  ref={(el) => {
                    if (el) thumbnailRefs.current[idx] = el;
                  }}
                  role="tab"
                  aria-selected={isSelected}
                  tabIndex={0}
                  onKeyDown={(e) => handleKeyDownThumbnail(e, idx)}
                  onClick={() => selectImage(idx)}
                  className={`relative aspect-[4/5] rounded-xl overflow-hidden bg-neutral-100 transition-all duration-200 cursor-pointer shrink-0 ${isSelected
                    ? 'border-2 border-neutral-950 ring-2 ring-neutral-950/20 shadow-xs scale-[0.98]'
                    : 'border border-neutral-200/90 hover:border-neutral-400 opacity-70 hover:opacity-100 hover:scale-[1.02]'
                    }`}
                  aria-label={`View photo ${idx + 1} of ${images.length}`}
                >
                  <Image
                    src={img}
                    alt={`${productName} thumbnail ${idx + 1}`}
                    fill
                    sizes="(max-width: 1280px) 64px, 80px"
                    className="object-cover object-top transition-transform duration-300 hover:scale-105"
                  />
                </button>
              );
            })}
          </div>
        )}

        {/* Dominant Main Visual Stage */}
        <div
          className="relative flex-1 aspect-[9/10] max-h-[700px] bg-neutral-100/90 rounded-2xl sm:rounded-3xl overflow-hidden cursor-zoom-in group border border-neutral-200/60 shadow-xs focus:outline-hidden focus:ring-2 focus:ring-neutral-950"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseMove={handleMouseMove}
          onClick={() => setLightboxOpen(true)}
          tabIndex={0}
          role="region"
          aria-label={`${productName} primary image`}
          onKeyDown={handleKeyDownMain}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0.85 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.85 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative w-full h-full"
            >
              <Image
                src={images[selectedIndex]}
                alt={`${productName} — view ${selectedIndex + 1} of ${images.length}`}
                fill
                priority={selectedIndex === 0}
                loading={selectedIndex === 0 ? 'eager' : 'lazy'}
                sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 520px, 600px"
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
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/85 hover:bg-white text-neutral-800 hover:text-black flex items-center justify-center shadow-xs backdrop-blur-xs transition-all opacity-0 group-hover:opacity-100 cursor-pointer focus:opacity-100"
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
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/85 hover:bg-white text-neutral-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-xs cursor-pointer hover:scale-105 focus:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/85 hover:bg-white text-neutral-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-xs cursor-pointer hover:scale-105 focus:opacity-100"
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
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MOBILE GALLERY (Touch Embla Carousel + Pagination Dots)       */}
      {/* ------------------------------------------------------------- */}
      <div className="lg:hidden w-full mx-auto">
        {/* Main Swipeable View */}
        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-neutral-200/60 shadow-xs bg-neutral-100">
          <div ref={emblaRef} className="overflow-hidden w-full h-full touch-pan-y">
            <div className="flex h-full">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative flex-[0_0_100%] min-w-0 h-full bg-neutral-100 cursor-zoom-in"
                  onClick={() => setLightboxOpen(true)}
                >
                  <Image
                    src={img}
                    alt={`${productName} slide ${idx + 1}`}
                    fill
                    priority={idx === 0}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 500px, 400px"
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

        {/* Mobile Pagination Indicator: Sleek Minimal Dots */}
        {hasMultiple && (
          <div className="mt-3 flex items-center justify-center gap-1.5 py-1">
            {images.map((_, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => selectImage(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${isSelected
                    ? 'w-5 h-1.5 bg-neutral-950'
                    : 'w-1.5 h-1.5 bg-neutral-300 hover:bg-neutral-400'
                    }`}
                  aria-label={`Go to photo ${idx + 1}`}
                />
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
