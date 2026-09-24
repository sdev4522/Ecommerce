import type { Variants, Transition } from "motion/react";

/**
 * LUNE Luxury E-Commerce Motion Architecture
 * Principle: Restrained, cinematic, intentional, hardware-accelerated.
 * Only transforms, opacity, and clip-paths. Zero layout-triggering properties.
 */

// Luxury Easing Curves
export const EASINGS = {
    // Cinematic editorial deceleration - used for headlines, hero arrivals, large imagery
    editorial: [0.19, 1, 0.22, 1] as const,
    // Smooth luxury settle - used for cards, sheets, dialogs
    luxury: [0.16, 1, 0.3, 1] as const,
    // Gentle natural transition - used for hovers, tabs, toggles
    gentle: [0.25, 0.1, 0.25, 1] as const,
    // Tactile micro-press feedback
    tactile: [0.34, 1.56, 0.64, 1] as const,
};

// Standard Motion Durations (in seconds)
export const DURATIONS = {
    instant: 0.15,
    fast: 0.22,
    normal: 0.38,
    editorial: 0.65,
    cinematic: 0.85,
};

// Standard Transitions
export const TRANSITIONS = {
    fast: { duration: DURATIONS.fast, ease: EASINGS.gentle } as Transition,
    normal: { duration: DURATIONS.normal, ease: EASINGS.luxury } as Transition,
    editorial: { duration: DURATIONS.editorial, ease: EASINGS.editorial } as Transition,
    cinematic: { duration: DURATIONS.cinematic, ease: EASINGS.editorial } as Transition,
};

// Reusable Motion Variants
export const fadeInVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: TRANSITIONS.normal,
    },
    exit: {
        opacity: 0,
        transition: TRANSITIONS.fast,
    },
};

export const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: TRANSITIONS.editorial,
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: TRANSITIONS.fast,
    },
};

export const fadeDownVariants: Variants = {
    hidden: { opacity: 0, y: -16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: TRANSITIONS.editorial,
    },
    exit: {
        opacity: 0,
        y: 8,
        transition: TRANSITIONS.fast,
    },
};

export const scaleInVariants: Variants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: TRANSITIONS.normal,
    },
    exit: {
        opacity: 0,
        scale: 0.98,
        transition: TRANSITIONS.fast,
    },
};

export const imageRevealVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 1.04,
        clipPath: "inset(0% 0% 10% 0%)",
    },
    visible: {
        opacity: 1,
        scale: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        transition: {
            duration: DURATIONS.editorial,
            ease: EASINGS.editorial,
        },
    },
};

export const staggerContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0.04,
        },
    },
};

export const modalVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.97,
        y: 8,
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: DURATIONS.normal,
            ease: EASINGS.luxury,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.98,
        y: 6,
        transition: {
            duration: DURATIONS.fast,
            ease: EASINGS.gentle,
        },
    },
};

export const drawerVariants: Variants = {
    hidden: { x: "100%" },
    visible: {
        x: 0,
        transition: {
            duration: DURATIONS.normal,
            ease: EASINGS.editorial,
        },
    },
    exit: {
        x: "100%",
        transition: {
            duration: DURATIONS.fast,
            ease: EASINGS.gentle,
        },
    },
};

export const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: DURATIONS.fast },
    },
    exit: {
        opacity: 0,
        transition: { duration: DURATIONS.fast },
    },
};

export const pageTransitionVariants: Variants = {
    hidden: { opacity: 0, y: 6 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: DURATIONS.normal,
            ease: EASINGS.luxury,
        },
    },
    exit: {
        opacity: 0,
        y: -4,
        transition: {
            duration: DURATIONS.fast,
            ease: EASINGS.gentle,
        },
    },
};
