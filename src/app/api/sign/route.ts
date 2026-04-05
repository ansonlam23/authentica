import { NextResponse, NextRequest } from "next/server";
import { signRequest } from "@worldcoin/idkit/signing";

export async function POST(request: NextRequest) {
  const { action } = await request.json();

  if (!action) {
    return NextResponse.json({ error: "Action required" }, { status: 400 });
  }

  const rpId = process.env.NEXT_PUBLIC_RP_ID;
  const signingKey = process.env.RP_SIGNING_KEY;

  if (!rpId) {
    return NextResponse.json(
      { error: "RP ID not configured" },
      { status: 500 }
    );
  }

  if (!signingKey) {
    return NextResponse.json(
      { error: "Signing key not configured" },
      { status: 500 }
    );
  }

  try {
    // Use the proper signing function from @worldcoin/idkit
    const rpSignature = signRequest(action, signingKey, 300); // 5 minutes TTL

    const rpContext = {
      rp_id: rpId,
      nonce: rpSignature.nonce,
      created_at: rpSignature.createdAt,
      expires_at: rpSignature.expiresAt,
      signature: rpSignature.sig,
    };

    console.log("Generated rpContext:", rpContext);

    return NextResponse.json({ rpContext });
  } catch (error) {
    console.error("Error signing request:", error);
    return NextResponse.json(
      { error: "Failed to sign request" },
      { status: 500 }
    );
  }
}