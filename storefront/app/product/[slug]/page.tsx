import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailView from "../../../components/product/ProductDetailView";
import { getProductBySlug, getProducts } from "../../../lib/botble";

interface ProductPageProps {
    params: Promise<{
        slug: string;
    }>;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateMetadata({
    params,
}: ProductPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const product = await getProductBySlug(resolvedParams.slug);

    if (!product) {
        return {
            title: "Product Not Found — LUNE",
            robots: { index: false, follow: false },
        };
    }

    const cleanDescription = (product.description || product.name)
        .replace(/<[^>]*>/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 160);

    return {
        title: `${product.name} — LUNE ATELIER`,
        description: cleanDescription,
        alternates: {
            canonical: `/product/${product.slug}`,
        },
        openGraph: {
            title: `${product.name} — LUNE ATELIER`,
            description: cleanDescription,
            url: `${siteUrl}/product/${product.slug}`,
            type: "website",
            images: [
                {
                    url: product.image_url,
                    alt: product.name,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${product.name} — LUNE ATELIER`,
            description: cleanDescription,
            images: [product.image_url],
        },
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const resolvedParams = await params;
    const product = await getProductBySlug(resolvedParams.slug);

    if (!product) {
        notFound();
    }

    const cleanDescription = (product.description || product.name)
        .replace(/<[^>]*>/g, '')
        .replace(/\s+/g, ' ')
        .trim();

    const productJsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        image: product.images && product.images.length > 0 ? product.images : [product.image_url],
        description: cleanDescription,
        sku: product.sku || `SKU-${product.id}`,
        brand: {
            "@type": "Brand",
            name: "LUNE",
        },
        offers: {
            "@type": "Offer",
            url: `${siteUrl}/product/${product.slug}`,
            priceCurrency: "INR",
            price: product.price,
            availability:
                product.is_out_of_stock || product.quantity <= 0
                    ? "https://schema.org/OutOfStock"
                    : "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
        },
    };

    const allProducts = await getProducts({ per_page: 8 });
    const relatedProducts = allProducts.filter((p) => p.id !== product.id);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
            />
            <ProductDetailView
                product={product}
                relatedProducts={relatedProducts}
            />
        </>
    );
}
