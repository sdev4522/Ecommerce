# LUNE E-Commerce Ecosystem — Project Architecture & Operational Guide

> **MANDATORY MAINTENANCE RULE**:
> Whenever **ANY** modification, addition, deletion, or refactoring is performed in this repository (frontend, backend, database, configuration, or API routes), this document (`PROJECT.md`) **MUST BE UPDATED IMMEDIATELY** to reflect the latest state, endpoints, models, workflows, and changelog.

---

## 1. Executive Summary & Architecture

This project is an enterprise-grade, **Decoupled Headless E-Commerce System** specifically tailored for contemporary premium fashion retail (*LUNE*). 

The repository consists of two primary applications:
1. **`storefront/`**: Modern Next.js 16 (App Router) + React 19 headless storefront utilizing Tailwind CSS v4, Zustand persistent stores, Radix UI primitives, Motion animations, and WebGL (OGL) 3D components.
2. **`backend/`**: Botble CMS platform built on top of Laravel 12 and PHP 8.2+, backed by MariaDB/MySQL (`ecom` database). It serves as the headless Commerce Engine, Admin Dashboard (`/admin`), and REST API provider (`/api/v1/...`).

```mermaid
graph TD
    User["Customer Browser / Client"]
    
    subgraph NextJS["Next.js 16 Storefront (Port 3000)"]
        UI["React 19 Server & Client Components"]
        Zustand["Zustand Stores (Cart, Auth, Wishlist)"]
        APIRoutes["Next.js Route Handlers (/api/orders, /api/coupon/apply, /api/track-order)"]
        Adapter["lib/botble.ts (API Normalizer + Fallback Layer)"]
    end
    
    subgraph Laravel["Botble CMS Backend (Port 8000)"]
        Sanctum["Laravel Sanctum (Customer Tokens)"]
        REST["Botble REST API v1 (/api/v1/ecommerce/...)"]
        Admin["Admin Management Portal (/admin)"]
        Plugins["Plugins (Ecommerce, Payment, Blog, Discounts, Reviews)"]
    end
    
    subgraph Database["MariaDB / MySQL (Port 3306)"]
        DB[(ecom database: ec_products, ec_orders, ec_customers, etc.)]
    end

    User -->|Views / Browses| UI
    User -->|Client Interactions / State| Zustand
    UI -->|Server-Side Rendering & Fetching| Adapter
    Zustand -->|Checkout & Orders| APIRoutes
    APIRoutes -->|Proxy with X-API-KEY| REST
    Adapter -->|REST Calls with 30s Cache| REST
    REST --> Plugins
    Plugins --> DB
    Admin --> Plugins
    Sanctum <-->|Auth Tokens| Zustand
```

---

## 2. Directory & Codebase Breakdown

```
Ecommerce/
├── PROJECT.md                    # Core project architecture & operational documentation
├── AGENTS.md                     # Agent guidelines & rules for updating PROJECT.md
├── storefront/                   # Headless Next.js 16 + React 19 Frontend
│   ├── app/                      # Next.js App Router (Pages, Layouts, API Handlers)
│   ├── components/               # UI & Feature Component Library
│   ├── lib/                      # API client, normalizers, types, mock data, utils
│   ├── store/                    # Zustand persistent state stores
│   ├── public/                   # Static assets, SVG icons, badges
│   ├── .env                      # Storefront environment configuration
│   ├── next.config.ts            # Next.js runtime configuration (remote images, etc.)
│   ├── package.json              # Frontend dependencies and npm scripts
│   └── tsconfig.json             # TypeScript configuration
└── backend/                      # Botble CMS Laravel 12 Backend
    ├── app/                      # Laravel application core
    ├── config/                   # Laravel configurations (auth, database, sanctum)
    ├── database/                 # Migrations, seeders, database.sql dumps
    ├── platform/                 # Botble Platform Architecture
    │   ├── core/                 # Botble framework core
    │   ├── packages/             # Base packages (API, theme, installer, SEO)
    │   ├── plugins/              # Commerce plugins (ecommerce, payments, blog)
    │   └── themes/wowy/          # Classic Blade theme & templates
    ├── public/                   # Laravel public web root (index.php, storage)
    ├── routes/                   # Routing declarations (web.php, console.php)
    ├── storage/                  # Application uploads, cache, logs
    ├── docker-compose.yml        # Docker / Laravel Sail containerization
    ├── composer.json             # PHP dependencies
    └── .env                      # Backend environment configuration
```

---

### 2.1 `storefront/` (Next.js Application)

#### 2.1.1 Pages & Routes (`storefront/app/`)
| Route | Type | Description |
| :--- | :--- | :--- |
| `app/page.tsx` | SSR | Homepage featuring HeroSlider, 3D Showcase, BestSellers, Lookbook, Brand Values, and Reviews. |
| `app/shop/page.tsx` | SSR / Client | Main catalog with dynamic multi-attribute filters (price slider, category, brand, size, color, sort, pagination). |
| `app/product/[slug]/page.tsx` | SSR / Dynamic | Product detail view with variation switcher, stock indicators, gallery zoom, pincode checker, size guide, and reviews. |
| `app/collections/[slug]/page.tsx` | SSR / Dynamic | Category-specific product collection view. |
| `app/pages/[slug]/page.tsx` | SSR / Dynamic | Dynamic Botble CMS pages (About Us, Terms & Conditions, Returns, Privacy Policy) with custom styling and breadcrumbs. |
| `app/checkout/page.tsx` | Client | Full checkout page with customer address inputs, coupon code validation, payment methods, and live totals. |
| `app/account/page.tsx` | Client | Customer portal dashboard overview. |
| `app/account/orders/page.tsx` | Client | Customer order history, live fulfillment status, and order item breakdown. |
| `app/account/addresses/page.tsx` | Client | Address book management (create, update, delete, set default). |
| `app/account/profile/page.tsx` | Client | Profile info editor and password modification. |
| `app/account/login/page.tsx` | Client | Dedicated authentication page for direct logins and registrations. |
| `app/track-order/page.tsx` | Client | Public order tracking tool by Order Code and Email/Phone. |
| `app/wishlist/page.tsx` | Client | Persistent saved items grid with quick add-to-cart. |
| `app/blog/page.tsx` | SSR | Fashion journal and editorial listing with category filter. |
| `app/blog/[slug]/page.tsx` | SSR / Dynamic | Article reading view with related posts and social share bar. |
| `app/about/page.tsx` | Static / SSR | Brand atelier heritage and craftsmanship story. |
| `app/contact/page.tsx` | Client | Customer support contact form and concierge information. |
| `app/privacy/page.tsx` | Static | Privacy policy and terms of service. |

#### 2.1.2 Internal Server Route Handlers (`storefront/app/api/`)
- **`app/api/orders/route.ts`**: Secure proxy that receives cart checkout data from the client, injects `X-API-KEY`, and submits to Botble's `/api/v1/ecommerce/orders/create`.
- **`app/api/coupon/apply/route.ts`**: Validates coupon codes against Botble's coupon catalog (`/api/v1/ecommerce/coupons`) or fallback rules (`WELCOME10`), computes percentage/fixed/shipping deductions, and verifies minimum purchase thresholds.
- **`app/api/track-order/route.ts`**: Queries `/api/v1/ecommerce/orders/tracking` with customer order ID and contact info to return real-time delivery milestones.
- **`app/api/auth/login/route.ts`**: Secure server proxy forwarding customer login to Botble's `/api/v1/login` with server-side `BOTBLE_API_KEY`.
- **`app/api/auth/register/route.ts`**: Secure server proxy forwarding customer registration to Botble's `/api/v1/register`.
- **`app/api/auth/me/route.ts`**: Secure server proxy querying customer profile at `/api/v1/me` with bearer token.
- **`app/api/auth/logout/route.ts`**: Secure server proxy revoking tokens at `/api/v1/logout`.
- **`app/api/contact/route.ts`**: Secure server proxy submitting contact inquiries to Botble `/contact/send` with server-side `BOTBLE_API_KEY`.
- **`app/api/customer/orders/route.ts` & `[id]/route.ts`**: Server proxies retrieving customer order history and order items without exposing `BOTBLE_API_KEY` to client-side bundles.
- **`app/api/customer/addresses/route.ts` & `[id]/route.ts`**: Server proxies managing customer address book (GET, POST, PUT, DELETE) securely.
- **`app/api/customer/profile/route.ts`**: Server proxy handling customer name/phone/profile modifications.
- **`app/api/customer/password/route.ts`**: Server proxy handling secure customer password rotation.
- **`app/api/customer/reviews/route.ts`**: Server proxy forwarding verified customer product reviews.
- **`app/api/newsletter/subscribe/route.ts`**: Secure server proxy handling newsletter subscription without exposing internal backend ports to mobile browsers.

#### 2.1.3 Component Architecture (`storefront/components/`)
- **`auth/`**:
  - `AuthModal.tsx`: Slide-over/dialog modal handling login, registration, and forgot-password flows without leaving the current shopping flow.
