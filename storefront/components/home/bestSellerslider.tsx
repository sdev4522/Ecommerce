"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight, ArrowRight, Flame } from "lucide-react";

import { Product } from "../../lib/types";
import ProductCard from "../product/ProductCard";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";

// Swiper core & module styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

export interface BestSellersSliderProps {
    products?: Product[];
    title?: string;
    subtitle?: string;
    showTabs?: boolean;
    showViewAll?: boolean;
}

export function BestSellersSlider({
    products = [],
    title = "The LUNE favourites",
    subtitle = "The pieces our community reaches for most — quietly elevated, easy to style, and designed to live in your wardrobe.",
    showTabs = true,
    showViewAll = true,
}: BestSellersSliderProps) {
    const [activeTab, setActiveTab] = useState<
        "all" | "dresses" | "tailoring" | "knitwear"
    >("all");

    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(true);

    // Filter products based on selected tab
    const filteredProducts = (products || []).filter((product) => {
        if (activeTab === "all") return true;
        const name = (product.name || "").toLowerCase();
        const cat = (product.category?.name || "").toLowerCase();

        if (activeTab === "dresses") {
            return (
                name.includes("dress") ||
                name.includes("set") ||
                cat.includes("dress") ||
                cat.includes("set")
            );
        }
        if (activeTab === "tailoring") {
            return (
                name.includes("trouser") ||
                name.includes("blazer") ||
                name.includes("coat") ||
                cat.includes("trouser") ||
                cat.includes("coat")
            );
        }
        if (activeTab === "knitwear") {
            return (
                name.includes("knit") ||
                name.includes("hoodie") ||
                name.includes("sweater") ||
                cat.includes("knit") ||
                cat.includes("hoodie")
            );
        }
        return true;
    });

    const displayProducts =
        filteredProducts.length >= 4 ? filteredProducts : (products || []).slice(0, 12);

    const totalSlides = displayProducts.length;

    // Reset swiper position when switching tabs
    useEffect(() => {
        if (swiperInstance && !swiperInstance.destroyed) {
            swiperInstance.slideTo(0);
            setCurrentIndex(0);
            setCanScrollPrev(false);
            setCanScrollNext(totalSlides > 1);
        }
    }, [activeTab, swiperInstance, totalSlides]);

    const updateNavigationState = (s: SwiperType) => {
        setCurrentIndex(s.realIndex ?? s.activeIndex ?? 0);
        setCanScrollPrev(!s.isBeginning);
        setCanScrollNext(!s.isEnd);
    };

    return (
        <section className="mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 border-t border-neutral-200 overflow-hidden">
            {/* Header with Title & Filter Tabs */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 pb-4 border-b border-neutral-200 gap-4">
                <div>
                    <div className="flex items-center gap-1.5 mb-1 text-neutral-950">
                        <Flame size={14} className="fill-neutral-950" />
                        <span className="text-[11px] uppercase tracking-[0.25em] font-bold font-display">
                            Most Coveted
                        </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-display text-neutral-900 font-bold tracking-tight">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-xs text-neutral-500 mt-1 max-w-lg">
                            {subtitle}
                        </p>
                    )}
                </div>

                {showTabs && (
                    <Tabs
                        value={activeTab}
                        onValueChange={(val) => setActiveTab(val as any)}
                    >
                        <TabsList className="h-10 bg-neutral-100 p-1">
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="dresses">
                                Dresses &amp; Sets
                            </TabsTrigger>
                            <TabsTrigger value="tailoring">Tailoring</TabsTrigger>
                            <TabsTrigger value="knitwear">Knitwear</TabsTrigger>
                        </TabsList>
                    </Tabs>
                )}
            </div>

            {/* Swiper Slider Track */}
            <div className="relative">
                <Swiper
                    modules={[FreeMode, Pagination, Navigation]}
                    spaceBetween={16}
                    slidesPerView={1.25}
                    grabCursor={true}
                    freeMode={{
                        enabled: true,
                        sticky: false,
                        momentumRatio: 0.8,
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    breakpoints={{
                        480: {
                            slidesPerView: 1.6,
                            spaceBetween: 16,
                        },
                        640: {
                            slidesPerView: 2.2,
                            spaceBetween: 18,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 2,
                        },
                    }}
                    onSwiper={(swiper) => {
                        setSwiperInstance(swiper);
                        updateNavigationState(swiper);
                    }}
                    onSlideChange={(swiper) => updateNavigationState(swiper)}
                    className="bestseller-swiper !pb-12"
                >
                    {displayProducts.map((product, idx) => (
                        <SwiperSlide key={`${product.id}-${idx}`} className="h-auto">
                            <div className="h-full">
                                <ProductCard
                                    product={product}
                                    badgeText={idx % 2 === 0 ? "NEW" : undefined}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Bottom Controls: Slide Counter & Prev/Next Chevrons */}
            <div className="mt-2 flex items-center justify-between">
                <span className="text-xs font-mono font-medium text-neutral-700 select-none min-w-[36px] tracking-wide">
                    {totalSlides > 0
                        ? `${Math.min(currentIndex + 1, totalSlides)} / ${totalSlides}`
                        : "0 / 0"}
                </span>

                <div className="flex items-center gap-1.5">
                    <button
                        type="button"
                        onClick={() => swiperInstance?.slidePrev()}
                        disabled={!canScrollPrev}
                        className="p-1.5 rounded-full border border-neutral-200 text-neutral-700 hover:text-black hover:border-neutral-900 disabled:opacity-25 disabled:hover:text-neutral-700 disabled:hover:border-neutral-200 transition-all cursor-pointer disabled:cursor-not-allowed"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft size={16} strokeWidth={2} />
                    </button>
                    <button
                        type="button"
                        onClick={() => swiperInstance?.slideNext()}
                        disabled={!canScrollNext}
                        className="p-1.5 rounded-full border border-neutral-200 text-neutral-700 hover:text-black hover:border-neutral-900 disabled:opacity-25 disabled:hover:text-neutral-700 disabled:hover:border-neutral-200 transition-all cursor-pointer disabled:cursor-not-allowed"
                        aria-label="Next slide"
                    >
                        <ChevronRight size={16} strokeWidth={2} />
                    </button>
                </div>
            </div>

            {/* Complete Collection Footer CTA */}
            {showViewAll && (
                <div className="text-center mt-10 pt-6 border-t border-neutral-200">
                    <Button asChild size="lg">
                        <Link
                            href="/shop"
                            className="inline-flex items-center gap-2"
                        >
                            <span>Shop All Products</span>
                            <ArrowRight size={14} />
                        </Link>
                    </Button>
                </div>
            )}
        </section>
    );
}

export { BestSellersSlider as BestSellerslider };
export default BestSellersSlider;