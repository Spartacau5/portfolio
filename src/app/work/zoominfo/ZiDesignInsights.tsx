'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ZiInsightProps {
    title: string;
    body: React.ReactNode;
    media: React.ReactNode;
    isFirst?: boolean;
}

export function ZiInsightBlock({ title, body, media, isFirst = false }: ZiInsightProps) {
    const mediaRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: mediaRef,
        offset: ['start 0.95', 'start 0.3'],
    });
    const y = useTransform(scrollYProgress, [0, 1], [72, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.45], [0, 1]);

    return (
        <section className={`zi-insight${isFirst ? ' zi-insight--first' : ''}`}>
            <div className="zi-insight-text">
                <h3 className="zi-insight-title">{title}</h3>
                <div className="zi-insight-body">{body}</div>
            </div>
            <div className="zi-insight-media-track">
                <motion.div ref={mediaRef} style={{ y, opacity }}>
                    {media}
                </motion.div>
            </div>
        </section>
    );
}

interface DarkPlaceholderProps {
    label: string;
    tall?: boolean;
}

export function DarkPlaceholder({ label, tall = false }: DarkPlaceholderProps) {
    return (
        <div className={`zi-dark-placeholder${tall ? ' zi-dark-placeholder--tall' : ''}`}>
            <span className="zi-dark-placeholder-label">{label}</span>
        </div>
    );
}
