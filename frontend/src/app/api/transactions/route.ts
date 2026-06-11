import { NextRequest, NextResponse } from 'next/server';

const SERVER = process.env.LARAVEL_URL ?? process.env.NEXT_PUBLIC_SERVER;

function getToken(request: NextRequest) {
  return request.cookies.get('token')?.value;
}

// GET /api/transactions
export async function GET(request: NextRequest) {
  const token = getToken(request);
  if (!token)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const res = await fetch(`${SERVER}/api/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    if (!res.ok) throw new Error(`Laravel error: ${res.status}`);

    const data = await res.json();
    // Laravel returns { success: true, orders: [...] }
    return NextResponse.json(data.orders ?? [], { status: 200 });
  } catch (err: any) {
    console.error('transactions GET error:', err.message);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}