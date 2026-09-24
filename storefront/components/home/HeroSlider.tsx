"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../ui/button";
import type { HeroSlideItem } from "@/lib/site-config";

export const HERO_SLIDES = [
    {
        id: 1,
        tag: "NEW SEASON • SOFT TAILORING",
        title: "Made to move beautifully.",
        description:
            "Fluid silhouettes, elevated essentials, and polished layers designed for effortless days and unforgettable evenings.",
        image: "/images/hero/slide-1.webp",
        primaryCta: { label: "Shop New In", href: "/collections/all" },
        secondaryCta: { label: "View Lookbook", href: "/collections/all" },
    },
    {
        id: 2,
        tag: "CURATED EDIT • DAILY ELEGANCE",
        title: "Dress like you already have plans.",
        description:
            "From polished workwear to soft weekend layers, discover wardrobe staples that feel refined and easy to style.",
        image: "/images/hero/slide-2.webp",
        primaryCta: { label: "Shop Dresses", href: "/collections/all" },
        secondaryCta: { label: "Best Sellers", href: "/collections/all" },
    },
    {
        id: 3,
        tag: "LIMITED DROP • MODERN FEMININE",
        title: "Clothing with intention.",
        description:
            "Thoughtful fabrics, flattering cuts, and rich tones made to last beyond the season.",
        image: "/images/hero/slide-3.webp",
        primaryCta: { label: "Explore Edit", href: "/collections/all" },
        secondaryCta: { label: "Styling Guide", href: "/blog" },
    },
];

