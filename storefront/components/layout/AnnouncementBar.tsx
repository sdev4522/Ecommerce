"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import type { HeaderMessage } from "@/lib/site-config";

interface AnnouncementBarProps {
    messages?: HeaderMessage[];
    phone?: string;
    email?: string;
}

export default function AnnouncementBar({
    messages,
    phone,
    email,
}: AnnouncementBarProps) {
    const [index, setIndex] = useState(0);

    const activeMessages = messages && messages.length > 0 ? messages : null;

    useEffect(() => {
        if (!activeMessages || activeMessages.length <= 1) return;
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % activeMessages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [activeMessages]);

    const currentMsg = activeMessages ? activeMessages[index] : null;

    return (
        <aside
            aria-label="Announcements"
            className="bg-[#111111] text-white text-[11px] tracking-widest uppercase font-medium py-2 px-4 sm:px-6 lg:px-10 border-b border-white/10"
        >
            <div className="w-full flex items-center justify-between">
                <div className="hidden md:flex items-center space-x-4 text-white/60">
                    {phone ? (
                        <a
                            href={`tel:${phone.split("/")[0].trim()}`}
                            className="hover:text-white transition-colors"
                        >
                            Hotline: {phone.split("/")[0].trim()}
                        </a>
                    ) : (
                        <>
                            <span>Express Delivery Across India</span>
                            <span>•</span>
                            <span>7-Day Easy Returns</span>
                        </>
                    )}
                </div>

                <div className="w-full md:w-auto text-center font-semibold tracking-wider text-white/90">
                    {currentMsg ? (
                        <span className="inline-flex items-center gap-2">
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: currentMsg.message,
                                }}
                            />
                            {currentMsg.link && currentMsg.link_text && (
                                <Link
                                    href={currentMsg.link}
                                    className="underline underline-offset-2 hover:text-white font-bold ml-1 transition-colors"
                                >
                                    {currentMsg.link_text}
                                </Link>
                            )}
                        </span>
                    ) : (
                        "Free express shipping on orders over ₹1,999"
                    )}
                </div>

                <div className="hidden md:flex items-center space-x-4 text-white/60">
                    {email ? (
                        <a
                            href={`mailto:${email}`}
                            className="hover:text-white transition-colors lowercase tracking-normal"
                        >
                            {email}
                        </a>
                    ) : (
                        <>
                            <span className="cursor-pointer hover:text-white transition-colors">
                                Currency: INR (₹)
                            </span>
                            <span>•</span>
                            <span className="cursor-pointer hover:text-white transition-colors">
                                Assistance
                            </span>
                        </>
                    )}
                </div>
            </div>
        </aside>
    );
}
