'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

interface PageTransitionProps {
    children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();
    const [displayChildren, setDisplayChildren] = useState(children);
    const [isNavigating, setIsNavigating] = useState(false);
    const previousPathname = useRef(pathname);
    const isInitialMount = useRef(true);

    useEffect(() => {
        // Skip animation on initial mount
        if (isInitialMount.current) {
            isInitialMount.current = false;
            setDisplayChildren(children);
            return;
        }

        // Only trigger transition if pathname actually changed
        if (previousPathname.current !== pathname) {
            setIsNavigating(true);

            // After a brief delay, update the children
            const timer = setTimeout(() => {
                setDisplayChildren(children);
                setIsNavigating(false);
            }, 150);

            previousPathname.current = pathname;
            return () => clearTimeout(timer);
        } else {
            // Same pathname, just update children immediately
            setDisplayChildren(children);
        }
    }, [pathname, children]);

    return (
        <div
            className="relative mt-4 md:mt-0"
            style={{
                opacity: isNavigating ? 0.7 : 1,
                transition: 'opacity 0.15s ease-out'
            }}
        >
            {displayChildren}
        </div>
    );
}
