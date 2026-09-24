"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
    ShoppingBag,
    Heart,
    Search,
    X,
    User,
    LogOut,
    Package,
    Layers,
    Sparkles,
    MessageCircle,
    MapPin,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCartStore } from "../../store/useCartStore";
import { useWishlistStore } from "../../store/useWishlistStore";
import { useAuthStore } from "../../store/useAuthStore";
import { useMenuStore } from "../../store/useMenuStore";
import { Badge } from "../ui/badge";
import { Sheet, SheetContent } from "../ui/sheet";
import { toast } from "sonner";
import type { SiteSettings, MenuItem } from "@/lib/site-config";
import Image from "next/image";
import SearchOverlay from "./SearchOverlay";

interface NavbarProps {
    siteSettings?: SiteSettings;
    menuItems?: MenuItem[];
}

export default function Navbar({ siteSettings, menuItems }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const { isOpen: offcanvasOpen, openMenu, closeMenu } = useMenuStore();
    const setOffcanvasOpen = (val: boolean) => (val ? openMenu() : closeMenu());
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { openCart, getTotalItems } = useCartStore();
    const { getTotalItems: getWishlistCount } = useWishlistStore();
    const { isAuthenticated, customer, openAuthModal, logout } = useAuthStore();

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close offcanvas on Esc key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOffcanvasOpen(false);
                setSearchOpen(false);
            }
        };
        if (offcanvasOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [offcanvasOpen]);

    // Click outside to close user dropdown
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setAccountDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const totalCartItems = mounted ? getTotalItems() : 0;
    const totalWishlistItems = mounted ? getWishlistCount() : 0;
    const isUserLoggedIn = mounted ? isAuthenticated : false;

    const categories = [
        {
            name: "Shop All Essentials",
            href: "/shop",
            count: "Curated edit",
            badge: "New",
        },
        {
            name: "Dresses & Sets",
            href: "/collections/dresses",
            count: "Soft tailoring",
            badge: "Bestseller",
        },
        {
            name: "Knitwear",
            href: "/collections/knitwear",
            count: "Warm layers",
            badge: "New Drop",
        },
        {
            name: "Tailored Trousers",
            href: "/collections/trousers",
            count: "Elevated basics",
            badge: "Limited",
        },
        {
            name: "Outerwear",
            href: "/collections/outerwear",
            count: "City layers",
            badge: "Capsule",
        },
    ];

    const editorialLinks = [
        { name: "The Journal", href: "/blog" },
        { name: "2026 Lookbook", href: "/#lookbook" },
        { name: "Our Design Ethos", href: "/about" },
    ];

    const serviceLinks = [
        { name: "Track Your Order", href: "/track-order" },
        { name: "Styling Help", href: "/contact" },
        { name: "Size Guide", href: "/about" },
        { name: "Privacy Policy", href: "/privacy" },
    ];

    const handleLogout = () => {
        logout();
        setAccountDropdownOpen(false);
        toast.info("Signed out of LUNE.");
    };

    return (
        <>
            <header
                className={`sticky top-0 z-40 w-full transition-all duration-300 backdrop-blur-md ${
                    isScrolled
                        ? "bg-white/95 border-b border-neutral-200/80 py-2.5 sm:py-3 shadow-[0_4px_20px_-4px_rgba(45,33,29,0.06)]"
                        : "bg-white/80 border-b border-neutral-200/40 py-3.5 sm:py-4.5"
                }`}
            >
                <div className="w-full px-3 sm:px-6 lg:px-10 flex items-center justify-between relative">
                    {/* LEFT: Menu Trigger (Left Offcanvas) + Quick Search */}
                    <div className="flex items-center space-x-1.5 sm:space-x-4 z-10 shrink-0">
                        {/* Left Offcanvas Hamburger Button */}
                        <button
                            type="button"
                            onClick={openMenu}
                            className="group flex items-center space-x-2 p-2 -ml-1 text-neutral-900 hover:text-black cursor-pointer transition-colors relative z-20 touch-manipulation"
                            aria-label="Open Navigation Menu"
                        >
                            <div className="flex flex-col justify-center space-y-1 w-5">
                                <span className="block h-[1.5px] w-5 bg-neutral-900 transition-all group-hover:w-3.5" />
                                <span className="block h-[1.5px] w-3.5 bg-neutral-900 transition-all group-hover:w-5" />
                                <span className="block h-[1.5px] w-5 bg-neutral-900 transition-all group-hover:w-3" />
                            </div>
                            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] hidden sm:inline-block font-display">
                                Menu
                            </span>
                        </button>

                        {/* Search Trigger */}
                        <button
                            type="button"
                            onClick={() => setSearchOpen(!searchOpen)}
                            className="p-1.5 text-neutral-700 hover:text-black transition-colors cursor-pointer touch-manipulation"
                            aria-label="Search Collection"
                        >
                            <Search size={18} strokeWidth={1.75} />
                        </button>

                        {/* Top-level Menu Links on Extra Large Screens */}
                        {menuItems && menuItems.length > 0 && (
                            <nav className="hidden xl:flex items-center space-x-5 pl-2">
                                {menuItems.slice(0, 4).map((item) => (
                                    <Link
                                        key={item.id}
                                        href={item.url || "/"}
                                        target={item.target || "_self"}
                                        className="text-[11px] uppercase tracking-[0.18em] font-semibold text-neutral-700 hover:text-black transition-colors whitespace-nowrap"
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                            </nav>
                        )}
                    </div>

                    {/* CENTER: Strictly Mathematically Centered Luxury Brand Logo (Responsive on Mobile) */}
                    <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center text-center pointer-events-none max-w-[55%] sm:max-w-none">
                        <Link
                            href="/"
                            className="group flex flex-col items-center pointer-events-auto"
                        >
                            {siteSettings?.logo ? (
                                <div className="relative h-6 min-[380px]:h-7 sm:h-9 w-28 sm:w-36 flex items-center justify-center">
                                    <Image
                                        src={siteSettings.logo}
                                        alt={siteSettings.site_title || "Logo"}
                                        fill
                                        className="object-contain"
                                        priority
                                        sizes="(max-width: 640px) 112px, 144px"
                                    />
                                </div>
                            ) : (
                                <>
                                    <span className="text-[12.5px] min-[380px]:text-[13.5px] sm:text-lg lg:text-2xl font-display tracking-[0.12em] min-[380px]:tracking-[0.15em] sm:tracking-[0.25em] font-semibold text-neutral-950 group-hover:text-black transition-all whitespace-nowrap">
                                        {siteSettings?.site_title
                                            ? siteSettings.site_title.split("-")[0].trim()
                                            : "LUNE"}
                                    </span>
                                    <span className="text-[7px] sm:text-[8.5px] tracking-[0.25em] sm:tracking-[0.38em] text-neutral-400 uppercase -mt-0.5 whitespace-nowrap">
                                        WOMEN&apos;S EDIT
                                    </span>
                                </>
                            )}
                        </Link>
                    </div>

                    {/* RIGHT: Wishlist, Account, Cart */}
                    <div className="flex items-center space-x-1 sm:space-x-4 z-20 shrink-0 relative overflow-visible">
                        {/* Wishlist Link (Hidden on smallest mobile to prevent header clutter) */}
                        <Link
                            href="/wishlist"
                            className="relative p-1.5 text-neutral-700 hover:text-black transition-colors hidden sm:block"
                            aria-label="Wishlist"
                        >
                            <Heart size={18} strokeWidth={1.75} />
                            {totalWishlistItems > 0 && (
                                <span className="absolute top-0.5 right-0.5 bg-black text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-medium">
                                    {totalWishlistItems}
                                </span>
                            )}
                        </Link>

                        {/* Customer Account Button & Dropdown */}
                        <div
                            className="relative hidden sm:block group"
                            ref={dropdownRef}
                            onMouseEnter={() => {
                                if (isUserLoggedIn)
                                    setAccountDropdownOpen(true);
                            }}
                            onMouseLeave={() => {
                                setAccountDropdownOpen(false);
                            }}
                        >
                            {isUserLoggedIn ? (
                                <Link
                                    href="/account?tab=profile"
                                    onClick={() =>
                                        setAccountDropdownOpen(false)
                                    }
                                    className="p-1.5 text-neutral-700 hover:text-black transition-colors flex items-center gap-1.5 cursor-pointer"
                                    aria-label="Customer Profile"
                                >
                                    <div className="relative">
                                        <User size={18} strokeWidth={1.75} />
                                        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                                    </div>
                                    <span className="text-xs font-medium max-w-[80px] truncate hidden md:inline-block">
                                        {customer?.name.split(" ")[0]}
                                    </span>
                                </Link>
                            ) : (
                                <button
                                    onClick={() => openAuthModal("login")}
                                    className="p-1.5 text-neutral-700 hover:text-black transition-colors flex items-center gap-1.5 cursor-pointer"
                                    aria-label="Sign In"
                                >
                                    <div className="relative">
                                        <User size={18} strokeWidth={1.75} />
                                    </div>
                                </button>
                            )}

                            {/* Authenticated Customer Dropdown with invisible bridge */}
                            {isUserLoggedIn && accountDropdownOpen && (
                                <div className="absolute right-0 top-full pt-2 z-50 animate-fade-in">
                                    <div className="w-60 bg-white shadow-2xl border border-neutral-200 py-2 rounded-lg">
                                        <div className="px-4 py-2.5 border-b border-neutral-100">
                                            <p className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold font-mono">
                                                Signed In As
                                            </p>
                                            <p className="text-xs font-semibold text-neutral-900 truncate">
                                                {customer?.name}
                                            </p>
                                            <p className="text-[11px] text-neutral-500 truncate font-mono">
                                                {customer?.email}
                                            </p>
                                        </div>

                                        <div className="py-1">
                                            <Link
                                                href="/account?tab=profile"
                                                onClick={() =>
                                                    setAccountDropdownOpen(
                                                        false,
                                                    )
                                                }
                                                className="flex items-center gap-2.5 px-4 py-2 text-xs text-neutral-700 hover:bg-neutral-50 hover:text-black transition-colors"
                                            >
                                                <User size={14} />
                                                <span>Account Profile</span>
                                            </Link>

                                            <Link
                                                href="/account?tab=orders"
                                                onClick={() =>
                                                    setAccountDropdownOpen(
                                                        false,
                                                    )
                                                }
                                                className="flex items-center gap-2.5 px-4 py-2 text-xs text-neutral-700 hover:bg-neutral-50 hover:text-black transition-colors"
                                            >
                                                <Package size={14} />
                                                <span>
                                                    My Orders & Tracking
                                                </span>
                                            </Link>

                                            <Link
                                                href="/account?tab=addresses"
                                                onClick={() =>
                                                    setAccountDropdownOpen(
                                                        false,
                                                    )
                                                }
                                                className="flex items-center gap-2.5 px-4 py-2 text-xs text-neutral-700 hover:bg-neutral-50 hover:text-black transition-colors"
                                            >
                                                <MapPin size={14} />
                                                <span>Saved Addresses</span>
                                            </Link>

                                            <Link
                                                href="/wishlist"
                                                onClick={() =>
                                                    setAccountDropdownOpen(
                                                        false,
                                                    )
                                                }
                                                className="flex items-center gap-2.5 px-4 py-2 text-xs text-neutral-700 hover:bg-neutral-50 hover:text-black transition-colors"
                                            >
                                                <Heart size={14} />
                                                <span>
                                                    Saved Items (
                                                    {totalWishlistItems})
                                                </span>
                                            </Link>
                                        </div>

                                        <div className="pt-1 border-t border-neutral-100">
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer font-medium"
                                            >
                                                <LogOut size={14} />
                                                <span>Sign Out</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Shopping Cart Button */}
                        <button
                            type="button"
                            onClick={openCart}
                            className="relative p-1.5 text-neutral-900 hover:text-black transition-colors flex items-center space-x-1 cursor-pointer touch-manipulation"
                            aria-label="Shopping Bag"
                        >
                            <ShoppingBag size={19} strokeWidth={1.75} />
                            {totalCartItems > 0 && (
                                <span className="bg-neutral-950 text-white text-[9.5px] font-semibold min-w-[17px] h-[17px] px-1 rounded-full flex items-center justify-center">
                                    {totalCartItems}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

            </header>

            {/* Premium Full-Screen Search Experience */}
            <SearchOverlay
                isOpen={searchOpen}
                onClose={() => setSearchOpen(false)}
            />

            {/* ====================================================================
          LEFT OFFCANVAS LUXURY NAVIGATION DRAWER
          ==================================================================== */}
            <AnimatePresence>
                {offcanvasOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="fixed inset-0 z-50 pointer-events-auto"
                    >
                        {/* Backdrop */}
                        <div
                            onClick={closeMenu}
                            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
                        />

                        {/* Offcanvas Drawer Panel */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="absolute inset-y-0 left-0 w-[85vw] max-w-[340px] sm:max-w-md bg-white shadow-2xl flex flex-col justify-between overflow-y-auto z-10 border-r border-neutral-200"
                        >
                    {/* Header */}
                    <div className="p-5 sm:p-6 border-b border-neutral-100 flex items-center justify-between">
                        <div>
                            <span className="text-base font-display tracking-[0.24em] font-semibold text-neutral-950 block">
                                {siteSettings?.site_title
                                    ? siteSettings.site_title.split("-")[0].trim()
                                    : "LUNE ATELIER"}
                            </span>
                            <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-400">
                                Women&apos;s Edit
                            </span>
                        </div>

                        <button
                            onClick={closeMenu}
                            className="p-2 text-neutral-400 hover:text-black transition-colors rounded-full hover:bg-neutral-100 cursor-pointer"
                            aria-label="Close navigation"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Categories & Collections List */}
                    <div className="p-5 sm:p-6 flex-1 space-y-8">
                        {/* Dynamic Navigation Menu from Botble CMS */}
                        {menuItems && menuItems.length > 0 && (
                            <div>
                                <div className="flex items-center gap-1.5 mb-3">
                                    <Layers
                                        size={12}
                                        className="text-neutral-950"
                                    />
                                    <span className="text-[10px] uppercase tracking-[0.28em] font-semibold text-neutral-400 font-display">
                                        Navigation Menu
                                    </span>
                                </div>

                                <div className="divide-y divide-neutral-100">
                                    {menuItems.map((item) => (
                                        <div key={item.id} className="py-2.5">
                                            <Link
                                                href={item.url || "/"}
                                                onClick={closeMenu}
                                                target={item.target || "_self"}
                                                className="group flex items-center justify-between text-sm text-neutral-900 hover:text-black transition-colors"
                                            >
                                                <span className="font-medium tracking-tight group-hover:translate-x-1.5 transition-transform">
                                                    {item.title}
                                                </span>
                                                {item.children && item.children.length > 0 && (
                                                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-neutral-100 text-neutral-500 rounded-xs">
                                                        {item.children.length}
                                                    </span>
                                                )}
                                            </Link>
                                            {item.children && item.children.length > 0 && (
                                                <div className="pl-3.5 mt-1.5 space-y-1.5 border-l border-neutral-200">
                                                    {item.children.map((child) => (
                                                        <Link
                                                            key={child.id}
                                                            href={child.url || "/"}
                                                            onClick={closeMenu}
                                                            target={child.target || "_self"}
                                                            className="block py-0.5 text-xs text-neutral-600 hover:text-black transition-colors"
                                                        >
                                                            {child.title}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Category Silhouettes */}
                        <div>
                            <div className="flex items-center gap-1.5 mb-3">
                                <Layers
                                    size={12}
                                    className="text-neutral-950"
                                />
                                <span className="text-[10px] uppercase tracking-[0.28em] font-semibold text-neutral-400 font-display">
                                    Shop By Category
                                </span>
                            </div>

                            <div className="divide-y divide-neutral-100">
                                {categories.map((cat) => (
                                    <Link
                                        key={cat.name}
                                        href={cat.href}
                                        onClick={closeMenu}
                                        className="group py-3.5 flex items-center justify-between text-sm text-neutral-900 hover:text-black transition-colors"
                                    >
                                        <div className="flex items-baseline gap-2.5">
                                            <span className="font-medium tracking-tight group-hover:translate-x-1.5 transition-transform">
                                                {cat.name}
                                            </span>
                                            <span className="text-[11px] text-neutral-400 font-normal">
                                                ({cat.count})
                                            </span>
                                        </div>

                                        {cat.badge && (
                                            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-neutral-100 text-neutral-600 group-hover:bg-neutral-950 group-hover:text-white transition-colors">
                                                {cat.badge}
                                            </span>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Editorial Stories */}
                        <div>
                            <div className="flex items-center gap-1.5 mb-3">
                                <Sparkles
                                    size={12}
                                    className="text-neutral-950"
                                />
                                <span className="text-[10px] uppercase tracking-[0.28em] font-semibold text-neutral-400 font-display">
                                    Editorials &amp; Circle
                                </span>
                            </div>

                            <div className="space-y-2">
                                {editorialLinks.map((ed) => (
                                    <Link
                                        key={ed.name}
                                        href={ed.href}
                                        onClick={closeMenu}
                                        className="block py-1.5 text-xs text-neutral-600 hover:text-black font-light hover:underline underline-offset-4"
                                    >
                                        {ed.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Client Services & Pages */}
                        <div>
                            <div className="flex items-center gap-1.5 mb-3">
                                <span className="text-[10px] uppercase tracking-[0.28em] font-semibold text-neutral-400 font-display">
                                    Help &amp; Quick Links
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                {serviceLinks.map((srv) => (
                                    <Link
                                        key={srv.name}
                                        href={srv.href}
                                        onClick={closeMenu}
                                        className="block p-2 text-xs text-neutral-700 bg-neutral-50 hover:bg-neutral-900 hover:text-white transition-colors border border-neutral-200/60 font-medium"
                                    >
                                        {srv.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Curated Service Card */}
                        <div className="bg-neutral-50 p-4 border border-neutral-200/60 space-y-2">
                            <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold block font-display">
                                Need Sizing Guidance?
                            </span>
                            <p className="text-xs text-neutral-600 font-light leading-relaxed">
                                Connect with our team for size and fit guidance on any piece.
                            </p>
                            <a
                                href="https://wa.me/919876543210?text=Hello%20LUNE%2C%20I'd%20like%20sizing%20help"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-semibold text-neutral-900 underline block pt-1 hover:text-black"
                            >
                                <span>
                                    Chat on WhatsApp &bull; Mon–Sat, 10 AM–7 PM
                                </span>
                            </a>
                        </div>
                    </div>

                    {/* Offcanvas Footer: Account & Settings */}
                    <div className="p-5 sm:p-6 border-t border-neutral-100 bg-neutral-50/70 space-y-3">
                        {!isUserLoggedIn ? (
                            <button
                                onClick={() => {
                                    closeMenu();
                                    openAuthModal("login");
                                }}
                                className="w-full flex items-center justify-between text-xs text-neutral-800 hover:text-black font-medium py-1.5 cursor-pointer"
                            >
                                <div className="flex items-center space-x-2.5">
                                    <User size={16} />
                                    <span>Sign In / Register to Circle</span>
                                </div>
                            </button>
                        ) : (
                            <div className="space-y-2 border-b border-neutral-200/60 pb-3 mb-1">
                                <div className="flex items-center justify-between text-xs text-neutral-900 font-medium py-1">
                                    <span className="font-semibold truncate max-w-[170px]">
                                        {customer?.name}
                                    </span>
                                    <button
                                        onClick={() => {
                                            closeMenu();
                                            handleLogout();
                                        }}
                                        className="text-[11px] text-red-600 font-semibold cursor-pointer"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                                <Link
                                    href="/account?tab=orders"
                                    onClick={closeMenu}
                                    className="flex items-center gap-2 text-xs text-neutral-600 hover:text-black py-1"
                                >
                                    <Package size={14} />
                                    <span>My Orders</span>
                                </Link>
                                <Link
                                    href="/account?tab=profile"
                                    onClick={closeMenu}
                                    className="flex items-center gap-2 text-xs text-neutral-600 hover:text-black py-1"
                                >
                                    <User size={14} />
                                    <span>Account Profile</span>
                                </Link>
                                <Link
                                    href="/account?tab=addresses"
                                    onClick={closeMenu}
                                    className="flex items-center gap-2 text-xs text-neutral-600 hover:text-black py-1"
                                >
                                    <MapPin size={14} />
                                    <span>Saved Addresses</span>
                                </Link>
                            </div>
                        )}

                        <Link
                            href="/wishlist"
                            onClick={closeMenu}
                            className="flex items-center justify-between text-xs text-neutral-800 hover:text-black font-medium py-1.5"
                        >
                            <div className="flex items-center space-x-2.5">
                                <Heart size={16} />
                                <span>Saved Items Matrix</span>
                            </div>
                            <span className="bg-neutral-200 px-2 py-0.5 rounded-full text-[10px] font-bold">
                                {totalWishlistItems}
                            </span>
                        </Link>
                    </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
