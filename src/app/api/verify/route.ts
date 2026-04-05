import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const proof = await request.json();

  const rpId = process.env.NEXT_PUBLIC_RP_ID;
  if (!rpId) {
    return NextResponse.json(
      { error: "RP ID not configured" },
      { status: 500 }
    );
  }

  const verifyRes = await fetch(
    `https://developer.world.org/api/v4/verify/${rpId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(proof),
    }
  );

  if (!verifyRes.ok) {
    const errorData = await verifyRes.json().catch(() => ({}));
    return NextResponse.json(
      { error: "Verification failed", details: errorData },
      { status: 400 }
    );
  }

  const verifyData = await verifyRes.json();
  return NextResponse.json({ success: true, data: verifyData });
}