interface HeroSliderProps {
    slides?: HeroSlideItem[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
    const activeSlides =
        slides && slides.length > 0
            ? slides.map((s, idx) => ({
                id: s.id || idx + 1,
                tag: s.subtitle || s.highlight_text || "EXCLUSIVE DROP",
                title: s.title || "Made to move beautifully.",
                description:
                    s.description ||
                    "Fluid silhouettes, elevated essentials, and polished layers designed for effortless days.",
                image: s.image || `/images/hero/slide-${(idx % 3) + 1}.webp`,
                primaryCta: {
                    label: s.button_text || "Shop Now",
                    href: s.link || "/collections/all",
                },
                secondaryCta: {
                    label: "Explore Edit",
                    href: "/collections/all",
                },
            }))
            : HERO_SLIDES;

    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Touch Swipe tracking
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    const nextSlide = useCallback(() => {
        setCurrent((prev) => (prev + 1) % activeSlides.length);
    }, [activeSlides.length]);

    const prevSlide = useCallback(() => {
        setCurrent(
            (prev) => (prev - 1 + activeSlides.length) % activeSlides.length,
        );
    }, [activeSlides.length]);

    // Auto-advance every 8 seconds, giving readers ample time and preventing LCP shift
    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            nextSlide();
        }, 8000);
        return () => clearInterval(timer);
    }, [nextSlide, isPaused, current]);

    // Touch handlers for mobile swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        setIsPaused(true);
        touchEndX.current = null;
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        setIsPaused(false);
        if (touchStartX.current === null || touchEndX.current === null) return;
        const distance = touchStartX.current - touchEndX.current;
        const minSwipe = 45;

        if (distance > minSwipe) {
            nextSlide();
        } else if (distance < -minSwipe) {
            prevSlide();
        }

        touchStartX.current = null;
        touchEndX.current = null;
    };

    const handleTouchCancel = () => {
        setIsPaused(false);
        touchStartX.current = null;
        touchEndX.current = null;
    };

    // Guard against touch devices locking pause via emulated hover
    const handleMouseEnter = () => {
        if (
            typeof window !== "undefined" &&
            window.matchMedia("(hover: hover)").matches
        ) {
            setIsPaused(true);
        }
    };

    const handleMouseLeave = () => {
        if (
            typeof window !== "undefined" &&
            window.matchMedia("(hover: hover)").matches
        ) {
            setIsPaused(false);
        }
    };

    const slide = activeSlides[current] || activeSlides[0];

    return (
        <section className="w-full px-2.5 sm:px-5 pt-1 sm:pt-2">
            <div
                className="relative h-[72vh] sm:h-[84vh] min-h-[500px] sm:min-h-[600px] max-h-[850px] bg-black overflow-hidden select-none rounded-[16px] touch-pan-y"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchCancel}
                aria-label="Featured Carousel"
            >
                {/* Background Image Carousel */}
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={slide.id}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 z-0"
                    >
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            priority={current === 0}
                            fetchPriority={current === 0 ? "high" : "auto"}
                            loading={current === 0 ? "eager" : "lazy"}
                            sizes="(max-width: 768px) 100vw, (max-width: 1440px) 100vw, 1920px"
                            className="object-cover object-center"
                        />
                        {/* Deep Cinematic Monochrome Gradient */}
                    </motion.div>
                </AnimatePresence>

                {/* Top Floating Badge & Slide Counter */}
                <div className="absolute inset-x-4 top-4 sm:top-8 z-20 flex items-center justify-between pointer-events-none">
                    <div className="glass-dark px-3 py-1.5 sm:px-3.5 sm:py-2 border border-white/20 rounded-full flex items-center space-x-2 text-white">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#f7d7c5] animate-pulse" />
                        <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-semibold font-display">
                            {slide.tag}
                        </span>
                    </div>

                    <div className="glass-dark px-2.5 py-0.5 sm:px-3 sm:py-1 border border-white/20 rounded-full text-white text-[10px] sm:text-[11px] font-mono tracking-widest font-medium">
                        0{current + 1} / 0{activeSlides.length}
                    </div>
                </div>

                {/* Content Overlay */}
                <div className="relative h-full px-4 sm:px-6 lg:px-10 flex items-end justify-center pb-20 sm:pb-24 z-10">
                    <div className="max-w-3xl flex flex-col items-center justify-center text-center">
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={slide.id}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: {
                                            staggerChildren: 0.1,
                                            delayChildren: 0.05,
                                        },
                                    },
                                    exit: {
                                        opacity: 0,
                                        transition: { duration: 0.25 },
                                    },
                                }}
                                className="space-y-4 sm:space-y-5"
                            >
                                <motion.div
                                    variants={{
                                        hidden: { opacity: 0, y: 10 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] },
                                        },
                                    }}
                                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-[10px] uppercase tracking-[0.24em] text-white/90 backdrop-blur-xs font-display"
                                >
                                    <span>New Season Edit</span>
                                </motion.div>

                                <motion.h1
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { duration: 0.65, ease: [0.19, 1, 0.22, 1] },
                                        },
                                    }}
                                    className="max-w-2xl text-4xl sm:text-5xl lg:text-7xl font-display font-semibold leading-[0.92] tracking-[-0.04em] text-white drop-shadow-md"
                                >
                                    {slide.title}
                                </motion.h1>

                                <motion.p
                                    variants={{
                                        hidden: { opacity: 0, y: 12 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] },
                                        },
                                    }}
                                    className="max-w-xl mx-auto text-sm sm:text-base text-white/80 leading-relaxed font-sans"
                                >
                                    {slide.description}
                                </motion.p>

                                <motion.div
                                    variants={{
                                        hidden: { opacity: 0, y: 10 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] },
                                        },
                                    }}
                                    className="pt-2 sm:pt-3 flex flex-wrap gap-2.5 sm:gap-3.5 items-center justify-center"
                                >
                                    <Button
                                        asChild
                                        variant="white"
                                        size="default"
                                        className="shadow-2xl text-xs sm:text-sm font-semibold active:scale-95 transition-transform"
                                    >
                                        <Link
                                            href={slide.primaryCta.href}
                                            className="flex items-center space-x-2"
                                        >
                                            <span>
                                                {slide.primaryCta.label}
                                            </span>
                                            <ArrowRight size={13} />
                                        </Link>
                                    </Button>

                                    <Button
                                        asChild
                                        variant="darkGlass"
                                        size="default"
                                        className="text-xs sm:text-sm active:scale-95 transition-transform"
                                    >
                                        <Link href={slide.secondaryCta.href}>
                                            {slide.secondaryCta.label}
                                        </Link>
                                    </Button>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Carousel Navigation Arrows */}
                <div className="absolute right-3 sm:right-8 bottom-5 sm:bottom-10 z-20 flex items-center space-x-1.5 bg-neutral-900 border border-neutral-800 p-1 rounded-full">
                    <button
                        type="button"
                        onClick={prevSlide}
                        className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-white flex items-center justify-center text-white  hover:text-black transition-colors cursor-pointer"
                        aria-label="Previous Slide"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={nextSlide}
                        className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-white flex items-center justify-center text-white  hover:text-black transition-colors cursor-pointer"
                        aria-label="Next Slide"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>

                {/* Slide Indicator Line / Dots at Bottom */}
                <div className="absolute bottom-5 sm:bottom-8 left-4 sm:left-1/2 sm:-translate-x-1/2 z-20 flex items-center space-x-2">
                    {activeSlides.map((s, idx) => (
                        <button
                            key={s.id}
                            type="button"
                            onClick={() => setCurrent(idx)}
                            className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${current === idx
                                    ? "w-6 sm:w-8 bg-white"
                                    : "w-1.5 sm:w-2 bg-white/40 hover:bg-white/70"
                                }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
