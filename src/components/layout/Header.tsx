'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: '/', label: 'Converter' },
    { href: '/currencies', label: 'Currencies' },
    { href: '/about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/60 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold text-neutral-900 dark:text-white"
          >
            <svg
              className="w-7 h-7 text-neutral-900 dark:text-white"
              viewBox="0 0 28 28"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="14" cy="14" r="10" />
              <path d="M7 14h14M14 7v14" />
              <circle cx="14" cy="14" r="3" fill="currentColor" />
            </svg>
            <span className="hidden sm:inline">CurrencyHub</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                  isActive(link.href)
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 font-medium'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <nav className="md:hidden flex px-4 pb-3 gap-1 overflow-x-auto">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-1.5 text-xs rounded-lg shrink-0 transition-colors ${
              isActive(link.href)
                ? 'text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800 font-medium'
                : 'text-neutral-500 dark:text-neutral-400'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
