import Image from 'next/image';
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <Link href="/" className="brand-mark" aria-label="HireLens AI home">
        <Image
          src="/logo-removebg-preview.png"
          alt=""
          width={34}
          height={34}
          priority
        />
        <span>HireLens AI</span>
      </Link>
      <div className="nav-links">
        <a href="#inside-review">The review</a>
        <a href="#how-it-works">How it works</a>
        <Link href="/analyze" className="nav-action">
          Review my CV
        </Link>
      </div>
    </nav>
  );
}
