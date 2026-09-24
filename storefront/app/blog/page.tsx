import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Feather } from "lucide-react";
import { getBlogPosts, getBlogCategories } from "../../lib/botble";
import BlogListClient from "../../components/blog/BlogListClient";

export const metadata: Metadata = {
    title: "The Journal — LUNE ATELIER",
    description:
        "Curated chronicles on craftsmanship, contemporary silhouette, fabric provenance, and women’s style.",
    openGraph: {
        title: "The Journal — LUNE ATELIER",
        description:
            "Curated chronicles on craftsmanship, contemporary silhouette, and women’s style.",
    },
};

export const revalidate = 30;

export default async function BlogPage() {
    const [postsData, categories] = await Promise.all([
        getBlogPosts({ per_page: 30 }),
        getBlogCategories(),
    ]);

    return (
        <div className="min-h-screen bg-white text-neutral-900 pb-24">
            {/* Header Banner */}
            <div className="border-b border-neutral-200 bg-neutral-50/70 pt-8 pb-12">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="flex items-center space-x-2 text-xs text-neutral-400 mb-6 font-light">
                        <Link
                            href="/"
                            className="hover:text-neutral-900 transition-colors"
                        >
                            Home
                        </Link>
                        <ChevronRight size={12} />
                        <span className="text-neutral-900 font-medium">
                            The Journal
                        </span>
                    </nav>

                    <div className="max-w-3xl space-y-3">
                        <div className="flex items-center gap-2 text-neutral-500">
                            <Feather size={14} className="text-neutral-900" />
                            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold font-display">
                                LUNE Journal
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-neutral-950 tracking-tight">
                            The Journal
                        </h1>
                        <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                            Curated essays on craftsmanship, fabric provenance,
                            architectural drape, and modern lifestyle from our
                            studios in Paris and Tokyo.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-10">
                <BlogListClient
                    initialPosts={postsData.posts}
                    categories={categories}
                />
            </main>
        </div>
    );
}
