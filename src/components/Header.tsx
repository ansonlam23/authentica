"use client";

import { Shield, User, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-teal-600 shadow-lg">
      <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/browse" className="flex items-center group">
          <style jsx>{`
            @keyframes shimmer {
              0% {
                background-position: -200% center;
              }
              100% {
                background-position: 200% center;
              }
            }

            @keyframes glow {
              0%, 100% {
                opacity: 0.5;
                transform: scale(1);
              }
              50% {
                opacity: 1;
                transform: scale(1.05);
              }
            }
          `}</style>
          <span
            className="text-2xl font-bold relative"
            style={{
              background: "linear-gradient(90deg, #ffffff 0%, #06b6d4 25%, #ffffff 50%, #06b6d4 75%, #ffffff 100%)",
              backgroundSize: "200% auto",
              animation: "shimmer 3s linear infinite",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
              e.currentTarget.style.animationDuration = "1s";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.animationDuration = "3s";
            }}
          >
            Authentica
          </span>
        </Link>

        <div className="flex items-center">
          <Link
            href="/my-reviews"
            className="p-2 hover:bg-white/20 backdrop-blur-sm transition-colors"
            title="My Reviews"
          >
            <User className="w-5 h-5 text-white" />
          </Link>
        </div>
      </div>
    </header>
  );
}
