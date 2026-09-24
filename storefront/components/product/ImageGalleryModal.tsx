'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

interface ImageGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex: number;
  productName: string;
}

export default function ImageGalleryModal({
  isOpen,
  onClose,
  images,
  initialIndex,
  productName,
}: ImageGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setIsZoomed(false);
  }, [initialIndex, isOpen]);

  const nextImage = () => {
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, images.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) {
      nextImage();
    } else if (diff < -50) {
      prevImage();
    }
    touchStartX.current = null;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${productName} image lightbox`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Control Bar */}
          <div className="absolute top-0 inset-x-0 p-4 sm:p-6 flex items-center justify-between text-white z-20 bg-linear-to-b from-black/60 to-transparent">
            <div className="text-xs uppercase tracking-widest text-neutral-300 font-display">
              <span className="font-semibold text-white truncate max-w-xs inline-block align-bottom">{productName}</span> &bull; {currentIndex + 1} of {images.length}
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                type="button"
                onClick={() => setIsZoomed(!isZoomed)}
                className="p-2 text-neutral-300 hover:text-white rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xs transition-colors cursor-pointer"
                title={isZoomed ? 'Zoom out' : 'Zoom in'}
                aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
              >
                {isZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-neutral-300 hover:text-white rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xs transition-colors cursor-pointer"
                title="Close gallery"
                aria-label="Close gallery"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Previous Button */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={prevImage}
              className="absolute left-4 z-20 p-3 rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors hidden sm:flex items-center justify-center cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Center Main Stage */}
          <div
            className={`relative w-full h-[78vh] flex items-center justify-center p-4 transition-transform duration-300 ${
              isZoomed ? 'cursor-zoom-out scale-130' : 'cursor-zoom-in'
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <div className="relative w-full max-w-3xl h-full">
              <Image
                src={images[currentIndex]}
                alt={`${productName} view ${currentIndex + 1}`}
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </div>

          {/* Next Button */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={nextImage}
              className="absolute right-4 z-20 p-3 rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors hidden sm:flex items-center justify-center cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          )}

          {/* Bottom Thumbnail Strip */}
          {images.length > 1 && (
            <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2 p-2 z-20 overflow-x-auto no-scrollbar">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setCurrentIndex(idx);
                    setIsZoomed(false);
                  }}
                  className={`relative w-12 h-16 shrink-0 overflow-hidden transition-all cursor-pointer ${
                    currentIndex === idx
                      ? 'ring-2 ring-white scale-105 opacity-100'
                      : 'opacity-40 hover:opacity-100 ring-1 ring-neutral-700'
                  }`}
                  aria-label={`View image ${idx + 1}`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
