import { Shield, User, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-teal-600 shadow-lg">
      <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">Authentica</span>
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
