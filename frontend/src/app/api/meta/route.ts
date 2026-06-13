import { NextRequest, NextResponse } from 'next/server';

const FASTAPI =
  process.env.FASTAPI_URL ?? process.env.NEXT_PUBLIC_FASTAPI ?? 'http://127.0.0.1:8080';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const [fastapiRes] = await Promise.all([
      fetch(`${FASTAPI}/api/v1/projects`, { cache: 'no-store' }),
    ]);

    if (!fastapiRes.ok) throw new Error(`FastAPI error: ${fastapiRes.status}`);

    const fastapiProjects = await fastapiRes.json();

    return NextResponse.json({ fastapiBaseUrl: FASTAPI, fastapiProjects });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to load FastAPI datasets.';
    console.error('meta error:', message);
    return NextResponse.json({ message, fastapiBaseUrl: FASTAPI }, { status: 500 });
  }
}
