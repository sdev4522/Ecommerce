<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Botble\Ecommerce\Facades\Currency as CurrencyFacade;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SiteSettingsController extends Controller
{
    /**
     * Get centralized site settings and active currency configuration.
     * Reuses Botble CMS theme options, website tracking settings, and ecommerce currencies.
     */
    public function index(Request $request): JsonResponse
    {
        // 1. Resolve Active Ecommerce Currency
        $currencyConfig = $this->resolveCurrencyConfig();

        // 2. Resolve Theme Options & Site Identity
        $siteTitle = function_exists('theme_option') ? (theme_option('site_title') ?: 'LUNE') : 'LUNE';
        $logo = function_exists('theme_option') ? theme_option('logo') : null;
        $logoLight = function_exists('theme_option') ? theme_option('logo_light') : null;
        $favicon = function_exists('theme_option') ? (theme_option('favicon') ?: (function_exists('setting') ? setting('admin_favicon') : null)) : null;
        $copyright = function_exists('theme_option') 
            ? (theme_option('copyright') ?: ('Copyright © ' . date('Y') . ' LUNE. All rights reserved.'))
            : ('Copyright © ' . date('Y') . ' LUNE. All rights reserved.');

        $address = function_exists('theme_option') ? theme_option('address') : null;
        $hotline = function_exists('theme_option') ? theme_option('hotline') : null;
        $phone = function_exists('theme_option') ? theme_option('phone') : null;
        $contactEmail = function_exists('theme_option') ? theme_option('contact_email') : null;
        $workingHours = function_exists('theme_option') ? theme_option('working_hours') : null;

        // 3. Resolve Structured Theme Data (social links, header ticker, contact boxes)
        $socialLinks = $this->parseJsonThemeOption('social_links', [
            ['name' => 'Instagram', 'icon' => 'fab fa-instagram', 'url' => 'https://www.instagram.com/', 'color' => '#E1306C'],
            ['name' => 'Facebook', 'icon' => 'fab fa-facebook-f', 'url' => 'https://www.facebook.com/', 'color' => '#3b5999'],
            ['name' => 'Pinterest', 'icon' => 'fab fa-pinterest', 'url' => 'https://www.pinterest.com/', 'color' => '#cb2027'],
        ]);

        $headerMessages = $this->parseJsonThemeOption('header_messages', [
            [
                'icon' => 'fa fa-truck',
                'message' => 'Free shipping on orders over ' . $currencyConfig['symbol'] . ($currencyConfig['code'] === 'INR' ? '1,999' : '50'),
                'link' => '/shop',
                'link_text' => 'Shop now',
            ],
            [
                'icon' => 'fa fa-tag',
                'message' => 'Use code <b>WELCOME10</b> for 10% off your first order',
                'link' => null,
                'link_text' => null,
            ],
        ]);

        $contactInfoBoxes = $this->parseJsonThemeOption('contact_info_boxes', [
            [
                'name' => 'Customer Concierge',
                'address' => $address ?: 'Mumbai, Maharashtra, India',
                'phone' => $phone ?: '+91 (022) 4982-0190',
                'email' => $contactEmail ?: 'care@lune.in',
            ],
        ]);

        // 4. SEO Settings
        $seo = [
            'seo_title' => function_exists('theme_option') ? (theme_option('seo_title') ?: $siteTitle) : $siteTitle,
            'seo_description' => function_exists('theme_option') ? theme_option('seo_description') : null,
            'seo_og_image' => function_exists('theme_option') ? theme_option('seo_og_image') : null,
            'seo_index' => function_exists('theme_option') ? (theme_option('seo_index', '1') !== '0') : true,
        ];

        // 5. Website Tracking
        $tracking = [
            'google_tag_manager_type' => function_exists('setting') ? setting('google_tag_manager_type') : null,
            'google_tag_manager_id' => function_exists('setting') ? setting('google_tag_manager_id') : null,
            'gtm_container_id' => function_exists('setting') ? setting('gtm_container_id') : null,
            'custom_tracking_header_js' => function_exists('setting') ? setting('custom_tracking_header_js') : null,
            'custom_tracking_body_html' => function_exists('setting') ? setting('custom_tracking_body_html') : null,
            'gtm_debug_mode' => function_exists('setting') ? (bool) setting('gtm_debug_mode', false) : false,
            'is_gtm_enabled' => function_exists('setting') ? (bool) setting('is_gtm_enabled', false) : false,
        ];

        return response()->json([
            'error' => false,
            'data' => [
                'site_title' => $siteTitle,
                'show_site_name' => false,
                'site_title_separator' => '-',
                'logo' => $logo,
                'logo_light' => $logoLight,
                'favicon' => $favicon,
                'copyright' => $copyright,
                'address' => $address,
                'hotline' => $hotline,
                'phone' => $phone,
                'contact_email' => $contactEmail,
                'working_hours' => $workingHours,
                'social_links' => $socialLinks,
                'header_messages' => $headerMessages,
                'contact_info_boxes' => $contactInfoBoxes,
                'seo' => $seo,
                'tracking' => $tracking,
                'currency' => $currencyConfig,
            ],
            'message' => null,
        ]);
    }

    /**
     * Resolves canonical currency formatting and configuration from Botble Ecommerce.
     */
    protected function resolveCurrencyConfig(): array
    {
        $code = 'INR';
        $symbol = '₹';
        $name = 'Indian Rupee';
        $position = 'before';
        $decimalPlaces = 0;
        $decimalSeparator = '.';
        $thousandSeparator = ',';

        try {
            if (function_exists('get_application_currency')) {
                $currency = get_application_currency();
                if ($currency) {
                    $code = $currency->title ?: 'INR';
                    $symbol = $currency->symbol ?: ($code === 'USD' ? '$' : ($code === 'EUR' ? '€' : '₹'));
                    $name = $currency->name ?: ($code === 'USD' ? 'US Dollar' : ($code === 'INR' ? 'Indian Rupee' : $code));
                    $position = $currency->is_prefix_symbol ? 'before' : 'after';
                    $decimalPlaces = (int) ($currency->decimals ?? ($code === 'INR' ? 0 : 2));
                }
            }

            if (function_exists('get_ecommerce_setting')) {
                $decSep = get_ecommerce_setting('decimal_separator', '.');
                $decimalSeparator = ($decSep === 'space') ? ' ' : ($decSep ?: '.');

                $thSep = get_ecommerce_setting('thousands_separator', ',');
                $thousandSeparator = ($thSep === 'space') ? ' ' : ($thSep ?: ',');
            }
        } catch (\Throwable) {
            // Safe fallback to defaults if ecommerce tables are unmigrated
        }

        return [
            'code' => $code,
            'symbol' => $symbol,
            'name' => $name,
            'position' => $position,
            'decimal_places' => $decimalPlaces,
            'decimal_separator' => $decimalSeparator,
            'thousand_separator' => $thousandSeparator,
        ];
    }

    /**
     * Safely parse json-encoded Botble theme options.
     */
    protected function parseJsonThemeOption(string $key, array $fallback): array
    {
        if (! function_exists('theme_option')) {
            return $fallback;
        }

        $raw = theme_option($key);
        if (! $raw) {
            return $fallback;
        }

        if (is_array($raw)) {
            return $raw;
        }

        try {
            $decoded = json_decode($raw, true);
            if (is_array($decoded) && ! empty($decoded)) {
                // If it's a Botble repeater format with key/value pairs
                if (isset($decoded[0]) && is_array($decoded[0]) && isset($decoded[0]['key'])) {
                    $transformed = [];
                    foreach ($decoded as $item) {
                        $transformed[$item['key']] = $item['value'] ?? null;
                    }
                    return [$transformed];
                }
                return $decoded;
            }
        } catch (\Throwable) {
            // Return fallback on parse failure
        }

        return $fallback;
    }
}
