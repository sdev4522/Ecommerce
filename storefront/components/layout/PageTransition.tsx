"use client";

import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { pageTransitionVariants } from "@/lib/motion";

export default function PageTransition({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const prefersReducedMotion = useReducedMotion();

    if (prefersReducedMotion) {
        return <>{children}</>;
    }

    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                key={pathname}
                initial="hidden"
                animate="visible"
                variants={pageTransitionVariants}
                className="w-full flex-1 flex flex-col"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
