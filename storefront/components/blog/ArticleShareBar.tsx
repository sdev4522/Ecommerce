'use client';

import React, { useState } from 'react';
import { Share2, Link as LinkIcon, Check } from 'lucide-react';
import { toast } from 'sonner';

interface ArticleShareBarProps {
  title: string;
  url?: string;
}

export default function ArticleShareBar({ title, url }: ArticleShareBarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Article link copied to clipboard");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleTwitterShare = () => {
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
      '_blank'
    );
  };

  const handleLinkedinShare = () => {
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      '_blank'
    );
  };

  const handleFacebookShare = () => {
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      '_blank'
    );
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-6 my-10 border-y border-neutral-200 text-xs">
      <div className="flex items-center gap-2 text-neutral-500 font-light">
        <Share2 size={15} className="text-neutral-900" />
        <span className="uppercase tracking-wider font-semibold text-[11px] font-display text-neutral-900">
          Share Chronicle
        </span>
      </div>

      <div className="flex items-center gap-2">
        {/* X / Twitter */}
        <button
          onClick={handleTwitterShare}
          className="p-2 border border-neutral-200 hover:border-neutral-950 hover:bg-neutral-50 transition-colors text-neutral-700 hover:text-black cursor-pointer"
          aria-label="Share on X"
          title="Share on X"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>

        {/* LinkedIn */}
        <button
          onClick={handleLinkedinShare}
          className="p-2 border border-neutral-200 hover:border-neutral-950 hover:bg-neutral-50 transition-colors text-neutral-700 hover:text-black cursor-pointer"
          aria-label="Share on LinkedIn"
          title="Share on LinkedIn"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
          </svg>
        </button>

        {/* Facebook */}
        <button
          onClick={handleFacebookShare}
          className="p-2 border border-neutral-200 hover:border-neutral-950 hover:bg-neutral-50 transition-colors text-neutral-700 hover:text-black cursor-pointer"
          aria-label="Share on Facebook"
          title="Share on Facebook"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
          </svg>
        </button>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-neutral-200 hover:border-neutral-950 hover:bg-neutral-50 transition-colors text-neutral-800 cursor-pointer font-medium"
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald-600" />
              <span className="text-[11px]">Link Copied</span>
            </>
          ) : (
            <>
              <LinkIcon size={13} />
              <span className="text-[11px]">Copy Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
