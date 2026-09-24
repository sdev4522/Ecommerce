"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { fadeUpVariants, fadeInVariants, scaleInVariants } from "@/lib/motion";

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    variant?: "fadeUp" | "fadeIn" | "scaleIn";
    delay?: number;
    threshold?: number;
    as?: React.ElementType;
}

export default function ScrollReveal({
    children,
    className = "",
    variant = "fadeUp",
    delay = 0,
    threshold = 0.12,
}: ScrollRevealProps) {
    const prefersReducedMotion = useReducedMotion();

    const selectedVariants =
        variant === "fadeIn"
            ? fadeInVariants
            : variant === "scaleIn"
            ? scaleInVariants
            : fadeUpVariants;

    if (prefersReducedMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: threshold }}
            variants={selectedVariants}
            transition={{ delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
