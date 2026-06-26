'use client';

import { useEffect, useRef } from 'react';

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);
    const isVisible = useRef(false);
    const currentLabel = useRef<string | null>(null);

    useEffect(() => {
        // Track the pointer 1:1 — write the cursor's transform directly on each
        // move with no easing/lerp, so it stays locked to the real cursor with
        // zero perceptible lag. Transform-only writes are GPU-composited and cheap.
        const setPosition = (x: number, y: number) => {
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            }
        };

        // Pick the icon that pairs with a given label.
        const iconFor = (label: string) => {
            if (label === 'Coming soon') return 'lock';
            if (label === 'View Case Study') return 'eye';
            return 'arrow'; // View Website / Try Extension
        };

        // Morph the cursor into a labeled pill when hovering an element that
        // declares `data-cursor-label`, and back to the dot when leaving.
        const applyLabel = (label: string | null) => {
            if (label === currentLabel.current) return;
            currentLabel.current = label;
            const el = cursorRef.current;
            if (!el) return;
            if (label) {
                if (labelRef.current) labelRef.current.textContent = label;
                el.dataset.cursorIcon = iconFor(label);
                el.classList.add('is-labeled');
            } else {
                el.classList.remove('is-labeled');
                delete el.dataset.cursorIcon;
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            setPosition(e.clientX, e.clientY);

            if (!isVisible.current && cursorRef.current) {
                isVisible.current = true;
                cursorRef.current.classList.add('visible');
            }

            const target = e.target as HTMLElement | null;
            const labeled = target?.closest<HTMLElement>('[data-cursor-label]');
            applyLabel(labeled?.dataset.cursorLabel ?? null);
        };

        const handleMouseLeave = () => {
            isVisible.current = false;
            if (cursorRef.current) {
                cursorRef.current.classList.remove('visible');
            }
        };

        const handleMouseEnter = (e: MouseEvent) => {
            setPosition(e.clientX, e.clientY);
            isVisible.current = true;
            if (cursorRef.current) {
                cursorRef.current.classList.add('visible');
            }
        };

        // Clicking a labeled card navigates to a new page, but no mousemove
        // fires there until the pointer moves — so the pill ("View Case Study")
        // would stay stuck on the fresh page. Reset to the bare dot on click so
        // it clears the moment the project opens.
        const handleClick = () => applyLabel(null);

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('click', handleClick);
        };
    }, []); // Empty dependency - only runs once

    return (
        <div ref={cursorRef} className="custom-cursor">
            <div className="custom-cursor-inner">
                <svg className="cc-icon cc-icon--eye" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
                <svg className="cc-icon cc-icon--arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17L17 7M7 7h10v10" />
                </svg>
                <svg className="cc-icon cc-icon--lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
                <span ref={labelRef} className="custom-cursor-label" />
            </div>
        </div>
    );
}
