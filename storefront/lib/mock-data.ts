import { Product, ProductCategory, ProductVariation } from './types';
import { formatPrice } from './utils';

export const MOCK_CATEGORIES: ProductCategory[] = [
  {
    id: 1,
    name: 'Oversized Tees',
    slug: 'oversized-tees',
    description: 'Heavyweight 290 GSM combed organic cotton cuts with dropped shoulders.',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=85',
    products_count: 8,
  },
  {
    id: 2,
    name: 'Heavy Knitwear',
    slug: 'knitwear',
    description: 'Substantial 460 GSM french terry hoodies and Italian extrafine merino wool.',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=85',
    products_count: 6,
  },
  {
    id: 3,
    name: 'Pleated Trousers',
    slug: 'trousers',
    description: 'Double-pleat wide silhouettes engineered with fluid tropical wool twill.',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=85',
    products_count: 5,
  },
  {
    id: 4,
    name: 'Outerwear & Coats',
    slug: 'outerwear',
    description: 'Bonded gabardine trench coats and 14oz shuttle-loomed raw selvedge denim.',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=85',
    products_count: 4,
  },
  {
    id: 5,
    name: 'Accessories & Leather',
    slug: 'accessories',
    description: 'Minimalist canvas bags, heavy ribbed socks, and unstructured caps.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=85',
    products_count: 3,
  },
];

export function mockProduct(data: Omit<Product, 'price_formatted' | 'original_price_formatted'> & { original_price?: number }): Product {
  const variations: ProductVariation[] = (data.variations && data.variations.length > 0)
    ? data.variations
    : (() => {
        const sizes = data.sizes || ['Standard'];
        const colors = data.colors || [{ name: 'Default', hex: '#111111' }];
        const generated: ProductVariation[] = [];
        let varId = data.id * 100 + 1;

        colors.forEach((col, cIdx) => {
          sizes.forEach((sz, sIdx) => {
            const sizePriceDelta = sz === 'XL' || sz === '44' || sz === '6x9' ? 200 : (sz === 'XXL' ? 400 : 0);
            const varPrice = data.price + sizePriceDelta;
            const varOriginalPrice = data.original_price ? (data.original_price + sizePriceDelta) : varPrice;

            generated.push({
              id: varId++,
              product_id: varId,
              name: `${data.name} - ${col.name} / ${sz}`,
              sku: `${data.sku}-${col.name.substring(0, 3).toUpperCase()}-${sz}`,
              price: varPrice,
              get formatted_price() {
                return formatPrice(varPrice);
              },
              original_price: varOriginalPrice,
              get formatted_original_price() {
                return formatPrice(varOriginalPrice);
              },
              quantity: Math.max(2, (data.quantity || 10) - (cIdx * 2 + sIdx)),
              is_out_of_stock: false,
              stock_status_label: 'In Stock',
              is_default: cIdx === 0 && sIdx === 0,
              attributes: {
                color: col.name,
                size: sz,
              },
              selected_attributes: [
                { id: 100 + cIdx, title: col.name, slug: col.name.toLowerCase().replace(/\s+/g, '-'), set_slug: 'color', set_id: 1, color: col.hex },
                { id: 200 + sIdx, title: sz, slug: sz.toLowerCase().replace(/\s+/g, '-'), set_slug: 'size', set_id: 2 },
              ],
            });
          });
        });

        return generated;
      })();

  return {
    ...data,
    variations,
    get price_formatted() {
      return formatPrice(data.price);
    },
    get original_price_formatted() {
      return data.original_price ? formatPrice(data.original_price) : '';
    },
  };
}

