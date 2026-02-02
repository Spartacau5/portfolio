'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Work', href: '/work' },
  ];

  // Determine which tab is active
  const getActiveTab = () => {
    if (pathname === '/') return '/';
    if (pathname.startsWith('/about')) return '/about';
    if (pathname.startsWith('/work')) return '/work';
    return '/';
  };

  const activeTab = getActiveTab();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-6">
      <div className="w-full max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        {/* Profile Picture - Left */}
        <Link href="/" className="flex-shrink-0">
          <img
            src="/images/profilepic.png"
            alt="Profile"
            className="rounded-full w-14 h-14"
          />
        </Link>

        {/* Navigation Pills - Center */}
        <nav className="absolute left-1/2 -translate-x-1/2">
          <div className="bg-white/90 backdrop-blur-md rounded-full px-1 py-1 shadow-lg border border-gray-200/50">
            <ul className="flex items-center gap-1 relative">
              {navItems.map((item) => {
                const isActive = item.href === activeTab;
                return (
                  <li key={item.name} className="relative">
                    <Link
                      href={item.href}
                      className={`px-6 py-2 rounded-full text-sm font-medium block tracking-[0px] relative z-10 transition-colors duration-200 ${isActive
                          ? 'text-gray-900'
                          : 'text-gray-400 hover:text-gray-600'
                        }`}
                    >
                      {item.name}
                    </Link>
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 bg-gray-200 rounded-full"
                        style={{ zIndex: 0 }}
                        transition={{
                          type: 'spring',
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* LinkedIn Icon - Right */}
        <a
          href="https://www.linkedin.com/in/arpitahluwalia/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 hover:opacity-70 transition-opacity"
        >
          <img
            src="/images/mdi_linkedin.png"
            alt="LinkedIn"
            className="opacity-60 w-10 h-10"
          />
        </a>
      </div>
    </header>
  );
}
