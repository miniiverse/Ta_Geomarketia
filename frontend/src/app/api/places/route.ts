import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const apiUrl = searchParams.get("api_url");

  if (!apiUrl)
    return NextResponse.json({ message: "api_url required" }, { status: 400 });

  try {
    const firstRes = await fetch(`${apiUrl}/places?page=1&page_size=50`, {
      cache: "no-store",
    });

    if (!firstRes.ok) throw new Error(`FastAPI error: ${firstRes.status}`);

    const firstData = await firstRes.json();
    const totalPages: number = Math.min(firstData.total_pages ?? 1, 20);

    const allData = [...(firstData.data ?? [])];

    for (let i = 2; i <= totalPages; i += 5) {
      const batch = Array.from(
        { length: Math.min(5, totalPages - i + 1) },
        (_, j) => i + j,
      );
      const batchRes = await Promise.all(
        batch.map((p) =>
          fetch(`${apiUrl}/places?page=${p}&page_size=50`, {
            cache: "no-store",
          })
            .then((r) => r.json())
            .then((d) => d.data ?? [])
            .catch(() => []),
        ),
      );
      allData.push(...batchRes.flat());
    }

    const valid = allData.filter(
      (p: any) =>
        p.latitude !== 0 &&
        p.longitude !== 0 &&
        p.latitude >= 0.85 &&
        p.latitude <= 1.2 && 
        p.longitude >= 103.65 &&
        p.longitude <= 104.35,
    );

    return NextResponse.json({
      total: firstData.total,
      data: valid,
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message, data: [] },
      { status: 500 },
    );
  }
}
