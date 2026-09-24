import { Product, ProductCategory, BlogPost, BlogCategory, ProductReview } from './types';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from './mock-data';

const BOTBLE_API_URL = process.env.NEXT_PUBLIC_BOTBLE_API_URL || 'http://localhost:8000/api/v1';
const BOTBLE_URL = process.env.NEXT_PUBLIC_BOTBLE_URL || 'http://localhost:8000';
const BOTBLE_API_KEY = typeof window === 'undefined' ? (process.env.BOTBLE_API_KEY || '') : '';

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

export async function fetchBotbleAPI<T>(endpoint: string, options: FetchOptions = {}): Promise<T | null> {
  const { params, ...fetchOptions } = options;
  
  let url = `${BOTBLE_API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (BOTBLE_API_KEY) {
    headers['X-API-KEY'] = BOTBLE_API_KEY;
  }

  try {
    const res = await fetch(url, {
      ...fetchOptions,
      headers,
      next: { revalidate: 30 }, // 30s cache for fast live updates
    });

    if (!res.ok) {
      return null;
    }

    const json = await res.json();
    if (json.data && typeof json.data === 'object' && !Array.isArray(json.data)) {
      if (json.attribute_sets) {
        json.data.attribute_sets = json.attribute_sets;
      }
      if (json.default_product_variation) {
        json.data.default_product_variation = json.default_product_variation;
      }
    }
    return json.data || json;
  } catch {
    return null;
  }
}

// ----------------------------------------------------------------------
// Normalizers to guarantee seamless frontend compatibility
// ----------------------------------------------------------------------

export function cleanImageUrl(url?: string | null): string {
  if (!url || typeof url !== 'string') return '';
  let resolved = url.trim();
  if (!resolved) return '';

  // Ensure relative storage paths have BOTBLE_URL prefixed
  if (!resolved.startsWith('http://') && !resolved.startsWith('https://')) {
    if (!resolved.startsWith('/')) resolved = `/${resolved}`;
    if (!resolved.startsWith('/storage/')) resolved = `/storage${resolved}`;
    resolved = `${BOTBLE_URL}${resolved}`;
  }

  // Strip Botble generated thumbnail suffixes (-150x150, -400x400, -800x800, -thumb)
  // which fail to load for media that do not have generated thumbnails on disk
  resolved = resolved.replace(/-(\d+x\d+|thumb)(\.[a-zA-Z0-9]+)$/i, '$2');

  return resolved;
}

export function normalizeProduct(p: any): Product {
  const fallbackImage = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop';
  
  const rawImages: string[] = (Array.isArray(p.images) ? p.images : [])
    .map(cleanImageUrl)
    .filter(Boolean);

  const featuredCandidate = cleanImageUrl(p.image_url || p.image);
  const mainImage = featuredCandidate || rawImages[0] || fallbackImage;

  // Build images array with featured image first, avoiding duplicates
  const images = [...rawImages];
  if (mainImage && !images.includes(mainImage)) {
    images.unshift(mainImage);
  } else if (mainImage && images.indexOf(mainImage) > 0) {
    images.splice(images.indexOf(mainImage), 1);
    images.unshift(mainImage);
  }
  if (images.length === 0) {
    images.push(fallbackImage);
  }

  // Hover image: priority to explicit hover_image_url, then second distinct image in gallery, then mainImage
  const hoverCandidate = cleanImageUrl(p.hover_image_url);
  const alternateGalleryImage = images.find((img) => img !== mainImage);
  const hoverImage = hoverCandidate || alternateGalleryImage || images[1] || mainImage;
  
  const price = Number(p.price) || 0;
  const originalPrice = Number(p.original_price) || price;

  const rawSpecs: Array<{ name: string; value: string }> = Array.isArray(p.specifications)
    ? p.specifications
        .filter((s: any) => s && s.name && s.value)
        .map((s: any) => ({ name: String(s.name), value: String(s.value) }))
    : [];

  const specifications = [...rawSpecs];
  if (p.weight && !specifications.some((s) => s.name.toLowerCase() === 'weight')) {
    specifications.push({ name: 'Weight', value: `${p.weight} g` });
  }
  if (
    (p.length || p.wide || p.height) &&
    !specifications.some((s) => s.name.toLowerCase() === 'dimensions')
  ) {
    const dims = [p.length, p.wide, p.height].filter(Boolean).join(' × ');
    if (dims) {
      specifications.push({ name: 'Dimensions', value: `${dims} cm` });
    }
  }

  let materials = p.fabric || p.materials || undefined;
  if (!materials && specifications.length > 0) {
    const matSpec = specifications.find((s) =>
      /(material|fabric|composition)/i.test(s.name)
    );
    if (matSpec) materials = matSpec.value;
  }
  if (!materials && (p.content || p.description)) {
    const contentText = `${p.description || ''} ${p.content || ''}`;
    const matMatch = contentText.match(/(?:-|\u2022|\*)\s*([0-9]{1,3}%\s+[^<\n\r]+)/i);
    if (matMatch) {
      materials = matMatch[1].trim();
    }
  }

  let care = p.care || undefined;
  if (!care && specifications.length > 0) {
    const careSpec = specifications.find((s) => /(care|wash|maintenance)/i.test(s.name));
    if (careSpec) care = careSpec.value;
  }

  return {
    id: p.id,
    slug: p.slug || `product-${p.id}`,
    name: p.name || 'LUNE Piece',
    sku: p.sku || `SKU-${p.id}`,
    description: p.description || '',
    content: p.content || p.description || '',
    price,
    price_formatted: p.price_formatted || `₹${price.toLocaleString('en-IN')}`,
    original_price: originalPrice,
    original_price_formatted: p.original_price_formatted || `₹${originalPrice.toLocaleString('en-IN')}`,
    is_out_of_stock: Boolean(p.is_out_of_stock),
    quantity: p.quantity ?? 10,
    images,
    image_url: mainImage,
    hover_image_url: hoverImage,
    category: p.category || (p.categories && p.categories[0]),
    badge: p.badge || (originalPrice > price ? 'SALE' : 'NEW DROP'),
    reviews_avg: Number(p.reviews_avg) || 4.8,
    reviews_count: Number(p.reviews_count) || 12,
    colors: (() => {
      if (Array.isArray(p.colors) && p.colors.length > 0) return p.colors;
      if (Array.isArray(p.attribute_sets)) {
        const colorSet = p.attribute_sets.find(
          (s: any) => s.slug === 'color' || s.title?.toLowerCase() === 'color'
        );
        if (colorSet && Array.isArray(colorSet.attributes) && colorSet.attributes.length > 0) {
          return colorSet.attributes.map((attr: any) => ({
            name: attr.title,
            hex: attr.color || '#111111',
          }));
        }
      }
      return undefined;
    })(),
    sizes: (() => {
      if (Array.isArray(p.sizes) && p.sizes.length > 0) return p.sizes;
      if (Array.isArray(p.attribute_sets)) {
        const sizeSet = p.attribute_sets.find(
          (s: any) => s.slug === 'size' || s.title?.toLowerCase() === 'size'
        );
        if (sizeSet && Array.isArray(sizeSet.attributes) && sizeSet.attributes.length > 0) {
          return sizeSet.attributes.map((attr: any) => attr.title);
        }
      }
      return undefined;
    })(),
    fabric: materials,
    fit: p.fit || undefined,
    model_info: p.model_info || undefined,
    variations: p.variations || [],
    specifications: specifications.length > 0 ? specifications : undefined,
    materials,
    care,
    shipping_info: p.shipping_info || undefined,
    returns_info: p.returns_info || undefined,
    dimensions: {
      length: p.length || null,
      wide: p.wide || null,
      height: p.height || null,
      weight: p.weight || null,
    },
  };
}

const CATEGORY_IMAGE_MAP: Record<string, string> = {
  "phone": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=85",
  "cellphone": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=85",
  "computer": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=85",
  "laptop": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=85",
  "audio": "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=85",
  "headphone": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=85",
  "speaker": "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=85",
  "watch": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=85",
  "jewelry": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=85",
  "clothing": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=85",
  "apparel": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=85",
  "accessory": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=85",
  "accessories": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=85",
  "kitchen": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=85",
  "home": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=85",
  "camera": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=85",
  "electronic": "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&q=85",
};

function resolveCategoryImage(c: any): string {
  const slug = (c.slug || "").toLowerCase();
  const name = (c.name || "").toLowerCase();

  for (const [key, url] of Object.entries(CATEGORY_IMAGE_MAP)) {
    if (slug.includes(key) || name.includes(key)) {
      return url;
    }
  }

  // Check if real custom image
  const rawImg = c.image || c.image_with_sizes?.origin || c.image_with_sizes?.medium;
  if (rawImg && typeof rawImg === "string" && !rawImg.includes("400x400") && !rawImg.includes("150x150") && !rawImg.includes("800x800")) {
    return rawImg.startsWith("http") ? rawImg : `${BOTBLE_URL}/storage/${rawImg}`;
  }

  return "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=85";
}

export function normalizeCategory(c: any): ProductCategory {
  return {
    id: c.id,
    name: c.name,
    slug: c.slug || String(c.id),
    description: c.description || "",
    image: resolveCategoryImage(c),
    products_count: c.products_count || c.count || 0,
    is_featured: Boolean(c.is_featured),
  };
}

// ----------------------------------------------------------------------
// High-Level Data Getters with Live Botble Sync
// ----------------------------------------------------------------------

export async function getProducts(params?: {
  categories?: string[];
  sort_by?: string;
  page?: number;
  per_page?: number;
  q?: string;
}): Promise<Product[]> {
  const data = await fetchBotbleAPI<any[]>('/ecommerce/products', {
    params: {
      sort_by: params?.sort_by,
      page: params?.page,
      per_page: params?.per_page || 12,
      q: params?.q,
    },
  });

  if (data && Array.isArray(data) && data.length > 0) {
    return data.map(normalizeProduct);
  }

  // Fallback to high-definition mock apparel data
  let products = [...MOCK_PRODUCTS];

  if (params?.q) {
    const query = params.q.toLowerCase();
    products = products.filter(
      (p: Product) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
    );
  }

  if (params?.sort_by) {
    if (params.sort_by === 'price_asc') {
      products.sort((a, b) => a.price - b.price);
    } else if (params.sort_by === 'price_desc') {
      products.sort((a, b) => b.price - a.price);
    }
  }

  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const data = await fetchBotbleAPI<any>(`/ecommerce/products/${slug}`);
  if (data && data.name) {
    return normalizeProduct(data);
  }

  const mock = MOCK_PRODUCTS.find((p) => p.slug === slug);
  return mock || MOCK_PRODUCTS[0];
}

export async function getCategories(): Promise<ProductCategory[]> {
  const data = await fetchBotbleAPI<any[]>('/ecommerce/product-categories');
  if (data && Array.isArray(data) && data.length > 0) {
    // Filter out internal/empty subcategories like Drive & Storages, Hot Promotions, etc.
    const excluded = [
      'drive & storages',
      'hot promotions',
      'office electronic',
      'videos games',
      'computer components',
      'security & protection',
      'cars & motorcycles',
      'babies & moms',
      'books & office',
    ];

    const curated = data.filter((c) => {
      const name = (c.name || '').toLowerCase();
      if (excluded.includes(name)) return false;
      return c.parent_id === 0 || c.is_featured;
    });

    const chosen = curated.length >= 4 ? curated : data;
    return chosen.slice(0, 6).map(normalizeCategory);
  }
  return MOCK_CATEGORIES.slice(0, 6);
}

export async function getCategoryBySlug(slug: string): Promise<ProductCategory | null> {
  const data = await fetchBotbleAPI<any>(`/ecommerce/product-categories/${slug}`);
  if (data && data.name) {
    return normalizeCategory(data);
  }
  return MOCK_CATEGORIES.find((c) => c.slug === slug) || null;
}


export interface ProductsPaginationResult {
  products: Product[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
}

export async function getAllCategories(): Promise<ProductCategory[]> {
  const data = await fetchBotbleAPI<any[]>('/ecommerce/product-categories');
  if (data && Array.isArray(data) && data.length > 0) {
    return data.map(normalizeCategory);
  }
  return MOCK_CATEGORIES;
}

export async function getProductsWithPagination(params?: {
  category_id?: number | string;
  category_slug?: string;
  sort_by?: string;
  page?: number;
  per_page?: number;
  q?: string;
  min_price?: number;
  max_price?: number;
  in_stock_only?: boolean;
}): Promise<ProductsPaginationResult> {
  const page = Number(params?.page) || 1;
  const perPage = Number(params?.per_page) || 12;

  const queryParams: Record<string, any> = {
    page,
    per_page: perPage,
  };

  if (params?.sort_by && params.sort_by !== 'featured') {
    queryParams.sort_by = params.sort_by;
  }
  if (params?.q) {
    queryParams.q = params.q;
  }
  if (params?.min_price !== undefined && !isNaN(params.min_price)) {
    queryParams.min_price = params.min_price;
  }
  if (params?.max_price !== undefined && !isNaN(params.max_price)) {
    queryParams.max_price = params.max_price;
  }
  if (params?.category_id) {
    queryParams['categories[]'] = params.category_id;
  }

  let url = `${BOTBLE_API_URL}/ecommerce/products`;
  const searchParams = new URLSearchParams();
  Object.entries(queryParams).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') {
      searchParams.append(k, String(v));
    }
  });
  if (searchParams.toString()) {
    url += `?${searchParams.toString()}`;
  }

  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-API-KEY': BOTBLE_API_KEY,
      },
      next: { revalidate: 30 },
    });

    if (res.ok) {
      const json = await res.json();
      const rawProducts = Array.isArray(json?.data) ? json.data : [];
      let products = rawProducts.map(normalizeProduct);

      if (params?.in_stock_only) {
        products = products.filter((p: Product) => !p.is_out_of_stock);
      }

      const meta = json?.meta || {};
      const total = Number(meta.total) || products.length;
      const currentPage = Number(meta.current_page) || page;
      const lastPage = Number(meta.last_page) || Math.max(1, Math.ceil(total / perPage));

      return {
        products,
        total,
        currentPage,
        lastPage,
        perPage,
      };
    }
  } catch (err) {
    console.error('getProductsWithPagination error:', err);
  }

  // Fallback
  let products = [...MOCK_PRODUCTS];
  if (params?.category_slug && params.category_slug !== 'all') {
    products = products.filter(
      (p: Product) => p.category?.slug === params.category_slug || (p.categories && p.categories.some((c: any) => c.slug === params.category_slug))
    );
  }
  if (params?.q) {
    const query = params.q.toLowerCase();
    products = products.filter(
      (p: Product) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
    );
  }
  if (params?.min_price !== undefined) {
    products = products.filter((p: Product) => p.price >= (params.min_price || 0));
  }
  if (params?.max_price !== undefined) {
    products = products.filter((p: Product) => p.price <= (params.max_price || 999999));
  }
  if (params?.in_stock_only) {
    products = products.filter((p: Product) => !p.is_out_of_stock);
  }
  if (params?.sort_by) {
    if (params.sort_by === 'price_asc') {
      products.sort((a, b) => a.price - b.price);
    } else if (params.sort_by === 'price_desc') {
      products.sort((a, b) => b.price - a.price);
    } else if (params.sort_by === 'rating_desc') {
      products.sort((a, b) => (b.reviews_avg || 0) - (a.reviews_avg || 0));
    } else if (params.sort_by === 'name_asc') {
      products.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  const total = products.length;
  const lastPage = Math.max(1, Math.ceil(total / perPage));
  const sliceStart = (page - 1) * perPage;
  const paged = products.slice(sliceStart, sliceStart + perPage);

  return {
    products: paged,
    total,
    currentPage: page,
    lastPage,
    perPage,
  };
}

// ----------------------------------------------------------------------
// Reviews API
// ----------------------------------------------------------------------

export async function getProductReviews(slug: string, token?: string | null): Promise<{
  reviews: ProductReview[];
  has_reviewed: boolean;
  user_review: ProductReview | null;
  message?: string;
}> {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    };
    if (BOTBLE_API_KEY) {
      headers["X-API-KEY"] = BOTBLE_API_KEY;
    }
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${BOTBLE_API_URL}/ecommerce/products/${encodeURIComponent(slug)}/reviews`, {
      headers,
      cache: "no-store",
    });

    if (!res.ok) {
      return { reviews: [], has_reviewed: false, user_review: null };
    }

    const json = await res.json();
    const data = json?.data || {};
    return {
      reviews: Array.isArray(data.reviews) ? data.reviews : [],
      has_reviewed: Boolean(data.has_reviewed),
      user_review: data.user_review || null,
      message: json?.message,
    };
  } catch (err) {
    console.error("getProductReviews error:", err);
    return { reviews: [], has_reviewed: false, user_review: null };
  }
}