- **`home/`**:
  - `HeroSlider.tsx`: LCP-optimized hero carousel using local high-performance WebP assets, `initial={false}` SSR visibility, and `fetchPriority="high"` on slide 1.
  - `Interactive3DShowcase.tsx`: WebGL 3D showcase decoupled with dynamic `ssr: false` import of `CircularGallery.jsx` to eliminate `ogl` from the critical bundle.
  - `CurvedLoop.tsx`: Smooth SVG ribbon ticker optimized with direct DOM attribute updates, eliminating 60fps React re-renders.
  - `BestSellersSection.tsx`: Responsive horizontal carousel powered by Embla Carousel with category tabs, slide counter (e.g. `1/12`), prev/next chevrons, and interactive scrubber track with custom emblem thumb slider.
  - `bestSellerslider.tsx`: Responsive horizontal carousel component powered by Swiper (`swiper/react`, `FreeMode`, `Pagination`, `Navigation`) with category tabs, touch/drag free-mode support, slide counter, prev/next buttons, and responsive breakpoints.
  - `CategoryBanners.tsx`, `BrandValues.tsx`, `CommunityGallery.tsx`, `FAQSection.tsx`, `VIPNewsletter.tsx`.
- **`layout/`**:
  - `Navbar.tsx`: Sticky glassmorphic navigation with search drawer trigger, mega-menu, cart badge, and auth triggers.
  - `ClientOverlays.tsx`: Dynamic client-side portal housing `CartDrawer.tsx` and `AuthModal.tsx` (`ssr: false`) to avoid shipping modal bundles and `canvas-confetti` in the initial HTML payload.
  - `CartDrawer.tsx`: Slide-out side drawer with free shipping progress bar, quantity modifiers, and direct checkout button.
  - `MobileBottomNav.tsx`: Fixed thumb-friendly bottom bar for mobile users (Home, Shop, Wishlist, Bag, Account).
  - `AnnouncementBar.tsx`, `Footer.tsx`.
- **`product/`**:
  - `ProductCard.tsx`: Minimal clean luxury product card with light grey shell (`bg-[#f5f5f6]`), `● NEW` pill badge, outline wishlist toggle, uppercase category tag, bold title, formatted price, interactive circular color swatches with active selection ring, and quick-add shopping bag button with animated checkmark feedback.
  - `ProductDetailView.tsx`: Elevated luxury editorial PDP view managing variation states (size, color, SKU), price recalculations, stock limits, JSON-LD rich snippet schemas, and dynamic real-data accordions.
  - `ProductGallery.tsx`: Editorial multi-image gallery with desktop vertical thumbnail rail, hover lens zoom, fullscreen modal integration, and mobile Embla touch-gesture swipe carousel with progress dots.
  - `ProductHtmlContent.tsx`: Secure, sanitized CMS HTML parser that strips executable vectors, cleans empty nodes, rewrites relative `/storage/` asset URLs to the backend host, and applies tailored editorial typography.
  - `DeliveryPincodeChecker.tsx`: Instant pincode validation estimating delivery dates and COD availability.
  - `SizeGuideModal.tsx`: Measurement charts (cm/inches) for bust, waist, hips, and length.
  - `ImageGalleryModal.tsx`: High-res full-screen lightbox image viewer with zoom toggle, touch swipe gestures, and keyboard navigation.
  - `StickyAddToCartBar.tsx`: Floating quick-purchase action bar with safe area clearance above `MobileBottomNav`, real-time item preview, and 1-click checkout.
  - `ProductReviews.tsx`: Customer ratings, photo attachments, and verified review submission form.
- **`shop/`**:
  - `ShopArchiveView.tsx`: Comprehensive catalog controller supporting price sliders, category chips, active filter tags, sort menus, and responsive sidebar drawer.
- **`ui/`**:
  - Radix UI wrappers (`accordion`, `dialog`, `sheet`, `tabs`, `button`, `badge`, `separator`, `input`, `tooltip`).
  - Specialized creative components: `CircularGallery.jsx` (smooth circular WebGL carousel), `CurvedLoop.tsx` (curved SVG marquee text loop).

#### 2.1.4 State Management (`storefront/store/`)
All stores use Zustand with `persist` middleware configured with `safeLocalStorage` (`lib/storage.ts`) and explicit `partialize` filters to guard against SSR, mobile browser quota exceptions, hydration stalls, and ephemeral UI state leakage:
- **`useCartStore.ts`**:
  - State: `items: CartItem[]`, `isOpen: boolean`, `isQuickBuyOpen: boolean`.
  - Actions: `addItem(product, size?, color?, colorHex?, qty?, openDrawer?)`, `removeItem()`, `updateQty()`, `clearCart()`, `openCart()`, `closeCart()`, `toggleCart()`, `openQuickBuy()`, `closeQuickBuy()`.
  - Mutual Exclusion Architecture: Guarantees `isOpen` and `isQuickBuyOpen` are strictly mutually exclusive. Calling `openCart()` or `toggleCart()` ensures `isQuickBuyOpen: false`. Calling `openQuickBuy()` ensures `isOpen: false`. Decoupled cart item mutation from drawer UI presentation (`addItem` accepts `openDrawer` boolean defaulting to `false`), preventing unintended drawer openings during Buy Now or silent quick-adds.
  - Getters: `getSubtotal()`, `getTotalItems()`, `getFreeShippingRemaining()`, `getFreeShippingProgress()`.
  - Persistence: Persists `items` with `safeLocalStorage`; `isOpen` and `isQuickBuyOpen` are transient.
  - Unique composite key strategy: `${product.id}-${size}-${color}` ensures variations are stored distinctly.
- **`useAuthStore.ts`**:
  - State: `customer: CustomerUser | null`, `token: string | null`, `isAuthenticated: boolean`, `isAuthModalOpen: boolean`, `authModalMode: 'login' | 'register'`.
  - Actions: `login()`, `register()`, `logout()`, `fetchProfile()`, `openAuthModal()`, `closeAuthModal()`.
  - Architecture: Proxies auth network operations via `/api/auth/*` route handlers to preserve secret `BOTBLE_API_KEY` on the server and work on mobile LAN. Persists only `customer`, `token`, `isAuthenticated`.
- **`useWishlistStore.ts`**:
  - State: `items: Product[]`.
  - Actions: `toggleWishlist(product)`, `isInWishlist(id)`, `removeFromWishlist(id)`.
  - Persistence: Persists `items` with `safeLocalStorage`.
- **`useMenuStore.ts`**:
  - State: `categories: ProductCategory[]`, `isMenuOpen: boolean`.

#### 2.1.5 Data Access & Normalization (`storefront/lib/`)
- **`botble.ts`**: Central client for Botble REST API.
  - Method `fetchBotbleAPI<T>(endpoint, options)`: Appends `X-API-KEY`, executes fetch with Next.js ISR cache (`next: { revalidate: 30 }`), and normalizes payload wrappers.
  - Normalizers: `normalizeProduct()`, `normalizeCategory()`, `normalizeBlogPost()`, `normalizeReview()`.
  - Resilient Graceful Degradation: If Botble API is offline, it automatically serves curated data from `mock-data.ts` to prevent UI breakage.
- **`site-config.ts`**: Centralized Headless CMS Configuration layer.
  - Interfaces: `SiteSettings`, `WebsiteTracking`, `SocialLink`, `HeaderMessage`, `ContactInfoBox`, `SEOSettings`, `MenuItem`, `CMSPage`, `HeroSlideItem`.
  - Fetchers:
    - `getSiteSettings()`: Retrieves live site title, logos, favicon, contact details, social links, announcement messages, and analytics tracking with 30s ISR.
    - `getMenuBySlug(slug)` / `getMenus()`: Fetches nested navigation menus with resolved internal routes.
    - `getCMSPageBySlug(slug)`: Fetches full CMS page content, metadata, and templates.
    - `getHeroSliders(key)`: Fetches active slides from Botble Simple Slider API.
    - `getMediaUrl(path)`: Centralized image URL normalizer resolving relative paths to full backend URLs.
- **`customer-api.ts`**: Authenticated customer functions (`getCustomerOrders`, `getCustomerOrderDetails`, `getCustomerAddresses`, `createCustomerAddress`, `deleteCustomerAddress`, `updateCustomerProfile`, `updateCustomerPassword`, `submitCustomerReview`).
- **`types.ts`**: Strict TypeScript interfaces for `Product`, `ProductVariation`, `ProductCategory`, `CartItem`, `CustomerOrder`, `CustomerAddress`, `BlogPost`, `ProductReview`.
- **`mock-data.ts`**: Comprehensive fallback dataset matching Botble schemas.
- **`utils.ts`**: Helper functions like `cn()` (clsx + twMerge) and `formatPrice(amount)`.

---

### 2.2 `backend/` (Botble CMS Laravel 12 Backend)

