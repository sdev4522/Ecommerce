import type { Metadata } from "next";
import { Inter, Manrope, Montserrat } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "../components/layout/AnnouncementBar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import MobileBottomNav from "../components/layout/MobileBottomNav";
import ClientOverlays from "../components/layout/ClientOverlays";
import TrackingScripts from "../components/analytics/TrackingScripts";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import { getSiteSettings, getMenuBySlug } from "@/lib/site-config";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
});

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
});

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-display",
    display: "swap",
});



const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSiteSettings();
    const siteTitle =
        settings.seo?.seo_title ||
        settings.site_title ||
        "LUNE";
    const description =
        settings.seo?.seo_description ||
        "Thoughtful women's fashion designed for everyday confidence and effortless styling.";
    const ogImage = settings.seo?.seo_og_image || undefined;
    const favicon = settings.favicon || "/favicon.ico";

    return {
        metadataBase: new URL(siteUrl),
        title: {
            default: siteTitle,
            template: `%s | ${siteTitle}`,
        },
        description,
        alternates: {
            canonical: '/',
        },
        keywords: [
            "women's fashion",
            "curated essentials",
            "dresses",
            "knitwear",
            "tailored trousers",
            "LUNE",
        ],
        icons: {
            icon: favicon,
            shortcut: favicon,
            apple: favicon,
        },
        openGraph: {
            title: siteTitle,
            description,
            images: ogImage ? [{ url: ogImage }] : undefined,
            siteName: siteTitle,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: siteTitle,
            description,
            images: ogImage ? [ogImage] : undefined,
        },
    };
}

import SmoothScrollProvider from "../components/providers/SmoothScrollProvider";
import PageTransition from "../components/layout/PageTransition";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [siteSettings, mainMenu, footerMenu] = await Promise.all([
        getSiteSettings(),
        getMenuBySlug("main-menu"),
        getMenuBySlug("information"),
    ]);

    const siteTitle = siteSettings.seo?.seo_title || siteSettings.site_title || "LUNE";
    const organizationJsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteTitle,
        url: siteUrl,
        logo: siteSettings.logo ? (siteSettings.logo.startsWith("http") ? siteSettings.logo : `${siteUrl}${siteSettings.logo}`) : `${siteUrl}/favicon.ico`,
        contactPoint: siteSettings.phone ? {
            "@type": "ContactPoint",
            telephone: siteSettings.phone,
            contactType: "customer service",
        } : undefined,
    };

    const websiteJsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteTitle,
        url: siteUrl,
        potentialAction: {
            "@type": "SearchAction",
            target: `${siteUrl}/shop?q={search_term_string}`,
            "query-input": "required name=search_term_string",
        },
    };

    return (
        <html
            lang="en"
            className={cn(inter.variable, manrope.variable, montserrat.variable, "font-sans")}
        >
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
                />
            </head>
            <body className="min-h-screen flex flex-col bg-[var(--theme-bg)] text-[var(--theme-text-primary)] font-sans antialiased selection:bg-[#b87c62] selection:text-white pb-14 lg:pb-0">
                <SmoothScrollProvider>
                    <TrackingScripts tracking={siteSettings.tracking} />
                    <Toaster
                        position="bottom-right"
                        richColors
                        closeButton
                        theme="light"
                    />
                    <AnnouncementBar
                        messages={siteSettings.header_messages}
                        phone={siteSettings.phone}
                        email={siteSettings.contact_email}
                    />
                    <Navbar siteSettings={siteSettings} menuItems={mainMenu} />
                    <main className="flex-1">
                        <PageTransition>{children}</PageTransition>
                    </main>
                    <Footer siteSettings={siteSettings} footerMenu={footerMenu} />
                    <MobileBottomNav />
                    <ClientOverlays />
                </SmoothScrollProvider>
            </body>
        </html>
    );
}

