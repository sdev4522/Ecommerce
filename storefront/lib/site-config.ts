const BOTBLE_API_URL = process.env.NEXT_PUBLIC_BOTBLE_API_URL || 'http://localhost:8000/api/v1';
const BOTBLE_URL = process.env.NEXT_PUBLIC_BOTBLE_URL || 'http://localhost:8000';
const BOTBLE_API_KEY = typeof window === 'undefined' ? (process.env.BOTBLE_API_KEY || '') : '';

export interface SocialLink {
  name: string;
  icon: string;
  url: string;
  color?: string;
}

export interface HeaderMessage {
  icon?: string;
  message: string;
  link?: string | null;
  link_text?: string | null;
}

export interface ContactInfoBox {
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface SEOSettings {
  seo_title?: string;
  seo_description?: string;
  seo_og_image?: string | null;
  seo_index?: boolean;
}

export interface WebsiteTracking {
  google_tag_manager_type?: 'gtm' | 'id' | 'custom' | 'code' | null;
  google_tag_manager_id?: string | null;
  gtm_container_id?: string | null;
  custom_tracking_header_js?: string | null;
  custom_tracking_body_html?: string | null;
  gtm_debug_mode?: boolean;
  is_gtm_enabled?: boolean;
}

import type { CurrencyConfig } from './types';
import { DEFAULT_CURRENCY_CONFIG, setActiveCurrencyConfig } from './utils';

export interface SiteSettings {
  site_title: string;
  show_site_name?: boolean;
  site_title_separator?: string;
  logo?: string | null;
  logo_light?: string | null;
  favicon?: string | null;
  copyright: string;
  address?: string;
  hotline?: string;
  phone?: string;
  contact_email?: string;
  working_hours?: string;
  social_links: SocialLink[];
  header_messages: HeaderMessage[];
  contact_info_boxes: ContactInfoBox[];
  seo: SEOSettings;
  tracking: WebsiteTracking;
  currency: CurrencyConfig;
}

export interface MenuItem {
  id: number;
  title: string;
  url: string;
  target?: string;
  icon_font?: string | null;
  css_class?: string | null;
  order: number;
  children: MenuItem[];
}

export interface MenuData {
  id: number;
  name: string;
  slug: string;
  items: MenuItem[];
}

export interface CMSPage {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  content: string;
  image?: string | null;
  template?: string;
  status: string;
  seo?: {
    title?: string;
    description?: string | null;
    image?: string | null;
  };
  created_at?: string;
  updated_at?: string;
}

export interface HeroSlideItem {
  id: number;
  title: string;
  description?: string;
  subtitle?: string;
  highlight_text?: string;
  image: string;
  link?: string;
  button_text?: string;
  order?: number;
}

// Default Fallback Settings
export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  site_title: 'LUNE',
  show_site_name: false,
  site_title_separator: '-',
  logo: null,
  logo_light: null,
  favicon: null,
  copyright: `Copyright © ${new Date().getFullYear()} LUNE. All rights reserved.`,
  address: 'Mumbai, Maharashtra, India',
  hotline: '+91 (022) 4982-0190',
  phone: '+91 (022) 4982-0190',
  contact_email: 'care@lune.in',
  working_hours: '10:00 - 19:00, Mon - Sat',
  social_links: [
    { name: 'Instagram', icon: 'fab fa-instagram', url: 'https://www.instagram.com/', color: '#E1306C' },
    { name: 'Facebook', icon: 'fab fa-facebook-f', url: 'https://www.facebook.com/', color: '#3b5999' },
    { name: 'Pinterest', icon: 'fab fa-pinterest', url: 'https://www.pinterest.com/', color: '#cb2027' },
  ],
  header_messages: [
    {
      icon: 'fa fa-truck',
      message: 'Complimentary express shipping on qualifying orders',
      link: '/shop',
      link_text: 'Shop now',
    },
    {
      icon: 'fa fa-tag',
      message: 'Use code <b>WELCOME10</b> for 10% off your first order',
      link: null,
      link_text: null,
    },
    {
      icon: 'fa fa-shield-alt',
      message: 'Cash on Delivery & Instant UPI available across India',
      link: '/shop',
      link_text: 'Explore edit',
    },
  ],
  contact_info_boxes: [
    {
      name: 'Customer Concierge',
      address: 'Mumbai, Maharashtra, India',
      phone: '+91 (022) 4982-0190',
      email: 'care@lune.in',
    },
  ],
  seo: {
    seo_title: 'LUNE',
    seo_description: 'Thoughtful women\'s fashion designed for everyday confidence and effortless styling.',
    seo_og_image: null,
    seo_index: true,
  },
  tracking: {
    google_tag_manager_type: null,
    google_tag_manager_id: null,
    gtm_container_id: null,
    custom_tracking_header_js: null,
    custom_tracking_body_html: null,
    gtm_debug_mode: false,
    is_gtm_enabled: false,
  },
  currency: DEFAULT_CURRENCY_CONFIG,
};

