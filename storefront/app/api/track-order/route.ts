import { NextResponse } from 'next/server';

const BOTBLE_URL = process.env.NEXT_PUBLIC_BOTBLE_URL || 'http://localhost:8000';
const BOTBLE_API_KEY = process.env.BOTBLE_API_KEY || '';

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const response = await fetch(`${BOTBLE_URL}/api/v1/ecommerce/orders/tracking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-API-KEY': BOTBLE_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      return NextResponse.json(
        {
          error: true,
          message: data.message || 'Order not found.',
        },
        { status: response.status >= 400 ? response.status : 404 }
      );
    }

    return NextResponse.json(data);
  } catch (err: any) {
    console.error('Error tracking order via Botble API:', err);
    return NextResponse.json(
      { error: true, message: err.message || 'Internal server error while tracking order.' },
      { status: 500 }
    );
  }
}
