'use client';

import React, { useMemo, useRef, useEffect } from 'react';

export interface ParsedVariationLabel {
  primary: string;
  secondary?: string;
}

/**
 * Robustly parses a variation label to split dimensions / titles from secondary descriptors.
 * Examples:
 * - "105 X 82 CM (3.5FT)" -> primary: "105 X 82 CM", secondary: "(3.5FT)"
 * - "90 X 70 CM (3FT)"     -> primary: "90 X 70 CM", secondary: "(3FT)"
 * - "105 X 82 CM \n (3.5FT)" -> primary: "105 X 82 CM", secondary: "(3.5FT)"
 * - "105 X 82 CM - 3.5FT"  -> primary: "105 X 82 CM", secondary: "(3.5FT)"
 * - "Queen (60x80 in)"     -> primary: "Queen", secondary: "(60x80 in)"
 * - "XS" / "S" / "M"       -> primary: "XS", secondary: undefined
 */
export function parseVariationLabel(label: string): ParsedVariationLabel {
  if (!label) return { primary: '' };
  const raw = label.trim();

  // 1. Explicit newline split
  if (raw.includes('\n')) {
    const parts = raw.split('\n').map((p) => p.trim()).filter(Boolean);
    return {
      primary: parts[0] || '',
      secondary: parts.slice(1).join(' ') || undefined,
    };
  }

  // 2. Trailing parentheses or brackets: e.g. "105 X 82 CM (3.5FT)" or "Queen [60x80]"
  const parenMatch = raw.match(/^(.*?)\s*([(\[][^)\]]+[)\]])\s*$/);
  if (parenMatch && parenMatch[1].trim()) {
    return {
      primary: parenMatch[1].trim(),
      secondary: parenMatch[2].trim(),
    };
  }

  // 3. Dash separator: e.g. "105 X 82 CM - 3.5FT"
  if (raw.includes(' - ')) {
    const parts = raw.split(' - ').map((p) => p.trim()).filter(Boolean);
    const sec = parts.slice(1).join(' - ');
    const formattedSec = sec.startsWith('(') ? sec : `(${sec})`;
    return {
      primary: parts[0],
      secondary: formattedSec,
    };
  }

  // 4. Dimension + foot/measure without parens: e.g. "105 X 82 CM 3.5FT"
  const dimWithFtMatch = raw.match(
    /^(\d+(?:\.\d+)?\s*[xX×]\s*\d+(?:\.\d+)?(?:\s*[a-zA-Z]+)?)\s+([\(\[]?\d+(?:\.\d+)?\s*(?:FT|ft|IN|in|feet|cm|m)[\)\]]?)$/i
  );
  if (dimWithFtMatch && dimWithFtMatch[1]) {
    const sec = dimWithFtMatch[2].startsWith('(') ? dimWithFtMatch[2] : `(${dimWithFtMatch[2]})`;
    return {
      primary: dimWithFtMatch[1].trim(),
      secondary: sec,
    };
  }

  return { primary: raw };
}

export interface VariationOptionItem {
  id?: string | number;
  value: string;
  label?: string;
  inStock?: boolean;
  exists?: boolean;
}

export interface ProductVariationChipsProps {
  /** Optional section title, e.g. "Size:" or "SELECT SIZE:" */
  label?: string;
  /** Currently selected value string */
  selectedValue: string;
  /** List of option strings or objects */
  options: (string | VariationOptionItem)[];
  /** Callback fired when an option is selected */
  onSelect: (value: string) => void;
  /** Dynamic availability checker for out-of-stock states */
  checkAvailability?: (value: string) => { exists: boolean; inStock: boolean };
  /** Right side header action element, e.g. Size & Measurements Matrix button */
  headerRightAction?: React.ReactNode;
  /** Optional disclaimer / model info note below chips */
  subText?: string;
  /** Optional container class name */
  className?: string;
  /** Layout mode: 'wrap' (default, content-sized chips wrap naturally) or 'scroll' (horizontal scroller) */
  layoutMode?: 'wrap' | 'scroll' | 'auto';
}