// ----------------------------------------------------------------------
// Blog / Journal API
// ----------------------------------------------------------------------

export async function getBlogPosts(params?: {
  page?: number;
  per_page?: number;
  category_slug?: string;
  q?: string;
}): Promise<{
  posts: BlogPost[];
  total: number;
  currentPage: number;
  lastPage: number;
}> {
  const page = params?.page || 1;
  const perPage = params?.per_page || 9;

  try {
    const queryParams = new URLSearchParams();
    queryParams.append("page", String(page));
    queryParams.append("per_page", String(perPage));
    if (params?.q) queryParams.append("q", params.q);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    };
    if (BOTBLE_API_KEY) {
      headers["X-API-KEY"] = BOTBLE_API_KEY;
    }

    const res = await fetch(`${BOTBLE_API_URL}/posts?${queryParams.toString()}`, {
      headers,
      next: { revalidate: 30 },
    });

    if (res.ok) {
      const json = await res.json();
      let rawPosts: any[] = Array.isArray(json?.data) ? json.data : [];
      const meta = json?.meta || {};
      let total = Number(meta.total) || rawPosts.length;
      let lastPage = Number(meta.last_page) || Math.max(1, Math.ceil(total / perPage));

      // Map to consistent BlogPost type
      let posts: BlogPost[] = rawPosts.map((p) => ({
        id: p.id,
        name: p.name || p.title || "Untitled Post",
        slug: p.slug,
        description: p.description || p.excerpt || "",
        content: p.content || "",
        image: p.image || "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop",
        created_at: p.created_at || new Date().toISOString(),
        categories: Array.isArray(p.categories) ? p.categories : [],
        author: p.author || "Editorial Desk",
        reading_time: "4 min read",
      }));

      // In-memory filter for category if specified
      if (params?.category_slug && params.category_slug !== "all") {
        posts = posts.filter((p) =>
          p.categories?.some((c) => c.slug === params.category_slug)
        );
      }

      return {
        posts,
        total,
        currentPage: page,
        lastPage,
      };
    }
  } catch (err) {
    console.error("getBlogPosts error:", err);
  }

  return {
    posts: [],
    total: 0,
    currentPage: page,
    lastPage: 1,
  };
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    };
    if (BOTBLE_API_KEY) {
      headers["X-API-KEY"] = BOTBLE_API_KEY;
    }

    const res = await fetch(`${BOTBLE_API_URL}/posts/${encodeURIComponent(slug)}`, {
      headers,
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const json = await res.json();
    const p = json?.data;
    if (!p) return null;

    return {
      id: p.id,
      name: p.name || p.title || "Untitled Post",
      slug: p.slug,
      description: p.description || p.excerpt || "",
      content: p.content || "",
      image: p.image || "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop",
      created_at: p.created_at || new Date().toISOString(),
      categories: Array.isArray(p.categories) ? p.categories : [],
      author: p.author || "Editorial Desk",
      reading_time: "5 min read",
    };
  } catch (err) {
    console.error("getBlogPostBySlug error:", err);
    return null;
  }
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    };
    if (BOTBLE_API_KEY) {
      headers["X-API-KEY"] = BOTBLE_API_KEY;
    }

    const res = await fetch(`${BOTBLE_API_URL}/categories`, {
      headers,
      next: { revalidate: 120 },
    });

    if (!res.ok) return [];

    const json = await res.json();
    const list = Array.isArray(json?.data) ? json.data : [];
    return list.map((c: any) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description || "",
      url: c.url,
    }));
  } catch (err) {
    console.error("getBlogCategories error:", err);
    return [];
  }
}
