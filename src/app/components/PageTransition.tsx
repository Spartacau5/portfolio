'use client';

import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface PageTransitionProps {
    children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [displayChildren, setDisplayChildren] = useState(children);
    const previousPathname = useRef(pathname);

    useEffect(() => {
        // Only trigger transition if pathname actually changed
        if (previousPathname.current !== pathname) {
            setIsTransitioning(true);

            // After a brief delay, update the children and fade back in
            const timer = setTimeout(() => {
                setDisplayChildren(children);
                setIsTransitioning(false);
            }, 200);

            previousPathname.current = pathname;
            return () => clearTimeout(timer);
        } else {
            // Same pathname, just update children immediately
            setDisplayChildren(children);
        }
    }, [pathname, children]);

    return (
        <div className="relative">
            {/* Skeleton overlay that appears during transition */}
            <AnimatePresence>
                {isTransitioning && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="page-transition-overlay"
                    />
                )}
            </AnimatePresence>

            {/* Main content with fade effect */}
            <motion.div
                key={pathname}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 0.3,
                    ease: [0.25, 0.1, 0.25, 1]
                }}
            >
                {displayChildren}
            </motion.div>
        </div>
    );
}
