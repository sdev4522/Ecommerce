import React from 'react';
import { getCategoryBySlug, getAllCategories, getProductsWithPagination } from '../../../lib/botble';
import ShopArchiveView from '../../../components/shop/ShopArchiveView';

interface CollectionPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    sort?: string;
    page?: string;
    per_page?: string;
    min_price?: string;
    max_price?: string;
    q?: string;
    in_stock?: string;
  }>;
}

export const revalidate = 30;

export default async function CollectionPage({ params, searchParams }: CollectionPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const slug = resolvedParams.slug || 'all';
  const sort = resolvedSearchParams.sort || 'featured';
  const page = Math.max(1, Number(resolvedSearchParams.page) || 1);
  const perPage = Math.max(4, Number(resolvedSearchParams.per_page) || 12);
  const minPrice = resolvedSearchParams.min_price ? Number(resolvedSearchParams.min_price) : undefined;
  const maxPrice = resolvedSearchParams.max_price ? Number(resolvedSearchParams.max_price) : undefined;
  const query = resolvedSearchParams.q || undefined;
  const inStockOnly = resolvedSearchParams.in_stock === 'true';

  // Resolve category if not 'all'
  const currentCategory = slug === 'all' ? null : await getCategoryBySlug(slug);
  const allCategories = await getAllCategories();

  // Fetch paginated products from Botble CMS
  const { products, total, currentPage, lastPage } = await getProductsWithPagination({
    category_id: currentCategory ? currentCategory.id : undefined,
    category_slug: slug,
    sort_by: sort,
    page,
    per_page: perPage,
    q: query,
    min_price: minPrice,
    max_price: maxPrice,
    in_stock_only: inStockOnly,
  });

  const categoryTitle = currentCategory ? currentCategory.name : 'All Products';
  const categoryDesc =
    currentCategory?.description ||
    'Thoughtful women\'s fashion designed for everyday confidence and effortless styling.';

  return (
    <ShopArchiveView
      currentSlug={slug}
      categoryTitle={categoryTitle}
      categoryDesc={categoryDesc}
      products={products}
      total={total}
      currentPage={currentPage}
      lastPage={lastPage}
      perPage={perPage}
      categories={allCategories}
      currentSort={sort}
      currentMinPrice={minPrice}
      currentMaxPrice={maxPrice}
      currentQuery={query}
      inStockOnly={inStockOnly}
    />
  );
}