/**
 * Normalizes any media URL to point to Botble's storage URL
 */
export function getMediaUrl(path?: string | null): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) {
    // If it points to backend without port 8000, adjust if needed
    if (path.includes('localhost/storage')) {
      return path.replace('localhost/storage', 'localhost:8000/storage');
    }
    return path;
  }
  const clean = path.startsWith('/') ? path.slice(1) : path;
  if (clean.startsWith('storage/')) {
    return `${BOTBLE_URL}/${clean}`;
  }
  return `${BOTBLE_URL}/storage/${clean}`;
}

/**
 * Normalizes Website Tracking configuration received from Botble CMS.
 * Handles auto-detection of tracking mode, cleans whitespace, strips empty values,
 * and ensures mutual exclusion.
 */
export function normalizeWebsiteTracking(raw?: Partial<WebsiteTracking> | null): WebsiteTracking {
  if (!raw) {
    return {
      google_tag_manager_type: null,
      google_tag_manager_id: null,
      gtm_container_id: null,
      custom_tracking_header_js: null,
      custom_tracking_body_html: null,
      gtm_debug_mode: false,
      is_gtm_enabled: false,
    };
  }

  const cleanGtmContainerId = raw.gtm_container_id?.trim() || null;
  const cleanGaId = raw.google_tag_manager_id?.trim() || null;
  const cleanHeaderJs = raw.custom_tracking_header_js?.trim() || null;
  const cleanBodyHtml = raw.custom_tracking_body_html?.trim() || null;
  const debugMode = Boolean(raw.gtm_debug_mode);

  // Normalize type
  let type: 'gtm' | 'id' | 'custom' | null = null;
  const rawType = (raw.google_tag_manager_type?.trim() || '').toLowerCase();

  if (rawType === 'gtm') {
    type = 'gtm';
  } else if (rawType === 'id') {
    type = 'id';
  } else if (rawType === 'custom' || rawType === 'code') {
    type = 'custom';
  } else {
    // Auto-detection fallback if type is empty or unset in CMS
    if (cleanGtmContainerId) {
      type = 'gtm';
    } else if (cleanHeaderJs || cleanBodyHtml) {
      type = 'custom';
    } else if (cleanGaId) {
      type = 'id';
    }
  }

  // Determine enabled state based on resolved type and corresponding ID/script presence
  let isEnabled = false;
  if (type === 'gtm') {
    isEnabled = Boolean(cleanGtmContainerId);
  } else if (type === 'id') {
    isEnabled = Boolean(cleanGaId);
  } else if (type === 'custom') {
    isEnabled = Boolean(cleanHeaderJs || cleanBodyHtml);
  }

  return {
    google_tag_manager_type: type,
    google_tag_manager_id: cleanGaId,
    gtm_container_id: cleanGtmContainerId,
    custom_tracking_header_js: cleanHeaderJs,
    custom_tracking_body_html: cleanBodyHtml,
    gtm_debug_mode: debugMode,
    is_gtm_enabled: isEnabled,
  };
}

/**
 * Fetch dynamic site settings from Botble CMS
 */
export async function getSiteSettings(options?: { bypassCache?: boolean }): Promise<SiteSettings> {
  const isDev = process.env.NODE_ENV === 'development';
  const shouldBypass = options?.bypassCache || isDev;

  try {
    const fetchOptions: RequestInit = {
      headers: {
        'Accept': 'application/json',
        ...(BOTBLE_API_KEY ? { 'X-API-KEY': BOTBLE_API_KEY } : {}),
      },
      // In development mode, bypass caching to immediately reflect Admin changes.
      // In production, keep 30-second ISR caching with cache tags for on-demand revalidation.
      ...(shouldBypass
        ? { cache: 'no-store' }
        : { next: { revalidate: 30, tags: ['site-settings', 'website-tracking'] } }),
    };

    const res = await fetch(`${BOTBLE_API_URL}/site-settings`, fetchOptions);

    if (res.ok) {
      const json = await res.json();
      if (json.data && !json.error) {
        const resolvedCurrency: CurrencyConfig = json.data.currency ? {
          ...DEFAULT_CURRENCY_CONFIG,
          ...json.data.currency,
        } : DEFAULT_CURRENCY_CONFIG;

        setActiveCurrencyConfig(resolvedCurrency);

        return {
          ...DEFAULT_SITE_SETTINGS,
          ...json.data,
          currency: resolvedCurrency,
          logo: json.data.logo ? getMediaUrl(json.data.logo) : null,
          logo_light: json.data.logo_light ? getMediaUrl(json.data.logo_light) : null,
          favicon: json.data.favicon ? getMediaUrl(json.data.favicon) : null,
          seo: {
            ...DEFAULT_SITE_SETTINGS.seo,
            ...json.data.seo,
            seo_og_image: json.data.seo?.seo_og_image ? getMediaUrl(json.data.seo.seo_og_image) : null,
          },
          tracking: normalizeWebsiteTracking(json.data.tracking),
        };
      }
    }
  } catch (err) {
    console.warn('[getSiteSettings] Failed to fetch live settings from Botble, using fallback:', err);
  }

  setActiveCurrencyConfig(DEFAULT_CURRENCY_CONFIG);
  return DEFAULT_SITE_SETTINGS;
}

