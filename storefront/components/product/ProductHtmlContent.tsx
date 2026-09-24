'use client';

import React, { useMemo } from 'react';

const BOTBLE_URL = process.env.NEXT_PUBLIC_BOTBLE_URL || 'http://localhost:8000';

interface ProductHtmlContentProps {
  content: string;
  className?: string;
  variant?: 'compact' | 'full';
}

/**
 * Clean & sanitize CMS HTML content safely while resolving relative backend media URLs.
 * Strips executable scripts, iframe injections, inline event handlers, and javascript: links.
 */
function sanitizeAndFormatHtml(rawHtml: string): string {
  if (!rawHtml || typeof rawHtml !== 'string') return '';

  let sanitized = rawHtml
    // Remove script tags and contents
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove iframes
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    // Remove form tags
    .replace(/<\/?form\b[^>]*>/gi, '')
    // Remove inline event handlers (e.g. onload, onerror, onclick)
    .replace(/\s+on[a-z]+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, '')
    // Remove javascript: pseudo-protocol in links or sources
    .replace(/(href|src)\s*=\s*['"]javascript:[^'"]*['"]/gi, '$1="#"')
    // Rewrite relative storage image paths to backend URL
    .replace(/src="(?:\/storage\/)([^"]+)"/gi, `src="${BOTBLE_URL}/storage/$1"`)
    .replace(/src='(?:\/storage\/)([^']+)'/gi, `src="${BOTBLE_URL}/storage/$1"`);

  // Strip Botble image thumbnail suffixes like -150x150, -400x400 that may not exist on disk
  sanitized = sanitized.replace(
    /(src="[^"]+)-(\d+x\d+|thumb)(\.[a-zA-Z0-9]+)(")/gi,
    '$1$3$4'
  );

  return sanitized;
}

export default function ProductHtmlContent({
  content,
  className = '',
  variant = 'compact',
}: ProductHtmlContentProps) {
  const sanitizedHtml = useMemo(() => sanitizeAndFormatHtml(content), [content]);

  if (!sanitizedHtml.trim()) return null;

  const defaultClasses =
    variant === 'compact'
      ? 'prose prose-neutral max-w-none text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-light [&>p]:mb-2.5 last:[&>p]:mb-0 [&>p>img]:inline-block [&>p>img]:mr-2 [&>p>img]:align-middle [&>ul]:list-disc [&>ul]:pl-4.5 [&>ul]:my-2 [&>ol]:list-decimal [&>ol]:pl-4.5 [&>li]:mb-1.5 [&>li]:text-neutral-600 [&>strong]:font-medium [&>strong]:text-neutral-900 [&>a]:text-neutral-900 [&>a]:underline'
      : 'prose prose-neutral max-w-none text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-light [&>p]:mb-3 [&>h3]:font-display [&>h3]:text-sm [&>h3]:font-medium [&>h3]:text-neutral-950 [&>h3]:mt-4 [&>h3]:mb-1.5 [&>h4]:font-display [&>h4]:text-xs [&>h4]:font-semibold [&>h4]:text-neutral-900 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1.5 [&>ul]:my-2.5 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-1.5 [&>li]:text-neutral-600 [&>strong]:font-medium [&>strong]:text-neutral-950 [&>img]:border [&>img]:border-neutral-200/80 [&>img]:my-3';

  return (
    <div
      className={`${defaultClasses} ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
