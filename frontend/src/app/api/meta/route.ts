import { NextRequest, NextResponse } from 'next/server';

const SERVER  = process.env.LARAVEL_URL  ?? process.env.NEXT_PUBLIC_SERVER;
const FASTAPI = process.env.FASTAPI_URL  ?? process.env.NEXT_PUBLIC_FASTAPI;

export async function GET(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const [fastapiRes] = await Promise.all([
      fetch(`${FASTAPI}/api/v1/projects`),
    ]);

    if (!fastapiRes.ok) throw new Error(`FastAPI error: ${fastapiRes.status}`);

    const fastapiProjects = await fastapiRes.json();

    return NextResponse.json({ fastapiProjects });
  } catch (err: any) {
    console.error('meta error:', err.message);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}