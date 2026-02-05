'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

const GA_MEASUREMENT_ID = 'G-XFQLFHBX0Y';

// Declare gtag on window
declare global {
  interface Window {
    gtag: (command: string, ...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

// Track page views on route change
function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const sendPageView = () => {
      if (pathname && window.gtag) {
        const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
        // Send page_view event with full details
        window.gtag('event', 'page_view', {
          page_path: url,
          page_location: window.location.href,
          page_title: document.title,
        });
        return true;
      }
      return false;
    };

    // Try immediately, then retry if gtag isn't ready yet
    if (!sendPageView()) {
      const retryTimeout = setTimeout(sendPageView, 100);
      return () => clearTimeout(retryTimeout);
    }
  }, [pathname, searchParams]);

  return null;
}

export function GoogleAnalytics() {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </>
  );
}

// Custom event tracking utility
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

// Track specific interactions
export const analytics = {
  // Track button/link clicks
  trackClick: (element: string, location?: string) => {
    trackEvent('click', 'engagement', `${element}${location ? ` - ${location}` : ''}`);
  },

  // Track case study views
  trackCaseStudyView: (projectName: string) => {
    trackEvent('view_case_study', 'content', projectName);
  },

  // Track section scroll into view
  trackSectionView: (sectionName: string, pageName?: string) => {
    trackEvent('section_view', 'scroll', `${sectionName}${pageName ? ` - ${pageName}` : ''}`);
  },

  // Track external link clicks
  trackExternalLink: (url: string, linkText?: string) => {
    trackEvent('external_link', 'outbound', linkText || url);
  },

  // Track file downloads (resume, etc.)
  trackDownload: (fileName: string) => {
    trackEvent('download', 'file', fileName);
  },

  // Track social media clicks
  trackSocialClick: (platform: string) => {
    trackEvent('social_click', 'social', platform);
  },

  // Track contact form submissions
  trackContact: (method: string) => {
    trackEvent('contact', 'lead', method);
  },

  // Track time spent (call on component unmount)
  trackTimeSpent: (pageName: string, seconds: number) => {
    trackEvent('time_spent', 'engagement', pageName, Math.round(seconds));
  },

  // Track scroll depth
  trackScrollDepth: (depth: number, pageName: string) => {
    trackEvent('scroll_depth', 'engagement', `${pageName} - ${depth}%`, depth);
  },

  // Track cat petting
  trackCatPet: () => {
    trackEvent('cat_pet', 'fun', 'Billu was petted');
  },

  // Track resume/CV download
  trackResumeDownload: (type: 'resume' | 'cv') => {
    trackEvent('download', 'file', type === 'resume' ? 'Resume' : 'CV');
  },
};
