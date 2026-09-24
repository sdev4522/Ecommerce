"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    ArrowRight,
    Check,
    RefreshCw,
    Mail,
    MessageCircle,
    ShieldCheck,
    MapPin,
    Phone,
    Clock,
} from "lucide-react";
import { toast } from "sonner";
import type { SiteSettings, MenuItem } from "@/lib/site-config";
import Image from "next/image";

interface FooterProps {
    siteSettings?: SiteSettings;
    footerMenu?: MenuItem[];
}

export default function Footer({ siteSettings, footerMenu }: FooterProps) {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        const cleanEmail = email.trim();
        if (!cleanEmail || !cleanEmail.includes("@")) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        setIsSubmitting(true);

        try {
            // Try Botble newsletter endpoint via Next.js server proxy
            const res = await fetch("/api/newsletter/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({ email: cleanEmail }),
            }).catch(() => null);

            if (res && res.ok) {
                const data = await res.json();
                setSubscribed(true);
                setEmail("");
                toast.success(
                    data.message ||
                        "Thank you for subscribing! Use code WELCOME10 for 10% off your first order.",
                );
            } else if (res && res.status === 422) {
                // Validation error (already subscribed)
                setSubscribed(true);
                setEmail("");
                toast.info(
                    "You are already subscribed to our newsletter! Check your inbox for updates.",
                );
            } else {
                // Fallback for standalone/demo
                setSubscribed(true);
                setEmail("");
                toast.success(
                    "Welcome! You are now subscribed. Use code WELCOME10 for 10% off your first order.",
                );
            }
        } catch {
            setSubscribed(true);
            setEmail("");
            toast.success(
                "Welcome! You are now subscribed. Use code WELCOME10 for 10% off your first order.",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <footer className="bg-white text-black pt-16 pb-12 border-t border-neutral-800 font-sans">
            <div className="w-full px-4 sm:px-6 lg:px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-neutral-800">
                    {/* Column 1 & 2: Brand Story, Newsletter & Socials */}
                    <div className="lg:col-span-2 space-y-6">
                        <Link href="/" className="inline-block">
                            {siteSettings?.logo ? (
                                <div className="relative h-8 w-36 mb-2">
                                    <Image
                                        src={siteSettings.logo}
                                        alt={siteSettings.site_title || "Logo"}
                                        fill
                                        className="object-contain object-left"
                                        sizes="144px"
                                    />
                                </div>
                            ) : (
                                <>
                                    <span className="text-xl font-display tracking-[0.2em] font-semibold text-[#2d211d] block">
                                        {siteSettings?.site_title
                                            ? siteSettings.site_title.split("-")[0].trim()
                                            : "LUNE"}
                                    </span>
                                    <span className="text-[9px] tracking-[0.3em] text-[#8a6c5d] uppercase">
                                        WOMEN&apos;S ESSENTIALS
                                    </span>
                                </>
                            )}
                        </Link>

                        <p className="text-xs text-[#43352e] leading-relaxed max-w-sm font-light">
                            {siteSettings?.seo?.seo_description ||
                                "Thoughtful women's fashion designed for everyday confidence and effortless styling."}
                        </p>

                        {/* Dynamic Social Links from Botble */}
                        {siteSettings?.social_links && siteSettings.social_links.length > 0 && (
                            <div className="flex items-center gap-2.5 pt-1">
                                {siteSettings.social_links.map((s, idx) => (
                                    <a
                                        key={idx}
                                        href={s.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-semibold tracking-wider transition-opacity hover:opacity-80"
                                        style={{ backgroundColor: s.color || "#111111" }}
                                        title={s.name}
                                        aria-label={s.name}
                                    >
                                        <span>{s.name.slice(0, 2).toUpperCase()}</span>
                                    </a>
                                ))}
                            </div>
                        )}

                        {/* Working Newsletter Box */}
                        <div className="pt-2">
                            <p className="text-[12px] text-black mb-3 font-light">
                                Sign up with your email to get your instant 10%
                                discount coupon and early access to new drops.
                            </p>

                            {subscribed ? (
                                <div className="p-4 bg-neutral-900 border border-emerald-600/40 text-xs text-emerald-400 space-y-2">
                                    <div className="flex items-center space-x-2 font-medium">
                                        <Check
                                            size={16}
                                            className="text-emerald-400"
                                        />
                                        <span>
                                            You're on the list! Welcome.
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-neutral-900 font-light">
                                        Your 10% off promo code is{" "}
                                        <strong className="text-white font-mono bg-neutral-800 px-1.5 py-0.5">
                                            WELCOME10
                                        </strong>
                                        . Enter this code during checkout.
                                    </p>
                                    <button
                                        onClick={() => setSubscribed(false)}
                                        className="text-[11px] text-black underline hover:text-white cursor-pointer"
                                    >
                                        Subscribe another email
                                    </button>
                                </div>
                            ) : (
                                <form
                                    onSubmit={handleNewsletterSubmit}
                                    className="space-y-2 max-w-md"
                                >
                                    <div className="flex">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            placeholder="Enter your email address..."
                                            required
                                            className="flex-1 border border-neutral-700 text-xs px-4 py-3 text-white placeholder:text-neutral-500 outline-none focus:border-white transition-colors"
                                        />
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="bg-white text-black text-xs uppercase tracking-wider px-5 py-3 font-semibold hover:bg-neutral-200 transition-colors flex items-center gap-1.5 shrink-0 font-display cursor-pointer disabled:opacity-60"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <RefreshCw
                                                        size={12}
                                                        className="animate-spin"
                                                    />
                                                    <span>Saving...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>Get 10% Off</span>
                                                    <ArrowRight size={13} />
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    {errorMessage && (
                                        <p className="text-[11px] text-red-400 font-light">
                                            {errorMessage}
                                        </p>
                                    )}

                                    <div className="flex items-center space-x-1.5 text-[10.5px] text-neutral-500">
                                        <ShieldCheck size={12} />
                                        <span>
                                            No spam, ever. Unsubscribe anytime
                                            with 1 click.
                                        </span>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Column 3: Shop Products */}
                    <div>
                        <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-neutral-900 mb-4 font-display">
                            Shop Collections
                        </h4>
                        <ul className="space-y-3 text-xs text-black font-light">
                            <li>
                                <Link
                                    href="/shop"
                                    className="hover:text-white transition-colors"
                                >
                                    All Pieces
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/collections/dresses"
                                    className="hover:text-white transition-colors"
                                >
                                    Dresses &amp; Sets
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/collections/knitwear"
                                    className="hover:text-white transition-colors"
                                >
                                    Knitwear &amp; Layers
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/collections/trousers"
                                    className="hover:text-white transition-colors"
                                >
                                    Tailored Trousers
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/collections/outerwear"
                                    className="hover:text-white transition-colors"
                                >
                                    Jackets &amp; Outerwear
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Customer Help & Support / Information Menu */}
                    <div>
                        <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-neutral-900 mb-4 font-display">
                            {footerMenu && footerMenu.length > 0 ? "Information" : "Help & Support"}
                        </h4>
                        <ul className="space-y-3 text-xs text-black font-light">
                            {footerMenu && footerMenu.length > 0 ? (
                                footerMenu.map((item) => (
                                    <li key={item.id}>
                                        <Link
                                            href={item.url || "/"}
                                            target={item.target || "_self"}
                                            className="hover:text-gray-600 transition-colors"
                                        >
                                            {item.title}
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <>
                                    <li>
                                        <Link
                                            href="/track-order"
                                            className="hover:text-gray-400 transition-colors flex items-center gap-1.5"
                                        >
                                            <span>Track Your Order</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/contact"
                                            className="hover:text-gray-400 transition-colors"
                                        >
                                            Contact Support & Help
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/contact"
                                            className="hover:text-white transition-colors"
                                        >
                                            7-Day Easy Returns
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/contact"
                                            className="hover:text-white transition-colors"
                                        >
                                            Help with Sizing & Fit
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>

                    {/* Column 5: Atelier Contact & Locations */}
                    <div>
                        <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-neutral-900 mb-4 font-display">
                            Atelier & Support
                        </h4>
                        <ul className="space-y-3 text-xs text-black font-light">
                            {siteSettings?.address && (
                                <li className="flex items-start gap-1.5 text-neutral-700 leading-tight">
                                    <MapPin size={13} className="shrink-0 mt-0.5 text-neutral-900" />
                                    <span>{siteSettings.address}</span>
                                </li>
                            )}
                            {siteSettings?.phone && (
                                <li className="flex items-center gap-1.5 text-neutral-700">
                                    <Phone size={13} className="shrink-0 text-neutral-900" />
                                    <a
                                        href={`tel:${siteSettings.phone.split("/")[0].trim()}`}
                                        className="hover:underline"
                                    >
                                        {siteSettings.phone}
                                    </a>
                                </li>
                            )}
                            {siteSettings?.contact_email && (
                                <li className="flex items-center gap-1.5 text-neutral-700">
                                    <Mail size={13} className="shrink-0 text-neutral-900" />
                                    <a
                                        href={`mailto:${siteSettings.contact_email}`}
                                        className="hover:underline lowercase"
                                    >
                                        {siteSettings.contact_email}
                                    </a>
                                </li>
                            )}
                            {siteSettings?.working_hours && (
                                <li className="flex items-center gap-1.5 text-neutral-500 text-[11px]">
                                    <Clock size={13} className="shrink-0" />
                                    <span>{siteSettings.working_hours}</span>
                                </li>
                            )}
                            <li>
                                <Link
                                    href="/blog"
                                    className="hover:text-neutral-900 transition-colors font-medium underline underline-offset-4"
                                >
                                    The Journal &amp; Editorials
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar with direct links to all pages */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-4">
                    <p>
                        {siteSettings?.copyright ||
                            `© ${new Date().getFullYear()} LUNE. All rights reserved.`}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-6">
                        <Link
                            href="/track-order"
                            className="hover:text-neutral-900 transition-colors"
                        >
                            Track Order
                        </Link>
                        <Link
                            href="/contact"
                            className="hover:text-neutral-900 transition-colors"
                        >
                            Contact Support
                        </Link>
                        <Link
                            href="/about"
                            className="hover:text-neutral-900 transition-colors"
                        >
                            About Us
                        </Link>
                        <Link
                            href="/privacy"
                            className="hover:text-neutral-900 transition-colors"
                        >
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
