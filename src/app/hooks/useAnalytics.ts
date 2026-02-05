'use client';

import { useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { analytics } from '../components/GoogleAnalytics';

// Track scroll depth on a page
export function useScrollDepthTracking() {
  const pathname = usePathname();
  const trackedDepths = useRef<Set<number>>(new Set());

  useEffect(() => {
    // Reset tracked depths when page changes
    trackedDepths.current = new Set();

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      // Track at 25%, 50%, 75%, 90%, 100%
      const milestones = [25, 50, 75, 90, 100];

      milestones.forEach((milestone) => {
        if (scrollPercent >= milestone && !trackedDepths.current.has(milestone)) {
          trackedDepths.current.add(milestone);
          analytics.trackScrollDepth(milestone, pathname || 'unknown');
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);
}

// Track time spent on page
export function useTimeOnPage() {
  const pathname = usePathname();
  const startTime = useRef<number>(Date.now());

  useEffect(() => {
    startTime.current = Date.now();

    return () => {
      const timeSpent = (Date.now() - startTime.current) / 1000;
      if (timeSpent > 5) { // Only track if more than 5 seconds
        analytics.trackTimeSpent(pathname || 'unknown', timeSpent);
      }
    };
  }, [pathname]);
}

// Track when a section enters the viewport
export function useSectionTracking(sectionName: string, ref: React.RefObject<HTMLElement>) {
  const hasTracked = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    hasTracked.current = false;
  }, [pathname]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTracked.current) {
            hasTracked.current = true;
            analytics.trackSectionView(sectionName, pathname || undefined);
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% visible
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [sectionName, ref, pathname]);
}

// Track clicks with analytics
export function useTrackClick() {
  return useCallback((elementName: string, location?: string) => {
    analytics.trackClick(elementName, location);
  }, []);
}

// Track external links
export function useTrackExternalLink() {
  return useCallback((url: string, linkText?: string) => {
    analytics.trackExternalLink(url, linkText);
  }, []);
}
