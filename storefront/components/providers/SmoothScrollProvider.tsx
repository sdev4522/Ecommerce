"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

interface SmoothScrollContextValue {
    lenis: Lenis | null;
    scrollTo: (target: string | HTMLElement | number, options?: Record<string, unknown>) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
    lenis: null,
    scrollTo: () => { },
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export default function SmoothScrollProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const lenisRef = useRef<Lenis | null>(null);
    const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        // Check for prefers-reduced-motion
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) {
            return;
        }

        // Initialize single Lenis instance
        const lenis = new Lenis({
            duration: 1.1,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 0.95,
            touchMultiplier: 1.5,
            syncTouch: false, // Preserves natural native iOS/Android touch inertia
            infinite: false,
            autoRaf: false,
        });

        lenisRef.current = lenis;
        setLenisInstance(lenis);

        // Render animation frame loop
        let rafId: number;
        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);

        // Observer for body scroll locking (Radix UI Sheet, Dialog, Drawer)
        const observer = new MutationObserver(() => {
            const isLocked =
                document.body.hasAttribute("data-scroll-locked") ||
                document.body.style.overflow === "hidden" ||
                document.documentElement.style.overflow === "hidden";

            if (isLocked) {
                lenis.stop();
            } else {
                lenis.start();
            }
        });

        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ["style", "data-scroll-locked", "class"],
        });

        // Cleanup on unmount
        return () => {
            cancelAnimationFrame(rafId);
            observer.disconnect();
            lenis.destroy();
            lenisRef.current = null;
            setLenisInstance(null);
        };
    }, []);

    // Scroll to top or anchor on route change without jarring jumps
    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    const scrollTo = (
        target: string | HTMLElement | number,
        options?: Record<string, unknown>
    ) => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(target, options);
        } else if (typeof target === "number") {
            window.scrollTo({ top: target, behavior: "smooth" });
        } else if (typeof target === "string") {
            const el = document.querySelector(target);
            el?.scrollIntoView({ behavior: "smooth" });
        } else if (target instanceof HTMLElement) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <SmoothScrollContext.Provider value={{ lenis: lenisInstance, scrollTo }}>
            {children}
        </SmoothScrollContext.Provider>
    );
}
