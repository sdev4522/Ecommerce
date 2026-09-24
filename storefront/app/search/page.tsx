import React from 'react';
import Link from 'next/link';
import ProductCard from '../../components/product/ProductCard';
import { getProducts } from '../../lib/botble';

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q || '';
  const products = await getProducts({ q: query });

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-2xl mb-12">
        <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-2">
          Search Results
        </span>
        <h1 className="text-3xl font-display text-neutral-900 font-medium">
          {query ? `Results for “${query}”` : 'Search All Pieces'}
        </h1>
        <p className="text-xs text-neutral-500 mt-2">
          Found <strong>{products.length}</strong> {products.length === 1 ? 'piece' : 'pieces'}.
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4 bg-neutral-50 p-8 border border-neutral-100">
          <h3 className="text-base font-display text-neutral-900">No products found</h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Try searching for terms like &quot;Dresses&quot;, &quot;Knitwear&quot;, &quot;Trousers&quot;, or &quot;Sets&quot;.
          </p>
          <Link
            href="/shop"
            className="inline-block text-xs uppercase tracking-widest bg-black text-white px-6 py-3 font-semibold"
          >
            Shop Collection
          </Link>
        </div>
      )}
    </div>
  );
}
