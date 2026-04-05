import { Shield, User, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-teal-600 shadow-lg">
      <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-white hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
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
