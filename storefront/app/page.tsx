import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import dynamic from "next/dynamic";
import HeroSlider from "../components/home/HeroSlider";
import TrustFeatures from "../components/home/TrustFeatures";
import CategoryBanners from "../components/home/CategoryBanners";
import BestSellersSection from "../components/home/BestSellersSection";
import ProductCard from "../components/product/ProductCard";
import BrandValues from "../components/home/BrandValues";
import FAQSection from "../components/home/FAQSection";
import CommunityGallery from "../components/home/CommunityGallery";
import VIPNewsletter from "../components/home/VIPNewsletter";
import MarqueeTicker from "../components/home/MarqueeTicker";
import { getProducts, getCategories } from "../lib/botble";
import { getHeroSliders } from "../lib/site-config";
import BestSellersSlider from "@/components/home/bestSellerslider";
import ScrollReveal from "@/components/ui/ScrollReveal";

const CurvedLoop = dynamic(() => import("../components/ui/CurvedLoop"));
const Interactive3DShowcase = dynamic(
    () => import("../components/home/Interactive3DShowcase"),
);

const CIRCULAR_ITEMS = [
    {
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=85",
        text: "Floral Midi",
    },
    {
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=85",
        text: "Soft Tailoring",
    },
    {
        image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=85",
        text: "City Layers",
    },
    {
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=85",
        text: "Weekend Edit",
    },
    {
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=85",
        text: "Dreamy Knitwear",
    },
    {
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=85",
        text: "Night Out",
    },
    {
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=85",
        text: "Signature Denim",
    },
    {
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=85",
        text: "Modern Co-ords",
    },
];

export const revalidate = 30;

export default async function HomePage() {
    const [products, categories, heroSlides] = await Promise.all([
        getProducts({ per_page: 16 }),
        getCategories(),
        getHeroSliders("home-slider-1"),
    ]);

    return (
        <div className="w-full bg-white">
            <HeroSlider slides={heroSlides} />

            <CategoryBanners categories={categories} />

            {/* 4. Best Sellers & Customer Favorites Section */}
            <BestSellersSlider products={products} />

            {/* 5. Dynamic Curved Loop Ribbon (React Bits) */}
            <section className="relative w-full text-black py-5 sm:py-7 overflow-hidden select-none">
                <CurvedLoop
                    marqueeText="FREE EXPRESS DELIVERY ACROSS INDIA • 100% AUTHENTIC QUALITY GUARANTEED • EASY 7-DAY DOORSTEP RETURNS • CASH ON DELIVERY & INSTANT UPI • DEDICATED CUSTOMER SUPPORT • "
                    speed={1.6}
                    curveAmount={50}
                    direction="left"
                    interactive={true}
                    className="fill-black hover:fill-black transition-colors"
                />
            </section>

            <ScrollReveal threshold={0.1}>
                <section className="mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#eaded6]">
                        <div>
                            <span className="editorial-eyebrow block mb-1">
                                Trending Now
                            </span>
                            <h2 className="editorial-heading text-2xl sm:text-4xl">
                                The pieces women keep reaching for.
                            </h2>
                        </div>
                        <Link
                            href="/shop"
                            className="text-xs uppercase tracking-[0.18em] text-[#2d211d] hover:text-[#b87c62] font-semibold mt-3 sm:mt-0 inline-flex items-center gap-1.5 group font-display"
                        >
                            <span>Shop the edit</span>
                            <ArrowRight
                                size={14}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
                        {products.slice(0, 8).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>
            </ScrollReveal>

            {/* 7. Interactive 360° Showcase (React Bits Circular Gallery) */}
            <Interactive3DShowcase items={CIRCULAR_ITEMS} />

            {/* 8. Brand Values & Guarantees */}


            {/* 9. Frequently Asked Questions (FAQ Accordion) */}

            {/* 10. Customer Testimonials (Verified Reviews with Golden Stars) */}
            <ScrollReveal threshold={0.1}>
                <section className="mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-22 bg-[#ffffff] border-t border-[#eaded6]">
                    <div className="text-center max-w-xl mx-auto mb-12">
                        <span className="editorial-eyebrow block mb-1">
                            Client Love
                        </span>
                        <h2 className="editorial-heading text-2xl sm:text-4xl">
                            Women who wear the edit, wear it everywhere.
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        {[
                            {
                                quote: "The fit is incredible. I bought the ivory midi for work and styled it with a blazer the same day. Total confidence boost.",
                                author: "Aisha R. — Mumbai",
                                item: "Satin Midi Dress",
                            },
                            {
                                quote: "The knit set feels premium, breathable, and flattering without being too fitted. It looks expensive and wears like a dream.",
                                author: "Rhea S. — Bengaluru",
                                item: "Soft Knit Set",
                            },
                            {
                                quote: "The team helped me choose the right size and the fabric quality exceeded my expectations. I have already ordered a second colour.",
                                author: "Neha K. — Delhi",
                                item: "Tailored Relaxed Trouser",
                            },
                        ].map((review, i) => (
                            <div
                                key={i}
                                className="bg-[#fcfbf9] p-6 sm:p-8 border border-neutral-200/60 rounded-[6px] shadow-[0_4px_16px_rgba(45,33,29,0.04)] hover:shadow-[0_8px_24px_rgba(45,33,29,0.07)] transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex text-amber-500 mb-3">
                                        {[...Array(5)].map((_, idx) => (
                                            <Star
                                                key={idx}
                                                size={13}
                                                className="fill-amber-400 text-amber-400"
                                            />
                                        ))}
                                    </div>
                                    <p className="text-sm text-[#43352e] leading-relaxed mb-4 font-sans">
                                        &ldquo;{review.quote}&rdquo;
                                    </p>
                                </div>
                                <div className="pt-4 border-t border-neutral-200/50">
                                    <span className="block text-xs font-semibold text-[#2d211d] tracking-wide font-display">
                                        {review.author}
                                    </span>
                                    <span className="text-[11px] text-[#7c685f]">
                                        Verified purchase &bull; {review.item}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </ScrollReveal>

            {/* 13. Community Gallery */}
            <CommunityGallery />
            {/* <TrustFeatures /> */}
            <FAQSection />
            {/* 14. VIP Newsletter & 10% Welcome Offer */}
            <VIPNewsletter />

            {/* 15. Continuous Marquee Ticker Strip */}
            <MarqueeTicker />
        </div>
    );
}