/**
 * Dedicated helper to fetch only Website Tracking configuration
 */
export async function getWebsiteTracking(options?: { bypassCache?: boolean }): Promise<WebsiteTracking> {
  const settings = await getSiteSettings(options);
  return settings.tracking;
}

/**
 * Fetch a navigation menu by slug
 */
export async function getMenuBySlug(slug: string = 'main-menu'): Promise<MenuItem[]> {
  try {
    const res = await fetch(`${BOTBLE_API_URL}/menus/${encodeURIComponent(slug)}`, {
      headers: {
        'Accept': 'application/json',
        'X-API-KEY': BOTBLE_API_KEY,
      },
      next: { revalidate: 30, tags: [`menu-${slug}`] },
    });

    if (res.ok) {
      const json = await res.json();
      if (json.data?.items && Array.isArray(json.data.items)) {
        return json.data.items;
      }
    }
  } catch (err) {
    console.warn(`[getMenuBySlug] Failed to fetch menu [${slug}] from Botble:`, err);
  }

  return [];
}

/**
 * Fetch all menus keyed by slug
 */
export async function getMenus(): Promise<Record<string, MenuData>> {
  try {
    const res = await fetch(`${BOTBLE_API_URL}/menus`, {
      headers: {
        'Accept': 'application/json',
        'X-API-KEY': BOTBLE_API_KEY,
      },
      next: { revalidate: 30, tags: ['menus'] },
    });

    if (res.ok) {
      const json = await res.json();
      if (json.data && typeof json.data === 'object') {
        return json.data;
      }
    }
  } catch (err) {
    console.warn('[getMenus] Failed to fetch all menus from Botble:', err);
  }

  return {};
}

/**
 * Fetch a CMS page by slug
 */
export async function getCMSPageBySlug(slug: string): Promise<CMSPage | null> {
  try {
    const res = await fetch(`${BOTBLE_API_URL}/pages/by-slug/${encodeURIComponent(slug)}`, {
      headers: {
        'Accept': 'application/json',
        'X-API-KEY': BOTBLE_API_KEY,
      },
      next: { revalidate: 60, tags: [`page-${slug}`] },
    });

    if (res.ok) {
      const json = await res.json();
      if (json.data && !json.error) {
        return {
          ...json.data,
          image: json.data.image ? getMediaUrl(json.data.image) : null,
          seo: {
            ...json.data.seo,
            image: json.data.seo?.image ? getMediaUrl(json.data.seo.image) : null,
          },
        };
      }
    }
  } catch (err) {
    console.warn(`[getCMSPageBySlug] Failed to fetch page [${slug}] from Botble:`, err);
  }

  return null;
}

/**
 * Fetch home slider slides from Botble Simple Slider API
 */
export async function getHeroSliders(key: string = 'home-slider-1'): Promise<HeroSlideItem[]> {
  try {
    const res = await fetch(`${BOTBLE_API_URL}/simple-sliders`, {
      headers: {
        'Accept': 'application/json',
        'X-API-KEY': BOTBLE_API_KEY,
      },
      next: { revalidate: 30, tags: ['sliders'] },
    });

    if (res.ok) {
      const json = await res.json();
      const sliders = Array.isArray(json?.data) ? json.data : [];
      const found = sliders.find((s: any) => s.key === key) || sliders[0];
      if (found && Array.isArray(found.items) && found.items.length > 0) {
        return found.items.map((item: any) => ({
          id: item.id,
          title: item.title || 'Curated Collection',
          description: item.description || '',
          subtitle: item.subtitle || '',
          highlight_text: item.highlight_text || '',
          image: getMediaUrl(item.image),
          link: item.link || '/products',
          button_text: item.button_text || 'Shop now',
          order: item.order || 0,
        }));
      }
    }
  } catch (err) {
    console.warn('[getHeroSliders] Failed to fetch sliders from Botble:', err);
  }

  return [];
}
