import { NextResponse } from 'next/server';

const BOTBLE_URL = process.env.NEXT_PUBLIC_BOTBLE_URL || 'http://localhost:8000';
const BOTBLE_API_KEY = process.env.BOTBLE_API_KEY || '';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization') || '';
    if (!authHeader) {
      return NextResponse.json({ error: true, message: 'Unauthorized' }, { status: 401 });
    }

    const headers: Record<string, string> = {
      Accept: 'application/json',
      Authorization: authHeader,
    };
    if (BOTBLE_API_KEY) {
      headers['X-API-KEY'] = BOTBLE_API_KEY;
    }

    const res = await fetch(`${BOTBLE_URL}/api/v1/ecommerce/addresses`, {
      headers,
      cache: 'no-store',
    });

    const data = await res.json().catch(() => ({ data: [] }));
    return NextResponse.json(data, { status: res.status });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error fetching addresses';
    return NextResponse.json({ error: true, message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization') || '';
    if (!authHeader) {
      return NextResponse.json({ error: true, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: authHeader,
    };
    if (BOTBLE_API_KEY) {
      headers['X-API-KEY'] = BOTBLE_API_KEY;
    }

    const res = await fetch(`${BOTBLE_URL}/api/v1/ecommerce/addresses`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => null);
    return NextResponse.json(data, { status: res.status });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error saving address';
    return NextResponse.json({ error: true, message }, { status: 500 });
  }
}
