'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [isIndicatorReady, setIsIndicatorReady] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const navRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const hasInitialized = useRef(false);

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

  // Update indicator position on mount (before paint) to prevent flash
  useLayoutEffect(() => {
    const activeItem = itemRefs.current[activeIndex];
    if (activeItem && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      setIndicatorStyle({
        left: itemRect.left - navRect.left,
        width: itemRect.width,
      });
      setIsIndicatorReady(true);

      // Enable animation only after initial position is set
      if (!hasInitialized.current) {
        hasInitialized.current = true;
        // Use requestAnimationFrame to enable animation after the first paint
        requestAnimationFrame(() => {
          setShouldAnimate(true);
        });
      }
    }
  }, [activeIndex]);

  // Also update on resize
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

    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeIndex]);

  return (
    <>
      {/* Top Header - Profile pic and LinkedIn */}
      <header className="fixed top-0 left-0 right-0 z-50 py-4 md:py-6">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Profile Picture - Left */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/profilepic.png"
              alt="Profile"
              width={56}
              height={56}
              className="rounded-full w-10 h-10 md:w-14 md:h-14"
            />
          </Link>

          {/* Spacer for LinkedIn alignment on mobile */}
          <div className="md:hidden w-8 h-8" />

          {/* LinkedIn Icon - Right */}
          <a
            href="https://www.linkedin.com/in/arpitahluwalia/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 hover:opacity-70 transition-opacity"
          >
            <Image
              src="/images/mdi_linkedin.png"
              alt="LinkedIn"
              width={40}
              height={40}
              className="opacity-60 w-8 h-8 md:w-10 md:h-10"
            />
          </a>
        </div>
      </header>

      {/* Single Navigation - positioned at bottom on mobile, center-top on desktop */}
      <nav className="fixed z-50 left-1/2 -translate-x-1/2 bottom-4 md:bottom-auto md:top-4 md:py-2">
        <div className="nav-pill-glass rounded-full px-1 py-1">
          <ul ref={navRef} className="flex items-center gap-0.5 md:gap-1 relative">
            {/* Single animated indicator */}
            <motion.div
              className="absolute bg-gray-200 rounded-full"
              style={{ height: '100%', top: 0, opacity: isIndicatorReady ? 1 : 0 }}
              initial={false}
              animate={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
              }}
              transition={shouldAnimate ? {
                type: 'spring',
                stiffness: 350,
                damping: 30,
              } : {
                duration: 0,
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
                  {/* Static background fallback - only visible before animated indicator is ready */}
                  <div
                    className={`absolute inset-0 bg-gray-200 rounded-full ${isActive && !isIndicatorReady ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transition: 'none' }}
                  />
                  <Link
                    href={item.href}
                    className={`px-4 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium block tracking-[0px] relative z-10 transition-colors duration-200 ${isActive
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
    </>
  );
}
