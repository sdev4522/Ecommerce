import { NextResponse } from 'next/server';

const BOTBLE_URL = process.env.NEXT_PUBLIC_BOTBLE_URL || 'http://localhost:8000';
const BOTBLE_API_KEY = process.env.BOTBLE_API_KEY || '';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const res = await fetch(`${BOTBLE_URL}/api/v1/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-API-KEY': BOTBLE_API_KEY,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => null);
    return NextResponse.json(data || { error: true, message: 'Invalid server response' }, {
      status: res.status,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: true, message: err?.message || 'Authentication server unreachable' },
      { status: 500 }
    );
  }
}
