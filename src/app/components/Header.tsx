'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLenis } from 'lenis/react';
import { analytics } from './GoogleAnalytics';
import { scrollToTop } from '../lib/lenisScroll';

// V4 universal nav — flat, full-width, squared. Geist Mono, uppercase.
// WORK = landing (/), ABOUT = /about, MORE = /more, RESUME opens the PDF,
// CONTACT ME (right) opens LinkedIn.
const NAV_ITEMS = [
  { name: 'Work', href: '/' },
  { name: 'More', href: '/more' },
  { name: 'About', href: '/about' },
  { name: 'Resume', href: '/resume.pdf', external: true },
];

const LINKEDIN_URL = 'https://www.linkedin.com/in/arpitahluwalia/';

export function Header() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const lastY = useRef(0);
  const hidden = useRef(false);
  const menuOpenRef = useRef(false);
  menuOpenRef.current = menuOpen;

  useLenis((instance) => {
    const bar = progressRef.current;
    if (bar) bar.style.transform = `scaleX(${instance.progress})`;

    const nav = headerRef.current;
    if (!nav) return;
    const y = instance.scroll;
    const goingDown = y > lastY.current + 6;
    const goingUp = y < lastY.current - 2;
    lastY.current = y;

    if (menuOpenRef.current || y < 90) {
      if (hidden.current) {
        hidden.current = false;
        nav.classList.remove('is-hidden');
      }
      return;
    }
    if (goingDown && !hidden.current) {
      hidden.current = true;
      nav.classList.add('is-hidden');
    } else if (goingUp && hidden.current) {
      hidden.current = false;
      nav.classList.remove('is-hidden');
    }
  });

  useEffect(() => {
    hidden.current = false;
    headerRef.current?.classList.remove('is-hidden');
    lastY.current = 0;
    if (progressRef.current) progressRef.current.style.transform = 'scaleX(0)';
  }, [pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    if (menuOpen) lenis?.stop();
    else lenis?.start();
    return () => {
      document.body.style.overflow = '';
      lenis?.start();
    };
  }, [menuOpen, lenis]);

  // WORK stays lit on the landing page and every case-study sub-page,
  // since those are reached from the Work grid.
  const isActive = (href: string) => {
    if (href === '/') {
      return (
        pathname === '/' ||
        pathname.startsWith('/work')
      );
    }
    if (href === '/about') return pathname.startsWith('/about');
    if (href === '/more') return pathname.startsWith('/more');
    return false;
  };

  // Smooth-scroll to top when clicking the tab for the page you're already on.
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      const onThisPage =
        (href === '/' && pathname === '/') ||
        (href === '/about' && pathname.startsWith('/about')) ||
        (href === '/more' && pathname.startsWith('/more'));
      if (onThisPage && window.scrollY > 0) {
        e.preventDefault();
        scrollToTop(lenis);
      }
      setMenuOpen(false);
    },
    [pathname, lenis]
  );

  const renderNavLink = (item: (typeof NAV_ITEMS)[number], className: string) =>
    item.external ? (
      <a
        key={item.name}
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={() => {
          analytics.trackResumeDownload('resume');
          setMenuOpen(false);
        }}
      >
        {item.name}
      </a>
    ) : (
      <Link
        key={item.name}
        href={item.href}
        onClick={(e) => handleNavClick(e, item.href)}
        className={`${className}${isActive(item.href) ? ' is-active' : ''}`}
      >
        {item.name}
      </Link>
    );

  return (
    <>
    <div className="site-progress" aria-hidden="true">
      <div ref={progressRef} className="site-progress__bar" />
    </div>
    <header ref={headerRef} className={`site-nav${menuOpen ? ' is-open' : ''}`}>
      {/* Left — logo (masked so it recolours grey → black on hover) */}
      <Link href="/" className="site-nav__brand" aria-label="Arpit Ahluwalia — home">
        <span className="site-nav__logo" aria-hidden="true" />
      </Link>

      {/* Mobile — hamburger toggle */}
      <button
        type="button"
        className="site-nav__toggle"
        aria-expanded={menuOpen}
        aria-controls="site-nav-mobile-panel"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="site-nav__toggle-bar" aria-hidden="true" />
        <span className="site-nav__toggle-bar" aria-hidden="true" />
      </button>

      {/* Center — primary nav (desktop) */}
      <nav className="site-nav__links" aria-label="Primary">
        {NAV_ITEMS.map((item) =>
          renderNavLink(item, 'site-nav__mono site-nav__link')
        )}
      </nav>

      {/* Right — contact (desktop) */}
      <a
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="site-nav__mono site-nav__contact"
        aria-label="Connect on LinkedIn"
        onClick={() => analytics.trackSocialClick('LinkedIn')}
      >
        <span className="diamond" aria-hidden="true">✦</span>
        <span className="label">Connect</span>
      </a>

      {/* Mobile — collapsed menu panel */}
      <div
        id="site-nav-mobile-panel"
        className="site-nav__mobile-panel"
        hidden={!menuOpen}
      >
        <nav className="site-nav__mobile-links" aria-label="Primary mobile">
          {NAV_ITEMS.map((item) =>
            renderNavLink(item, 'site-nav__mono site-nav__mobile-link')
          )}
        </nav>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="site-nav__mono site-nav__mobile-contact"
          onClick={() => {
            analytics.trackSocialClick('LinkedIn');
            setMenuOpen(false);
          }}
        >
          <span className="diamond" aria-hidden="true">✦</span>
          <span>Connect</span>
        </a>
      </div>
    </header>
    </>
  );
}
