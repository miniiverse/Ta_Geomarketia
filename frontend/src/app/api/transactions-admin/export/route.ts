import { NextRequest, NextResponse } from "next/server";

const SERVER =
  process.env.LARAVEL_API_URL ??
  process.env.LARAVEL_URL ??
  process.env.NEXT_PUBLIC_SERVER;
const EXCEL_CONTENT_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

function getToken(request: NextRequest) {
  return request.cookies.get("token")?.value;
}

export async function GET(request: NextRequest) {
  const token = getToken(request);
  if (!token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  if (!SERVER)
    return NextResponse.json(
      { message: "Laravel API URL is not configured" },
      { status: 500 },
    );

  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get("start_date");
  const endDate = searchParams.get("end_date");

  if (!startDate || !endDate)
    return NextResponse.json(
      { message: "start_date and end_date are required" },
      { status: 422 },
    );

  try {
    const backendUrl = new URL("/api/admin/transactions/export-excel", SERVER);
    backendUrl.search = new URLSearchParams({
      start_date: startDate,
      end_date: endDate,
    }).toString();

    const res = await fetch(backendUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: EXCEL_CONTENT_TYPE,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const contentType = res.headers.get("content-type") ?? "";
      const err = contentType.includes("application/json")
        ? await res.json().catch(() => null)
        : null;
      const fallbackMessage = err
        ? null
        : await res.text().catch(() => "Export failed");

      return NextResponse.json(
        { message: err?.message ?? fallbackMessage ?? "Export failed" },
        { status: res.status },
      );
    }

    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes(EXCEL_CONTENT_TYPE)) {
      const body = await res.text().catch(() => "");
      return NextResponse.json(
        {
          message:
            body || "Export failed because backend did not return an Excel file",
        },
        { status: 502 },
      );
    }

    const buffer = await res.arrayBuffer();
    const filename = `transactions-${startDate}-to-${endDate}.xlsx`;

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": EXCEL_CONTENT_TYPE,
        "Content-Disposition":
          res.headers.get("content-disposition") ??
          `attachment; filename="${filename}"`,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Export failed";
    console.error("export excel error:", message);
    return NextResponse.json({ message }, { status: 500 });
  }
}
