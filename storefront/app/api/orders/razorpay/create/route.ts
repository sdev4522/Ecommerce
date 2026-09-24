import { NextResponse } from 'next/server';

const BOTBLE_URL = process.env.NEXT_PUBLIC_BOTBLE_URL || 'http://localhost:8000';
const BOTBLE_API_KEY = process.env.BOTBLE_API_KEY || '';

const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, coupon, address = {} } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Your shopping cart is empty.' },
        { status: 400 }
      );
    }

    const resolvedCouponCode = coupon?.code || (typeof coupon === 'string' ? coupon : undefined);

    // 1. Authoritative calculation from backend Botble checkout calculation engine
    const calcRes = await fetch(`${BOTBLE_URL}/api/v1/ecommerce/checkout/calculate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-API-KEY': BOTBLE_API_KEY,
      },
      body: JSON.stringify({
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
      }),
    });

    const calcData = await calcRes.json();

    if (!calcRes.ok || calcData.error || !calcData.data) {
      return NextResponse.json(
        {
          success: false,
          message: calcData.message || 'Unable to calculate authoritative order totals from backend.',
        },
        { status: 400 }
      );
    }

    const {
      subtotal = 0,
      discount_amount = 0,
      shipping_fee = 0,
      grand_total = 0,
      currency = 'INR',
    } = calcData.data;

    const amountInPaise = Math.round(grand_total * 100);

    if (amountInPaise <= 0) {
      return NextResponse.json(
        { success: false, message: 'Order total must be greater than zero for online payments.' },
        { status: 400 }
      );
    }

    // 2. Create Razorpay Order via official Razorpay Orders API
    const authHeader = `Basic ${Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64')}`;
    const receiptId = `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    const rzpRes = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: currency || 'INR',
        receipt: receiptId,
        payment_capture: 1, // automatic capture
        notes: {
          item_count: items.length,
          subtotal,
          discount_applied: discount_amount,
          shipping_fee,
        },
      }),
    });

    const rzpData = await rzpRes.json();

    if (!rzpRes.ok || !rzpData.id) {
      console.error('Razorpay order creation failed:', rzpData);
      return NextResponse.json(
        {
          success: false,
          message: rzpData.error?.description || 'Failed to initiate Razorpay online checkout.',
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      razorpay_order_id: rzpData.id,
      amount: rzpData.amount,
      currency: rzpData.currency || 'INR',
      key_id: RAZORPAY_KEY_ID,
      authoritative_total: grand_total,
      shipping_fee,
      discount_amount,
    });
  } catch (err: any) {
    console.error('Error creating Razorpay order:', err);
    return NextResponse.json(
      { success: false, message: err.message || 'Internal server error while initializing payment.' },
      { status: 500 }
    );
  }
}
