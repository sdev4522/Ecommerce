"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Sparkles,
    ArrowRight,
    ShieldCheck,
    Feather,
    Layers,
    Compass,
    Recycle,
    CheckCircle2,
    MapPin,
    Clock,
    HeartHandshake,
    Scissors,
} from "lucide-react";

interface BotblePage {
    id: number;
    name: string;
    content: string;
    updated_at?: string;
}

export default function AboutUsPage() {
    const [remotePage, setRemotePage] = useState<BotblePage | null>(null);

    useEffect(() => {
        const fetchAboutFromBotble = async () => {
            const botbleApiUrl =
                process.env.NEXT_PUBLIC_BOTBLE_API_URL ||
                "http://localhost:8000/api/v1";
            try {
                const res = await fetch(`${botbleApiUrl}/pages`, {
                    cache: "no-store",
                });
                if (res.ok) {
                    const data = await res.json();
                    const found = data.data?.find(
                        (p: any) =>
                            p.slug === "about-us" ||
                            p.slug === "about" ||
                            p.name?.toLowerCase().includes("about"),
                    );
                    if (found) {
                        setRemotePage(found);
                    }
                }
            } catch {
                // Fallback to our clean curated story
            }
        };
        fetchAboutFromBotble();
    }, []);

    const stats = [
        {
            value: "100%",
            unit: "Comfort First",
            label: "Breathable, skin-friendly fabrics",
        },
        {
            value: "Zero",
            unit: "Plastic Waste",
            label: "Recyclable packaging across India",
        },
        {
            value: "24–48h",
            unit: "Fast Dispatch",
            label: "Carefully packed from our studio",
        },
        {
            value: "7 Days",
            unit: "Easy Returns",
            label: "Complimentary doorstep pickup",
        },
    ];

    const pillars = [
        {
            title: "Breathable Natural Blends",
            subtitle: "All-Day Comfort",
            description:
                "Sourced from premium cottons, fine linens, and soft knit yarns designed to feel weightless and breathable throughout India's diverse climates.",
            image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop",
        },
        {
            title: "Flattering, Fluid Silhouettes",
            subtitle: "Effortless Versatility",
            description:
                "Thoughtfully proportioned tailoring that frames without pinching. Pieces engineered to move effortlessly from morning meetings to evening dinners.",
            image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop",
        },
        {
            title: "Enduring Construction",
            subtitle: "Made to Last",
            description:
                "Reinforced seams, colorfast dyes, and resilient natural drape ensure every piece retains its shape, texture, and elegance wash after wash.",
            image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
        },
    ];

    return (
        <div className="min-h-screen bg-white text-neutral-900 pb-24 font-sans">
            {/* Hero Banner */}
            <div className="relative border-b border-neutral-200/80 bg-neutral-950 text-white overflow-hidden py-20 sm:py-28">
                <div className="absolute inset-0 opacity-20">
                    <Image
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1800&auto=format&fit=crop"
                        alt="LUNE Design Studio"
                        fill
                        className="object-cover object-center filter grayscale"
                    />
                </div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-[11px] uppercase tracking-wider font-semibold text-neutral-200 font-display">
                        <Sparkles size={12} className="text-white" />
                        <span>The LUNE Philosophy</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-normal tracking-tight leading-tight text-white">
                        Understated Fashion for Modern Living.
                    </h1>

                    <p className="text-xs sm:text-base text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
                        We started LUNE with a clear belief: women deserve elevated wardrobe essentials
                        that feel polished, comfortable, and beautifully made to last beyond fleeting trends.
                    </p>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="border-b border-neutral-200 bg-neutral-50/70">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="space-y-1">
                            <span className="text-2xl sm:text-3xl lg:text-4xl font-display font-semibold text-neutral-950 block">
                                {stat.value}
                            </span>
                            <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-600 font-display block">
                                {stat.unit}
                            </span>
                            <p className="text-xs text-neutral-500 font-light mt-0.5">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 space-y-20">
                {/* Remote CMS notice if edited from Botble */}
                {remotePage?.content && (
                    <div className="p-4 bg-neutral-50 border border-neutral-200 text-xs text-neutral-700 space-y-2">
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-400 font-display block">
                            Store Notice:
                        </span>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: remotePage.content,
                            }}
                        />
                    </div>
                )}

                {/* Section 1: The Brand Purpose */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    <div className="lg:col-span-6 space-y-4">
                        <div className="flex items-center gap-1.5">
                            <Feather size={14} className="text-neutral-950" />
                            <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-500 font-display">
                                Why We Built LUNE
                            </span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-display font-normal text-neutral-950 leading-snug">
                            Everyday Pieces Made with Thoughtful Care
                        </h2>

                        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                            Too often, modern fashion forces a choice between fleeting low-quality fast trends
                            and inaccessible luxury. We created LUNE to offer a calm alternative: timeless silhouettes,
                            luxurious hand-feel, and honest pricing.
                        </p>

                        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                            Every piece is thoughtfully sampled, wear-tested, and refined. From fluid dresses
                            and versatile coordinates to tailored trousers, our pieces are designed to become the
                            trusted foundation of your daily wardrobe.
                        </p>

                        <div className="pt-2 space-y-2 text-xs text-neutral-800">
                            <div className="flex items-center space-x-2">
                                <CheckCircle2
                                    size={16}
                                    className="text-emerald-700 shrink-0"
                                />
                                <span>
                                    Breathable, skin-friendly fabrics tailored for ease
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <CheckCircle2
                                    size={16}
                                    className="text-emerald-700 shrink-0"
                                />
                                <span>
                                    Pre-tested fits that retain form and color after washing
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-6 relative aspect-4/3 bg-neutral-100 overflow-hidden shadow-sm">
                        <Image
                            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop"
                            alt="Thoughtful styling and tailored finishes"
                            fill
                            className="object-cover"
                        />
                    </div>
                </section>

                {/* Section 2: Our 3 Design Pillars */}
                <section className="space-y-8">
                    <div className="text-center space-y-2 max-w-xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-display font-normal text-neutral-950">
                            Our Design Pillars
                        </h2>
                        <p className="text-xs text-neutral-500 font-light">
                            Three core standards behind every piece we design.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {pillars.map((pillar, idx) => (
                            <div
                                key={idx}
                                className="border border-neutral-200 bg-white flex flex-col group hover:border-neutral-400 transition-colors"
                            >
                                <div className="relative aspect-3/2 bg-neutral-100 overflow-hidden">
                                    <Image
                                        src={pillar.image}
                                        alt={pillar.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[10.5px] uppercase tracking-wider font-semibold px-2 py-0.5 text-neutral-900 font-display shadow-xs">
                                        {pillar.subtitle}
                                    </span>
                                </div>

                                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                                    <div className="space-y-1">
                                        <h3 className="text-sm font-display font-medium text-neutral-950">
                                            {pillar.title}
                                        </h3>
                                        <p className="text-xs text-neutral-600 font-light leading-relaxed pt-1">
                                            {pillar.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 3: Tailoring Details */}
                <section className="border border-neutral-200 p-8 sm:p-12 bg-white space-y-6">
                    <div className="max-w-2xl space-y-2">
                        <div className="flex items-center gap-1.5 text-neutral-950 font-display text-xs uppercase tracking-wider font-semibold">
                            <Scissors size={14} />
                            <span>Craft &amp; Cut</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-display font-normal text-neutral-950">
                            Subtle Details in Every Stitch
                        </h2>
                        <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                            Comfortable necklines, clean linings, and generous hemlines that adapt gracefully throughout your day.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-xs">
                        <div className="space-y-1.5 border-t border-neutral-200 pt-3">
                            <strong className="block text-neutral-950 font-display uppercase tracking-wider text-[11px]">
                                1. Natural Drape &amp; Ease
                            </strong>
                            <p className="text-neutral-500 font-light leading-relaxed">
                                Cut with mindful ease so you feel relaxed yet put-together without tightness or stiffness.
                            </p>
                        </div>

                        <div className="space-y-1.5 border-t border-neutral-200 pt-3">
                            <strong className="block text-neutral-950 font-display uppercase tracking-wider text-[11px]">
                                2. Clean Interior Finishes
                            </strong>
                            <p className="text-neutral-500 font-light leading-relaxed">
                                Bound seams and smooth interior stitching that feel gentle against delicate skin.
                            </p>
                        </div>

                        <div className="space-y-1.5 border-t border-neutral-200 pt-3">
                            <strong className="block text-neutral-950 font-display uppercase tracking-wider text-[11px]">
                                3. Durable Color &amp; Form
                            </strong>
                            <p className="text-neutral-500 font-light leading-relaxed">
                                High-grade colorfast dyes tested for repeated gentle wash cycles.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section 4: Eco Packaging */}
                <section className="bg-neutral-50 border border-neutral-200 p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-700">
                        <Recycle size={28} />
                    </div>
                    <div className="space-y-1 flex-1 text-center sm:text-left">
                        <h3 className="text-lg font-display font-medium text-neutral-950">
                            100% Recyclable &amp; Plastic-Free Packaging
                        </h3>
                        <p className="text-xs text-neutral-600 font-light leading-relaxed max-w-xl">
                            Every order is packaged in recyclable paper mailers and compostable glassine wrapping.
                            Thoughtful protection without unnecessary plastic waste.
                        </p>
                    </div>
                </section>

                {/* Section 5: Design & Fulfillment */}
                <section className="space-y-6">
                    <div className="text-center space-y-2 max-w-md mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-display font-normal text-neutral-950">
                            Our Studio &amp; Fulfillment
                        </h2>
                        <p className="text-xs text-neutral-500 font-light">
                            Designed in Bengaluru, crafted with trusted weaving and tailoring partners across India.
                        </p>
                    </div>

                    <div className="max-w-2xl mx-auto border border-neutral-200 p-6 sm:p-8 bg-white space-y-3 text-center">
                        <div className="flex items-center justify-center space-x-2 text-neutral-950">
                            <MapPin size={18} className="text-neutral-950 shrink-0" />
                            <h3 className="text-base font-semibold uppercase tracking-wider font-display">
                                LUNE Studio &amp; Distribution
                            </h3>
                        </div>
                        <p className="text-xs text-neutral-500 font-mono">
                            Indiranagar, Bengaluru, Karnataka 560038, India
                        </p>
                        <p className="text-xs text-neutral-600 font-light leading-relaxed pt-2 border-t border-neutral-100">
                            Dedicated to designing wearable, confidence-building fashion and ensuring swift, reliable dispatch to customers across India.
                        </p>
                    </div>
                </section>

                {/* CTA Banner */}
                <section className="p-8 sm:p-12 bg-neutral-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
                    <div className="space-y-2 text-center sm:text-left">
                        <h3 className="text-xl sm:text-2xl font-display font-normal">
                            Ready to Discover Your Next Favorite Piece?
                        </h3>
                        <p className="text-xs text-neutral-400 font-light max-w-md">
                            Explore our latest collections with free express shipping on orders over ₹1,999 and easy 7-day doorstep returns.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                        <Link
                            href="/shop"
                            className="bg-white text-neutral-950 text-xs uppercase tracking-wider font-semibold px-6 py-3.5 hover:bg-neutral-200 transition-colors flex items-center space-x-2 font-display cursor-pointer"
                        >
                            <span>Shop Collection</span>
                            <ArrowRight size={13} />
                        </Link>

                        <Link
                            href="/contact"
                            className="border border-white/40 text-white text-xs uppercase tracking-wider font-semibold px-6 py-3.5 hover:bg-white/10 transition-colors font-display"
                        >
                            <span>Contact Support</span>
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
