"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ArrowRight, Flame } from "lucide-react";
import { Product } from "../../lib/types";
import ProductCard from "../product/ProductCard";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";

interface BestSellersSectionProps {
    products: Product[];
}

export default function BestSellersSection({
    products,
}: BestSellersSectionProps) {
    const [activeTab, setActiveTab] = useState<
        "all" | "dresses" | "tailoring" | "knitwear"
    >("all");

    // Filter products based on selected tab
    const filteredProducts = products.filter((product) => {
        if (activeTab === "all") return true;
        const name = product.name.toLowerCase();
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

    // Ensure we have enough items for a full carousel
    const displayProducts =
        filteredProducts.length >= 4 ? filteredProducts : products.slice(0, 12);

    // Embla Carousel setup
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        containScroll: "trimSnaps",
        dragFree: false,
        slidesToScroll: 1,
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const [isDraggingTrack, setIsDraggingTrack] = useState(false);

    const trackRef = useRef<HTMLDivElement>(null);

    const onScroll = useCallback(() => {
        if (!emblaApi) return;
        const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
        setScrollProgress(progress * 100);
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        onScroll();
        emblaApi.on("scroll", onScroll);
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);

        return () => {
            emblaApi.off("scroll", onScroll);
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onScroll, onSelect]);

    // Reset to first slide when switching tabs
    useEffect(() => {
        if (emblaApi) {
            emblaApi.scrollTo(0);
            emblaApi.reInit();
        }
    }, [activeTab, emblaApi]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    // Interactive Scrubber calculations
    const scrollToProgress = useCallback(
        (clientX: number) => {
            if (!emblaApi || !trackRef.current) return;
            const rect = trackRef.current.getBoundingClientRect();
            const clickX = clientX - rect.left;
            const ratio = Math.max(0, Math.min(1, clickX / rect.width));
            const snapList = emblaApi.scrollSnapList();
            if (snapList.length === 0) return;

            const targetSnap = Math.round(ratio * (snapList.length - 1));
            emblaApi.scrollTo(targetSnap);
        },
        [emblaApi]
    );

    const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
        scrollToProgress(e.clientX);
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDraggingTrack(true);
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDraggingTrack) return;
        scrollToProgress(e.clientX);
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        setIsDraggingTrack(false);
        try {
            (e.target as HTMLElement).releasePointerCapture(e.pointerId);
        } catch { }
    };

    const totalSlides = displayProducts.length;
    const currentSlideNumber = Math.min(selectedIndex + 1, totalSlides);

    return (
        <section className="mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 border-t border-neutral-200 overflow-hidden">
            {/* 1. Header with Title & Filter Tabs */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 pb-4 border-b border-neutral-200 gap-4">
                <div>
                    <div className="flex items-center gap-1.5 mb-1 text-neutral-950">
                        <Flame size={14} className="fill-neutral-950" />
                        <span className="text-[11px] uppercase tracking-[0.25em] font-bold font-display">
                            Most Coveted
                        </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-display text-neutral-900 font-bold tracking-tight">
                        The LUNE favourites
                    </h2>
                    <p className="text-xs text-neutral-500 mt-1 max-w-lg">
                        The pieces our community reaches for most — quietly
                        elevated, easy to style, and designed to live in your
                        wardrobe.
                    </p>
                </div>

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
            </div>

            {/* 2. Embla Carousel Track */}
            <div className="relative">
                <div ref={emblaRef} className="select-none cursor-grab active:cursor-grabbing">
                    <div className="flex -ml-[1px] sm:-ml-[1px] gap-[2px]">
                        {displayProducts.map((product, idx) => (
                            <div
                                key={`${product.id}-${idx}`}
                                className="min-w-0 shrink-0 grow-0 basis-[78%] sm:basis-[48%] md:basis-[32%] lg:basis-[24%]"
                            >
                                <ProductCard
                                    product={product}
                                    badgeText={idx % 2 === 0 ? "NEW" : undefined}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. Bottom Controls: Counter, < >, and Scrubber Track */}
            <div className="mt-8 flex items-center gap-4 sm:gap-6">
                {/* Current / Total Count (e.g. 1/12) */}
                <span className="text-xs font-mono font-medium text-neutral-700 select-none min-w-[34px] tracking-wide">
                    {currentSlideNumber}/{totalSlides}
                </span>

                {/* Left & Right Chevron Controls */}
                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        onClick={scrollPrev}
                        disabled={!canScrollPrev}
                        className="p-1 text-neutral-700 hover:text-black disabled:opacity-25 disabled:hover:text-neutral-700 transition-all cursor-pointer disabled:cursor-not-allowed"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft size={16} strokeWidth={2} />
                    </button>
                    <button
                        type="button"
                        onClick={scrollNext}
                        disabled={!canScrollNext}
                        className="p-1 text-neutral-700 hover:text-black disabled:opacity-25 disabled:hover:text-neutral-700 transition-all cursor-pointer disabled:cursor-not-allowed"
                        aria-label="Next slide"
                    >
                        <ChevronRight size={16} strokeWidth={2} />
                    </button>
                </div>

                {/* Progress Track with Custom Thumb Indicator */}

            </div>

            {/* Complete Collection Footer CTA */}
            <div className="text-center mt-12 pt-6 border-t border-neutral-200">
                <Button asChild size="lg">
                    <Link
                        href="/collections/all"
                        className="inline-flex items-center gap-2"
                    >
                        <span>View Complete Collection</span>
                        <ArrowRight size={14} />
                    </Link>
                </Button>
            </div>
        </section>
    );
}
