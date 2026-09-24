'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { RotateCcw, ArrowRight, ShieldAlert } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log exception for internal telemetry
    console.error('Unhandled storefront exception:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 bg-white">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-500">
          <ShieldAlert size={28} strokeWidth={1.5} />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block font-display">
            Temporary Disruption
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-medium text-neutral-950">
            Something Went Wrong
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed max-w-sm mx-auto">
            An unexpected error occurred while rendering this view. Our engineering atelier has been notified.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            type="button"
            className="w-full sm:w-auto bg-neutral-950 text-white text-xs uppercase tracking-widest font-semibold px-6 py-3.5 hover:bg-neutral-800 transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw size={14} />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto border border-neutral-300 text-neutral-800 text-xs uppercase tracking-widest font-semibold px-6 py-3.5 hover:bg-neutral-50 transition-colors inline-flex items-center justify-center gap-2"
          >
            <span>Return Home</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
