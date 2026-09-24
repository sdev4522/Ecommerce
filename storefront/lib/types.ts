export interface ProductVariationAttribute {
  id: number;
  slug: string;
  set_slug: string; // e.g. 'color', 'size'
  set_id: number;
  title?: string;
  color?: string; // hex code if color
}

export interface ProductVariation {
  id: number;
  name: string;
  sku: string;
  price: number;
  formatted_price: string;
  sale_price?: number;
  formatted_sale_price?: string;
  original_price: number;
  formatted_original_price?: string;
  quantity: number;
  is_out_of_stock: boolean;
  stock_status_label: string;
  selected_attributes?: ProductVariationAttribute[];
  image_url?: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  sku: string;
  description: string;
  content?: string;
  price: number;
  price_formatted: string;
  original_price?: number;
  original_price_formatted?: string;
  is_out_of_stock: boolean;
  quantity: number;
  images: string[];
  image_url: string;
  hover_image_url?: string;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
  categories?: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  brand?: {
    id: number;
    name: string;
    slug: string;
  };
  badge?: string; // e.g. 'NEW DROP', 'BESTSELLER', '30% OFF', 'ORGANIC'
  reviews_avg: number;
  reviews_count: number;
  colors?: Array<{
    name: string;
    hex: string;
    image?: string;
  }>;
  sizes?: string[]; // e.g. ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  fabric?: string;
  fit?: string;
  model_info?: string;
  variations?: ProductVariation[];
  specifications?: Array<{
    name: string;
    value: string;
  }>;
  materials?: string;
  care?: string;
  shipping_info?: string;
  returns_info?: string;
  dimensions?: {
    length?: number | null;
    wide?: number | null;
    height?: number | null;
    weight?: number | null;
  };
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  products_count?: number;
  is_featured?: boolean;
}

export interface CartItem {
  id: string; // cart item id / composite key
  product_id: number;
  variation_id?: number;
  slug: string;
  name: string;
  price: number;
  formatted_price: string;
  image: string;
  qty: number;
  size?: string;
  color?: string;
  colorHex?: string;
  max_qty: number;
}

export interface FilterOption {
  id: number | string;
  name: string;
  slug: string;
  count?: number;
  color_code?: string;
}

export interface CustomerAddress {
  id: number;
  name: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  country?: string;
  zip_code: string;
  is_default: boolean;
}

export interface OrderProductItem {
  id: number;
  product_id: number;
  product_name: string;
  product_image?: string;
  qty: number;
  price: number;
  formatted_price: string;
  options?: {
    attributes?: string;
    size?: string;
    color?: string;
  };
}

export interface CustomerOrder {
  id: number;
  code: string;
  created_at: string;
  status: any;
  status_label?: string;
  amount: number;
  formatted_amount: string;
  sub_total?: number;
  shipping_amount?: number;
  tax_amount?: number;
  discount_amount?: number;
  payment_method?: string;
  payment_status?: string;
  shipping_address?: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    country?: string;
  };
  products?: OrderProductItem[];
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  url?: string;
}

export interface BlogPost {
  id: number;
  name: string;
  slug: string;
  description: string;
  content?: string;
  image: string;
  created_at: string;
  updated_at?: string;
  categories?: BlogCategory[];
  author?: {
    id?: number;
    name: string;
    avatar?: string;
  } | string;
  reading_time?: string;
}

export interface ProductReviewImage {
  thumbnail: string;
  full_url: string;
}

export interface ProductReview {
  id: number;
  user_name: string;
  user_avatar?: string;
  created_at: string;
  created_at_tz?: string;
  comment: string;
  star: number;
  images?: ProductReviewImage[];
  status?: string;
  status_text?: string;
}
