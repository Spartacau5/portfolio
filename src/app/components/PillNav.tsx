'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function PillNav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Work', href: '/work' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white/90 backdrop-blur-md rounded-full px-2 py-2 shadow-lg border border-gray-200/50">
        <ul className="flex items-center gap-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 block ${
                  pathname === item.href
                    ? 'bg-gray-200 text-gray-900 hover:text-gray-900'
                    : 'text-gray-400 hover:!text-gray-600'
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