export default function ProductVariationChips({
  label = 'Size:',
  selectedValue,
  options,
  onSelect,
  checkAvailability,
  headerRightAction,
  subText,
  className = '',
  layoutMode = 'auto',
}: ProductVariationChipsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize options into structured items
  const normalizedOptions: VariationOptionItem[] = useMemo(() => {
    return options.map((opt, idx) => {
      if (typeof opt === 'string') {
        const availability = checkAvailability ? checkAvailability(opt) : { exists: true, inStock: true };
        return {
          id: idx,
          value: opt,
          label: opt,
          inStock: availability.inStock,
          exists: availability.exists,
        };
      }
      const availability = checkAvailability
        ? checkAvailability(opt.value)
        : { exists: opt.exists ?? true, inStock: opt.inStock ?? true };
      return {
        ...opt,
        inStock: availability.inStock,
        exists: availability.exists,
      };
    });
  }, [options, checkAvailability]);

  // Determine whether any option has secondary text or is long (dimensions, multi-word, etc.)
  const hasLongSizes = useMemo(() => {
    return normalizedOptions.some((opt) => {
      const parsed = parseVariationLabel(opt.label || opt.value);
      return Boolean(parsed.secondary) || parsed.primary.length > 5;
    });
  }, [normalizedOptions]);

  // If option count is genuinely large (> 10 items) and layoutMode is 'auto', enable horizontal scrolling
  const isScrollMode = layoutMode === 'scroll' || (layoutMode === 'auto' && normalizedOptions.length > 10);

  // Scroll active chip into view if in scroll mode
  useEffect(() => {
    if (!isScrollMode || !containerRef.current) return;
    const selectedEl = containerRef.current.querySelector<HTMLElement>('[data-selected="true"]');
    if (selectedEl) {
      selectedEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [selectedValue, isScrollMode]);

  return (
    <div className={`space-y-2.5 ${className}`}>
      {/* Group Variation Header: Label + Selected Value + Header Right Action */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1.5 text-xs">
        <div className="flex items-baseline gap-1.5 min-w-0">
          <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold font-display">
            {label}
          </span>
          <span className="text-xs sm:text-sm font-semibold text-neutral-950 font-display truncate">
            {selectedValue}
          </span>
        </div>

        {headerRightAction && (
          <div className="shrink-0">
            {headerRightAction}
          </div>
        )}
      </div>

      {/* Content-sized Responsive Chips Container */}
      <div
        ref={containerRef}
        role="radiogroup"
        aria-label={label || 'Product variation options'}
        className={
          isScrollMode
            ? 'flex flex-nowrap items-center gap-2 overflow-x-auto no-scrollbar py-1 overscroll-x-contain'
            : 'flex flex-wrap items-center gap-2 sm:gap-2.5'
        }
      >
        {normalizedOptions.map((opt) => {
          const isSelected = selectedValue.toLowerCase() === opt.value.toLowerCase();
          const isOOS = opt.exists && !opt.inStock;
          const parsed = parseVariationLabel(opt.label || opt.value);
          const hasSecondary = Boolean(parsed.secondary);

          return (
            <button
              key={opt.id ?? opt.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-disabled={isOOS}
              data-selected={isSelected ? 'true' : 'false'}
              onClick={() => onSelect(opt.value)}
              aria-label={`${opt.label || opt.value}${isOOS ? ' (Out of stock)' : ''}${isSelected ? ' (Selected)' : ''}`}
              className={`relative group inline-flex items-center justify-center transition-all duration-150 cursor-pointer select-none border font-display focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 active:scale-[0.98] ${
                hasSecondary
                  ? 'flex-col px-3.5 sm:px-4 py-2 min-h-[48px] sm:min-h-[52px] min-w-[110px] sm:min-w-[124px] text-center'
                  : hasLongSizes
                  ? 'px-4 sm:px-4.5 py-2.5 min-h-[44px] sm:min-h-[48px] min-w-[56px] text-center'
                  : 'px-3.5 sm:px-4 py-2.5 min-h-[44px] sm:min-h-[48px] min-w-[46px] sm:min-w-[50px] text-center'
              } ${
                isSelected
                  ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs ring-2 ring-neutral-950 ring-offset-2 z-10'
                  : isOOS
                  ? 'bg-neutral-50/80 text-neutral-400 border-neutral-200 hover:border-neutral-300'
                  : 'bg-white text-neutral-900 border-neutral-300 hover:border-neutral-950 shadow-2xs'
              }`}
            >
              {/* Primary Label (e.g. "105 X 82 CM" or "M") */}
              <span
                className={`font-semibold tracking-wider text-xs sm:text-[13px] uppercase leading-tight whitespace-nowrap ${
                  isSelected
                    ? 'text-white'
                    : isOOS
                    ? 'line-through text-neutral-400'
                    : 'text-neutral-950'
                }`}
              >
                {parsed.primary}
              </span>

              {/* Secondary Label (e.g. "(3.5FT)") */}
              {hasSecondary && (
                <span
                  className={`font-medium tracking-wider text-[10px] sm:text-[10.5px] uppercase leading-tight mt-0.5 whitespace-nowrap ${
                    isSelected
                      ? 'text-neutral-200'
                      : isOOS
                      ? 'line-through text-neutral-400/80'
                      : 'text-neutral-600'
                  }`}
                >
                  {parsed.secondary}
                </span>
              )}

              {/* Out of Stock Subtle Diagonal Indicator */}
              {isOOS && !isSelected && (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none overflow-hidden"
                >
                  <span className="absolute top-1/2 left-0 w-full h-[1px] bg-neutral-300 -rotate-12 transform origin-center" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Subtext (e.g. Model Info or Scale Guide) */}
      {subText && (
        <p className="text-[11px] text-neutral-500 italic pt-0.5">
          * {subText}
        </p>
      )}
    </div>
  );
}