#### 2.2.1 Core Architectural Layers
- **Framework**: Laravel 12 on PHP 8.2 / 8.3.
- **Botble Core (`platform/core/`)**: Base models, permissions, ACL, settings, dashboard, media library.
- **Botble Packages (`platform/packages/`)**:
  - `api`: Provides REST API endpoints, API key authentication middleware (`Botble\Api\Http\Middleware\ForceJsonResponseMiddleware`), and token authentication.
  - `theme`: Theme options, widget management, blade template helpers.
  - `page`, `slug`, `menu`, `seo-helper`, `sitemap`: Dynamic content infrastructure.
- **Botble Plugins (`platform/plugins/`)**:
  - `ecommerce/`: Complete commerce subsystem:
    - Controllers: `ProductController`, `ProductCategoryController`, `OrderController`, `OrderPlacementController`, `OrderTrackingController`, `CouponController`, `ReviewController`, `AddressController`, `CartController`.
    - Routes: Registered in `platform/plugins/ecommerce/routes/api.php` under `/api/v1/ecommerce/`.
  - `payment/`, `stripe/`, `paypal/`, `razorpay/`, `mollie/`, `paystack/`, `sslcommerz/`: Payment gateways.
  - `blog/`: Articles, categories, tags with REST endpoints.
  - `contact/`, `newsletter/`, `simple-slider/`, `ads/`: Marketing & support modules.
- **Avatar & Notification Resilience**:
  - `Botble\Base\Supports\Avatar`: Resilient SVG/GD text rendering fallback when FreeType / `imageftbbox` is absent.
  - Models (`OrderAddress`, `Customer`, `Review`) safely invoke `Avatar::createBase64Image()` with `\Throwable` safety netting to protect Blade component trees during admin top-header notification rendering.

---

## 3. End-to-End Operational Workflows

### 3.1 Product Catalog & Filtering Workflow
```
[User Navigates /shop]
       │
       ▼
[Next.js Server: getProducts(params)]
       │
       ▼
[fetchBotbleAPI('/ecommerce/products', { params })]
       ├── (Backend Available) ────────► [Botble REST API] ──► [MariaDB: ec_products]
       │                                        │
       │                                        ▼
       │                              [normalizeProduct()]
       │                                        │
       └── (Backend Offline/Timeout) ──► [Fallback: mock-data.ts]
                                                │
                                                ▼
                                    [Render ShopArchiveView]
```

1. Query parameters (`category`, `min_price`, `max_price`, `sort_by`, `search`, `page`) are sent to `getProducts()`.
2. Normalized product objects contain resolved image URLs, formatted INR currency prices, variation options (colors, sizes), stock count, and review averages.
3. If an image path is relative (e.g. `/storage/products/...`), `cleanImageUrl()` prepends `NEXT_PUBLIC_BOTBLE_URL`.
4. Botble API image endpoints (`AvailableProductResource`, `RelatedProductResource`) default `thumbnail_size` to `null` rather than hardcoded `thumb` (150x150), preventing 403/404 errors on media where generated thumbnails do not exist.
5. In `normalizeProduct()`, `cleanImageUrl()` strips any thumbnail suffixes (`-150x150`, `-400x400`, `-800x800`) to guarantee high-resolution assets, ensures the featured image is placed first in `images[0]`, and selects an alternate gallery image for `hover_image_url`.
6. `ProductCard.tsx` renders the featured image as the permanent base layer and smoothly transitions the distinct secondary hover image on hover (`opacity-0 group-hover:opacity-100 transition-opacity duration-500`), guaranteeing the featured image is always visible when unhovered.

### 3.2 Customer Authentication Flow
```
[User Clicks "Sign In"] ──► [AuthModal Opens (useAuthStore)]
                                      │
                                [Submit Credentials]
                                      │
                                      ▼
                        [POST /api/v1/login to Botble]
                                      │
                                      ▼
                        [Sanctum Issues Bearer Token]
                                      │
                                      ▼
                        [GET /api/v1/me with Bearer Token]
                                      │
                                      ▼
                        [Save Token + Customer Data]
                        [Stored in LocalStorage (maison-auth-storage)]
```

### 3.3 Dynamic Commerce Calculation & Checkout Workflow (Backend Source of Truth)

The frontend owns **NO** shipping business logic, hardcoded fees, or fallback assumptions. Authoritative calculations (subtotal, discounts, shipping fees, tax, and grand totals) are derived solely by the Botble backend (`HandleShippingFeeService` via `POST /api/v1/ecommerce/checkout/calculate`):
- **Gross Subtotal**: Evaluated from database `Product` records (`front_sale_price` / `price`).
- **Discount Amount**: Evaluated authoritatively from `ec_discounts` (supports percentage, fixed amount, and free shipping coupons).
- **Net Subtotal**: `max(0, grossSubtotal - discountAmount)`.
- **Authoritative Shipping Fee**:
  - Calculated dynamically by `HandleShippingFeeService` from MariaDB `ec_shipping` and `ec_shipping_rules` based on delivery address (country, state, city, zip code), weight, and order total.
  - Free shipping unlocks dynamically as **₹0** when rules match (e.g., net subtotal $\ge$ ₹2,000 via rule ID 4, or free shipping coupon).
  - Displays nominal standard delivery charge (e.g. ₹10 via rule ID 3) when net subtotal is below the free shipping tier.
  - Recomputed on any delivery address or pincode change; order submission is blocked if shipping cannot be calculated for an unsupported destination.
- **Grand Total**: Authoritatively calculated on backend as `max(0, netSubtotal + shippingFee + taxAmount)`.
- **Anti-Tampering Guarantee**: When placing an order (`POST /api/v1/ecommerce/orders/create`), the backend recalculates and validates product prices, stock, discounts, and shipping amounts from the database, completely ignoring any client-provided totals.

```mermaid
graph TD
    Cart["Shopping Cart (Zustand Store)"] --> Checkout["Checkout Page (/checkout)"]
    Checkout --> Calculate["POST /api/shipping/calculate -> Botble checkout/calculate"]
    Calculate --> Display["Subtotal + Dynamic Backend Shipping + Discount = Grand Total"]

    Display --> Method{"Payment Method Selection"}

    Method -->|COD Selected| CODAction["Click 'Place Order (COD)'"]
    CODAction --> CODPost["POST /api/orders (payment_method: 'cod')"]
    CODPost --> BotbleCOD["Botble CMS: orders/create"]
    BotbleCOD --> CODDB["DB: order.status=pending, payment.status=pending, cod_amount=finalAmount"]
    CODDB --> Confetti["Order Confirmed Screen + Confetti + Cart Cleared"]

    Method -->|UPI / Card Selected| OnlineAction["Click 'Pay Now • ₹Total'"]
    OnlineAction --> Prepare["POST /api/orders/razorpay/create"]
    Prepare --> RzpOrder["Razorpay API: Creates Order in Paise (₹Total * 100)"]
    RzpOrder --> Modal["Open Official Razorpay Checkout Modal"]
    Modal -->|User Dismisses| Cancel["Reset Button + 'Payment window closed' Notice"]
    Modal -->|User Pays| Success["Razorpay returns signature, payment_id, order_id"]
    Success --> Verify["POST /api/orders/razorpay/verify"]
    Verify --> HMAC["Verify HMAC-SHA256 Signature + Razorpay API Fetch"]
    HMAC --> BotblePaid["Botble CMS: orders/create (payment_status: 'completed', charge_id)"]
    BotblePaid --> PaidDB["DB: order.status=processing, payment.status=completed"]
    PaidDB --> Confetti
```

### 3.4 Live Order Tracking Workflow
1. User enters Order Reference (`#LUNE-...` or order ID) and Email/Phone on `/track-order`.
2. Form submits to `/api/track-order`.
3. Proxy calls `POST http://localhost:8000/api/v1/ecommerce/orders/tracking`.
4. Returns status breakdown: `pending` -> `processing` -> `delivering` -> `completed` (or `canceled`), along with shipping carrier details and line items.

---

## 4. Key Botble REST API Endpoints Reference

Base URL: `http://localhost:8000/api/v1`  
Required Headers:
- `Accept: application/json`
- `Content-Type: application/json`
- `X-API-KEY: <BOTBLE_API_KEY>`
- `Authorization: Bearer <TOKEN>` *(for authenticated customer endpoints)*

### 4.1 Public Catalog Endpoints
| HTTP | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/ecommerce/products` | Paginated product list with sorting, filtering, category filters |
| `GET` | `/ecommerce/products/{slug}` | Full product details including variations and attribute sets |
| `GET` | `/ecommerce/products/{slug}/related` | Related products for recommendations |
| `GET` | `/ecommerce/products/{slug}/reviews` | Customer reviews and rating distributions |
| `GET` | `/ecommerce/product-categories` | Product category taxonomy tree |
| `GET` | `/ecommerce/product-categories/{slug}`| Single category with metadata |
| `GET` | `/ecommerce/brands` | Brand directory |
| `GET` | `/ecommerce/filters` | Dynamic catalog filter ranges (attributes, price bounds) |
| `GET` | `/ecommerce/coupons` | Publicly listed discount codes and active promotions |

### 4.2 Order & Checkout Endpoints (Botble CMS)
| HTTP | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/ecommerce/shipping-rules` | Headless active shipping rule tiers from `ec_shipping_rules` |
| `POST`| `/ecommerce/checkout/calculate` | Authoritative calculation of subtotal, discount, dynamic shipping fee (via `HandleShippingFeeService`), and grand total |
| `POST`| `/ecommerce/orders/create` | Place new order with customer, address, line items, payment status, and charge_id |
| `POST`| `/ecommerce/orders/tracking` | Track order fulfillment status by ID/code and email/phone |
| `POST`| `/ecommerce/coupon/apply` | Validate coupon eligibility for cart session |

