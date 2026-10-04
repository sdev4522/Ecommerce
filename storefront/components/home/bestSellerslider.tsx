"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ArrowRight, Flame } from "lucide-react";

import { Product } from "../../lib/types";
import ProductCard from "../product/ProductCard";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";

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

    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        containScroll: "trimSnaps",
        dragFree: true,
    });

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

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setCurrentIndex(emblaApi.selectedScrollSnap());
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);

        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);

    // Reset carousel position when switching tabs
    useEffect(() => {
        if (emblaApi) {
            emblaApi.scrollTo(0);
            setCurrentIndex(0);
            setCanScrollPrev(false);
            setCanScrollNext(totalSlides > 1);
        }
    }, [activeTab, emblaApi, totalSlides]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <section className="mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 border-t border-neutral-200 overflow-hidden">
            {/* Header with Title & Filter Tabs */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-10 pb-3 sm:pb-4 border-b border-neutral-200 gap-3 sm:gap-4">
                <div>
                    <div className="flex items-center gap-1.5 mb-1 text-neutral-950">
                        <Flame size={13} className="fill-neutral-950" />
                        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-bold font-display">
                            Most Coveted
                        </span>
                    </div>
                    <h2 className="text-xl sm:text-3xl font-display text-neutral-900 font-bold tracking-tight">
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
                        className="w-full md:w-auto overflow-x-auto"
                    >
                        <TabsList className="h-9 sm:h-10 bg-neutral-100 p-1">
                            <TabsTrigger value="all" className="text-xs sm:text-sm">All</TabsTrigger>
                            <TabsTrigger value="dresses" className="text-xs sm:text-sm">
                                Dresses &amp; Sets
                            </TabsTrigger>
                            <TabsTrigger value="tailoring" className="text-xs sm:text-sm">Tailoring</TabsTrigger>
                            <TabsTrigger value="knitwear" className="text-xs sm:text-sm">Knitwear</TabsTrigger>
                        </TabsList>
                    </Tabs>
                )}
            </div>

            {/* Carousel Slider Track with Strict CSS Sizing to Eliminate CLS and Forced Reflows */}
            <div className="relative min-h-[440px] sm:min-h-[500px]">
                <div
                    ref={emblaRef}
                    className="overflow-hidden select-none cursor-grab active:cursor-grabbing"
                >
                    <div className="flex -ml-2.5 sm:-ml-4 pb-4">
                        {displayProducts.map((product, idx) => (
                            <div
                                key={`${product.id}-${idx}`}
                                className="min-w-0 shrink-0 grow-0 basis-[72%] sm:basis-[48%] md:basis-[32%] lg:basis-[24%] pl-2.5 sm:pl-4"
                            >
                                <div className="h-full">
                                    <ProductCard
                                        product={product}
                                        badgeText={idx % 2 === 0 ? "NEW" : undefined}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Controls: Slide Counter & Prev/Next Chevrons */}
            <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-mono font-medium text-neutral-700 select-none min-w-[36px] tracking-wide">
                    {totalSlides > 0
                        ? `${Math.min(currentIndex + 1, totalSlides)} / ${totalSlides}`
                        : "0 / 0"}
                </span>

                <div className="flex items-center gap-1.5">
                    <button
                        type="button"
                        onClick={scrollPrev}
                        disabled={!canScrollPrev}
                        className="p-1.5 rounded-full border border-neutral-200 text-neutral-700 hover:text-black hover:border-neutral-900 disabled:opacity-25 disabled:hover:text-neutral-700 disabled:hover:border-neutral-200 transition-all cursor-pointer disabled:cursor-not-allowed"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft size={16} strokeWidth={2} />
                    </button>
                    <button
                        type="button"
                        onClick={scrollNext}
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