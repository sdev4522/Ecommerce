'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {
  SlidersHorizontal,
  Grid2X2,
  Grid3X3,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  X,
  Search,
  Check,
  RotateCcw,
  Sparkles,
  ArrowUpDown,
  Tag,
  ShoppingBag,
  Star,
} from 'lucide-react';
import ProductCard from '../product/ProductCard';
import { Product, ProductCategory } from '../../lib/types';
import { formatPrice } from '../../lib/utils';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from '../ui/sheet';

interface ShopArchiveViewProps {
  currentSlug: string;
  categoryTitle: string;
  categoryDesc: string;
  products: Product[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
  categories: ProductCategory[];
  currentSort: string;
  currentMinPrice?: number;
  currentMaxPrice?: number;
  currentQuery?: string;
  inStockOnly?: boolean;
}

type ViewMode = 'grid-4' | 'grid-3' | 'grid-2' | 'list';

const PRICE_PRESETS = [
  { label: 'All Prices', min: undefined, max: undefined },
  { label: 'Under ₹500', min: 0, max: 500 },
  { label: '₹500 – ₹1,000', min: 500, max: 1000 },
  { label: '₹1,000 – ₹2,000', min: 1000, max: 2000 },
  { label: 'Above ₹2,000', min: 2000, max: undefined },
];

const SORT_OPTIONS = [
  { value: 'featured', label: 'Curated & Featured' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'date_desc', label: 'Newest Arrivals' },
  { value: 'rating_desc', label: 'Highest Rated' },
  { value: 'name_asc', label: 'Alphabetical: A-Z' },
];

export default function ShopArchiveView({
  currentSlug,
  categoryTitle,
  categoryDesc,
  products,
  total,
  currentPage,
  lastPage,
  perPage,
  categories,
  currentSort,
  currentMinPrice,
  currentMaxPrice,
  currentQuery,
  inStockOnly = false,
}: ShopArchiveViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Layout & UI controls
  const [viewMode, setViewMode] = useState<ViewMode>('grid-4');
  const [showSidebar, setShowSidebar] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Custom price input local states
  const [minPriceInput, setMinPriceInput] = useState(currentMinPrice !== undefined ? String(currentMinPrice) : '');
  const [maxPriceInput, setMaxPriceInput] = useState(currentMaxPrice !== undefined ? String(currentMaxPrice) : '');
  const [searchInput, setSearchInput] = useState(currentQuery || '');

  // Helper to build URL with updated parameters
  const createQueryUrl = (updates: Record<string, string | number | boolean | undefined>, targetSlug?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === '' || value === false) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    const slug = targetSlug !== undefined ? targetSlug : currentSlug;
    const base = `/collections/${slug}`;
    const query = params.toString();
    return query ? `${base}?${query}` : base;
  };

  const navigateWithUpdates = (updates: Record<string, string | number | boolean | undefined>, targetSlug?: string) => {
    const url = createQueryUrl(updates, targetSlug);
    startTransition(() => {
      router.push(url);
    });
  };

