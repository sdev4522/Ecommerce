import { NextResponse } from 'next/server';

const BOTBLE_URL = process.env.NEXT_PUBLIC_BOTBLE_URL || 'http://localhost:8000';
const BOTBLE_API_KEY = process.env.BOTBLE_API_KEY || '';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { coupon_code, subtotal = 0 } = body;

    const code = (coupon_code || '').trim().toUpperCase();

    if (!code) {
      return NextResponse.json(
        { success: false, message: 'Please enter a coupon code.' },
        { status: 400 }
      );
    }

    // 1. First check Botble CMS coupons catalog
    let foundCoupon: any = null;

    try {
      const couponsRes = await fetch(`${BOTBLE_URL}/api/v1/ecommerce/coupons`, {
        headers: {
          'Accept': 'application/json',
          'X-API-KEY': BOTBLE_API_KEY,
        },
        cache: 'no-store',
      });

      if (couponsRes.ok) {
        const json = await couponsRes.json();
        const availableCoupons: any[] = json?.data || [];
        foundCoupon = availableCoupons.find(
          (c) => (c.code || '').trim().toUpperCase() === code
        );
      }
    } catch (err) {
      console.error('Failed to fetch Botble coupons list:', err);
    }

    // 2. If not found in public list, try direct Botble coupon apply validation endpoint
    if (!foundCoupon) {
      try {
        const applyRes = await fetch(`${BOTBLE_URL}/api/v1/ecommerce/coupon/apply`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-API-KEY': BOTBLE_API_KEY,
          },
          body: JSON.stringify({
            coupon_code: code,
            cart_id: 'headless_customer_session',
          }),
        });

        const applyJson = await applyRes.json();
        if (applyRes.ok && !applyJson.error) {
          foundCoupon = {
            code: code,
            title: `Promo ${code}`,
            type_option: 'amount',
            value: applyJson?.data?.coupon_discount_amount || 0,
            display_at_checkout: true,
          };
        }
      } catch (err) {
        console.error('Failed direct Botble apply verification:', err);
      }
    }

    // 3. Built-in promotional coupon fallback (WELCOME10)
    if (!foundCoupon && code === 'WELCOME10') {
      foundCoupon = {
        code: 'WELCOME10',
        title: 'Welcome 10% Off',
        type_option: 'percentage',
        value: 10,
        display_at_checkout: true,
      };
    }

    if (!foundCoupon) {
      return NextResponse.json(
        {
          success: false,
          message: `Coupon code "${code}" is invalid or has expired. Please check the code and try again.`,
        },
        { status: 404 }
      );
    }

    // Check minimum order price if specified
    if (foundCoupon.min_order_price && subtotal < Number(foundCoupon.min_order_price)) {
      return NextResponse.json(
        {
          success: false,
          message: `Minimum order of ₹${Number(foundCoupon.min_order_price).toLocaleString()} required to use coupon "${code}".`,
        },
        { status: 400 }
      );
    }

    // Compute discount amount based on Botble discount type
    const typeOption = foundCoupon.type_option || 'amount';
    const couponValue = Number(foundCoupon.value) || 0;
    let discountAmount = 0;
    let isFreeShipping = false;

    if (typeOption === 'percentage') {
      discountAmount = Math.round((subtotal * couponValue) / 100);
    } else if (typeOption === 'shipping') {
      isFreeShipping = true;
      discountAmount = 0;
    } else if (typeOption === 'amount' || typeOption === 'same-price') {
      discountAmount = Math.min(subtotal, Math.round(couponValue));
    }

    return NextResponse.json({
      success: true,
      message: isFreeShipping
        ? `Free Shipping coupon "${code}" applied successfully!`
        : `Coupon "${code}" applied! You saved ₹${discountAmount.toLocaleString('en-IN')}.`,
      coupon: {
        code: foundCoupon.code,
        title: foundCoupon.title || foundCoupon.code,
        type_option: typeOption,
        value: couponValue,
        discountAmount,
        isFreeShipping,
      },
    });
  } catch (err: any) {
    console.error('Coupon apply API error:', err);
    return NextResponse.json(
      { success: false, message: err.message || 'Error processing coupon.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const couponsRes = await fetch(`${BOTBLE_URL}/api/v1/ecommerce/coupons`, {
      headers: {
        'Accept': 'application/json',
        'X-API-KEY': BOTBLE_API_KEY,
      },
      next: { revalidate: 60 },
    });

    if (!couponsRes.ok) {
      return NextResponse.json({ success: true, coupons: [] });
    }

    const json = await couponsRes.json();
    const availableCoupons = (json?.data || [])
      .filter((c: any) => !c.is_expired && (c.display_at_checkout ?? true))
      .map((c: any) => ({
        code: c.code,
        title: c.title,
        value: c.value,
        type_option: c.type_option,
        min_order_price: c.min_order_price,
      }));

    return NextResponse.json({ success: true, coupons: availableCoupons });
  } catch {
    return NextResponse.json({ success: true, coupons: [] });
  }
}
