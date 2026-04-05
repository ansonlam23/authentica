import { ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-2">
        <ShieldCheck className="w-6 h-6 text-green-600" />
        <Link href="/" className="text-lg font-bold text-gray-900">
          Authentica
        </Link>
      </div>
    </header>
  );
}
