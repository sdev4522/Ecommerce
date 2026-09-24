"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
    ShieldCheck,
    Lock,
    Eye,
    FileText,
    UserCheck,
    Server,
    Mail,
    ChevronRight,
    ArrowRight,
    Clock,
    CheckCircle2,
} from "lucide-react";

interface BotblePage {
    id: number;
    name: string;
    content: string;
    updated_at?: string;
}

export default function PrivacyPolicyPage() {
    const [activeSection, setActiveSection] = useState("collection");
    const [remotePage, setRemotePage] = useState<BotblePage | null>(null);

    useEffect(() => {
        const fetchPageFromBotble = async () => {
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
                            p.slug === "privacy-policy" ||
                            p.slug === "privacy" ||
                            p.name?.toLowerCase().includes("privacy"),
                    );
                    if (found) {
                        setRemotePage(found);
                    }
                }
            } catch {
                // Fallback
            }
        };
        fetchPageFromBotble();
    }, []);

    const sections = [
        { id: "collection", title: "1. What Information We Collect" },
        { id: "usage", title: "2. How We Use Your Details" },
        { id: "nosell", title: "3. We Never Sell Your Data" },
        { id: "payments", title: "4. Safe Payments & Cash on Delivery" },
        { id: "logistics", title: "5. Courier & Shipping Partners" },
        { id: "cookies", title: "6. Cookies & Saved Cart" },
        { id: "rights", title: "7. Your Rights & Deleting Your Data" },
        { id: "contact", title: "8. How to Contact Us" },
    ];

    const scrollTo = (id: string) => {
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <div className="min-h-screen bg-white text-neutral-900 pb-24 font-sans">
            {/* Header Banner */}
            <div className="border-b border-neutral-200/80 bg-neutral-50/50 py-12 sm:py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-200/60 text-[11px] uppercase tracking-wider font-semibold text-neutral-700 font-display">
                        <Lock size={12} />
                        <span>Simple & Clear Privacy Policy</span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-display tracking-tight font-normal text-neutral-950">
                        How We Protect Your Privacy
                    </h1>

                    <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl mx-auto font-light leading-relaxed">
                        At LUNE ATELIER, we believe in being 100% honest and
                        transparent with you. Here is a clear, simple
                        explanation of how we handle your personal information
                        when you shop with us.
                    </p>

                    <div className="flex items-center justify-center gap-4 text-[11px] text-neutral-400 pt-1 font-display">
                        <span>Last Updated: September 2026</span>
                        <span>&bull;</span>
                        <span>Verified Secure & Encrypted</span>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Table of Contents Sticky Sidebar (4 cols) */}
                    <div className="hidden lg:block lg:col-span-4">
                        <div className="sticky top-28 space-y-6 border border-neutral-200 p-6 bg-neutral-50/60">
                            <div className="flex items-center gap-2 pb-3 border-b border-neutral-200 text-xs uppercase tracking-wider font-semibold text-neutral-900 font-display">
                                <FileText size={14} />
                                <span>Jump to Section</span>
                            </div>

                            <nav className="space-y-1">
                                {sections.map((sec) => (
                                    <button
                                        key={sec.id}
                                        onClick={() => scrollTo(sec.id)}
                                        className={`w-full text-left py-2 px-2.5 text-xs transition-colors flex items-center justify-between cursor-pointer rounded-sm ${
                                            activeSection === sec.id
                                                ? "bg-neutral-900 text-white font-medium"
                                                : "text-neutral-600 hover:text-black hover:bg-neutral-100"
                                        }`}
                                    >
                                        <span>{sec.title}</span>
                                        {activeSection === sec.id && (
                                            <ChevronRight size={13} />
                                        )}
                                    </button>
                                ))}
                            </nav>

                            <div className="pt-4 border-t border-neutral-200 text-xs text-neutral-500 space-y-2 font-light">
                                <p>
                                    Have any questions about your data? Contact
                                    our team directly:
                                </p>
                                <a
                                    href="mailto:care@lune.in"
                                    className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-950 underline underline-offset-2 font-display"
                                >
                                    <span>care@lune.in</span>
                                    <ArrowRight size={12} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Policy Content (8 cols) */}
                    <div className="lg:col-span-8 space-y-10 text-xs sm:text-sm text-neutral-700 font-light leading-relaxed">
                        {/* If Botble remote CMS content is available */}
                        {remotePage?.content && (
                            <div className="p-4 bg-neutral-100 border border-neutral-200 text-xs text-neutral-900 mb-6">
                                <strong className="block font-semibold mb-1 font-display">
                                    Admin Update from Botble:
                                </strong>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: remotePage.content,
                                    }}
                                />
                            </div>
                        )}

                        {/* Section 1 */}
                        <section
                            id="collection"
                            className="space-y-3 scroll-mt-28"
                        >
                            <h2 className="text-lg font-display font-medium text-neutral-950 border-b border-neutral-200 pb-2">
                                1. What Information We Collect
                            </h2>
                            <p>
                                When you browse our store or place an order, we
                                only ask for the information we actually need to
                                fulfill your order smoothly:
                            </p>
                            <ul className="space-y-2 list-disc pl-4 text-neutral-600">
                                <li>
                                    <strong className="text-neutral-900 font-medium">
                                        Your Name and Contact:
                                    </strong>{" "}
                                    Your full name, email address, and phone
                                    number so we can send order receipts and
                                    delivery updates.
                                </li>
                                <li>
                                    <strong className="text-neutral-900 font-medium">
                                        Your Delivery Address:
                                    </strong>{" "}
                                    Your home or office address, city, state,
                                    and pin code so our courier knows where to
                                    bring your box.
                                </li>
                                <li>
                                    <strong className="text-neutral-900 font-medium">
                                        Your Account Details:
                                    </strong>{" "}
                                    If you sign up for an account, your email
                                    and an encrypted password (we never see your
                                    actual password).
                                </li>
                                <li>
                                    <strong className="text-neutral-900 font-medium">
                                        Your Shopping Bag & Wishlist:
                                    </strong>{" "}
                                    The clothes you like and add to your bag so
                                    they stay saved for you.
                                </li>
                            </ul>
                        </section>

                        {/* Section 2 */}
                        <section id="usage" className="space-y-3 scroll-mt-28">
                            <h2 className="text-lg font-display font-medium text-neutral-950 border-b border-neutral-200 pb-2">
                                2. How We Use Your Details
                            </h2>
                            <p>
                                We only use your information for clear reasons
                                that help you:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                                <div className="border border-neutral-200 p-4 bg-neutral-50/50 space-y-1">
                                    <strong className="text-xs uppercase tracking-wider font-semibold text-neutral-900 font-display block">
                                        1. Deliver Your Clothes
                                    </strong>
                                    <p className="text-xs text-neutral-500">
                                        Packing your order and handing it to our
                                        courier partners for fast doorstep
                                        delivery.
                                    </p>
                                </div>

                                <div className="border border-neutral-200 p-4 bg-neutral-50/50 space-y-1">
                                    <strong className="text-xs uppercase tracking-wider font-semibold text-neutral-900 font-display block">
                                        2. Tracking & Updates
                                    </strong>
                                    <p className="text-xs text-neutral-500">
                                        Sending you tracking numbers via SMS and
                                        email so you always know when your box
                                        will arrive.
                                    </p>
                                </div>

                                <div className="border border-neutral-200 p-4 bg-neutral-50/50 space-y-1">
                                    <strong className="text-xs uppercase tracking-wider font-semibold text-neutral-900 font-display block">
                                        3. Customer Help
                                    </strong>
                                    <p className="text-xs text-neutral-500">
                                        Helping you with sizing questions,
                                        exchanges, or returns on WhatsApp and
                                        email.
                                    </p>
                                </div>

                                <div className="border border-neutral-200 p-4 bg-neutral-50/50 space-y-1">
                                    <strong className="text-xs uppercase tracking-wider font-semibold text-neutral-900 font-display block">
                                        4. Special Member Discounts
                                    </strong>
                                    <p className="text-xs text-neutral-500">
                                        Sending discount coupons and release
                                        alerts only if you signed up for our
                                        newsletter.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Section 3 */}
                        <section id="nosell" className="space-y-3 scroll-mt-28">
                            <h2 className="text-lg font-display font-medium text-neutral-950 border-b border-neutral-200 pb-2">
                                3. We Never Sell Your Data
                            </h2>
                            <div className="p-4 bg-emerald-50 border border-emerald-200 space-y-1 text-xs text-emerald-900">
                                <strong className="font-semibold block font-display">
                                    Our Guarantee to You:
                                </strong>
                                <p>
                                    We will <strong>NEVER</strong> sell, rent,
                                    or trade your name, phone number, or email
                                    to third-party marketing companies, brokers,
                                    or spammers. Your privacy is 100% respected.
                                </p>
                            </div>
                        </section>

                        {/* Section 4 */}
                        <section
                            id="payments"
                            className="space-y-3 scroll-mt-28"
                        >
                            <h2 className="text-lg font-display font-medium text-neutral-950 border-b border-neutral-200 pb-2">
                                4. Safe Payments & Cash on Delivery (COD)
                            </h2>
                            <p>
                                We use bank-level encryption to make sure your
                                payments are always safe:
                            </p>
                            <ul className="space-y-2 list-disc pl-4 text-neutral-600">
                                <li>
                                    <strong className="text-neutral-900 font-medium">
                                        Online Cards & UPI:
                                    </strong>{" "}
                                    When you pay by UPI, debit card, or credit
                                    card, your payment is processed directly by
                                    RBI-licensed payment gateways (like Razorpay
                                    or Stripe). Our website never stores or sees
                                    your 16-digit card number or CVV pin.
                                </li>
                                <li>
                                    <strong className="text-neutral-900 font-medium">
                                        Cash on Delivery (COD):
                                    </strong>{" "}
                                    If you choose Cash on Delivery, you pay in
                                    cash or UPI only when the courier hands you
                                    the package. We may verify your mobile
                                    number via OTP or WhatsApp before shipping
                                    to make sure your address is correct.
                                </li>
                            </ul>
                        </section>

                        {/* Section 5 */}
                        <section
                            id="logistics"
                            className="space-y-3 scroll-mt-28"
                        >
                            <h2 className="text-lg font-display font-medium text-neutral-950 border-b border-neutral-200 pb-2">
                                5. Courier & Shipping Partners
                            </h2>
                            <p>
                                To deliver your orders, we share your delivery
                                address and contact phone number with our
                                trusted courier services (such as BlueDart,
                                Delhivery, and DHL Express). They only use this
                                information to call you when they are outside
                                your gate or building.
                            </p>
                        </section>

                        {/* Section 6 */}
                        <section
                            id="cookies"
                            className="space-y-3 scroll-mt-28"
                        >
                            <h2 className="text-lg font-display font-medium text-neutral-950 border-b border-neutral-200 pb-2">
                                6. Cookies & Saved Shopping Bag
                            </h2>
                            <p>
                                Cookies are small files saved on your phone or
                                computer. We only use basic cookies to make
                                shopping convenient for you:
                            </p>
                            <ul className="space-y-1.5 list-disc pl-4 text-neutral-600">
                                <li>
                                    Remembering items you added to your bag so
                                    they don't vanish when you click between
                                    pages.
                                </li>
                                <li>
                                    Keeping you logged in so you don't have to
                                    enter your password every time you visit.
                                </li>
                                <li>
                                    Saving your favorite items on your wishlist.
                                </li>
                            </ul>
                        </section>

                        {/* Section 7 */}
                        <section id="rights" className="space-y-3 scroll-mt-28">
                            <h2 className="text-lg font-display font-medium text-neutral-950 border-b border-neutral-200 pb-2">
                                7. Your Rights & Deleting Your Data
                            </h2>
                            <p>
                                You are in complete control of your data at all
                                times:
                            </p>
                            <div className="space-y-2 text-neutral-600">
                                <p>
                                    &bull;{" "}
                                    <strong className="text-neutral-900 font-medium">
                                        View Your Info:
                                    </strong>{" "}
                                    You can log into your account anytime to
                                    view past orders, receipts, and saved
                                    addresses.
                                </p>
                                <p>
                                    &bull;{" "}
                                    <strong className="text-neutral-900 font-medium">
                                        Delete Your Account:
                                    </strong>{" "}
                                    If you ever want your account or information
                                    permanently deleted from our store, simply
                                    send an email to{" "}
                                    <a
                                        href="mailto:care@lune.in"
                                        className="underline text-neutral-900 font-medium"
                                    >
                                        care@lune.in
                                    </a>{" "}
                                    and we will delete it within 48 hours.
                                </p>
                            </div>
                        </section>

                        {/* Section 8 */}
                        <section
                            id="contact"
                            className="space-y-3 scroll-mt-28"
                        >
                            <h2 className="text-lg font-display font-medium text-neutral-950 border-b border-neutral-200 pb-2">
                                8. How to Contact Us
                            </h2>
                            <p>
                                If you have any questions about this privacy
                                policy or your orders, our team is always here
                                for you:
                            </p>

                            <div className="p-6 bg-neutral-50 border border-neutral-200 space-y-3 text-xs">
                                <div className="flex items-center space-x-2 text-neutral-950 font-semibold font-display uppercase tracking-wider text-[11px]">
                                    <ShieldCheck size={16} />
                                    <span>Customer Support & Privacy Desk</span>
                                </div>
                                <p className="text-neutral-600">
                                    LUNE
                                    <br />
                                    Email: care@lune.in
                                    <br />
                                    Phone: +91 (022) 4982-0190 (Mon &ndash; Sat,
                                    10:00 AM &ndash; 7:00 PM IST)
                                    <br />
                                    WhatsApp: +91 98765 43210
                                </p>

                                <div className="pt-2 flex items-center gap-4">
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-1.5 text-neutral-950 font-semibold uppercase tracking-wider text-[11px] font-display hover:underline"
                                    >
                                        <span>Contact Support</span>
                                        <ArrowRight size={12} />
                                    </Link>
                                    <span>&bull;</span>
                                    <Link
                                        href="/track-order"
                                        className="inline-flex items-center gap-1.5 text-neutral-950 font-semibold uppercase tracking-wider text-[11px] font-display hover:underline"
                                    >
                                        <span>Track an Order</span>
                                        <ArrowRight size={12} />
                                    </Link>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
