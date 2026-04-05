"use client";

import { useState } from "react";
import { IDKitRequestWidget, orbLegacy } from "@worldcoin/idkit";
import type { IDKitResult, RpContext } from "@worldcoin/idkit";
import StarRating from "./StarRating";
import { Send, Loader2 } from "lucide-react";

interface ReviewFormProps {
  placeId: number;
  onReviewSubmitted: () => void;
}

export default function ReviewForm({
  placeId,
  onReviewSubmitted,
}: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [rpContext, setRpContext] = useState<RpContext | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const action = `review-place-${placeId}`;

  const handleOpenWidget = async () => {
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }
    if (!text.trim()) {
      setError("Please write a review");
      return;
    }
    setError("");
    setLoading(true);

    try {
      console.log("Fetching signing context for action:", action);
      const res = await fetch("/api/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      if (!res.ok) {
        throw new Error("Failed to get signing context");
      }

      const data = await res.json();
      console.log("Received rpContext:", data.rpContext);
      setRpContext(data.rpContext);
      setOpen(true);
    } catch (error) {
      console.error("Failed to get signing context:", error);
      setError("Failed to initialize verification. Check your app credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (result: IDKitResult) => {
    console.log("handleVerify called with result:", result);
    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...result,
        action,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Verification failed:", errorData);
      throw new Error("Verification failed");
    }
    console.log("Verification successful");
  };

  const onSuccess = async (result: IDKitResult) => {
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          placeId,
          rating,
          text: text.trim(),
          nullifierHash: result.nullifier_hash,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to submit review");
        return;
      }

      setText("");
      setRating(0);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      onReviewSubmitted();
    } catch {
      setError("Failed to submit review");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4">
      <h3 className="font-semibold text-gray-900 mb-3">Write a Review</h3>

      <div className="mb-3">
        <label className="text-sm text-gray-600 mb-1 block">Your Rating</label>
        <StarRating rating={rating} interactive onRate={setRating} />
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Share your experience..."
        className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
      />

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      {success && (
        <p className="text-green-600 text-xs mt-1">
          Review submitted successfully!
        </p>
      )}

      <button
        onClick={handleOpenWidget}
        disabled={loading}
        className="mt-3 w-full bg-green-600 text-white rounded-xl py-2.5 text-sm font-medium flex items-center justify-center gap-2 hover:bg-green-700 transition-colors disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Send className="w-4 h-4" />
        )}
        Verify & Submit Review
      </button>

      {rpContext && (
        <IDKitRequestWidget
          open={open}
          onOpenChange={(newOpen) => {
            console.log("Widget open state changed to:", newOpen);
            setOpen(newOpen);
          }}
          app_id={process.env.NEXT_PUBLIC_APP_ID as `app_${string}`}
          action={action}
          rp_context={rpContext}
          allow_legacy_proofs={true}
          preset={orbLegacy()}
          handleVerify={handleVerify}
          onSuccess={onSuccess}
          onError={(errorCode) => {
            console.error("Verification error details:");
            console.error("- Error code:", errorCode);
            console.error("- App ID:", process.env.NEXT_PUBLIC_APP_ID);
            console.error("- Action:", action);
            console.error("- RP Context:", rpContext);
            setError(`Verification error: ${errorCode}`);
          }}
        />
      )}
    </div>
  );
}