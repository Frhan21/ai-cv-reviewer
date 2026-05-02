import Image from 'next/image';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 top-0 transition-all duration-300 bg-white/70 backdrop-blur-md border-b border-[#c4c5d7]/30">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold tracking-tighter text-[#0037b0] flex items-center gap-2">
          <div className="relative w-8 h-8">
            <Image
              src="/logo-removebg-preview.png"
              alt="HireLens AI Logo"
              fill
              className="object-contain drop-shadow"
            />
          </div>
          HireLens AI
        </div>
        <div className="flex items-center gap-4 md:gap-8 text-sm font-medium text-[#434655]">
          <Link
            href="#features"
            className="hidden md:block hover:text-[#0037b0] transition-colors"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="hidden md:block hover:text-[#0037b0]"
          >
            How It Works
          </Link>
          <Link
            href="/analyze"
            className="px-4 py-2 text-xs md:text-sm md:px-5 md:py-2.5 rounded-md bg-[#0037b0] text-white hover:bg-[#1d4ed8] transition-all shadow-lg shadow-[#1d4ed8]/20"
          >
            Try Now
          </Link>
        </div>
      </div>
    </nav>
  );
};
