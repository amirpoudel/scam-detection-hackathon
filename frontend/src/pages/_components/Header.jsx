import { Shield } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-blue-500" />
          <span className="font-bold text-white text-lg">ScamShield</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#how-it-works"
            className="text-slate-300 hover:text-white transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="#"
            className="text-slate-300 hover:text-white transition-colors"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
