'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useScrollDepthTracking, useTimeOnPage } from '@/app/hooks/useAnalytics';
import { WhatArriveDoes } from './WhatArriveDoes';
import { ArriveHero } from './ArriveHero';
import { VisionWalkthrough } from './VisionWalkthrough';
import { SignalSynthesis } from './SignalSynthesis';
import { SalesWorkshop, SalesLeadershipWorkshop } from './SalesWorkshop';
import { Synthesis } from './Synthesis';
import { VisionReactions } from './VisionReactions';
import { PreviewModal, type PreviewContent } from './PreviewModal';
import { CaseStudyNav, type CaseStudyNavItem } from '@/app/components/CaseStudyNav';
import { Lightbox, useLightbox } from '@/app/components/Lightbox';

// Eased window scroll to an element — native scrollIntoView({behavior:'smooth'})
// gives no control over duration/easing, so we animate it ourselves for a slower,
// gentler glide. `offset` matches the .arrive-cs-accordion-item scroll-margin-top
// so the header clears the fixed chrome.
function smoothScrollToEl(el: HTMLElement, offset = 110, duration = 950) {
    const startY = window.scrollY;
    const targetY = el.getBoundingClientRect().top + startY - offset;
    const dist = targetY - startY;
    if (Math.abs(dist) < 2) return;
    // easeInOutCubic — soft acceleration in, soft settle out.
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    let start = 0;
    const step = (now: number) => {
        if (!start) start = now;
        const p = Math.min((now - start) / duration, 1);
        window.scrollTo(0, startY + dist * ease(p));
        if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

// One Process step. Controlled so the group behaves as a single-open accordion
// (opening one collapses the rest), while still letting the user switch freely.
// Height is animated in JS (max-height) so the panel can return to `overflow:
// visible` once open — the inner figures/boards break out horizontally and must
// not be clipped.
function AccordionItem({
    id,
    num,
    title,
    isOpen,
    onToggle,
    children,
}: {
    id: string;
    num: number;
    title: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}) {
    const panelRef = useRef<HTMLDivElement>(null);
    const itemRef = useRef<HTMLDivElement>(null);
    const firstRun = useRef(true);

    useEffect(() => {
        const panel = panelRef.current;
        if (!panel) return;

        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const settleOpen = () => {
            panel.style.maxHeight = 'none';
            panel.style.overflow = 'visible';
        };
        const settleClosed = () => {
            panel.style.maxHeight = '0px';
            panel.style.overflow = 'hidden';
        };

        // First paint: set state without animating or auto-scrolling.
        if (firstRun.current) {
            firstRun.current = false;
            if (isOpen) settleOpen();
            else settleClosed();
            return;
        }

        // On open, bring this step's header to a consistent position. Wait for any
        // sibling above that's collapsing (max-height transition ≈ 0.4s) to settle
        // first, so every step lands in the same spot; scroll-margin-top (110px on
        // .arrive-cs-accordion-item) keeps it clear of the fixed header.
        let scrollTimer = 0;
        if (isOpen) {
            scrollTimer = window.setTimeout(() => {
                const el = itemRef.current;
                if (!el) return;
                if (reduce) el.scrollIntoView({ block: 'start' });
                else smoothScrollToEl(el);
            }, reduce ? 0 : 420);
        }

        if (reduce) {
            if (isOpen) settleOpen();
            else settleClosed();
            return () => window.clearTimeout(scrollTimer);
        }

        if (isOpen) {
            panel.style.overflow = 'hidden';
            panel.style.maxHeight = `${panel.scrollHeight}px`;
            const onEnd = (e: TransitionEvent) => {
                if (e.target !== panel || e.propertyName !== 'max-height') return;
                settleOpen();
                panel.removeEventListener('transitionend', onEnd);
            };
            panel.addEventListener('transitionend', onEnd);
            return () => {
                panel.removeEventListener('transitionend', onEnd);
                window.clearTimeout(scrollTimer);
            };
        }

        // Closing: pin to the current height, then collapse on the next frame.
        panel.style.overflow = 'hidden';
        panel.style.maxHeight = `${panel.scrollHeight}px`;
        void panel.offsetHeight; // force reflow so the change registers
        requestAnimationFrame(() => {
            panel.style.maxHeight = '0px';
        });
        return () => window.clearTimeout(scrollTimer);
    }, [isOpen]);

    return (
        <div id={id} ref={itemRef} className={`arrive-cs-accordion-item${isOpen ? ' is-open' : ''}`}>
            <button
                type="button"
                className="arrive-cs-accordion-summary"
                aria-expanded={isOpen}
                onClick={onToggle}
            >
                <span className="arrive-cs-accordion-num">{num}</span>
                <span className="arrive-cs-accordion-title">{title}</span>
                <span className="arrive-cs-accordion-icon" aria-hidden="true" />
            </button>
            <div ref={panelRef} className="arrive-cs-accordion-panel">
                <div className="arrive-cs-accordion-content">{children}</div>
            </div>
        </div>
    );
}

// Process step ids, in order — shared by the accordion and the nav's sub-items.
const PROCESS_STEPS = [
    { id: 'process-initial', label: 'Initial Concept' },
    { id: 'process-product', label: 'Kickoff with Product' },
    { id: 'process-product-again', label: 'Workshop #1: Product (again)' },
    { id: 'process-sales', label: 'Workshop #2: Sales' },
    { id: 'process-sales-leadership', label: 'Workshop #3: Sales Leadership' },
    { id: 'process-synthesis', label: 'Synthesis' },
];

// Solution flow steps — ids live on the VisionWalkthrough step blocks.
const SOLUTION_STEPS = [
    { id: 'solution-browse', label: 'Browse' },
    { id: 'solution-onboard', label: 'Onboard' },
    { id: 'solution-configure', label: 'Configure' },
    { id: 'solution-analyze', label: 'Analyze' },
];

const NAV_ITEMS: CaseStudyNavItem[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'problem', label: 'Problem' },
    { id: 'strategy', label: 'Strategy' },
    { id: 'process', label: 'Process', children: PROCESS_STEPS },
    { id: 'solution', label: 'Solution', children: SOLUTION_STEPS },
    { id: 'impact', label: 'Impact' },
];

export default function ArrivePage() {
    // Analytics tracking
    useScrollDepthTracking();
    useTimeOnPage();

    // Preview modal state — null when closed.
    const [preview, setPreview] = useState<PreviewContent | null>(null);

    // Click-to-enlarge image lightbox.
    const { lightboxSrc, lightboxGallery, openLightbox, closeLightbox } = useLightbox();

    // Process accordion — single open step at a time. Starts on step 1 so
    // "Initial Concept" is expanded on load (and is the default active nav item).
    const [openStep, setOpenStep] = useState<number | null>(1);
    const toggleStep = (n: number) => setOpenStep((cur) => (cur === n ? null : n));

    // Clicking a Process sub-section in the side nav expands that step.
    const handleNavSelect = (id: string) => {
        const step = PROCESS_STEPS.findIndex((s) => s.id === id);
        if (step !== -1) setOpenStep(step + 1);
    };

    return (
        <>
        <div className="case-study-page arrive-cs">
            {/* Spacer for fixed header */}
            <div className="h-24"></div>

            {/* Hero — fills the screen on load, shrinks into place on scroll */}
            <ArriveHero />

            {/* Sticky section nav — reveals once the hero docks (see CSS). */}
            <CaseStudyNav items={NAV_ITEMS} onSelect={handleNavSelect} />

            {/* Intro */}
            <section className="arrive-cs-intro">
                {/* Section header — eyebrow tag + title */}
                <header className="arrive-cs-header">
                    <p className="arrive-cs-eyebrow">Craft X Arrive &bull; Contract</p>
                    <h1 className="arrive-cs-heading">The future of mobility solutions</h1>
                </header>

                <p className="arrive-cs-lead">
                    How I turned fragmented divisional goals into one shared 2-year B2B roadmap for a
                    global mobility platform across 90+ countries.
                </p>

                {/* Project meta — Role / Timeline / Team / Skills */}
                <div className="arrive-cs-info">
                    <div className="arrive-cs-info-block">
                        <span className="arrive-cs-info-label">ROLE</span>
                        <p className="arrive-cs-info-value">UX Researcher &amp; Strategist</p>
                    </div>
                    <div className="arrive-cs-info-block">
                        <span className="arrive-cs-info-label">TIMELINE</span>
                        <p className="arrive-cs-info-value">July – Dec 2025</p>
                    </div>
                    <div className="arrive-cs-info-block">
                        <span className="arrive-cs-info-label">TEAM</span>
                        <p className="arrive-cs-info-value">2 Researchers, 2 Designers</p>
                    </div>
                    <div className="arrive-cs-info-block">
                        <span className="arrive-cs-info-label">SKILLS</span>
                        <p className="arrive-cs-info-value">
                            User Research, Strategy, Interviewing, Workshop Facilitation
                        </p>
                    </div>
                    <div className="arrive-cs-info-block arrive-cs-info-block--wide">
                        <span className="arrive-cs-info-label">MY CONTRIBUTION</span>
                        <p className="arrive-cs-info-value">
                            Led research synthesis and facilitated three workshops with senior
                            stakeholders. Two designers (Kieran, Bri) built the vision prototype from my
                            flow-by-flow recommendations.
                        </p>
                    </div>
                </div>
            </section>

            {/* What Arrive does / What you see — animated capability card */}
            <section className="arrive-cs-section arrive-cs-section--card">
                <WhatArriveDoes />
            </section>

            {/* Biz Context */}
            <section id="overview" className="arrive-cs-block arrive-cs-block--no-divider">
                <h2 className="arrive-cs-block-label">Context</h2>
                <div className="arrive-cs-block-body">
                    <p className="arrive-cs-block-text">
                        Arrive (formerly EasyPark Group) is a global mobility platform across 90+
                        countries and 20,000+ cities — the parent of EasyPark, ParkMobile, Flowbird,
                        RingGo, and Parkopedia, assembled by{' '}
                        <button
                            type="button"
                            className="content-link arrive-cs-inline-link"
                            onClick={() =>
                                setPreview({
                                    type: 'browser',
                                    url: 'https://arrive.com/en/about/about-us#brands',
                                })
                            }
                        >
                            acquiring six major mobility companies
                            <svg className="content-link-arrow" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 2.5H9.5V8.5M9.5 2.5L2.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>{' '}
                        in just four years.
                    </p>
                </div>
            </section>

            {/* The Problem */}
            <section id="problem" className="arrive-cs-block">
                <h2 className="arrive-cs-block-label">Problem</h2>
                <div className="arrive-cs-block-body">
                    <p className="arrive-cs-block-text">
                        That speed left the org fragmented — companies, sectors, and markets pulling
                        in different directions, with no clear roadmap for where B2B was heading. They
                        had the technology and the market. What they lacked was a product practice:
                        the feedback loops, rapid research, and design-led discovery that turn a hunch
                        into the right bet. Arrive brought in{' '}
                        <a
                            href="https://www.madebycraft.co"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="content-link"
                        >
                            Craft
                            <svg className="content-link-arrow" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 2.5H9.5V8.5M9.5 2.5L2.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </a>{' '}
                        (the agency I was contracting with as a UX researcher) to pressure-test where
                        B2B should go — and that&apos;s where I came in.
                    </p>
                </div>
            </section>

            {/* Strategy */}
            <section id="strategy" className="arrive-cs-block">
                <h2 className="arrive-cs-block-label">Strategy</h2>
                <div className="arrive-cs-block-body">
                    {/* Methodology — two kinds of signal converging into one strategy */}
                    <figure className="arrive-cs-method">
                        <h3 className="arrive-cs-method-title">
                            Combine internal insights with external signals.
                        </h3>
                        <SignalSynthesis />
                    </figure>
                    <p className="arrive-cs-block-text">
                        The vision was only credible if it triangulated two kinds of truth: what
                        customers do, and what the people closest to them know. I gathered both, then
                        distilled them into one picture the whole org could react to. Across the US and
                        EU, I ran three structured workshops to build, pressure-test, and refine
                        Arrive&apos;s 2-year vision — aligning on success criteria and prioritizing what
                        delivers the most customer and business value.
                    </p>
                </div>
            </section>

            {/* Process */}
            <section id="process" className="arrive-cs-block">
                <h2 className="arrive-cs-block-label">Process</h2>
                <div className="arrive-cs-block-body arrive-cs-accordion">
                    <AccordionItem id="process-initial" num={1} title="Initial Concept" isOpen={openStep === 1} onToggle={() => toggleStep(1)}>
                            <p className="arrive-cs-block-text">
                                As part of my engagement with Arrive, I&apos;d spent months researching
                                for another project which led me to talk with drivers, dispatchers, and
                                B2B admins — the three personas Arrive wishes to serve.{' '}
                                <Link href="/work/fleet-management" className="content-link">
                                    (You can check out that work here)
                                    <svg className="content-link-arrow" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 2.5H9.5V8.5M9.5 2.5L2.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </Link>
                                .
                            </p>
                            <p className="arrive-cs-block-text">
                                I designed the initial end-to-end flow for the vision, highlighting the
                                decision-making moments that guide prospects toward the right product:
                            </p>
                            <p className="arrive-cs-block-text">
                                <strong>Browse → Onboard → Analyze → Configure</strong>
                            </p>
                            <div className="arrive-cs-flow-videos">
                                {[
                                    { label: 'Browse', src: '/images/vision-flow-browse.mp4' },
                                    { label: 'Onboard', src: '/images/vision-flow-onboard.mp4' },
                                    { label: 'Analyze', src: '/images/vision-flow-analyze.mp4' },
                                    { label: 'Configure', src: '/images/vision-flow-configure.mp4' },
                                ].map((v) => (
                                    <figure className="arrive-cs-flow-video" key={v.label}>
                                        <video src={v.src} autoPlay muted loop playsInline />
                                        <figcaption>{v.label}</figcaption>
                                    </figure>
                                ))}
                            </div>
                    </AccordionItem>

                    <AccordionItem id="process-product" num={2} title="Kickoff with Product" isOpen={openStep === 2} onToggle={() => toggleStep(2)}>
                            <p className="arrive-cs-block-text">
                                Worked with product managers to stress test the vision against what was
                                technically feasible and where the roadmap was already heading,
                                surfacing the bets worth making first.
                            </p>
                            <p className="arrive-cs-figure-caption">
                                Before we started, I asked Arrive&apos;s product team to grade their
                                existing B2B platform
                            </p>
                            <div className="arrive-cs-block-figure">
                                <Image
                                    src="/images/grade-platform-before.png"
                                    alt="Senior product leadership grading the platform"
                                    width={2112}
                                    height={895}
                                    className="arrive-cs-block-figure-img"
                                    style={{ cursor: 'zoom-in' }}
                                    onClick={() => openLightbox('/images/grade-platform-before.png')}
                                />
                            </div>
                            <p className="arrive-cs-block-text">
                                I then divided up each product manager to take part of their domain and
                                write stickies identifying gaps, opportunities, and enhancements across
                                the in-progress story.
                            </p>
                            <div className="arrive-cs-block-figure">
                                <Image
                                    src="/images/story-so-far-votes.png"
                                    alt="Product managers' stickies identifying gaps, opportunities, and enhancements across the in-progress story"
                                    width={7835}
                                    height={3858}
                                    className="arrive-cs-block-figure-img"
                                    style={{ cursor: 'zoom-in' }}
                                    onClick={() => openLightbox('/images/story-so-far-votes.png')}
                                />
                            </div>
                            <p className="arrive-cs-block-text">
                                I then facilitated a Mellow 4&apos;s (Crazy 8&apos;s would be too much
                                in the timeframe we had) exercise to help the product team articulate
                                their chosen part of the story. I reinforced that the goal is to focus
                                on <strong>what</strong> is included, not <strong>how</strong> it is
                                included (e.g., the layout of the sketches don&apos;t matter nearly as
                                much as what you decide to show within the sketch itself).
                            </p>
                            <div className="arrive-cs-block-figure">
                                <Image
                                    src="/images/mellow-4s.png"
                                    alt="Mellow 4's sketching exercise with the product team"
                                    width={13156}
                                    height={7348}
                                    className="arrive-cs-block-figure-img"
                                    style={{ cursor: 'zoom-in' }}
                                    onClick={() => openLightbox('/images/mellow-4s.png')}
                                />
                            </div>
                            <p className="arrive-cs-block-text">
                                We then spent time as a team hearing out the ideas and discussing which
                                ones to focus on as we iterate and polish the vision.
                            </p>
                    </AccordionItem>

                    <AccordionItem id="process-product-again" num={3} title="Workshop #1: Product (again)" isOpen={openStep === 3} onToggle={() => toggleStep(3)}>
                            <p className="arrive-cs-block-text">
                                Design team worked on developing a high-fidelity vision and we
                                reconvened with the product team to get feedback through another
                                workshop which I led. The goal was to understand:
                            </p>
                            <ul className="arrive-cs-block-list">
                                <li>What feels most valuable from a customer perspective</li>
                                <li>What might not land as intended</li>
                                <li>What opportunities stand out</li>
                            </ul>
                            <figure className="arrive-cs-block-figure arrive-cs-figma">
                                <iframe
                                    src="https://embed.figma.com/design/iI0FkkDfReJGaEVDbXDbZA/Craft---My-Work?node-id=6-60613&viewport=0,36055,0.11&embed-host=share"
                                    title="High-fidelity vision walkthrough — scroll through the full Figma frame"
                                    className="arrive-cs-figma-frame"
                                    allowFullScreen
                                />
                                <figcaption className="arrive-cs-pdf-caption">
                                    Figma 101: Try holding CTRL (Windows) or CMD (Mac) and + or - to zoom in/out. Hold Space and Click to move around the frame.
                                </figcaption>
                            </figure>
                    </AccordionItem>

                    <AccordionItem id="process-sales" num={4} title="Workshop #2: Sales" isOpen={openStep === 4} onToggle={() => toggleStep(4)}>
                        <SalesWorkshop />
                    </AccordionItem>

                    <AccordionItem id="process-sales-leadership" num={5} title="Workshop #3: Sales Leadership" isOpen={openStep === 5} onToggle={() => toggleStep(5)}>
                        <SalesLeadershipWorkshop />
                    </AccordionItem>

                    <AccordionItem id="process-synthesis" num={6} title="Synthesis" isOpen={openStep === 6} onToggle={() => toggleStep(6)}>
                        <Synthesis />
                    </AccordionItem>
                </div>
            </section>

            {/* Solution */}
            <section id="solution" className="arrive-cs-block arrive-cs-outcomes">
                <h2 className="arrive-cs-block-label">Solution</h2>
                <div className="arrive-cs-block-body">
                    <p className="arrive-cs-block-text">
                        One shared 2-year B2B vision — clear enough to win new business and retain
                        existing accounts, and aligned enough that Product, Sales, and Leadership all
                        got excited about building it. Kieran and Bri (our designers) designed the
                        final vision prototype taking my flow-by-flow recommendations. Here&apos;s
                        where it landed:
                    </p>
                </div>
            </section>

            {/* Vision walkthrough — numbered steps with animated timelines */}
            <VisionWalkthrough />

            {/* Impact */}
            <section id="impact" className="arrive-cs-block arrive-cs-impact">
                <h2 className="arrive-cs-block-label">Impact</h2>
                <div className="arrive-cs-block-body">
                    <p className="arrive-cs-block-text">
                        Over six months the work earned Craft long-term business with Arrive — and
                        nudged a tech-led org toward a product-led one built on research, feedback
                        loops, and iterative sprints. The clearest signal: when the same product
                        leaders re-graded the platform after seeing the vision, the average jumped from
                        a <strong>D+</strong> to an <strong>A&minus;</strong>.
                    </p>
                    <div className="arrive-cs-block-figure">
                        <Image
                            src="/images/grade-platform-after.png"
                            alt="Senior product leadership grading the vision"
                            width={2112}
                            height={895}
                            className="arrive-cs-block-figure-img"
                            style={{ cursor: 'zoom-in' }}
                            onClick={() => openLightbox('/images/grade-platform-after.png')}
                        />
                    </div>

                    {/* Internal reactions when the B2B vision was shared */}
                    <VisionReactions />
                </div>
            </section>

            {/* Bottom Navigation */}
            <div className="case-study-bottom-nav">
                <Link href="/" className="back-link">
                    <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="back-arrow" />
                    Back to Home
                </Link>
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="back-link"
                >
                    Go to top
                    <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="top-arrow" />
                </button>
            </div>

        </div>

        {/* Media preview modal (browser / image / video) */}
        <PreviewModal content={preview} onClose={() => setPreview(null)} />

        {/* Click-to-enlarge image lightbox */}
        <Lightbox src={lightboxSrc} gallery={lightboxGallery} onClose={closeLightbox} />
        </>
    );
}
