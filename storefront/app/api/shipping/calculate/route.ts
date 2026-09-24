import { NextResponse } from 'next/server';

const BOTBLE_URL = process.env.NEXT_PUBLIC_BOTBLE_URL || 'http://localhost:8000';
const BOTBLE_API_KEY = process.env.BOTBLE_API_KEY || '';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items = [], coupon = null, coupon_code = null, address = {} } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Your shopping cart is empty.' },
        { status: 400 }
      );
    }

    const resolvedCouponCode = coupon_code || coupon?.code || (typeof coupon === 'string' ? coupon : undefined);

    const backendPayload = {
      items: items.map((i: any) => ({
        product_id: Number(i.product_id || i.id),
        qty: Number(i.qty || i.quantity || 1),
      })),
      coupon_code: resolvedCouponCode,
      address: {
        name: address.name,
        email: address.email,
        phone: address.phone,
        address: address.address,
        city: address.city,
        state: address.state,
        zip_code: address.zip_code || address.zipCode || address.postal_code,
        country: address.country || 'IN',
      },
    };

    const res = await fetch(`${BOTBLE_URL}/api/v1/ecommerce/checkout/calculate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-API-KEY': BOTBLE_API_KEY,
      },
      body: JSON.stringify(backendPayload),
    });

    const data = await res.json();

    if (!res.ok || data.error || !data.data) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || 'Unable to calculate shipping from backend.',
          error_code: 'BACKEND_SHIPPING_ERROR',
        },
        { status: res.status >= 400 ? res.status : 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        subtotal: data.data.subtotal,
        discountAmount: data.data.discount_amount ?? data.data.discount ?? 0,
        shippingFee: data.data.shipping_fee ?? data.data.shipping ?? 0,
        shippingMethodName: data.data.shipping_method_name || 'Standard Delivery',
        isFreeShipping: Boolean(data.data.is_free_shipping),
        taxAmount: data.data.tax_amount ?? data.data.tax ?? 0,
        grandTotal: data.data.grand_total ?? data.data.total,
        currency: data.data.currency || 'INR',
      },
    });
  } catch (err: any) {
    console.error('Error proxying shipping calculation to Botble backend:', err);
    return NextResponse.json(
      {
        success: false,
        message: err.message || 'Internal connection error while calculating shipping.',
        error_code: 'SERVER_CONNECTION_ERROR',
      },
      { status: 500 }
    );
  }
}
