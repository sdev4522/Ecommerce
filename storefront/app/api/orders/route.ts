import { NextResponse } from 'next/server';

const BOTBLE_URL = process.env.NEXT_PUBLIC_BOTBLE_URL || 'http://localhost:8000';
const BOTBLE_API_KEY = process.env.BOTBLE_API_KEY || '';

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    // Basic payload shape validation
    if (!payload.items || !Array.isArray(payload.items) || payload.items.length === 0) {
      return NextResponse.json(
        { error: true, message: 'Your shopping cart is empty.' },
        { status: 400 }
      );
    }

    if (!payload.address?.name || !payload.address?.phone || !payload.address?.address) {
      return NextResponse.json(
        { error: true, message: 'Please provide complete delivery address details.' },
        { status: 400 }
      );
    }

    const response = await fetch(`${BOTBLE_URL}/api/v1/ecommerce/orders/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-API-KEY': BOTBLE_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      return NextResponse.json(
        {
          error: true,
          message: data.message || 'Failed to place order with backend.',
          details: data.data || null,
        },
        { status: response.status >= 400 ? response.status : 400 }
      );
    }

    return NextResponse.json(data);
  } catch (err: any) {
    console.error('Error placing order via Botble API:', err);
    return NextResponse.json(
      { error: true, message: err.message || 'Internal server error while processing order.' },
      { status: 500 }
    );
  }
}
