import React from "react";
import Script from "next/script";
import type { WebsiteTracking } from "@/lib/site-config";

interface TrackingScriptsProps {
    tracking?: WebsiteTracking;
}

export default function TrackingScripts({ tracking }: TrackingScriptsProps) {
    if (!tracking) return null;

    const {
        google_tag_manager_type,
        google_tag_manager_id,
        gtm_container_id,
        custom_tracking_header_js,
        custom_tracking_body_html,
    } = tracking;

    // 1. Google Tag Manager Container (GTM)
    if (google_tag_manager_type === "gtm" && gtm_container_id) {
        const cleanGtmId = gtm_container_id.trim();
        return (
            <>
                <Script
                    id="botble-gtm"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${cleanGtmId}');`,
                    }}
                />
                <noscript>
                    <iframe
                        src={`https://www.googletagmanager.com/ns.html?id=${cleanGtmId}`}
                        height="0"
                        width="0"
                        style={{ display: "none", visibility: "hidden" }}
                        title="Google Tag Manager"
                    />
                </noscript>
            </>
        );
    }

    // 2. Google Analytics 4 (Measurement ID / gtag.js)
    if (google_tag_manager_type === "id" && google_tag_manager_id) {
        const cleanGaId = google_tag_manager_id.trim();
        return (
            <>
                <Script
                    src={`https://www.googletagmanager.com/gtag/js?id=${cleanGaId}`}
                    strategy="afterInteractive"
                />
                <Script
                    id="botble-ga4-init"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${cleanGaId}', {
  page_path: window.location.pathname,
});
`,
                    }}
                />
            </>
        );
    }

    // 3. Custom Tracking Header Script
    if (
        (google_tag_manager_type === "custom" || google_tag_manager_type === "code") &&
        custom_tracking_header_js
    ) {
        const cleanScript = custom_tracking_header_js
            .replace(/<\/?script[^>]*>/gi, "")
            .trim();

        return (
            <>
                {cleanScript && (
                    <Script
                        id="botble-custom-tracking"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{ __html: cleanScript }}
                    />
                )}
                {custom_tracking_body_html && (
                    <div
                        id="botble-tracking-body"
                        dangerouslySetInnerHTML={{
                            __html: custom_tracking_body_html,
                        }}
                    />
                )}
            </>
        );
    }

    // Fallback: If google_tag_manager_id exists without explicit type
    if (google_tag_manager_id) {
        const cleanGaId = google_tag_manager_id.trim();
        return (
            <>
                <Script
                    src={`https://www.googletagmanager.com/gtag/js?id=${cleanGaId}`}
                    strategy="afterInteractive"
                />
                <Script
                    id="botble-ga4-fallback"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${cleanGaId}');
`,
                    }}
                />
            </>
        );
    }

    return null;
}