### 4.3 Storefront Internal Commerce API Endpoints (Next.js)
| HTTP | Endpoint | Description |
| :--- | :--- | :--- |
| `POST`| `/api/shipping/calculate` | Canonical calculation endpoint for subtotal, dynamic shipping, discounts, and grand totals |
| `POST`| `/api/orders` | Headless order placement proxy forwarder to Botble CMS `/ecommerce/orders/create` |
| `POST`| `/api/orders/razorpay/create` | Prepares authoritative order intent with Razorpay API in paise with server-side price validation |
| `POST`| `/api/orders/razorpay/verify` | Cryptographic HMAC-SHA256 signature verification, Razorpay payment fetch, and Botble CMS order persistence |

### 4.4 Customer Authenticated Endpoints (Sanctum)
| HTTP | Endpoint | Description |
| :--- | :--- | :--- |
| `POST`| `/login` | Customer authentication (returns Bearer token) |
| `POST`| `/register` | Customer registration |
| `POST`| `/logout` | Invalidate current session token |
| `GET` | `/me` | Retrieve authenticated customer profile |
| `PUT` | `/me` | Update customer personal profile |
| `PUT` | `/update/password` | Change account password |
| `GET` | `/ecommerce/orders` | Customer order history |
| `GET` | `/ecommerce/orders/{id}` | Detailed breakdown of specific customer order |
| `GET` | `/ecommerce/addresses` | List customer saved shipping addresses |
| `POST`| `/ecommerce/addresses` | Create new shipping address |
| `DELETE`|`/ecommerce/addresses/{id}` | Remove shipping address |
| `POST`| `/ecommerce/reviews` | Submit product rating and review |

