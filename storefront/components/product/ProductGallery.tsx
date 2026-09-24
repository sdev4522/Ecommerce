'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  // Ensure we have at least one image
  const images = initialImages.length > 0 ? initialImages : ['/images/placeholder.jpg'];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

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

  // Sync if externalActiveImage changes (e.g. from color variant click)
  useEffect(() => {
    if (externalActiveImage) {
      const idx = images.indexOf(externalActiveImage);
      if (idx !== -1 && idx !== selectedIndex) {
        setSelectedIndex(idx);
        emblaApi?.scrollTo(idx);
      }
    }
  }, [externalActiveImage, images, emblaApi, selectedIndex]);

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

  return (
    <div className="w-full">
      {/* ------------------------------------------------------------- */}
      {/* DESKTOP GALLERY (Horizontal thumbs + dominant visual)         */}
      {/* ------------------------------------------------------------- */}
      <div className="hidden lg:flex gap-4">
        {/* Left vertical thumbnail strip (if > 1 image) */}
        {images.length > 1 && (
          <div className="flex flex-col gap-2.5 w-18 shrink-0 max-h-[720px] overflow-y-auto no-scrollbar py-0.5">
            {images.map((img, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => selectImage(idx)}
                  className={`relative aspect-3/4 w-full overflow-hidden bg-neutral-100 transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'ring-1.5 ring-neutral-950 opacity-100 shadow-xs'
                      : 'opacity-60 hover:opacity-100 hover:ring-1 hover:ring-neutral-400'
                  }`}
                  aria-label={`View product photo ${idx + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${productName} thumbnail ${idx + 1}`}
                    fill
                    sizes="72px"
                    className="object-cover object-top"
                  />
                </button>
              );
            })}
          </div>
        )}

        {/* Dominant Main Visual */}
        <div
          className="relative flex-1 aspect-3/4 bg-neutral-100/80 overflow-hidden cursor-zoom-in group select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseMove={handleMouseMove}
          onClick={() => setLightboxOpen(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0.85 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.85 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full h-full"
            >
              <Image
                src={images[selectedIndex]}
                alt={`${productName} — view ${selectedIndex + 1}`}
                fill
                priority={selectedIndex === 0}
                loading={selectedIndex === 0 ? 'eager' : 'lazy'}
                sizes="(max-width: 1024px) 100vw, 55vw"
                className={`object-cover object-top transition-transform duration-300 ${
                  isHovered ? 'scale-135' : 'scale-100'
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
              <span className="bg-neutral-950/90 backdrop-blur-xs text-white text-[10px] uppercase tracking-[0.2em] font-medium px-2.5 py-1">
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
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-neutral-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-xs cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-neutral-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-xs cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          {/* Counter pill */}
          <div className="absolute bottom-4 right-4 z-10 pointer-events-none">
            <span className="bg-neutral-950/75 backdrop-blur-xs text-white/90 text-[10px] font-mono uppercase tracking-widest px-2.5 py-1">
              {selectedIndex + 1} / {images.length}
            </span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MOBILE GALLERY (Touch Embla Carousel)                         */}
      {/* ------------------------------------------------------------- */}
      <div className="lg:hidden w-full relative">
        <div ref={emblaRef} className="overflow-hidden w-full touch-pan-y">
          <div className="flex">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="relative flex-[0_0_100%] min-w-0 aspect-3/4 bg-neutral-100"
                onClick={() => setLightboxOpen(true)}
              >
                <Image
                  src={img}
                  alt={`${productName} slide ${idx + 1}`}
                  fill
                  priority={idx === 0}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  sizes="100vw"
                  className="object-cover object-top select-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Badge */}
        {badge && (
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span className="bg-neutral-950/90 text-white text-[9px] uppercase tracking-[0.2em] font-medium px-2 py-0.5">
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
          <span className="bg-neutral-950/70 backdrop-blur-xs text-white text-[10px] font-mono uppercase tracking-wider px-2 py-0.5">
            {selectedIndex + 1} / {images.length}
          </span>
        </div>

        {/* Mobile Pagination Dots */}
        {images.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 py-3">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => selectImage(idx)}
                className={`transition-all duration-200 cursor-pointer rounded-full ${
                  selectedIndex === idx
                    ? 'w-5 h-1.5 bg-neutral-950'
                    : 'w-1.5 h-1.5 bg-neutral-300 hover:bg-neutral-400'
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
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
