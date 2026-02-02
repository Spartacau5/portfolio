'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Work', href: '/work' },
  ];

  // Determine which tab is active
  const getActiveIndex = () => {
    if (pathname === '/') return 0;
    if (pathname.startsWith('/about')) return 1;
    if (pathname.startsWith('/work')) return 2;
    return 0;
  };

  const activeIndex = getActiveIndex();

  // Update indicator position when active tab changes
  useEffect(() => {
    const activeItem = itemRefs.current[activeIndex];
    if (activeItem && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      setIndicatorStyle({
        left: itemRect.left - navRect.left,
        width: itemRect.width,
      });
    }
  }, [activeIndex]);

  // Also update on mount and resize
  useEffect(() => {
    const updateIndicator = () => {
      const activeItem = itemRefs.current[activeIndex];
      if (activeItem && navRef.current) {
        const navRect = navRef.current.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        setIndicatorStyle({
          left: itemRect.left - navRect.left,
          width: itemRect.width,
        });
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeIndex]);

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
            <ul ref={navRef} className="flex items-center gap-1 relative">
              {/* Single animated indicator */}
              <motion.div
                className="absolute bg-gray-200 rounded-full"
                style={{ height: '100%', top: 0 }}
                animate={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 350,
                  damping: 30,
                }}
              />
              {navItems.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <li
                    key={item.name}
                    ref={(el) => { itemRefs.current[index] = el; }}
                    className="relative"
                  >
                    <Link
                      href={item.href}
                      className={`px-6 py-2 rounded-full text-sm font-medium block tracking-[0px] relative z-10 transition-colors duration-200 ${isActive
                          ? 'text-gray-900'
                          : 'text-gray-400 hover:text-gray-600'
                        }`}
                    >
                      {item.name}
                    </Link>
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
