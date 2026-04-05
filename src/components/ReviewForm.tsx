"use client";

import { useState } from "react";
import { IDKitRequestWidget, orbLegacy } from "@worldcoin/idkit";
import type { IDKitResult, RpContext } from "@worldcoin/idkit";
import StarRating from "./StarRating";
import { Send, Loader2 } from "lucide-react";

interface ReviewFormProps {
  businessId: number;
  onReviewSubmitted: () => void;
}

export default function ReviewForm({
  businessId,
  onReviewSubmitted,
}: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [rpContext, setRpContext] = useState<RpContext | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  // Store review data to persist through verification
  const [pendingReview, setPendingReview] = useState<{rating: number, text: string} | null>(null);

  const action = `review-business-${businessId}`;

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

    // Store the review data before opening the widget
    setPendingReview({ rating, text: text.trim() });

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
      setPendingReview(null);
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
    // Return the result so it can be passed to onSuccess
    return result;
  };

  const onSuccess = async (result: IDKitResult) => {
    console.log("onSuccess called with result:", result);
    console.log("Current state - Rating:", rating, "Text:", text);
    console.log("Pending review data:", pendingReview);

    // Use the stored review data instead of current state
    const reviewToSubmit = pendingReview || { rating, text: text.trim() };

    // Extract nullifier based on protocol version
    let nullifierHash: string | undefined;

    if (result.protocol_version === "3.0" && result.responses?.[0]) {
      // V3 format: nullifier is directly in the response
      nullifierHash = result.responses[0].nullifier;
    } else if (result.protocol_version === "4.0" && result.responses?.[0]) {
      // V4 format: nullifier is in the response
      nullifierHash = result.responses[0].nullifier;
    } else if ((result as any).nullifier_hash) {
      // Legacy format fallback
      nullifierHash = (result as any).nullifier_hash;
    }

    if (!nullifierHash) {
      console.error("No nullifier hash found in result:", result);
      console.error("Protocol version:", result.protocol_version);
      console.error("Responses:", result.responses);
      setError("Verification failed: No nullifier hash received");
      setPendingReview(null);
      return;
    }

    console.log("Extracted nullifier hash:", nullifierHash);

    try {
      const reviewData = {
        businessId,
        rating: reviewToSubmit.rating,
        text: reviewToSubmit.text,
        nullifierHash: nullifierHash,
      };

      console.log("Submitting review with data:", reviewData);

      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      const responseData = await res.json();
      console.log("Review submission response:", res.status, responseData);

      if (!res.ok) {
        setError(responseData.error || "Failed to submit review");
        setPendingReview(null);
        return;
      }

      // Store nullifier hash for My Reviews page
      if (typeof window !== "undefined") {
        const existingNullifiers = JSON.parse(localStorage.getItem("userNullifiers") || "[]");
        if (!existingNullifiers.includes(nullifierHash)) {
          existingNullifiers.push(nullifierHash);
          localStorage.setItem("userNullifiers", JSON.stringify(existingNullifiers));
        }
      }

      // Clear form and pending data
      setText("");
      setRating(0);
      setPendingReview(null);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      onReviewSubmitted();
    } catch (error) {
      console.error("Error submitting review:", error);
      setError("Failed to submit review");
      setPendingReview(null);
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
            // Don't clear pending review here as it might be needed in onSuccess
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