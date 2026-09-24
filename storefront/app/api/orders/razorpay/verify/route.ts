import { NextResponse } from 'next/server';
import crypto from 'crypto';

const BOTBLE_URL = process.env.NEXT_PUBLIC_BOTBLE_URL || 'http://localhost:8000';
const BOTBLE_API_KEY = process.env.BOTBLE_API_KEY || '';

const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      address,
      items,
      coupon_code,
      note,
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, message: 'Missing payment verification credentials.' },
        { status: 400 }
      );
    }

    // 1. Verify HMAC SHA-256 signature
    const generatedSignature = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      console.error('Razorpay signature mismatch:', {
        generated: generatedSignature,
        received: razorpay_signature,
      });
      return NextResponse.json(
        {
          success: false,
          message: 'Payment verification failed: Signature mismatch. Potential tampering detected.',
        },
        { status: 400 }
      );
    }

    // 2. Fetch payment details from Razorpay to verify payment status and amount
    const authHeader = `Basic ${Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64')}`;

    const rzpPaymentRes = await fetch(
      `https://api.razorpay.com/v1/payments/${encodeURIComponent(razorpay_payment_id)}`,
      {
        headers: {
          Authorization: authHeader,
          Accept: 'application/json',
        },
      }
    );

    const paymentData = await rzpPaymentRes.json();

    if (!rzpPaymentRes.ok || !paymentData.id) {
      console.error('Failed to fetch payment from Razorpay API:', paymentData);
      return NextResponse.json(
        {
          success: false,
          message: 'Unable to verify payment with Razorpay. Please contact support.',
        },
        { status: 502 }
      );
    }

    if (paymentData.status !== 'captured' && paymentData.status !== 'authorized') {
      return NextResponse.json(
        {
          success: false,
          message: `Payment status is ${paymentData.status}. Order cannot be confirmed as paid.`,
        },
        { status: 400 }
      );
    }

    // 3. Create or complete order in Botble CMS
    const botbleOrderPayload = {
      address,
      items: items.map((item: any) => ({
        product_id: item.product_id,
        product_name: item.product_name || item.name,
        qty: item.qty,
        price: item.price,
        image: item.image,
        options: item.options || {
          size: item.size,
          color: item.color,
        },
      })),
      payment_method: 'razorpay',
      payment_status: 'completed',
      charge_id: razorpay_payment_id,
      coupon_code: coupon_code || undefined,
      note: note || '',
    };

    const orderRes = await fetch(`${BOTBLE_URL}/api/v1/ecommerce/orders/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-API-KEY': BOTBLE_API_KEY,
      },
      body: JSON.stringify(botbleOrderPayload),
    });

    const orderData = await orderRes.json();

    if (!orderRes.ok || orderData.error) {
      console.error('Failed to create Botble order after verified payment:', orderData);
      return NextResponse.json(
        {
          success: false,
          message:
            orderData.message ||
            'Payment verified, but failed to record order in backend. Our support team has been notified.',
          payment_id: razorpay_payment_id,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified and order confirmed successfully.',
      data: orderData.data,
      payment_id: razorpay_payment_id,
    });
  } catch (err: any) {
    console.error('Error during payment verification:', err);
    return NextResponse.json(
      { success: false, message: err.message || 'Internal server error verifying payment.' },
      { status: 500 }
    );
  }
}
