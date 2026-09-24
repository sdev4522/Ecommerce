import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { getCMSPageBySlug, getSiteSettings } from "@/lib/site-config";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const page = await getCMSPageBySlug(slug);
    const siteSettings = await getSiteSettings();

    if (!page) {
        return {
            title: "Page Not Found",
        };
    }

    const title = page.seo?.title || page.name;
    const description = page.seo?.description || page.description || "";
    const ogImage = page.seo?.image || page.image || siteSettings.seo?.seo_og_image || undefined;

    return {
        title: `${title} | ${siteSettings.site_title}`,
        description,
        openGraph: {
            title,
            description,
            images: ogImage ? [{ url: ogImage }] : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ogImage ? [ogImage] : undefined,
        },
    };
}

export default async function DynamicCMSPage({ params }: PageProps) {
    const { slug } = await params;
    const page = await getCMSPageBySlug(slug);

    if (!page) {
        notFound();
    }

    return (
        <div className="w-full bg-white min-h-[60vh] pb-20">
            {/* Breadcrumb Header */}
            <div className="border-b border-neutral-100 bg-neutral-50/60 py-4">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav
                        aria-label="Breadcrumb"
                        className="flex items-center space-x-2 text-xs text-neutral-500 font-light"
                    >
                        <Link
                            href="/"
                            className="hover:text-black transition-colors"
                        >
                            Home
                        </Link>
                        <ChevronRight size={12} />
                        <span className="text-neutral-400">Pages</span>
                        <ChevronRight size={12} />
                        <span className="text-neutral-900 font-medium truncate">
                            {page.name}
                        </span>
                    </nav>
                </div>
            </div>

            {/* Page Header */}
            <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 text-center sm:text-left">
                <span className="text-[10px] uppercase tracking-[0.28em] font-semibold text-neutral-400 font-display block mb-2">
                    Official Document
                </span>
                <h1 className="text-3xl sm:text-5xl font-display font-medium text-neutral-950 tracking-tight">
                    {page.name}
                </h1>
                {page.description && (
                    <p className="mt-3 text-sm sm:text-base text-neutral-600 font-light max-w-2xl leading-relaxed">
                        {page.description}
                    </p>
                )}
            </header>

            {/* Page HTML Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <article
                    className="prose prose-neutral max-w-none text-neutral-700 text-sm sm:text-base leading-relaxed space-y-4 font-light [&>p]:mb-4 [&>h2]:font-display [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-neutral-900 [&>h3]:font-display [&>h3]:text-xl [&>h3]:text-neutral-900 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5 [&>a]:text-neutral-950 [&>a]:underline [&>blockquote]:border-l-2 [&>blockquote]:border-neutral-900 [&>blockquote]:pl-4 [&>blockquote]:italic"
                    dangerouslySetInnerHTML={{ __html: page.content }}
                />
            </main>
        </div>
    );
}
