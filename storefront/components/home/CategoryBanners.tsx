'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCategory } from "../../lib/types";
import { Badge } from "../ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "../ui/carousel";

interface CategoryBannersProps {
  categories: ProductCategory[];
}

export default function CategoryBanners({ categories }: CategoryBannersProps) {
  const displayCategories = categories.slice(0, 6);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    const onPointerDown = () => {
      setIsPaused(true);
    };

    const onSettle = () => {
      setIsPaused(false);
    };

    api.on("select", onSelect);
    api.on("pointerDown", onPointerDown);
    api.on("settle", onSettle);

    return () => {
      api.off("select", onSelect);
      api.off("pointerDown", onPointerDown);
      api.off("settle", onSettle);
    };
  }, [api]);

  // Auto-slide effect: automatically scroll to next slide every 4.5s
  useEffect(() => {
    if (!api || isPaused) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [api, isPaused, current]);

  // Guard against touch-device emulated mouseenter
  const handleMouseEnter = () => {
    if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
      setIsPaused(false);
    }
  };

  if (!displayCategories || displayCategories.length === 0) return null;

  return (
    <section className="mx-auto px-3.5 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 pb-4 border-b border-neutral-200 gap-3">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 font-semibold block mb-1 font-display">
            Curated Collections
          </span>
          <h2 className="text-2xl sm:text-3xl font-display text-neutral-900 font-bold tracking-tight">
            Explore By Category
          </h2>
          <p className="text-xs text-neutral-500 mt-1 max-w-lg font-light">
            Browse our signature collections curated for timeless design, craftsmanship, and modern living.
          </p>
        </div>

        <Link
          href="/collections/all"
          className="text-xs uppercase tracking-widest text-neutral-900 hover:text-black font-semibold inline-flex items-center gap-1 group font-display shrink-0"
        >
          <span>View All Collections</span>
          <ArrowUpRight
            size={14}
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          />
        </Link>
      </div>

      {/* Carousel Container */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        onTouchCancel={() => setIsPaused(false)}
      >
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
            dragFree: false,
          }}
          className="w-full relative touch-pan-y"
        >
          <CarouselContent className="ml-[2px]">
            {displayCategories.map((category) => (
              <CarouselItem
                key={category.id}
                className="pl-[2px] basis-[86%] sm:basis-1/2 lg:basis-1/3 shrink-0"
              >
                <Link
                  href={`/collections/${category.slug}`}
                  draggable={false}
                  className="rounded-[4px] group relative block aspect-4/3 sm:aspect-16/10 bg-neutral-100 overflow-hidden border border-neutral-200 shadow-xs hover:shadow-md transition-all select-none"
                >
                  {category.image && (
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      draggable={false}
                      sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                    />
                  )}
                  {/* Deep subtle gradient for superior typography legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

                  {/* Bottom Content Area */}
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 flex flex-col justify-end pointer-events-none">
                    <div className="mb-2">
                      <Badge variant="dark" className="text-[9px] bg-black/60 backdrop-blur-xs border-white/20">
                        {category.products_count && category.products_count > 0
                          ? `${category.products_count} Products Available`
                          : "Curated Selection"}
                      </Badge>
                    </div>
                    <h3 className="text-lg sm:text-xl font-display text-white font-bold group-hover:text-neutral-200 transition-colors">
                      {category.name}
                    </h3>
                    {category.description ? (
                      <p className="text-xs text-white/70 line-clamp-1 mt-1 font-normal">
                        {category.description}
                      </p>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] text-white/80 group-hover:text-white mt-1.5 font-medium transition-colors">
                        <span>Explore Collection</span>
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Controls: Dots + Arrows (Visible on BOTH Mobile and Desktop) */}
          <div className="flex items-center justify-between mt-5 sm:mt-6">
            {/* Slide Indicator Dots */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: count || displayCategories.length }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => api?.scrollTo(idx)}
                  className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${current === idx ? "w-6 bg-neutral-950" : "w-2 bg-neutral-300 hover:bg-neutral-400"
                    }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center space-x-1.5 bg-neutral-900 border border-neutral-800 p-1 rounded-full">
              <button
                type="button"
                onClick={() => api?.scrollPrev()}
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-white flex items-center justify-center text-white  hover:text-black transition-colors cursor-pointer"
                aria-label="Previous Category Slide"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => api?.scrollNext()}
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-white flex items-center justify-center text-white hover:text-black transition-colors cursor-pointer"
                aria-label="Next Category Slide"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
}
