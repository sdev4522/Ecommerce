"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const TRENDING_SEARCHES = [
    "Satin Midi Dress",
    "Tailored Trouser",
    "Soft Knit Set",
    "Relaxed Blazer",
    "Linen Shirt",
    "Maxi Dress",
];

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (isOpen) {
            const timeout = setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
            return () => clearTimeout(timeout);
        } else {
            setQuery("");
        }
    }, [isOpen]);

    // Handle Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    const handleSearch = (searchTerm: string) => {
        const trimmed = searchTerm.trim();
        if (!trimmed) return;
        onClose();
        router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSearch(query);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex flex-col justify-start">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-xs"
                    />

                    {/* Search Panel */}
                    <motion.div
                        initial={{ opacity: 0, y: -24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
                        className="relative z-10 w-full bg-white border-b border-neutral-200/80 shadow-2xl px-4 sm:px-8 lg:px-12 pt-8 pb-10"
                    >
                        <div className="max-w-3xl mx-auto">
                            {/* Top header row */}
                            <div className="flex items-center justify-between pb-6 mb-6 border-b border-neutral-100">
                                <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.24em] uppercase text-neutral-400 font-display">
                                    Search Collection
                                </span>
                                <button
                                    onClick={onClose}
                                    type="button"
                                    className="inline-flex items-center gap-1.5 text-xs tracking-wider uppercase text-neutral-500 hover:text-black transition-colors px-2 py-1 rounded-sm cursor-pointer"
                                    aria-label="Close search"
                                >
                                    <span>Close</span>
                                    <X size={15} />
                                </button>
                            </div>

                            {/* Search Input Form */}
                            <form onSubmit={onSubmit} className="relative flex items-center">
                                <Search
                                    size={22}
                                    className="text-neutral-400 mr-3.5 shrink-0"
                                />
                                <input
                                    ref={inputRef}
                                    type="search"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search pieces, fabrics, collections..."
                                    className="w-full text-lg sm:text-2xl font-light text-neutral-900 placeholder:text-neutral-400 bg-transparent outline-none tracking-tight font-sans"
                                />
                                {query.trim() && (
                                    <button
                                        type="submit"
                                        className="ml-3 px-4 py-2 bg-neutral-950 text-white rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
                                    >
                                        <span>Search</span>
                                        <ArrowRight size={13} />
                                    </button>
                                )}
                            </form>

                            {/* Trending / Suggested Searches */}
                            <div className="mt-8 pt-6 border-t border-neutral-100">
                                <div className="flex items-center gap-1.5 mb-3">
                                    <Sparkles size={12} className="text-[#b87c62]" />
                                    <span className="text-[10px] uppercase tracking-[0.22em] font-semibold text-neutral-400 font-display">
                                        Popular Searches
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {TRENDING_SEARCHES.map((item) => (
                                        <button
                                            key={item}
                                            type="button"
                                            onClick={() => handleSearch(item)}
                                            className="px-3 py-1.5 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/60 rounded-full text-xs text-neutral-700 hover:text-neutral-950 transition-colors cursor-pointer"
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