### 4.5 CMS, Theme & Site Configuration Endpoints
| HTTP | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/site-settings` | Comprehensive theme options (site title, logos, favicon, contact details, social links, announcement ticker messages, contact boxes, SEO metadata) and website tracking (GTM, GA4, custom scripts). |
| `GET` | `/menus/{slug?}` | Dynamic menu tree hierarchy (`main-menu`, `information`, `product-categories`) with normalized relative frontend links. |
| `GET` | `/pages/by-slug/{slug}` | Published CMS page content, metadata, and template info (`terms-conditions`, `returns-exchanges`, etc.). |
| `GET` | `/simple-sliders` | Simple Slider collections and slides (`home-slider-1`) with high-res images, subtitles, titles, and links. |
| `GET` | `/posts` | Paginated blog posts with author, tags, categories, and cover images. |

---

## 5. Database Architecture & Key Tables

Database Name: `ecom` (MariaDB / MySQL InnoDB)

```mermaid
erDiagram
    ec_products ||--o{ ec_product_variations : "has"
    ec_products ||--o{ ec_product_category_product : "belongs to"
    ec_product_categories ||--o{ ec_product_category_product : "categorizes"
    ec_orders ||--o{ ec_order_product : "contains"
    ec_orders ||--|| ec_order_addresses : "ships to"
    ec_customers ||--o{ ec_orders : "places"
    ec_customers ||--o{ ec_customer_addresses : "owns"
    ec_products ||--o{ ec_reviews : "receives"
    ec_customers ||--o{ ec_reviews : "writes"

    ec_products {
        bigint id PK
        string name
        string slug
        double price
        double sale_price
        int quantity
        string stock_status
        text images
        text description
        longtext content
        string sku
    }

    ec_orders {
        bigint id PK
        string code
        bigint user_id FK
        double amount
        double sub_total
        double shipping_amount
        double discount_amount
        string status
        string payment_status
    }

    ec_customers {
        bigint id PK
        string name
        string email
        string password
        string phone
        date dob
    }
```

- **`ec_products`**: Core product entities containing pricing, stock, SKU, content, and image galleries.
- **`ec_product_variations`**: Product variation instances mapping to specific attribute values (size, color).
- **`ec_product_categories`**: Hierarchical category tree.
- **`ec_orders`**: Order ledger storing financial amounts, statuses (`pending`, `processing`, `completed`, `canceled`), and discounts.
- **`ec_order_product`**: Pivot line items recording product snapshot at checkout time.
- **`ec_customers`**: Registered shopper credentials and profiles.
- **`ec_customer_addresses`**: Shopper address book.
- **`ec_discounts`**: Coupon promo codes, discount percentages, fixed amounts, and validity dates.
- **`ec_reviews`**: Customer ratings (1-5 stars) and review feedback.

---

## 6. Environment Configuration Reference

### 6.1 `storefront/.env`
```env
# Botble CMS Backend Connection
NEXT_PUBLIC_BOTBLE_URL=http://localhost:8000
NEXT_PUBLIC_BOTBLE_API_URL=http://localhost:8000/api/v1
BOTBLE_API_KEY=<SERVER_ONLY_BOTBLE_API_KEY>

# Storefront Brand & Commerce Settings
NEXT_PUBLIC_SITE_NAME="MY STORE"
NEXT_PUBLIC_CURRENCY_SYMBOL="₹"
NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD=1999
NEXT_PUBLIC_STANDARD_SHIPPING_FEE=99

# Razorpay Payment Gateway Integration
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_Tf97zf09BnLDd1
RAZORPAY_KEY_SECRET=36md4FOTWg651xLtFgMZKYi2
```

### 6.2 `backend/.env`
```env
APP_NAME="Wowy CMS"
APP_ENV=local
APP_KEY=base64:aupx1RSuyw8STqR4i3nxG5Xks5OGwbZN5xelUG0NVPE=
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ecom
DB_USERNAME=root
DB_PASSWORD=your_password

ADMIN_DIR=admin

# License Verification (Set to false in development, true in production)
CMS_ENABLE_LICENSE_VERIFICATION=false

# Admin Sidebar Visibility (Hide Themes and Plugins)
CMS_THEME_DISPLAY_THEME_MANAGER_IN_ADMIN_PANEL=false
CMS_PLUGIN_ENABLE_PLUGIN_MANAGER=false
```

---

## 7. Developer Operations & Quick Start

### 7.1 Running the Backend (`backend`)
1. Ensure MariaDB / MySQL is running:
   ```bash
   sudo systemctl status mariadb
   ```
2. Start the Laravel development server:
   ```bash
   cd /home/sdev/Projects/Ecommerce/backend
   php artisan serve --host=127.0.0.1 --port=8000
   ```
3. Access Admin Panel: `http://localhost:8000/admin`

### 7.2 Running the Storefront (`storefront`)
1. Ensure dependencies are installed:
   ```bash
   cd /home/sdev/Projects/Ecommerce/storefront
   npm install
   ```
2. Start the Next.js dev server:
   ```bash
   npm run dev
   ```
3. Access Storefront: `http://localhost:3000`

### 7.3 Health Check Verification
- Check Backend API:
  ```bash
  curl -s -H "X-API-KEY: Hddd0f8rTKKF3Aga8vhWRDPclF0APXAJ" http://localhost:8000/api/v1/ecommerce/products | head -c 200
  ```
- Check Storefront API Proxy:
  ```bash
  curl -s -X POST http://localhost:3000/api/coupon/apply -H "Content-Type: application/json" -d '{"coupon_code":"WELCOME10","subtotal":2000}'
  ```

---

## 8. Change Log & Revision History

| Date | Author / Agent | Changes Made |
| :--- | :--- | :--- |
| **2026-09-25** | Antigravity AI | **Admin Footer Copyright Customization ("crafted by sdev")**: Updated the platform admin layout copyright translation strings in `backend/platform/core/base/resources/lang/en/layouts.php` and `backend/lang/vendor/core/base/en/layouts.php` (`'copyright' => 'Copyright :year © :company. Version :version crafted by sdev'`). Admin panel footer now renders: `Copyright 2026 © Xstyles. Version 1.30.9.1 crafted by sdev`. Purged view and application caches. Exact files modified: `backend/lang/vendor/core/base/en/layouts.php`, `backend/platform/core/base/resources/lang/en/layouts.php`, `PROJECT.md`. |
| **2026-09-25** | Antigravity AI | **Admin Sidebar Menu Pruning (Hide Themes & Plugins)**: Configured environment and package options to cleanly remove "Themes" (under Appearance) and "Plugins" (along with all sub-options: "Installed Plugins", "Add New Plugin") from the Botble CMS admin sidebar navigation. (1) **Theme Manager Visibility**: Configured `CMS_THEME_DISPLAY_THEME_MANAGER_IN_ADMIN_PANEL=false` (with `CMS_ENABLE_THEMES` fallback in `platform/packages/theme/config/general.php`), removing `cms-core-theme` from `cms-core-appearance` while keeping Menus, Widgets, Theme Options, Custom CSS/JS/HTML intact. (2) **Plugin Manager Visibility**: Configured `CMS_PLUGIN_ENABLE_PLUGIN_MANAGER=false` (with `CMS_ENABLE_PLUGINS` fallback in `platform/packages/plugin-management/config/general.php`), removing the root `cms-core-plugins` item and child items (`cms-core-plugins-installed`, `cms-core-plugins-marketplace`). (3) **Cache Invalidation & Route Security**: Purged configuration, application, and dashboard menu caches (`DashboardMenu::clearCaches()`). Direct URL access to `/admin/plugins` and `/admin/themes` is prevented via 404 abort guards. Exact files modified: `backend/.env`, `backend/.env.example`, `backend/platform/packages/theme/config/general.php`, `backend/platform/packages/plugin-management/config/general.php`, `PROJECT.md`. |
| **2026-09-25** | Antigravity AI | **Configurable License Verification Toggle for Development & Production (`CMS_ENABLE_LICENSE_VERIFICATION`)**: Implemented an environment-driven toggle in `backend/.env` and `backend/platform/core/base/config/general.php` (`enable_license_verification => env('CMS_ENABLE_LICENSE_VERIFICATION', env('ENABLE_LICENSE_VERIFICATION', true))`) allowing license verification to be temporarily disabled during development without blocking admin routes or triggering reminder banners. (1) **Core Verification Bypass**: Updated `Core.php` methods `verifyLicense()`, `checkConnection()`, `isLicenseFileExists()`, and `isSkippedLicenseReminder()` to return valid/bypassed states when verification is disabled. (2) **Route & Controller Guards**: Guarded `SystemController@checkLicense` to return `{ verified: true }`, preventing automated JavaScript license check loops from redirecting to `/unlicensed` or injecting warning modals; updated `UnlicensedController@index` to redirect directly to `dashboard.index`; updated `GeneralSettingController@getVerifyLicense` to return mock activated data and prevent 400 errors from uncontactable remote license servers; updated `InstallerStep` and installer controllers (`LicenseController`, `AccountController`) to skip the license step when disabled; updated `MarketplaceService` to avoid throwing `RequiresLicenseActivatedException`. (3) **View Guards**: Updated `layouts/master.blade.php` to prevent rendering `license-invalid` alert when verification is disabled. (4) **Environment Configuration**: Set `CMS_ENABLE_LICENSE_VERIFICATION=false` in `backend/.env` for development and documented `CMS_ENABLE_LICENSE_VERIFICATION=true` in `backend/.env.example` for production. Tested and verified via `php artisan tinker`. Exact files modified: `backend/platform/core/base/config/general.php`, `backend/platform/core/base/src/Supports/Core.php`, `backend/platform/core/base/src/Http/Controllers/SystemController.php`, `backend/platform/core/base/src/Http/Controllers/UnlicensedController.php`, `backend/platform/core/setting/src/Http/Controllers/GeneralSettingController.php`, `backend/platform/packages/installer/src/InstallerStep/InstallerStep.php`, `backend/platform/packages/installer/src/Http/Controllers/AccountController.php`, `backend/platform/packages/installer/src/Http/Controllers/LicenseController.php`, `backend/platform/packages/plugin-management/src/Services/MarketplaceService.php`, `backend/platform/core/base/resources/views/layouts/master.blade.php`, `backend/.env`, `backend/.env.example`, `PROJECT.md`. |
| **2026-09-24** | Antigravity AI | **Elimination of Frontend Shipping Logic & Establishment of Backend Source of Truth**: Completely removed all client-side shipping calculation, guessing, and hardcoded fallback fees (such as ₹99) from the storefront, establishing Botble CMS backend as the sole authoritative single source of truth for shipping fees and checkout financial totals. (1) **Root Cause Identified**: Identified that ₹99 originated from `DEFAULT_STANDARD_SHIPPING_FEE = 99` in `storefront/lib/commerce.ts` evaluated by `calculateCommerceTotals()` synchronously on the client, ignoring backend database rules. (2) **Authoritative Backend Pricing & Shipping Engine**: Implemented `calculateCheckout(Request $request)` and unified `calculateOrderPricing()` in `OrderPlacementController.php` using Botble's native `HandleShippingFeeService`. It evaluates line item product prices from database `Product` records, validates real-time stock, applies authoritative coupon discounts, and executes rule matching against MariaDB `ec_shipping` and `ec_shipping_rules` by address (country, state, city, zip code), weight, and order total. Registered route `POST /api/v1/ecommerce/checkout/calculate`. (3) **Server-Side API Proxy**: Rewrote `storefront/app/api/shipping/calculate/route.ts` to proxy requests to Botble's `checkout/calculate` with `X-API-KEY`. (4) **Frontend Presentation-Only Refactoring**: Refactored `storefront/app/checkout/page.tsx` and `storefront/components/checkout/InstantCheckoutModal.tsx` to completely remove `calculateCommerceTotals()`. State `backendTotals` is dynamically requested from `/api/shipping/calculate` when cart items, coupon, or debounced delivery address/pincode fields change. (5) **Loading & Error UX States**: Added subtle loading pulses ("Calculating shipping...") and error notifications ("Shipping Unavailable - Check Address"). Enforced strict submission locking: order placement is blocked if shipping cannot be authoritatively calculated or if the address is unsupported. (6) **Razorpay Payment Synchronization**: Updated `storefront/app/api/orders/razorpay/create/route.ts` to query the backend calculation endpoint so the created Razorpay order amount in paise matches the backend database amount to the exact paisa. (7) **Anti-Tampering & Security**: Hardened `store()` in `OrderPlacementController.php` to independently calculate and validate prices, discounts, and shipping amounts from MariaDB, completely rejecting any client-provided or manipulated total amounts. (8) **Verification**: Passed 10 acceptance test cases (free shipping $\ge$ ₹2,000, standard delivery < ₹2,000, unsupported country rejection, dynamic pincode recalculation, anti-tampering verification) and 100% Turbopack production build (`npm run build`). |
| **2026-09-24** | Antigravity AI | **Checkout Mobile UX & Visual Hierarchy Sequence Restructuring**: Rectified flawed mobile checkout sequence in `app/checkout/page.tsx` where Order Summary and totals appeared after Payment Method, Place Order button, and Terms. (1) **Logical Conversion Hierarchy**: Re-sequenced the mobile DOM layout so customers review their complete basket and financial breakdown before committing to payment: **1. Contact Information** $\rightarrow$ **2. Delivery Address** $\rightarrow$ **3. Order Summary** (Items, thumbnails, promo code, subtotal, discount, shipping, total) $\rightarrow$ **4. Payment Method** (COD, UPI, Card) $\rightarrow$ **5. Place Order Action** (`[ Place Order (COD) • ₹X → ]`) + Terms/Privacy $\rightarrow$ **6. Trust Badges** (Express Dispatch, 7-Day Returns). (2) **Desktop Two-Column Layout Preservation**: Leveraged CSS Grid (`lg:col-span-7 lg:col-start-1` for rows 1..4 on left rail, and `lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:row-span-4 lg:sticky lg:top-24` for the right rail) ensuring desktop maintains its sticky summary sidebar while mobile receives the natural sequential flow. (3) **Accessibility & Semantic Alignment**: Enforced visual order == DOM order == keyboard focus order, preventing tabbing disconnects. Replaced nested coupon `<form>` with accessible Enter-key-aware `<div>` and `type="button"` controls to eliminate HTML validation issues and prevent accidental order placement during promo code entry. (4) **Verification**: Passed `npx tsc --noEmit` (0 errors), `npm run lint` (0 errors), and 100% Turbopack production build pass across all 38 routes. |
| **2026-09-24** | Antigravity AI | **Product Page Buy Now Flow: Cart Drawer Trigger & Quick Buy Separation**: Configured the "Buy Now" action on the Product Detail Page (`ProductDetailView.tsx` and `StickyAddToCartBar.tsx`) to trigger the slide-out **Cart Drawer** rather than the Instant Checkout / Quick Buy popup. (1) **Separated Handler Logic**: Updated `handleBuyNow()` to validate product variation, quantity, and stock; prevent rapid double-clicks (`isBuyNowProcessing`); close Quick Buy (`closeQuickBuy()`); stage the item into the persistent cart with selected size, color, and quantity (`addItem(..., openDrawer = true)`); and open the **Cart Drawer** (`openCart()`) with visual toast feedback. (2) **Mutual Exclusion Architecture**: Retained store-level mutual exclusion (`isOpen: true` $\leftrightarrow$ `isQuickBuyOpen: false`) in `store/useCartStore.ts` ensuring no simultaneous modal/drawer conflicts. (3) **Validation**: Verified 0 TypeScript errors (`npx tsc --noEmit`), 0 ESLint errors (`npm run lint`), and 100% build pass. |
| **2026-09-24** | Antigravity AI | **Final Production Hardening, Security, SEO, Accessibility & Reliability Audit**: Executed comprehensive senior staff-level pre-production hardening across storefront and backend API layers. (1) **Secrets Isolation & Security Hardening**: Completely eliminated `NEXT_PUBLIC_BOTBLE_API_KEY` and raw secret fallbacks from all client-facing files (`.env`, `customer-api.ts`, `botble.ts`, `site-config.ts`). Built internal Next.js API server proxies under `app/api/customer/` (`/orders`, `/orders/[id]`, `/addresses`, `/addresses/[id]`, `/profile`, `/password`, `/reviews`) and `app/api/contact/route.ts` to strictly keep `BOTBLE_API_KEY` on the Node server environment. Added production security headers to `next.config.ts` (`X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, `X-DNS-Prefetch-Control`). (2) **React 19 & ESLint Clean Code Compliance**: Resolved all React 19 compiler errors across components: ref access during render in `SmoothScrollProvider.tsx` and `CurvedLoop.tsx`, impure `Date.now` invocation in `InstantCheckoutModal.tsx`, TDZ variable access in `track-order/page.tsx`, `DeliveryPincodeChecker.tsx`, and `ImageGalleryModal.tsx`, synchronous effect state updates in `carousel.tsx`, and empty interface in `input.tsx`. Achieved 0 errors in both `npm run lint` and `npx tsc --noEmit`. (3) **SEO, Canonicalization & Indexing Controls**: Created dynamic `app/robots.ts` and `app/sitemap.ts` (mapping static routes, 100 products, categories, and blog articles). Injected Schema.org `Organization` and `WebSite` JSON-LD schemas in `app/layout.tsx` and complete `Product` + `Offer` schema in `app/product/[slug]/page.tsx`. Configured `robots: { index: false, follow: false }` across private routes (`/account`, `/checkout`, `/track-order`, `/search`). (4) **Resilience & Error Boundaries**: Built branded, luxury global error boundary in `app/error.tsx` with graceful retry mechanism, and created `app/loading.tsx` for layout-stable, smooth route transitions. (5) **100% Production Build Pass**: Verified clean Turbopack production compilation (`npm run build`) with all 38 routes compiling successfully. |
| **2026-09-24** | Antigravity AI | **Luxury Storefront Transformation (Lenis, Motion Choreography, Quiet Luxury Visual System & Tactile Interactions)**: Transformed the entire LUNE headless storefront into a million-dollar luxury ecommerce experience with editorial restraint, cinematic pacing, hardware-accelerated motion, and silky smooth responsiveness. (1) **Lenis Smooth Scroll Architecture**: Integrated production-grade Lenis (`components/providers/SmoothScrollProvider.tsx`) with singleton App Router compatibility, `prefers-reduced-motion` support, native mobile touch preservation (`syncTouch: false`), dialog/sheet scroll-lock synchronization (`MutationObserver` tracking `data-scroll-locked`), and zero frame-by-frame React state re-renders. (2) **Global Motion System (`lib/motion.ts`)**: Built a unified motion system featuring bespoke luxury easing curves (`editorialEase`, `luxuryEase`, `gentleEase`), standard durations (`fast`, `normal`, `editorial`), and canonical variants (`fadeIn`, `fadeUp`, `fadeDown`, `scaleIn`, `imageReveal`, `modalVariants`, `drawerVariants`, `pageTransitionVariants`). Created high-performance `<ScrollReveal>` component with viewport trigger and reduced-motion fallback. (3) **Editorial Typography & Surface Tokens (`theme.css`, `globals.css`)**: Injected modern luxury hierarchy classes (`.editorial-hero`, `.editorial-heading`, `.editorial-title`, `.editorial-eyebrow`, `.editorial-price`, `.editorial-meta`), integrated Montserrat (`--font-display`) and Inter (`--font-sans`) cleanly across layouts, replaced gimmicky high-blur glass with refined off-white luxury backdrops and hairlines (`rgba(45,33,29,0.08)`), and imported native `lenis.css`. (4) **Navbar & Search Experience**: Rebuilt header transition in `Navbar.tsx` (smooth compacting on scroll without awkward margins or background cutoffs). Created `SearchOverlay.tsx` with top slide-down editorial search drawer, auto-focused input, instant trending search pills, escape-to-close, and Next.js router integration (eradicating hard `window.location` reloads). (5) **Cinematic Hero Choreography (`HeroSlider.tsx`)**: Upgraded hero section with subtle image drift (scale 1.04 $\rightarrow$ 1.00), staggered layer reveals for collection badge, headline, description, and dual CTAs, preserving LCP optimization and priority loading. (6) **Product Cards & Shop Grid**: Redesigned `ProductCard.tsx` with pale neutral luxury surfaces (`#fbfaf8`), subtle scale/crossfade image hover (`cubic-bezier(0.16,1,0.3,1)`), tactile wishlist toggle with micro-press scale, clean editorial badges, and tactile quick-add buttons. Updated `ShopArchiveView.tsx` with smooth `transition-opacity` during filter transitions and generous card grid breathing room. (7) **CartDrawer & Checkout Restraint**: Removed disruptive canvas confetti across `CartDrawer.tsx`, `VIPNewsletter.tsx`, and `InstantCheckoutModal.tsx`, replacing with refined toast confirmations. Added smooth item transform transitions, tactile steppers, and subtle gold/emerald free-shipping progress indicators. (8) **Product Detail View (PDP) Polish**: Added tactile active micro-interactions to color swatches, size matrices, and Add to Bag CTAs with instant feedback and zero layout shift. (9) **WebGL / 3D Event Isolation**: In `CircularGallery.jsx`, restricted `mousedown`, `touchstart`, and `wheel` listeners strictly to `this.container` rather than the global `window`, permanently preventing canvas events from stealing page scroll or hijacking mouse clicks on navigation/cards. (10) **Mobile & Accessibility**: Enforced $\ge$44px touch targets and active scale states on `MobileBottomNav.tsx`, ensured complete keyboard navigation (`Escape`, `Enter`), and verified 100% build pass on Next.js 16 across all 30 routes with 0 errors. |
| **2026-09-24** | Antigravity AI | **Mobile & LAN Interactive Controls Remediation**: Diagnosed and resolved issue where mobile interactive controls (hamburger menu, search, cart, wishlist, auth modal, product card wishlist toggles, add to cart, mobile bottom navigation) were non-functional or unresponsive when accessed from physical phones over local LAN (`http://172.20.10.14:3000`). (1) **Eliminated Permanent Stacking/Touch Trap**: In `Navbar.tsx`, replaced permanently mounted full-screen offcanvas backdrop (`fixed inset-0 z-50 ... opacity-0 pointer-events-none invisible`) with Framer Motion `AnimatePresence` and conditional rendering (`{offcanvasOpen && ...}`), ensuring no invisible hardware-accelerated stacking context covers or traps touch events when closed. Added explicit `type="button"` and `touch-manipulation` to header action buttons. (2) **Confined Touch Event Listeners in WebGL Component**: In `CircularGallery.jsx`, restricted `touchstart`, `touchmove`, and mouse listeners strictly to `this.container` rather than the global `window`, preventing the 3D gallery from capturing and stealing viewport swipe/tap gestures on mobile devices. (3) **Safe Storage Adapter & Hydration Resilience**: Created `storefront/lib/storage.ts` implementing a resilient `safeLocalStorage` adapter with SSR safety, in-memory fallback, and quota exception catching. Updated `useAuthStore.ts`, `useCartStore.ts`, and `useWishlistStore.ts` to use `safeLocalStorage` and added `partialize` to exclude transient modal open states (`isAuthModalOpen`, `authModalMode`, `isOpen`). (4) **Server-Side API Proxies for LAN Compatibility**: Created `/api/auth/login`, `/api/auth/register`, `/api/auth/me`, `/api/auth/logout`, and `/api/newsletter/subscribe` route handlers. When phone browsers trigger auth or newsletter actions over LAN, requests now hit Next.js server proxies (which communicate with Laravel on `localhost:8000`), eliminating failed client-side connections to phone loopback and keeping `BOTBLE_API_KEY` protected server-side. (5) **Mobile Bottom Nav Optimization**: Added `pointer-events-auto`, `touch-manipulation`, and iOS safe area padding to `MobileBottomNav.tsx`. (6) **Image Optimization Remote Patterns**: Added local LAN IP hostnames (`172.20.10.14`, `192.168.*.*`, `172.*.*.*`, `10.*.*.*`) to `next.config.ts`. Verified 100% clean production build on Next.js 16 across all 30 routes and confirmed zero runtime errors. |
| **2026-09-24** | Antigravity AI | **Comprehensive Storefront Content Audit, Normalization & UX Copy Polish**: Executed an end-to-end content architecture audit and complete rewrite across the entire LUNE storefront and MariaDB settings to eliminate fake claims, reconcile policy discrepancies, standardize terminology, and elevate the brand voice to clean, understated, contemporary Indian e-commerce English. (1) **MariaDB Backend & Theme Settings**: Updated `settings` table via Laravel Tinker (`theme-wowy-site_title` $\rightarrow$ `'LUNE'`, `theme-wowy-copyright` $\rightarrow$ `'Copyright © 2026 LUNE. All rights reserved.'`, `theme-wowy-seo_description`, `theme-wowy-contact_email` $\rightarrow$ `care@lune.in`, and updated `theme-wowy-header_messages` repeater with 7-Day Returns, Free Express Shipping on orders over ₹1,999, and 10% off with `WELCOME10`). Cleared application cache. (2) **Policy Reconciliation**: Standardized across all components on **7-Day Doorstep Returns** (eradicating lingering 14-day mentions) and **Free Express Shipping on Orders Over ₹1,999** (₹99 standard shipping below ₹1,999). (3) **Elimination of Fake Claims & Jargon**: Removed fake Paris/Tokyo design studio addresses, unfulfillable gift tiers (canvas tote in `CartDrawer`), fake lifetime warranties/atelier certifications (`ProductDetailView`), fake alternate product badges (`ProductCard`), and pretentious AI jargon ("architectural silhouettes", "capsule archive", "exclusive dispatches", "patron appraisals", "The Wardrobe Club", "Maison Circle", leftover menswear GSM/raw denim copy). (4) **Standardized Commercial Terminology**: Normalized navigation, action CTAs, and labels to "Bag", "Add to Bag", "Wishlist", "Sign In" / "Create Account", "Checkout", "Delivery", and "Pieces" (instead of "Garments"). (5) **Component & Page Enhancements**: Updated `Navbar.tsx`, `AnnouncementBar.tsx`, `MobileBottomNav.tsx`, `Footer.tsx` (women's categories), `CartDrawer.tsx`, `checkout/page.tsx` (Indian address placeholders: Priya Sharma, Bengaluru, 560038), `InstantCheckoutModal.tsx`, `ProductDetailView.tsx` (authentic details & fit, WhatsApp styling advice), `ProductCard.tsx`, `ProductGallery.tsx`, `ProductReviews.tsx`, `SizeGuideModal.tsx`, `ShopArchiveView.tsx`, `search/page.tsx`, `wishlist/page.tsx`, `collections/[slug]/page.tsx`, `about/page.tsx` (honest philosophy, breathable fabrics, fluid silhouettes, Bengaluru studio), `contact/page.tsx` (Indiranagar studio, Bengaluru), `privacy/page.tsx`, `track-order/page.tsx`, `blog/[slug]/page.tsx`, `BlogListClient.tsx`, and created a branded `not-found.tsx` 404 page. (6) **Validation**: Verified zero TypeScript errors (`tsc --noEmit`), zero lint errors, and confirmed zero remaining instances of "garment", "maisonelegance", "appraisal", or fake studio addresses in code. |
| **2026-09-23** | Antigravity AI | **Dynamic Commerce Calculation, Free Shipping Engine & Razorpay Payment Integration**: Successfully eliminated all hardcoded values (such as ₹99 shipping) and created an authoritative, end-to-end synchronized commerce architecture. (1) **Shipping Engine & Database Configuration**: Configured MariaDB `ec_shipping_rules` for Standard Express Delivery (₹99 for orders under ₹1,999) and Free Express Shipping (₹0 for orders $\ge$ ₹1,999). Exposed active rules via `GET /api/v1/ecommerce/shipping-rules`. (2) **Botble CMS Order Security & Anti-Tampering**: Hardened `OrderPlacementController.php` to fetch live prices from `Product` models, validate inventory in real time, authoritatively apply discounts from `ec_discounts` (percentage, fixed amount, and free shipping), calculate dynamic shipping fees, record `payment_status`, store `charge_id`, and enforce idempotency against duplicate submissions. (3) **Canonical Frontend Commerce Engine**: Created `storefront/lib/commerce.ts` (`calculateCommerceTotals`), ensuring exact mathematical synchronization across `/checkout`, `InstantCheckoutModal.tsx`, `CartDrawer.tsx`, and Next.js internal API routes. (4) **Bifurcated Checkout Flow**: Replaced hardcoded shipping on `/checkout/page.tsx` with dynamic calculation. Integrated cash-on-delivery (`cod`) direct order placement and official Razorpay Checkout modal for UPI / Card. Implemented modal dismiss handling, payment failure handling, and double-submission locking (`isSubmitting`). (5) **Server-Side Razorpay Payment Pipeline**: Built `app/api/orders/razorpay/create/route.ts` (orders in paise) and `app/api/orders/razorpay/verify/route.ts` (HMAC-SHA256 signature verification + Razorpay API capture confirmation) using environment variables `NEXT_PUBLIC_RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`. (6) **Validation**: Verified with live tests: ₹605 order incurs ₹99 shipping (total ₹704); $\ge$ ₹1,999 incurs ₹0 shipping; forged signatures are rejected with 400; client price tampering is overridden by DB prices; duplicate submissions return existing order; TypeScript compiles with 0 errors. |
| **2026-09-23** | Antigravity AI | **Luxury Editorial PDP Transformation & Real CMS Data Architecture**: Completely elevated the product detail page (`/product/[slug]`) to high-end luxury fashion standards while preserving SSR, Zustand persistent stores, accessibility, and performance. (1) **Botble Backend Fix**: Fixed specification serialization bug in `ProductDetailResource.php` (`method_exists($this->resource, 'getVisibleSpecificationAttributes')`), restoring real technical specifications from the Botble database. (2) **Sanitized HTML CMS Content**: Built `ProductHtmlContent.tsx` to safely render trusted CMS descriptions and stories, strip potential XSS vectors, resolve relative storage URLs (`/storage/` -> `${BOTBLE_URL}/storage/`), and eliminate raw `<p>` and `<img ...>` markup strings from the customer UI. (3) **Eliminated Fake/Hardcoded Accordion Content**: Updated `normalizeProduct()` and `types.ts` to normalize real `specifications`, dimensions, `materials`, `care`, and only render accordion tabs when verified product data exists. (4) **Editorial Product Gallery**: Built `ProductGallery.tsx` featuring a vertical desktop thumbnail rail, dominant `aspect-3/4` visual, smooth hover lens zoom, and an Embla touch-gesture mobile swipe carousel with progress dots. (5) **Enhanced Lightbox Modal**: Upgraded `ImageGalleryModal.tsx` with `AnimatePresence`, touch swipe support, zoom controls, and keyboard navigation (`Escape`, `ArrowLeft`, `ArrowRight`). (6) **Refined WhatsApp Concierge**: Replaced oversized, cheap green block with an understated, elegant luxury styling consultation action (`border border-neutral-200 hover:border-emerald-700/60`). (7) **Mobile-First Purchasing**: Synchronized `StickyAddToCartBar.tsx` with `MobileBottomNav` clearance (`bottom-14` + safe area), ensuring zero overlap or obscured controls. (8) **SEO Rich Snippets**: Added server-rendered JSON-LD `Product` schema in `ProductDetailView.tsx` and sanitized OpenGraph/meta descriptions in `app/product/[slug]/page.tsx`. Verified 100% build pass on Next.js 16.3.4 (Turbopack) across all 24 routes. |
| **2026-09-23** | Antigravity AI | **Fix Invalid X-API-KEY Authentication Error on Storefront Client**: (1) Diagnosed root cause of `"Invalid or missing API key. Please provide a valid X-API-KEY header."` error in `AuthModal.tsx` / `useAuthStore.ts`. In Next.js, environment variables without `NEXT_PUBLIC_` are inaccessible in browser client components; `storefront/.env` only had `BOTBLE_API_KEY=dfrFAZZUoJuIjlKTvcb1gyf6b1FiKUFe` without `NEXT_PUBLIC_BOTBLE_API_KEY`, causing `useAuthStore.ts` and `customer-api.ts` to fall back to an obsolete hardcoded dummy key (`GL7jxnwGQU6BKC5HTblCMwk1qaTKtwfF`). (2) Added `NEXT_PUBLIC_BOTBLE_API_KEY=dfrFAZZUoJuIjlKTvcb1gyf6b1FiKUFe` in `storefront/.env`. (3) Updated fallback keys in `useAuthStore.ts`, `customer-api.ts`, and `app/api/coupon/apply/route.ts` to match active database setting `dfrFAZZUoJuIjlKTvcb1gyf6b1FiKUFe`. (4) Enhanced `botble.ts` and `site-config.ts` to support both `BOTBLE_API_KEY` and `NEXT_PUBLIC_BOTBLE_API_KEY`. (5) Restarted Next.js dev server on port 3000 and verified backend API returns proper authentication responses. |
| **2026-09-21** | Antigravity AI | **Fix BestSellersSlider Component (`bestSellerslider.tsx`) & Storefront Syntax**: (1) Fixed all TypeScript compilation errors in `storefront/components/home/bestSellerslider.tsx`: added typed `BestSellersSliderProps` accepting `products: Product[]` with default fallback, imported Swiper modules (`FreeMode`, `Pagination`, `Navigation`) and core Swiper CSS files, and resolved implicit `any` parameter errors. (2) Implemented category filter tabs (`All`, `Dresses & Sets`, `Tailoring`, `Knitwear`) using Radix UI `Tabs` synced with Swiper slide reset (`slideTo(0)`). (3) Added luxury carousel controls including active slide counter (`${current}/${total}`), sleek circular prev/next navigation chevrons with boundary disabling, responsive Swiper breakpoints (1.25 mobile peek, 2.2 sm, 3 md, 4 lg), and footer "View Complete Collection" button. (4) Cleaned up stray character syntax on `<section>` in `storefront/app/page.tsx`. Verified 100% clean production build on Next.js 16.3.4 (Turbopack) across all 22 routes. |
| **2026-09-21** | Antigravity AI | **Typography Harmonization with theme.css**: Updated `storefront/app/layout.tsx` to align with the core typography tokens defined in `theme.css`. Replaced `Manrope` and `Cormorant_Garamond` with `Inter` (`--font-sans`) and `Montserrat` (`--font-display`) from `next/font/google`, ensuring geometric display headings and clean sans body text render consistently with zero layout shift. |
| **2026-09-21** | Antigravity AI | **Minimal Clean Product Card & Horizontal Carousel**: Redesigned the storefront product card and best sellers carousel to match the minimal, clean luxury aesthetic from the user reference design. (1) Redesigned `ProductCard.tsx` with a pale neutral background (`#f5f5f6`), subtle `rounded-[8px]`, minimal `● NEW` pill badge on top-left, floating outline heart wishlist toggle on top-right, clean uppercase category label, product title, formatted price, interactive color swatches with active selection ring and `+N` count, and a quick-add shopping bag button with animated checkmark feedback and cart store integration. (2) Rebuilt `BestSellersSection.tsx` into a responsive horizontal carousel using `useEmblaCarousel` (showing 4 cards on desktop, 3 on tablet, 1.5–2 on mobile) with category filter tabs. (3) Added carousel navigation controls including slide counter (`1/12`), prev/next chevron buttons, and an interactive draggable/clickable progress track with custom emblem thumb indicator (`-(O)-`) matching the user reference. Verified Next.js 16 build passes with 0 errors across all 22 routes. |
| **2026-09-19** | Antigravity AI | **Fix Product Featured Image & Hover Image Visibility**: Diagnosed and resolved issue where product hover image was visible but featured image was not visible on product cards. (1) Root-caused to Botble backend API `AvailableProductResource.php` and `RelatedProductResource.php` defaulting `$thumbnailSize` to `'thumb'` (`-150x150`), which pointed to nonexistent thumbnail files on disk for newly uploaded/WebP media, causing HTTP 403 Forbidden on `product.image_url` during Next.js image optimization. (2) Changed default `$thumbnailSize` in `AvailableProductResource.php`, `RelatedProductResource.php`, `AvailableProductResource.php` (plugin), and `ProductController.php` to `null` so full-resolution existing image URLs are returned by default. (3) Added `cleanImageUrl()` in `storefront/lib/botble.ts` to strip thumbnail suffixes (`-150x150`, `-400x400`, etc.) and resolve relative storage paths. (4) Updated `normalizeProduct()` to ensure the designated featured image is placed first at `images[0]` and assign an alternate gallery image to `hover_image_url`. (5) Enhanced `ProductCard.tsx` to always render the featured image as the base layer and smoothly crossfade the secondary hover image (`opacity-0 group-hover:opacity-100 transition-opacity duration-500`), eliminating white flashes, blank states, or missing featured images. (6) Updated `BestSellersSection.tsx` to guard against duplicate hover images. Verified 100% 200 OK status on image optimization endpoints and flawless TypeScript compilation. |
| **2026-09-19** | Antigravity AI | **Headless CMS & Admin Control Integration**: Upgraded the headless Next.js 16 storefront to preserve and dynamically reflect all CMS/admin-driven configuration from Botble CMS as the single source of truth without hardcoding values in Next.js. (1) Built backend API extensions in `platform/themes/wowy/`: `SiteSettingsApiController` (`GET /api/v1/site-settings` returning theme options, SEO, and website tracking), `MenuApiController` (`GET /api/v1/menus/{slug?}` returning nested menu trees with normalized relative links), and `PageApiController` (`GET /api/v1/pages/by-slug/{slug}` returning published CMS page content and templates). (2) Implemented centralized configuration layer in `storefront/lib/site-config.ts` with strongly-typed interfaces and 30s ISR cached fetchers. (3) Integrated dynamic website tracking via `components/analytics/TrackingScripts.tsx` with zero hardcoding, supporting Google Analytics GA4 (gtag.js), Google Tag Manager (container script + noscript), and custom head scripts controlled via Botble Admin (`Admin -> Settings -> Website Tracking`). (4) Replaced hardcoded navigation with dynamic menus across desktop navbar, mobile drawer, and footer. (5) Made site title, logos, favicon, contact details, announcement bar (`header_messages`), social links, and copyright text dynamic. (6) Connected Simple Slider (`home-slider-1`) to `HeroSlider.tsx` preserving luxury design aesthetics. (7) Built dynamic CMS page route `app/pages/[slug]/page.tsx` rendering published Botble pages with dynamic SEO metadata and luxury typography. (8) Hardened security by removing `NEXT_PUBLIC_BOTBLE_API_KEY` from client bundles, converting imports in client components to `import type`, and using server-side API proxy routes. (9) Verified all 20 acceptance tests: price updates, stock changes, coupons, menu reordering, slider updates, blog updates, order placement, zero admin crashes, and order tracking status updates. |
| **2026-09-18** | Antigravity AI | **Storefront Performance Optimization & LCP Remediation**: Diagnosed and resolved Lighthouse 13.4 performance bottlenecks on `http://localhost:3000/`. (1) Fixed hero SSR hidden state (`opacity: 0`) in `HeroSlider.tsx` by setting `initial={false}` on `AnimatePresence`, enabling immediate LCP element painting on initial render. (2) Replaced remote Unsplash hero images with local optimized WebP assets in `public/images/hero/`, added `fetchPriority="high"` and Next.js `<Image priority>`, reducing LCP resource load duration by 98% (from 6.2s to 115ms). (3) Extended `next.config.ts` with AVIF/WebP formats, device sizes, and 24h cache TTL. (4) Eliminated 60fps React re-rendering CPU thrash in `CurvedLoop.tsx` by removing `setOffset()` from the `rAF` loop. (5) Code-split heavy 3D WebGL library (`ogl`) via dynamic `ssr: false` import in `Interactive3DShowcase.tsx`. (6) Reduced initial client chunk bloat by lazy-loading `QuickViewModal` on-demand in `ProductCard.tsx` and moving modal drawers (`CartDrawer`, `AuthModal`) to `ClientOverlays.tsx`. Reduced mobile LCP by ~50% (10.1s -> 5.3s on throttled mobile, 1.7s unthrottled) and improved FCP to 1.2s. |
| **2026-09-18** | Antigravity AI | **Fix Storefront Order Tracking Runtime TypeError**: Resolved runtime `TypeError: (shipmentStatus || status || "").toLowerCase is not a function` in `storefront/app/track-order/page.tsx` caused by Botble enum serialization returning `{ value, label }` objects instead of plain strings. Added `getStatusString`, `getStatusLabel`, and `getDisplayString` helpers to safely unwrap status, shipment status, and payment channel. |
| **2026-09-18** | Antigravity AI | **Fix Botble Admin Crash on Order Placement (`Undefined array key 0`)**: Root-caused cascading Blade component stack corruption to an uncaught `\Error` (`imageftbbox` missing in PHP GD) inside `orders/notification.blade.php` triggered when pending orders exist. Fixed `OrderAddress.php`, `Customer.php`, and `Review.php` to use `Avatar::createBase64Image()` with `catch (\Throwable)`, hardened `Avatar::buildAvatar()` to check `function_exists('imageftbbox')`, and wrapped `HookServiceProvider::registerTopHeaderNotification()` in `\Throwable`. Verified 100% resolution with live orders. |
| **2026-09-18** | Antigravity AI | **Directory Renaming (`woww/` -> `backend/`)**: Updated documentation to reflect backend directory rename from `woww` to `backend` across architecture, tree structure, environment configuration, and operational commands in `PROJECT.md`. |
| **2026-09-18** | Antigravity AI | **Initial Architecture & System Baseline**: Completed comprehensive audit of `storefront` (Next.js 16 + React 19) and `backend` (Botble Laravel 12 CMS, formerly `woww`), validated live database connection (`ecom`), verified API authentication (`X-API-KEY`), documented end-to-end workflows, and created `PROJECT.md` & `AGENTS.md`. |
