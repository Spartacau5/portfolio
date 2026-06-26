'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { analytics } from './GoogleAnalytics';

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
    { name: 'Play', href: '/work' },
  ];

  // Determine which tab is active. Case studies live under /work/<slug> but are
  // reached from Home, so only the /work index itself lights up "Play" — the
  // case-study sub-pages keep "Home" active.
  const getActiveIndex = () => {
    if (pathname.startsWith('/about')) return 1;
    if (pathname === '/work') return 2;
    return 0;
  };

  const activeIndex = getActiveIndex();

  // Smooth scroll to top handler for same-page navigation
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Check if we're already on this page. /work is exact (case-study
    // sub-pages are not the Play page), /about stays prefix-matched.
    const isCurrentPage =
      (href === '/' && pathname === '/') ||
      (href === '/work' && pathname === '/work') ||
      (href === '/about' && pathname.startsWith('/about'));

    if (isCurrentPage && window.scrollY > 0) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [pathname]);

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
      <header className="fixed top-0 left-0 right-0 z-50 pt-4 pb-4 md:pt-[26px] md:pb-2">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* LinkedIn Icon - Left */}
          <a
            href="https://www.linkedin.com/in/arpitahluwalia/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex-shrink-0 transition-colors duration-200 text-[#C9C9C9] hover:text-[#0077B5] cursor-pointer p-2 -m-2"
            aria-label="LinkedIn Profile"
            onClick={() => analytics.trackSocialClick('LinkedIn')}
          >
            <svg
              className="w-7 h-7 md:w-8 md:h-8"
              fill="currentColor"
              viewBox="0 0 382 382"
              aria-hidden="true"
            >
              <path d="M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502-10.056,10.056-10.056h42.806c5.554,0,10.056,4.502,10.056,10.056V329.844z M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472L341.91,330.654L341.91,330.654z"/>
            </svg>
            {/* Tooltip — left-aligned to stay on-screen at the left edge */}
            <span
              className="pointer-events-none absolute left-0 top-full mt-1.5 whitespace-nowrap rounded-md bg-black/80 px-2.5 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            >
              Connect with me on LinkedIn!
            </span>
          </a>

          {/* Spacer for icon alignment on mobile */}
          <div className="md:hidden w-8 h-8" />

          {/* Resume Icon - Right: opens the resume PDF in a new tab */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex-shrink-0 transition-colors duration-200 text-[#A3A3A3] hover:text-gray-700 cursor-pointer p-2 -my-2 -ml-2 -mr-4"
            aria-label="Download Resume"
            onClick={() => analytics.trackResumeDownload('resume')}
          >
            <svg
              className="w-9 h-9 md:w-10 md:h-10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
              <path d="M14 3v5h5" />
              <path d="M9 13h6" />
              <path d="M9 17h6" />
              <path d="M9 9h1.5" />
            </svg>
            {/* Tooltip — right-aligned to stay on-screen at the right edge */}
            <span
              className="pointer-events-none absolute right-0 top-full mt-1.5 whitespace-nowrap rounded-md bg-black/80 px-2.5 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            >
              Download Resume
            </span>
          </a>
        </div>
      </header>

      {/* Single Navigation - positioned at bottom on mobile, center-top on desktop */}
      <nav className="fixed z-50 left-0 right-0 bottom-8 md:bottom-auto md:top-4 md:py-2 flex justify-center px-4 pointer-events-none">
        <div className="nav-pill-glass rounded-full px-1 py-1 pointer-events-auto">
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
                    onClick={(e) => handleNavClick(e, item.href)}
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