  const handleCustomPriceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const min = minPriceInput.trim() ? Number(minPriceInput.trim()) : undefined;
    const max = maxPriceInput.trim() ? Number(maxPriceInput.trim()) : undefined;
    navigateWithUpdates({
      min_price: min,
      max_price: max,
      page: 1,
    });
    setMobileFilterOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateWithUpdates({
      q: searchInput.trim() || undefined,
      page: 1,
    });
  };

  const clearAllFilters = () => {
    setMinPriceInput('');
    setMaxPriceInput('');
    setSearchInput('');
    startTransition(() => {
      router.push(`/collections/${currentSlug}`);
    });
  };

  // Active filters counting
  const hasActiveFilters = Boolean(
    currentMinPrice !== undefined ||
    currentMaxPrice !== undefined ||
    currentQuery ||
    inStockOnly ||
    (currentSort && currentSort !== 'featured')
  );

  // Pagination item range calculation
  const startItem = total > 0 ? (currentPage - 1) * perPage + 1 : 0;
  const endItem = Math.min(total, currentPage * perPage);

  // Smart page numbers builder
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (lastPage <= maxVisible) {
      for (let i = 1; i <= lastPage; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(lastPage - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < lastPage - 2) pages.push('...');
      if (!pages.includes(lastPage)) pages.push(lastPage);
    }
    return pages;
  };

  return (
    <div className="px-3.5 sm:px-6 lg:px-8 py-4 sm:py-10">
      {/* ===================================================================
          1. HEADER & BREADCRUMBS
          =================================================================== */}
      <div className="border-b border-neutral-100 pb-8 mb-8">
        <nav className="flex items-center gap-1.5 overflow-x-auto no-scrollbar whitespace-nowrap text-[11px] uppercase tracking-widest text-neutral-400 mb-3 pb-1">
          <Link href="/" className="hover:text-black transition-colors font-mono shrink-0">
            Home
          </Link>
          <span className="shrink-0 text-neutral-300">/</span>
          <Link href="/collections/all" className="hover:text-black transition-colors font-mono shrink-0">
            Collections
          </Link>
          <span className="shrink-0 text-neutral-300">/</span>
          <span className="text-black font-semibold font-mono shrink-0 truncate max-w-[170px] sm:max-w-none">{categoryTitle}</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-4xl font-display text-neutral-900 font-bold tracking-tight">
                {categoryTitle}
              </h1>
              <Badge variant="outline" className="text-xs font-mono px-2.5 py-0.5">
                {total} {total === 1 ? 'Piece' : 'Pieces'}
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-light">
              {categoryDesc}
            </p>
          </div>

          {/* Quick Category Navigation Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full md:max-w-md no-scrollbar">
            <Link
              href={createQueryUrl({ page: 1 }, 'all')}
              className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider rounded-full transition-all shrink-0 ${currentSlug === 'all'
                ? 'bg-neutral-950 text-white shadow-sm'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-black'
                }`}
            >
              All Capsule
            </Link>
            {categories.slice(0, 6).map((cat) => {
              const isActive = currentSlug === cat.slug;
              return (
                <Link
                  key={cat.id}
                  href={createQueryUrl({ page: 1 }, cat.slug)}
                  className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider rounded-full transition-all shrink-0 ${isActive
                    ? 'bg-neutral-950 text-white shadow-sm'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-black'
                    }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===================================================================
          2. INTERACTIVE TOOLBAR & CONTROLS
          =================================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3.5 px-4 bg-neutral-50/80 border border-neutral-200/90 rounded-md mb-6">
        {/* Left Side: Filter toggles & In-Archive Search */}
        <div className="flex items-center gap-3">
          {/* Desktop Filter Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSidebar(!showSidebar)}
            className="hidden lg:flex items-center gap-2 text-xs h-9 bg-white"
          >
            <SlidersHorizontal size={14} />
            <span>{showSidebar ? 'Hide Filters' : 'Show Filters'}</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-neutral-950" />
            )}
          </Button>

          {/* Mobile Filter Trigger Sheet */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 text-xs h-9 bg-white"
          >
            <SlidersHorizontal size={14} />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-neutral-950" />
            )}
          </Button>

          {/* Quick Search */}
          <form onSubmit={handleSearchSubmit} className="relative w-48 sm:w-60">
            <Input
              type="text"
              placeholder="Search in archive..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="h-9 pr-7 text-xs bg-white"
            />
            {searchInput ? (
              <button
                type="button"
                onClick={() => {
                  setSearchInput('');
                  navigateWithUpdates({ q: undefined, page: 1 });
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
              >
                <X size={13} />
              </button>
            ) : (
              <Search size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            )}
          </form>
        </div>

        {/* Right Side: Product Counts, Grid Layout & Sorting */}
        <div className="flex items-center justify-between sm:justify-end gap-4 text-xs">
          <span className="text-neutral-500 hidden md:inline-block font-mono">
            Showing <strong className="text-neutral-950 font-semibold">{startItem}–{endItem}</strong> of {total}
          </span>

          {/* Grid Layout Switcher */}
          <div className="hidden sm:flex items-center gap-1 border-r border-neutral-200 pr-3">
            <button
              onClick={() => setViewMode('grid-4')}
              aria-label="4 Columns Grid"
              title="4 Columns View"
              className={`p-1.5 rounded transition-colors ${viewMode === 'grid-4' ? 'bg-neutral-950 text-white' : 'text-neutral-500 hover:text-black'
                }`}
            >
              <LayoutGrid size={15} />
            </button>
            <button
              onClick={() => setViewMode('grid-3')}
              aria-label="3 Columns Grid"
              title="3 Columns View"
              className={`p-1.5 rounded transition-colors ${viewMode === 'grid-3' ? 'bg-neutral-950 text-white' : 'text-neutral-500 hover:text-black'
                }`}
            >
              <Grid3X3 size={15} />
            </button>
            <button
              onClick={() => setViewMode('grid-2')}
              aria-label="2 Columns Grid"
              title="2 Columns View"
              className={`p-1.5 rounded transition-colors ${viewMode === 'grid-2' ? 'bg-neutral-950 text-white' : 'text-neutral-500 hover:text-black'
                }`}
            >
              <Grid2X2 size={15} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              aria-label="List View"
              title="List View"
              className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-neutral-950 text-white' : 'text-neutral-500 hover:text-black'
                }`}
            >
              <List size={15} />
            </button>
          </div>

          {/* Sort Selector Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-neutral-400 font-medium uppercase tracking-wider text-[11px] hidden sm:inline">
              Sort:
            </span>
            <select
              value={currentSort}
              onChange={(e) => navigateWithUpdates({ sort: e.target.value, page: 1 })}
              className="h-9 px-3 text-xs bg-white border border-neutral-300 rounded font-medium text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-950 cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ===================================================================
          3. ACTIVE FILTERS PILLS ROW
          =================================================================== */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 mb-6 text-xs animate-fade-in">
          <span className="text-neutral-400 uppercase tracking-widest text-[10px] font-semibold mr-1 font-mono">
            Active Filters:
          </span>

          {currentQuery && (
            <Badge variant="secondary" className="gap-1.5 py-1 px-2.5 text-xs">
              <span>Query: &ldquo;{currentQuery}&rdquo;</span>
              <button onClick={() => navigateWithUpdates({ q: undefined, page: 1 })}>
                <X size={11} className="hover:text-red-600" />
              </button>
            </Badge>
          )}

          {(currentMinPrice !== undefined || currentMaxPrice !== undefined) && (
            <Badge variant="secondary" className="gap-1.5 py-1 px-2.5 text-xs">
              <span>
                Price: {currentMinPrice !== undefined ? formatPrice(currentMinPrice) : '₹0'} &ndash;{' '}
                {currentMaxPrice !== undefined ? formatPrice(currentMaxPrice) : 'Any'}
              </span>
              <button
                onClick={() => {
                  setMinPriceInput('');
                  setMaxPriceInput('');
                  navigateWithUpdates({ min_price: undefined, max_price: undefined, page: 1 });
                }}
              >
                <X size={11} className="hover:text-red-600" />
              </button>
            </Badge>
          )}

          {inStockOnly && (
            <Badge variant="secondary" className="gap-1.5 py-1 px-2.5 text-xs">
              <span>In Stock Only</span>
              <button onClick={() => navigateWithUpdates({ in_stock: undefined, page: 1 })}>
                <X size={11} className="hover:text-red-600" />
              </button>
            </Badge>
          )}

          {currentSort && currentSort !== 'featured' && (
            <Badge variant="secondary" className="gap-1.5 py-1 px-2.5 text-xs">
              <span>Sort: {SORT_OPTIONS.find((s) => s.value === currentSort)?.label}</span>
              <button onClick={() => navigateWithUpdates({ sort: 'featured', page: 1 })}>
                <X size={11} className="hover:text-red-600" />
              </button>
            </Badge>
          )}

          <button
            onClick={clearAllFilters}
            className="text-[11px] text-red-600 hover:text-red-800 underline font-semibold ml-2 cursor-pointer"
          >
            Clear All
          </button>
        </div>
      )}

      {/* ===================================================================
          4. DUAL PANE: SIDEBAR & PRODUCTS
          =================================================================== */}
      <div className="flex gap-8 items-start">
        {/* DESKTOP FILTER SIDEBAR */}
        {showSidebar && (
          <aside className="w-64 shrink-0 hidden lg:block space-y-6 border border-neutral-200/90 p-5 rounded-md bg-white">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <span className="text-xs uppercase tracking-widest font-bold text-neutral-900 font-display">
                Filter Archive
              </span>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Categories List */}
            <div className="space-y-2.5">
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block font-mono">
                Categories
              </span>
              <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                <Link
                  href={createQueryUrl({ page: 1 }, 'all')}
                  className={`w-full flex items-center justify-between text-xs py-1.5 px-2 rounded transition-colors ${currentSlug === 'all'
                    ? 'bg-neutral-950 text-white font-semibold'
                    : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                >
                  <span>All Pieces</span>
                  <span className={`text-[10px] ${currentSlug === 'all' ? 'text-neutral-300' : 'text-neutral-400'}`}>
                    {total}
                  </span>
                </Link>

                {categories.map((cat) => {
                  const isActive = currentSlug === cat.slug;
                  return (
                    <Link
                      key={cat.id}
                      href={createQueryUrl({ page: 1 }, cat.slug)}
                      className={`w-full flex items-center justify-between text-xs py-1.5 px-2 rounded transition-colors ${isActive
                        ? 'bg-neutral-950 text-white font-semibold'
                        : 'text-neutral-700 hover:bg-neutral-100'
                        }`}
                    >
                      <span className="truncate max-w-[150px]">{cat.name}</span>
                      {cat.products_count !== undefined && cat.products_count > 0 && (
                        <span className={`text-[10px] ${isActive ? 'text-neutral-300' : 'text-neutral-400'}`}>
                          {cat.products_count}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            <Separator />

            {/* Price Presets */}
            <div className="space-y-2.5">
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block font-mono">
                Price Presets
              </span>
              <div className="space-y-1">
                {PRICE_PRESETS.map((p, idx) => {
                  const isSelected = currentMinPrice === p.min && currentMaxPrice === p.max;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setMinPriceInput(p.min !== undefined ? String(p.min) : '');
                        setMaxPriceInput(p.max !== undefined ? String(p.max) : '');
                        navigateWithUpdates({
                          min_price: p.min,
                          max_price: p.max,
                          page: 1,
                        });
                      }}
                      className={`w-full text-left text-xs py-1.5 px-2 rounded flex items-center justify-between transition-colors cursor-pointer ${isSelected
                        ? 'bg-neutral-100 font-semibold text-neutral-950'
                        : 'text-neutral-600 hover:bg-neutral-50 hover:text-black'
                        }`}
                    >
                      <span>{p.label}</span>
                      {isSelected && <Check size={12} className="text-neutral-950" />}
                    </button>
                  );
                })}
              </div>

              {/* Custom Min / Max Price Inputs */}
              <form onSubmit={handleCustomPriceSubmit} className="pt-2 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-neutral-400 block mb-0.5 font-mono">MIN ₹</span>
                    <Input
                      type="number"
                      placeholder="0"
                      value={minPriceInput}
                      onChange={(e) => setMinPriceInput(e.target.value)}
                      className="h-8 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block mb-0.5 font-mono">MAX ₹</span>
                    <Input
                      type="number"
                      placeholder="5000"
                      value={maxPriceInput}
                      onChange={(e) => setMaxPriceInput(e.target.value)}
                      className="h-8 text-xs font-mono"
                    />
                  </div>
                </div>
                <Button type="submit" size="sm" variant="outline" className="w-full text-xs h-8">
                  Apply Price
                </Button>
              </form>
            </div>

            <Separator />

            {/* In Stock Toggle */}
            <div className="pt-1">
              <label className="flex items-center gap-2 text-xs text-neutral-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => navigateWithUpdates({ in_stock: e.target.checked ? true : undefined, page: 1 })}
                  className="rounded border-neutral-300 text-neutral-950 focus:ring-neutral-950 w-4 h-4 cursor-pointer"
                />
                <span>In-Stock Pieces Only</span>
              </label>
            </div>
          </aside>
        )}

        {/* ===================================================================
            PRODUCT ARCHIVE LISTING
            =================================================================== */}
        <div className={`flex-1 w-full min-w-0 transition-opacity duration-300 ${isPending ? 'opacity-60 pointer-events-none' : 'opacity-100'}`}>
          {products.length > 0 ? (
            <div>
              {/* Product Grid / List view */}
              {viewMode === 'list' ? (
                <div className="divide-y divide-neutral-200 border-y border-neutral-200 mb-10">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:bg-neutral-50/50 transition-colors p-3 rounded"
                    >
                      <div className="flex items-center space-x-5">
                        <Link
                          href={`/product/${product.slug}`}
                          className="w-24 h-32 bg-neutral-100 relative shrink-0 overflow-hidden border border-neutral-200"
                        >
                          <Image
                            src={product.image_url}
                            alt={product.name}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </Link>
                        <div className="space-y-1.5 max-w-md">
                          {product.category && (
                            <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-mono">
                              {product.category.name}
                            </span>
                          )}
                          <h3 className="text-base font-medium text-neutral-900 font-display">
                            <Link href={`/product/${product.slug}`} className="hover:underline">
                              {product.name}
                            </Link>
                          </h3>
                          <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                            {product.description?.replace(/<[^>]*>?/gm, '') || 'Crafted with premium fibers and refined tailoring.'}
                          </p>
                          <div className="flex items-center gap-2 pt-1 text-xs text-neutral-600">
                            {product.reviews_avg ? (
                              <span className="flex items-center gap-1 font-mono text-[11px]">
                                <Star size={12} className="fill-amber-400 text-amber-400" />
                                {product.reviews_avg.toFixed(1)}
                              </span>
                            ) : null}
                            <span>&bull;</span>
                            <span className="font-mono text-emerald-700">In Stock</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 shrink-0">
                        <div className="text-right">
                          <span className="text-base font-bold text-neutral-950 font-sans">
                            {product.price_formatted || formatPrice(product.price)}
                          </span>
                          {product.original_price && product.original_price > product.price && (
                            <span className="text-xs text-neutral-400 line-through block font-sans">
                              {product.original_price_formatted || formatPrice(product.original_price)}
                            </span>
                          )}
                        </div>

                        <Button asChild size="sm" className="gap-1 text-xs">
                          <Link href={`/product/${product.slug}`}>
                            <ShoppingBag size={13} />
                            <span>Select Options</span>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className={`grid gap-3 sm:gap-4.5 mb-12 ${viewMode === 'grid-4'
                    ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                    : viewMode === 'grid-3'
                      ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
                      : 'grid-cols-1 sm:grid-cols-2'
                    }`}
                >
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

              {/* ===================================================================
                  5. COMPREHENSIVE PAGINATION BAR
                  =================================================================== */}
              {lastPage > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-neutral-200">
                  <div className="text-xs text-neutral-500 font-mono">
                    Showing {startItem}&ndash;{endItem} of {total} products &bull; Page {currentPage} of {lastPage}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Previous Button */}
                    <Button
                      asChild={currentPage > 1}
                      disabled={currentPage <= 1}
                      variant="outline"
                      size="sm"
                      className="text-xs h-9 px-3 gap-1"
                    >
                      {currentPage > 1 ? (
                        <Link href={createQueryUrl({ page: currentPage - 1 })}>
                          <ChevronLeft size={14} />

                        </Link>
                      ) : (
                        <span>
                          <ChevronLeft size={14} />

                        </span>
                      )}
                    </Button>

                    {/* Numbered Page Buttons */}
                    <div className="flex items-center gap-1">
                      {getPageNumbers().map((p, idx) => {
                        if (p === '...') {
                          return (
                            <span key={`ellipsis-${idx}`} className="px-2 text-neutral-400 text-xs">
                              &hellip;
                            </span>
                          );
                        }
                        const pageNum = Number(p);
                        const isCurrent = pageNum === currentPage;
                        return (
                          <Button
                            key={pageNum}
                            asChild={!isCurrent}
                            variant={isCurrent ? 'default' : 'outline'}
                            size="sm"
                            className={`w-9 h-9 p-0 text-xs font-mono font-medium ${isCurrent ? 'bg-neutral-950 text-white' : 'bg-white hover:bg-neutral-100'
                              }`}
                          >
                            {isCurrent ? (
                              <span>{pageNum}</span>
                            ) : (
                              <Link href={createQueryUrl({ page: pageNum })}>{pageNum}</Link>
                            )}
                          </Button>
                        );
                      })}
                    </div>

                    {/* Next Button */}
                    <Button
                      asChild={currentPage < lastPage}
                      disabled={currentPage >= lastPage}
                      variant="outline"
                      size="sm"
                      className="text-xs h-9 px-3 gap-1"
                    >
                      {currentPage < lastPage ? (
                        <Link href={createQueryUrl({ page: currentPage + 1 })}>

                          <ChevronRight size={14} />
                        </Link>
                      ) : (
                        <span>

                          <ChevronRight size={14} />
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* EMPTY RESULTS STATE */
            <div className="py-24 text-center space-y-4 border border-dashed border-neutral-200 rounded-lg p-8">
              <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                <Search size={22} />
              </div>
              <div className="space-y-1 max-w-sm mx-auto">
                <h3 className="text-base font-display font-semibold text-neutral-900">
                  No products match your filters
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  We could not find any items matching your selected criteria. Try adjusting or resetting your price and category filters.
                </p>
              </div>
              <div className="pt-2">
                <Button onClick={clearAllFilters} variant="default" size="sm" className="gap-2 text-xs">
                  <RotateCcw size={13} />
                  <span>Reset All Filters</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ===================================================================
          6. MOBILE FILTER SHEET
          =================================================================== */}
      <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
        <SheetContent side="left" className="w-full sm:max-w-md p-6 overflow-y-auto">
          <SheetHeader className="text-left pb-4 border-b border-neutral-100">
            <SheetTitle className="text-base font-display font-bold">Filter Products</SheetTitle>
            <SheetDescription className="text-xs text-neutral-500">
              Refine products by category and price range.
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-6 pt-4">
            {/* Categories */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-neutral-900 uppercase tracking-wider block font-mono">
                Categories
              </span>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    navigateWithUpdates({ page: 1 }, 'all');
                    setMobileFilterOpen(false);
                  }}
                  className={`w-full flex items-center justify-between text-xs py-2 px-3 rounded transition-colors ${currentSlug === 'all'
                    ? 'bg-neutral-950 text-white font-semibold'
                    : 'bg-neutral-50 text-neutral-700'
                    }`}
                >
                  <span>All Pieces</span>
                  <span className="text-[10px]">{total}</span>
                </button>

                {categories.map((cat) => {
                  const isActive = currentSlug === cat.slug;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        navigateWithUpdates({ page: 1 }, cat.slug);
                        setMobileFilterOpen(false);
                      }}
                      className={`w-full flex items-center justify-between text-xs py-2 px-3 rounded transition-colors ${isActive
                        ? 'bg-neutral-950 text-white font-semibold'
                        : 'bg-neutral-50 text-neutral-700'
                        }`}
                    >
                      <span>{cat.name}</span>
                      {cat.products_count !== undefined && (
                        <span className="text-[10px]">{cat.products_count}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <Separator />

            {/* Price Presets */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-neutral-900 uppercase tracking-wider block font-mono">
                Price Range
              </span>
              <div className="grid grid-cols-2 gap-2">
                {PRICE_PRESETS.map((p, idx) => {
                  const isSelected = currentMinPrice === p.min && currentMaxPrice === p.max;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setMinPriceInput(p.min !== undefined ? String(p.min) : '');
                        setMaxPriceInput(p.max !== undefined ? String(p.max) : '');
                        navigateWithUpdates({
                          min_price: p.min,
                          max_price: p.max,
                          page: 1,
                        });
                        setMobileFilterOpen(false);
                      }}
                      className={`text-xs py-2 px-3 border rounded text-center transition-colors ${isSelected
                        ? 'bg-neutral-950 text-white border-neutral-950 font-semibold'
                        : 'bg-neutral-50 text-neutral-700 border-neutral-200'
                        }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>

              {/* Custom Min/Max */}
              <form onSubmit={handleCustomPriceSubmit} className="pt-2 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    placeholder="Min ₹"
                    value={minPriceInput}
                    onChange={(e) => setMinPriceInput(e.target.value)}
                    className="h-9 text-xs font-mono"
                  />
                  <Input
                    type="number"
                    placeholder="Max ₹"
                    value={maxPriceInput}
                    onChange={(e) => setMaxPriceInput(e.target.value)}
                    className="h-9 text-xs font-mono"
                  />
                </div>
                <Button type="submit" className="w-full text-xs h-9">
                  Apply Filter
                </Button>
              </form>
            </div>

            <Separator />

            {/* In-Stock Only */}
            <div>
              <label className="flex items-center gap-2 text-xs text-neutral-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => {
                    navigateWithUpdates({ in_stock: e.target.checked ? true : undefined, page: 1 });
                    setMobileFilterOpen(false);
                  }}
                  className="rounded border-neutral-300 text-neutral-950 focus:ring-neutral-950 w-4 h-4"
                />
                <span>In-Stock Pieces Only</span>
              </label>
            </div>

            <div className="pt-4 flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  clearAllFilters();
                  setMobileFilterOpen(false);
                }}
                className="w-1/2 text-xs"
              >
                Reset All
              </Button>
              <SheetClose asChild>
                <Button className="w-1/2 text-xs">Done</Button>
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
