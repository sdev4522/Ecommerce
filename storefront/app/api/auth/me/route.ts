import { NextResponse } from 'next/server';

const BOTBLE_URL = process.env.NEXT_PUBLIC_BOTBLE_URL || 'http://localhost:8000';
const BOTBLE_API_KEY = process.env.BOTBLE_API_KEY || '';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization') || '';
    const res = await fetch(`${BOTBLE_URL}/api/v1/me`, {
      headers: {
        Accept: 'application/json',
        'X-API-KEY': BOTBLE_API_KEY,
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
      cache: 'no-store',
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
