export interface CommerceItem {
  price: number;
  qty: number;
}

export interface AppliedCoupon {
  code: string;
  title?: string;
  type_option: string; // 'percentage' | 'amount' | 'same-price' | 'shipping'
  value: number;
  discountAmount?: number;
  isFreeShipping?: boolean;
}

export interface ShippingConfig {
  freeShippingThreshold: number;
  standardShippingFee: number;
  currency: string;
}

export const DEFAULT_FREE_SHIPPING_THRESHOLD =
  Number(process.env.NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD) || 2000;

export const DEFAULT_STANDARD_SHIPPING_FEE =
  Number(process.env.NEXT_PUBLIC_STANDARD_SHIPPING_FEE) || 10;

export interface CommerceTotals {
  grossSubtotal: number;
  discountAmount: number;
  netSubtotal: number;
  isFreeShipping: boolean;
  shippingFee: number;
  grandTotal: number;
  freeShippingThreshold: number;
  standardShippingFee: number;
  freeShippingRemaining: number;
  freeShippingProgress: number;
}

/**
 * @deprecated Frontend shipping calculation is deprecated.
 * All authoritative shipping fees and order totals must be retrieved directly from the backend
 * via `/api/shipping/calculate` (Botble HandleShippingFeeService).
 */
export function calculateCommerceTotals({
  items,
  coupon = null,
  customThreshold,
  customShippingFee,
}: {
  items: CommerceItem[];
  coupon?: AppliedCoupon | null;
  customThreshold?: number;
  customShippingFee?: number;
}): CommerceTotals {
  const threshold = customThreshold ?? DEFAULT_FREE_SHIPPING_THRESHOLD;
  const standardFee = customShippingFee ?? DEFAULT_STANDARD_SHIPPING_FEE;

  // 1. Gross Subtotal
  const grossSubtotal = items.reduce((acc, item) => {
    const p = Math.max(0, Number(item.price) || 0);
    const q = Math.max(1, Math.floor(Number(item.qty) || 1));
    return acc + Math.round(p * q);
  }, 0);

  // 2. Discount Calculation
  let discountAmount = 0;
  let isFreeShippingCoupon = false;

  if (coupon) {
    const type = coupon.type_option || 'amount';
    const val = Number(coupon.value) || 0;

    if (type === 'percentage') {
      discountAmount = Math.round((grossSubtotal * val) / 100);
    } else if (type === 'shipping') {
      isFreeShippingCoupon = true;
      discountAmount = 0;
    } else if (type === 'amount' || type === 'same-price') {
      discountAmount = Math.min(grossSubtotal, Math.round(val));
    } else if (coupon.discountAmount !== undefined) {
      discountAmount = Math.min(grossSubtotal, Math.round(coupon.discountAmount));
    }

    if (coupon.isFreeShipping) {
      isFreeShippingCoupon = true;
    }
  }

  // 3. Net Subtotal after discounts
  const netSubtotal = Math.max(0, grossSubtotal - discountAmount);

  // 4. Free Shipping Determination
  // Free shipping unlocks if net subtotal meets threshold OR if a free shipping coupon was applied
  const isFreeShipping = isFreeShippingCoupon || netSubtotal >= threshold;
  const shippingFee = isFreeShipping ? 0 : standardFee;

  // 5. Final Grand Total
  const grandTotal = Math.max(0, netSubtotal + shippingFee);

  // 6. Remaining progress towards free shipping
  const freeShippingRemaining = Math.max(0, threshold - netSubtotal);
  const freeShippingProgress =
    threshold > 0 ? Math.min(100, Math.round((netSubtotal / threshold) * 100)) : 100;

  return {
    grossSubtotal,
    discountAmount,
    netSubtotal,
    isFreeShipping,
    shippingFee,
    grandTotal,
    freeShippingThreshold: threshold,
    standardShippingFee: standardFee,
    freeShippingRemaining,
    freeShippingProgress,
  };
}
