import { NextRequest, NextResponse } from 'next/server';

const SERVER = process.env.LARAVEL_URL ?? process.env.NEXT_PUBLIC_SERVER;

function getToken(request: NextRequest) {
  return request.cookies.get('token')?.value;
}

export async function GET(request: NextRequest) {
  const token = getToken(request);
  console.log('TOKEN:', token);
  if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const res = await fetch(`${SERVER}/api/projects`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    if (!res.ok) throw new Error(`Laravel error: ${res.status}`);

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    console.error('projects GET error:', err.message);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const token = getToken(request);
  if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const formData = await request.formData();

    const res = await fetch(`${SERVER}/api/projects`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json();
      return NextResponse.json(err, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    console.error('projects POST error:', err.message);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}