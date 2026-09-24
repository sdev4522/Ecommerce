import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 bg-white">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
          <Compass size={28} strokeWidth={1.5} />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block font-display">
            404 Error
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-medium text-neutral-950">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed max-w-sm mx-auto">
            The page you are looking for may have moved, been renamed, or is temporarily unavailable.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/shop"
            className="w-full sm:w-auto bg-neutral-950 text-white text-xs uppercase tracking-widest font-semibold px-6 py-3.5 hover:bg-neutral-800 transition-colors inline-flex items-center justify-center gap-2"
          >
            <span>Shop Collection</span>
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto border border-neutral-300 text-neutral-800 text-xs uppercase tracking-widest font-semibold px-6 py-3.5 hover:bg-neutral-50 transition-colors inline-flex items-center justify-center"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
