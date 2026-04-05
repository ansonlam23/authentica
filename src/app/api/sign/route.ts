import { signRequest } from "@worldcoin/idkit";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { action } = await request.json();

  if (!action) {
    return NextResponse.json({ error: "Action required" }, { status: 400 });
  }

  const signingKey = process.env.RP_SIGNING_KEY;
  if (!signingKey) {
    return NextResponse.json(
      { error: "Server signing key not configured" },
      { status: 500 }
    );
  }

  const rpSignature = signRequest({
    signingKeyHex: signingKey,
    action,
    ttl: 300,
  });

  // Map RpSignature to the RpContext format expected by IDKitRequestWidget
  const rpContext = {
    rp_id: process.env.NEXT_PUBLIC_RP_ID!,
    nonce: rpSignature.nonce,
    created_at: rpSignature.createdAt,
    expires_at: rpSignature.expiresAt,
    signature: rpSignature.sig,
  };

  return NextResponse.json({ rpContext });
}
