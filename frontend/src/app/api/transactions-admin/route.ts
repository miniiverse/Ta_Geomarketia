import { NextRequest, NextResponse } from 'next/server';

const SERVER = process.env.LARAVEL_API_URL ?? process.env.NEXT_PUBLIC_SERVER;

function getToken(request: NextRequest) {
  return request.cookies.get('token')?.value;
}

export async function GET(request: NextRequest) {
  const token = getToken(request);
  if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.toString();

    const res = await fetch(
      `${SERVER}/api/admin/transactions${query ? `?${query}` : ''}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    );

    if (!res.ok) {
      const err = await res.json();
      return NextResponse.json(err, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Failed to fetch transactions.';
    console.error('transactions-admin GET error:', message);
    return NextResponse.json({ message }, { status: 500 });
  }
}
