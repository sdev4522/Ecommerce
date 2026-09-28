"use client";

import React, { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { pageTransitionVariants } from "@/lib/motion";

export default function PageTransition({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const prefersReducedMotion = useReducedMotion();
    const isInitialMount = useRef(true);

    useEffect(() => {
        isInitialMount.current = false;
    }, []);

    if (prefersReducedMotion) {
        return <>{children}</>;
    }

    return (
        <motion.div
            key={pathname}
            initial={isInitialMount.current ? false : "hidden"}
            animate="visible"
            variants={pageTransitionVariants}
            className="w-full flex-1 flex flex-col"
        >
            {children}
        </motion.div>
    );
}
