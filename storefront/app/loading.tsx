import React from 'react';

export default function Loading() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center py-24 px-6 bg-[var(--theme-bg)]">
      <div className="flex flex-col items-center space-y-4">
        {/* Subtle pulsating brand monogram */}
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-neutral-300 animate-ping opacity-25" />
          <span className="font-display text-sm tracking-[0.3em] font-medium text-neutral-800">
            L
          </span>
        </div>
        <div className="h-[1px] w-16 bg-neutral-200 overflow-hidden relative">
          <div className="absolute inset-0 bg-neutral-900 animate-[pulse_1.5s_ease-in-out_infinite]" />
        </div>
        <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-display">
          Loading Collection
        </p>
      </div>
    </div>
  );
}
