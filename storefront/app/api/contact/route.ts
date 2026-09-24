import { NextResponse } from 'next/server';

const BOTBLE_URL = process.env.NEXT_PUBLIC_BOTBLE_URL || 'http://localhost:8000';
const BOTBLE_API_KEY = process.env.BOTBLE_API_KEY || '';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, content } = body;

    if (!name || !email || !content) {
      return NextResponse.json(
        { error: true, message: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    if (BOTBLE_API_KEY) {
      headers['X-API-KEY'] = BOTBLE_API_KEY;
    }

    const res = await fetch(`${BOTBLE_URL}/contact/send`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => null);
    if (!res.ok) {
      return NextResponse.json(
        { error: true, message: data?.message || 'Failed to submit contact message.' },
        { status: res.status }
      );
    }

    return NextResponse.json(data || { error: false, message: 'Message sent successfully.' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error sending message';
    return NextResponse.json({ error: true, message }, { status: 500 });
  }
}
