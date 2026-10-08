import React from "react";
import type { WebsiteTracking } from "@/lib/site-config";

export interface TrackingScriptsProps {
    tracking?: WebsiteTracking | null;
}

/**
 * Injects scripts directly into <head>:
 * - GTM script loader with dataLayer initialization and debug instrumentation
 * - GA4 gtag.js loader and config
 * - Custom Tracking header scripts
 *
 * Rendered server-side for immediate presence in raw HTML for tag auditors,
 * search crawlers, and rapid user analytics capture.
 */
export function TrackingHeadScripts({ tracking }: TrackingScriptsProps) {
    if (!tracking || tracking.is_gtm_enabled === false) return null;

    const {
        google_tag_manager_type,
        google_tag_manager_id,
        gtm_container_id,
        custom_tracking_header_js,
        gtm_debug_mode,
    } = tracking;

    // 1. Google Tag Manager Container Mode
    if (google_tag_manager_type === "gtm" && gtm_container_id) {
        const cleanGtmId = gtm_container_id.trim();
        if (!cleanGtmId) return null;

        const debugInstrumentation = gtm_debug_mode
            ? `
window.gtmDebugMode = true;
console.log('%c GTM Debug Mode Enabled (Container: ${cleanGtmId}) ', 'background: #10b981; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;');
(function() {
    var originalPush = (window.dataLayer = window.dataLayer || []).push;
    window.dataLayer.push = function() {
        console.log('%c GTM dataLayer Event ', 'background: #3b82f6; color: white; padding: 2px 5px; border-radius: 3px;', arguments);
        return originalPush.apply(this, arguments);
    };
})();
window.addEventListener('load', function() {
    setTimeout(function() {
        if (window.google_tag_manager && window.google_tag_manager['${cleanGtmId}']) {
            console.log('%c ✓ GTM Container ${cleanGtmId} Loaded Successfully ', 'background: #10b981; color: white; padding: 2px 5px; border-radius: 3px;');
        } else if (window.dataLayer && window.dataLayer.length > 1) {
            console.log('%c ✓ GTM dataLayer Active for ${cleanGtmId} ', 'background: #10b981; color: white; padding: 2px 5px; border-radius: 3px;');
        } else {
            console.warn('GTM container ${cleanGtmId} may not be published or reached. Check Google Tag Manager dashboard.');
        }
    }, 2000);
});
`
            : "";

        return (
            <script
                id="botble-gtm-init"
                dangerouslySetInnerHTML={{
                    __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${cleanGtmId}');${debugInstrumentation}`,
                }}
            />
        );
    }

    // 2. Google Analytics 4 Only Mode (Measurement ID)
    if (google_tag_manager_type === "id" && google_tag_manager_id) {
        const cleanGaId = google_tag_manager_id.trim();
        if (!cleanGaId) return null;

        const debugConfig = gtm_debug_mode
            ? `gtag('config', '${cleanGaId}', { 'debug_mode': true });`
            : `gtag('config', '${cleanGaId}');`;

        const debugLogging = gtm_debug_mode
            ? `console.log('%c GA4 Debug Mode Enabled (${cleanGaId}) ', 'background: #10b981; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;');`
            : "";

        return (
            <>
                <script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=${cleanGaId}`}
                />
                <script
                    id="botble-ga4-init"
                    dangerouslySetInnerHTML={{
                        __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){
    ${gtm_debug_mode ? "console.log('%c GA4 Event ', 'background: #f59e0b; color: white; padding: 2px 5px; border-radius: 3px;', arguments);" : ""}
    dataLayer.push(arguments);
}
gtag('js', new Date());
${debugConfig}
${debugLogging}
`,
                    }}
                />
            </>
        );
    }

    // 3. Custom Tracking Header JS Mode
    if (google_tag_manager_type === "custom" && custom_tracking_header_js) {
        const rawJs = custom_tracking_header_js.trim();
        if (!rawJs) return null;

        // If the code is already full HTML with <script>, inject as raw markup, else wrap in script tag
        const hasScriptTags = /<\/?script[^>]*>/i.test(rawJs);

        if (hasScriptTags) {
            return (
                <div
                    id="botble-custom-tracking-head"
                    style={{ display: "none" }}
                    dangerouslySetInnerHTML={{ __html: rawJs }}
                />
            );
        }

        return (
            <script
                id="botble-custom-tracking-head"
                dangerouslySetInnerHTML={{
                    __html: `window.dataLayer = window.dataLayer || [];\n${rawJs}`,
                }}
            />
        );
    }

    return null;
}

/**
 * Injects markup immediately after opening <body> tag:
 * - GTM <noscript> fallback iframe
 * - Custom Tracking body HTML
 */
export function TrackingBodyScripts({ tracking }: TrackingScriptsProps) {
    if (!tracking || tracking.is_gtm_enabled === false) return null;

    const {
        google_tag_manager_type,
        gtm_container_id,
        custom_tracking_body_html,
    } = tracking;

    // 1. Google Tag Manager Container <noscript>
    if (google_tag_manager_type === "gtm" && gtm_container_id) {
        const cleanGtmId = gtm_container_id.trim();
        if (!cleanGtmId) return null;

        return (
            <noscript id="botble-gtm-noscript">
                <iframe
                    src={`https://www.googletagmanager.com/ns.html?id=${cleanGtmId}`}
                    height="0"
                    width="0"
                    style={{ display: "none", visibility: "hidden" }}
                    title="Google Tag Manager"
                />
            </noscript>
        );
    }

    // 2. Custom Tracking Body HTML
    if (google_tag_manager_type === "custom" && custom_tracking_body_html) {
        const rawHtml = custom_tracking_body_html.trim();
        if (!rawHtml) return null;

        return (
            <div
                id="botble-tracking-body-html"
                dangerouslySetInnerHTML={{ __html: rawHtml }}
            />
        );
    }

    return null;
}

/**
 * Combined tracking component for backward compatibility.
 */
export default function TrackingScripts({ tracking }: TrackingScriptsProps) {
    return (
        <>
            <TrackingHeadScripts tracking={tracking} />
            <TrackingBodyScripts tracking={tracking} />
        </>
    );
}
