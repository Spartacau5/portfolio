'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { analytics } from './GoogleAnalytics';

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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

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
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setMenuOpen(false);
    },
    [pathname]
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
    <header className={`site-nav${menuOpen ? ' is-open' : ''}`}>
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
  );
}
