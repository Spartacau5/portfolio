'use client';

import Link from 'next/link';
import Image from 'next/image';
import { analytics } from './GoogleAnalytics';

const socials = [
  {
    name: 'Email',
    href: 'mailto:arpit.ahluwalia1@gmail.com',
    track: 'Email',
    // Site's own envelope icon (public/images/email-contact-icon.svg)
    icon: (
      <svg viewBox="0 0 40 40" fill="currentColor" aria-hidden="true">
        <path d="M4.00667 11.7652L19.9999 19.7618L35.9933 11.7651C35.8727 9.66435 34.1309 7.99805 32 7.99805H8C5.86904 7.99805 4.12727 9.66441 4.00667 11.7652Z" />
        <path d="M36 16.2339L19.9999 24.2339L4 16.234V27.998C4 30.2072 5.79086 31.998 8 31.998H32C34.2091 31.998 36 30.2072 36 27.998V16.2339Z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/arpitahluwalia/',
    track: 'LinkedIn',
    // Site's own LinkedIn icon (matches the header / public/images/linkedin.svg)
    icon: (
      <svg viewBox="0 0 382 382" fill="currentColor" aria-hidden="true">
        <path d="M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502-10.056,10.056-10.056h42.806c5.554,0,10.056,4.502,10.056,10.056V329.844z M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472L341.91,330.654L341.91,330.654z" />
      </svg>
    ),
  },
  {
    name: 'Behance',
    href: 'https://www.behance.net/spartacau5?locale=en_US',
    track: 'Behance',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/spartacau5/',
    track: 'Instagram',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export function SiteFooter() {
  return (
    <footer id="site-footer" className="site-footer">
      <div className="site-footer-inner">
        <hr className="site-footer-hr" />

        <div className="site-footer-grid">
          {/* Left: identity + location */}
          <div className="site-footer-id">
            <Link href="/" className="site-footer-name-link">
              <Image
                src="/images/profilepic.png"
                alt="Arpit Singh Ahluwalia"
                width={40}
                height={40}
                className="site-footer-avatar"
              />
              <span className="site-footer-name">Arpit Singh Ahluwalia</span>
            </Link>
            <div className="site-footer-location">
              <svg className="site-footer-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 21s7-5.686 7-11a7 7 0 1 0-14 0c0 5.314 7 11 7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <span>New York City</span>
              <span className="site-footer-divider">|</span>
              <span className="knicks">
                <span className="knicks-go">Go</span> <span className="knicks-name">Knicks</span>
              </span>
            </div>
          </div>

          {/* Right: contact */}
          <div className="site-footer-contact">
            <p className="site-footer-cta">Let&apos;s work together!</p>
            <div className="site-footer-socials">
              {socials.map((s) => {
                const isMail = s.href.startsWith('mailto:');
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target={isMail ? undefined : '_blank'}
                    rel={isMail ? undefined : 'noopener noreferrer'}
                    className="site-footer-social"
                    aria-label={s.name}
                    title={s.name}
                    onClick={() => analytics.trackSocialClick(s.track)}
                  >
                    <span className="site-footer-social-icon">{s.icon}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="site-footer-meta">
          <p>Designed with &lt;3, Built with AI</p>
          <p className="site-footer-version">v2.1</p>
        </div>
      </div>
    </footer>
  );
}
