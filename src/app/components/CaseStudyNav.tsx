'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export interface CaseStudyNavItem {
    /** id of the target <section> on the page */
    id: string;
    /** label shown in the nav */
    label: string;
    /** optional sub-sections — revealed as a collapsible mini-nav when the
     *  parent (or one of these children) is the active section. */
    children?: CaseStudyNavItem[];
}

/**
 * Sticky left-rail section nav for case studies.
 *
 * - Smooth-scrolls to a section on click (relies on the page's scroll-margin-top
 *   so targets land below the fixed header).
 * - Scroll-spy highlights the section currently in the reading zone, and snaps to
 *   the last item once the page bottoms out (short trailing sections may never
 *   cross the reading line).
 * - Visibility is driven purely by CSS: on the Arrive/ZoomInfo heroes the rail is
 *   hidden while `html.arrive-immersive` is set and fades in alongside the top
 *   nav once the hero docks.
 */
export function CaseStudyNav({
    items,
    backHref = '/',
    className = '',
}: {
    items: CaseStudyNavItem[];
    backHref?: string;
    className?: string;
}) {
    const [active, setActive] = useState(items[0]?.id ?? '');
    const rafRef = useRef(0);

    useEffect(() => {
        // Flatten parents + children so scroll-spy tracks every section.
        const flat = items.flatMap((i) => [i, ...(i.children ?? [])]);
        const sections = flat
            .map((i) => document.getElementById(i.id))
            .filter((el): el is HTMLElement => !!el);
        if (!sections.length) return;

        const measure = () => {
            rafRef.current = 0;
            const line = window.innerHeight * 0.28; // reading line near the top
            let current = sections[0].id;
            for (const sec of sections) {
                if (sec.getBoundingClientRect().top - line <= 0) current = sec.id;
            }
            // Bottom of the page → force the final section active.
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
                current = sections[sections.length - 1].id;
            }
            setActive(current);
        };

        const onScroll = () => {
            if (!rafRef.current) rafRef.current = requestAnimationFrame(measure);
        };

        measure();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            cancelAnimationFrame(rafRef.current);
        };
    }, [items]);

    const handleClick = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <nav className={`cs-side-nav ${className}`} aria-label="Case study sections">
            <Link href={backHref} className="cs-side-nav-back">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M19 12H5M5 12l6-6M5 12l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back
            </Link>
            <ul className="cs-side-nav-list">
                {items.map((item) => {
                    const childActive = item.children?.some((c) => c.id === active) ?? false;
                    // Parent counts as active (and its mini-nav expands) when it
                    // or any of its children is the current section.
                    const open = active === item.id || childActive;
                    return (
                        <li key={item.id}>
                            <button
                                type="button"
                                className={`cs-side-nav-item ${open ? 'is-active' : ''}`}
                                onClick={() => handleClick(item.id)}
                            >
                                {item.label}
                            </button>
                            {item.children && (
                                <ul className={`cs-side-nav-sublist ${open ? 'is-open' : ''}`}>
                                    {item.children.map((child) => (
                                        <li key={child.id}>
                                            <button
                                                type="button"
                                                className={`cs-side-nav-subitem ${active === child.id ? 'is-active' : ''}`}
                                                onClick={() => handleClick(child.id)}
                                            >
                                                {child.label}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