export const MOCK_PRODUCTS: Product[] = [
  mockProduct({
    id: 101,
    slug: 'heavyweight-boxy-tee-raw-mineral',
    name: '290 GSM Heavyweight Boxy Tee',
    sku: 'TEE-BOX-001',
    description: 'Crafted from 100% Peruvian organic combed cotton with dropped shoulders and a dense 1x1 rib collar that retains shape.',
    content: `<p>Our signature silhouette. The 290 GSM jersey provides a sculptural, architectural drape that stays away from the body.</p><ul><li>Pre-shrunk organic cotton</li><li>Dense 3cm shape-retaining collar</li><li>Blind stitched hems</li><li>Crafted in limited small batches</li></ul>`,
    price: 1899,
    original_price: 2499,
    is_out_of_stock: false,
    quantity: 24,
    image_url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=900&q=85',
    hover_image_url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1000&q=85',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1000&q=85',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1000&q=85',
    ],
    category: {
      id: 1,
      name: 'Oversized Tees',
      slug: 'oversized-tees',
    },
    badge: 'BESTSELLER',
    reviews_avg: 4.9,
    reviews_count: 84,
    colors: [
      { name: 'Mineral Stone', hex: '#D1CCC0', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=900&q=85' },
      { name: 'Washed Obsidian', hex: '#1C1C1E', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=900&q=85' },
      { name: 'Sage Clay', hex: '#8F9779', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=900&q=85' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    fabric: '100% Combed Organic Cotton (290 GSM)',
    fit: 'Signature Boxy Relaxed Fit',
    model_info: 'Model is 6\'1" (185 cm) wearing size L',
  }),
  mockProduct({
    id: 102,
    slug: 'french-terry-hoodie-washed-black',
    name: 'Brushed French Terry Hoodie',
    sku: 'HOD-TER-002',
    description: 'Substantial 460 GSM cotton loopback french terry with seamless kangaroo pocket and double-layered hood.',
    content: `<p>The definitive luxury hoodie. Developed without drawstring hardware for a clean, sculptural aesthetic. Finished with custom ribbed side gussets for fluid movement.</p>`,
    price: 3499,
    original_price: 4299,
    is_out_of_stock: false,
    quantity: 12,
    image_url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=900&q=85',
    hover_image_url: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1000&q=85',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=1000&q=85',
    ],
    category: {
      id: 2,
      name: 'Heavy Knitwear',
      slug: 'knitwear',
    },
    badge: 'NEW DROP',
    reviews_avg: 4.8,
    reviews_count: 56,
    colors: [
      { name: 'Onyx Black', hex: '#111111' },
      { name: 'Muted Taupe', hex: '#B8A99A' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: '460 GSM Heavyweight French Terry',
    fit: 'Oversized Boxy Silhouette',
    model_info: 'Model is 5\'11" (180 cm) wearing size M',
  }),
  mockProduct({
    id: 103,
    slug: 'fluid-wide-leg-pleated-trousers',
    name: 'Fluid Double-Pleat Trousers',
    sku: 'TRO-FL-003',
    description: 'High-waisted tailored trousers featuring double inverted pleats and a relaxed wide leg drape.',
    content: `<p>Crafted in custom fluid wool-blend twill that resists creases and holds its sculptural silhouette through long days.</p>`,
    price: 3899,
    original_price: 4999,
    is_out_of_stock: false,
    quantity: 15,
    image_url: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=900&q=85',
    hover_image_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=1000&q=85',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1000&q=85',
    ],
    category: {
      id: 3,
      name: 'Pleated Trousers',
      slug: 'trousers',
    },
    badge: 'LIMITED',
    reviews_avg: 5.0,
    reviews_count: 32,
    colors: [
      { name: 'Charcoal Grey', hex: '#374151' },
      { name: 'Desert Sand', hex: '#D2B48C' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: '65% Rayon, 35% Tropical Wool Twill',
    fit: 'Relaxed Tailored Fit with Wide Leg',
    model_info: 'Model is 6\'2" (188 cm) wearing waist 32',
  }),
  mockProduct({
    id: 104,
    slug: 'wool-cashmere-overcoat-camel',
    name: 'Minimalist Single-Breasted Trench',
    sku: 'COT-TRN-004',
    description: 'Water-resistant bonded gabardine cotton with concealed horn button placket and storm flap collar.',
    content: `<p>The definitive city coat. Engineered for effortless layering over heavy knitwear or tailored suiting.</p>`,
    price: 6499,
    original_price: 7999,
    is_out_of_stock: false,
    quantity: 8,
    image_url: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=900&q=85',
    hover_image_url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?w=1000&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&q=85',
    ],
    category: {
      id: 4,
      name: 'Outerwear & Coats',
      slug: 'outerwear',
    },
    badge: 'PREMIUM',
    reviews_avg: 4.9,
    reviews_count: 27,
    colors: [
      { name: 'Heritage Camel', hex: '#C19A6B' },
      { name: 'Midnight Navy', hex: '#1E293B' },
    ],
    sizes: ['M', 'L', 'XL'],
    fabric: 'Water-repellent Bonded Cotton Gabardine',
    fit: 'Generous Structured Oversize',
    model_info: 'Model is 6\'1" (185 cm) wearing size L',
  }),
  mockProduct({
    id: 105,
    slug: 'ribbed-merino-wool-crewneck',
    name: 'Extra-Fine Merino Wool Knit',
    sku: 'KNT-MER-005',
    description: 'Spun from 19.5-micron Italian merino wool yarn. Super soft on bare skin with natural thermo-regulating qualities.',
    content: `<p>Breathable, lightweight yet insulating. Ribbed collar, cuffs, and hem with seamless raglan sleeves.</p>`,
    price: 2999,
    original_price: 3699,
    is_out_of_stock: false,
    quantity: 14,
    image_url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=900&q=85',
    hover_image_url: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1000&q=85',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=1000&q=85',
    ],
    category: {
      id: 2,
      name: 'Heavy Knitwear',
      slug: 'knitwear',
    },
    badge: 'POPULAR',
    reviews_avg: 4.9,
    reviews_count: 41,
    colors: [
      { name: 'Oatmeal Melange', hex: '#E6DEC9' },
      { name: 'Olive Drab', hex: '#556B2F' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    fabric: '100% Extra-Fine Merino Wool',
    fit: 'Modern Regular Fit',
    model_info: 'Model is 6\'0" (183 cm) wearing size M',
  }),
  mockProduct({
    id: 106,
    slug: 'japanese-selvedge-denim-jacket',
    name: '14oz Raw Selvedge Trucker Jacket',
    sku: 'JKT-SLV-006',
    description: 'Woven on vintage shuttle looms using ring-spun cotton yarns. Features custom antique silver hardware.',
    content: `<p>Pure indigo dyed selvedge jacket designed to develop personal fades and patina unique to your journey over years of wear.</p>`,
    price: 4999,
    original_price: 5999,
    is_out_of_stock: false,
    quantity: 7,
    image_url: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=900&q=85',
    hover_image_url: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=1000&q=85',
      'https://images.unsplash.com/photo-1544441893-675973e31985?w=1000&q=85',
    ],
    category: {
      id: 4,
      name: 'Outerwear & Coats',
      slug: 'outerwear',
    },
    badge: 'ARCHIVE',
    reviews_avg: 5.0,
    reviews_count: 19,
    colors: [
      { name: 'Raw Deep Indigo', hex: '#1C2E4A' },
    ],
    sizes: ['S', 'M', 'L'],
    fabric: '14oz 100% Cotton Raw Selvedge Denim',
    fit: 'Vintage Boxy Trucker Cut',
    model_info: 'Model is 6\'1" (185 cm) wearing size L',
  }),
  mockProduct({
    id: 107,
    slug: 'heavyweight-ribbed-merino-socks',
    name: 'Heavy Ribbed Merino Crew Socks',
    sku: 'ACC-SOX-007',
    description: 'Cushioned footbed with gentle arch compression in pure unbleached Australian merino wool.',
    content: `<p>Engineered for high comfort inside leather boots or casual sneakers. Seamless toe closure prevents friction.</p>`,
    price: 699,
    original_price: 999,
    is_out_of_stock: false,
    quantity: 35,
    image_url: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=900&q=85',
    hover_image_url: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=1000&q=85',
    ],
    category: {
      id: 5,
      name: 'Accessories & Leather',
      slug: 'accessories',
    },
    badge: 'ESSENTIAL',
    reviews_avg: 4.9,
    reviews_count: 62,
    colors: [
      { name: 'Ecru Chalk', hex: '#F3EFE0' },
      { name: 'Heather Grey', hex: '#9E9E9E' },
    ],
    sizes: ['One Size'],
    fabric: '85% Merino Wool, 12% Polyamide, 3% Elastane',
    fit: 'Comfort Crew Length',
  }),
  mockProduct({
    id: 108,
    slug: 'washed-canvas-market-tote',
    name: 'Heavy 18oz Washed Canvas Market Tote',
    sku: 'ACC-BAG-008',
    description: 'Structured everyday tote bag cut from dense 18oz organic duck canvas with reinforced vegetable-tanned leather handles.',
    content: `<p>Roomy interior with magnetic closure and padded laptop compartment fitting up to 16-inch devices.</p>`,
    price: 1499,
    original_price: 1899,
    is_out_of_stock: false,
    quantity: 18,
    image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=900&q=85',
    hover_image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=1000&q=85',
    ],
    category: {
      id: 5,
      name: 'Accessories & Leather',
      slug: 'accessories',
    },
    badge: 'ICONIC',
    reviews_avg: 5.0,
    reviews_count: 38,
    colors: [
      { name: 'Raw Natural Canvas', hex: '#EAE6DF' },
      { name: 'Washed Black', hex: '#222222' },
    ],
    sizes: ['One Size'],
    fabric: '18oz 100% Organic Cotton Duck Canvas',
    fit: 'Generous Capacity (24L)',
  }),
];
