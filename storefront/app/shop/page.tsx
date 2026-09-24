import CollectionPage from '../collections/[slug]/page';

interface ShopPageProps {
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

export default async function ShopPage({ searchParams }: ShopPageProps) {
  return CollectionPage({
    params: Promise.resolve({ slug: 'all' }),
    searchParams,
  });
}
