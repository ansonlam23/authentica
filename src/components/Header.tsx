import { ShieldCheck, User } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-green-600" />
          <span className="text-lg font-bold text-gray-900">Authentica</span>
        </Link>

        <Link
          href="/my-reviews"
          className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
          title="My Reviews"
        >
          <User className="w-5 h-5 text-gray-600" />
        </Link>
      </div>
    </header>
  );
}
