'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useScrollDepthTracking, useTimeOnPage } from '@/app/hooks/useAnalytics';
import { ZoominfoHero } from './ZoominfoHero';
import { ZiInsightBlock, DarkPlaceholder } from './ZiDesignInsights';
import { ZiProblemAnimation } from './ZiProblemAnimation';
import { CaseStudyNav, type CaseStudyNavItem } from '@/app/components/CaseStudyNav';

const NAV_ITEMS: CaseStudyNavItem[] = [
    { id: 'problem', label: 'Problem' },
    { id: 'strategy', label: 'Strategy' },
    { id: 'goals', label: 'Goals' },
    { id: 'outcomes', label: 'Outcomes' },
    { id: 'impact', label: 'Impact' },
    { id: 'design', label: 'Design Process' },
];

export default function ZoominfoPage() {
    useScrollDepthTracking();
    useTimeOnPage();

    return (
        <>
        <div className="case-study-page arrive-cs">
            <div className="h-24"></div>

            <ZoominfoHero />

            {/* Sticky section nav — reveals once the hero docks (see CSS). */}
            <CaseStudyNav items={NAV_ITEMS} />

            {/* Hero intro */}
            <section className="arrive-cs-intro">
                <h1 className="arrive-cs-title zi-cs-title">Redesigning SalesOS: Zoominfo&apos;s flagship product</h1>
                <p className="arrive-cs-lead">
                    Redesigned the industry&apos;s leading Go-To-Market platform into a clean
                    AI-enabled, search-first experience.
                </p>
                <div className="arrive-cs-meta">
                    <span className="arrive-cs-meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M21 8.5V6.5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4.5" />
                            <path d="M3 9.5h18M8 3v3M16 3v3" />
                            <circle cx="17" cy="16.5" r="4.5" />
                            <path d="M17 14.8v1.7l1.3.9" />
                        </svg>
                        June – Aug 2023
                    </span>
                    <span className="arrive-cs-meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M16 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 17.5V19" />
                            <circle cx="10" cy="8" r="3.2" />
                            <path d="M20 19v-1.5a3.5 3.5 0 0 0-2.6-3.4M15.5 5a3.2 3.2 0 0 1 0 6.2" />
                        </svg>
                        Kevin (support) · Sean (PM) · Hua Gao (Data Model)
                    </span>
                </div>
            </section>

            {/* Problem */}
            <section id="problem" className="arrive-cs-block arrive-cs-block--no-divider">
                <h2 className="arrive-cs-block-label">Problem</h2>
                <div className="arrive-cs-block-body">
                    <p className="arrive-cs-block-text">
                        After years of constant updates, ZoomInfo&apos;s homepage tried to show
                        everything at once: an onboarding tracker, integrations, saved searches,
                        recently viewed contacts, a full recommendations feed, and intent signal
                        widgets stacked across three columns. Most of it was low-relevance and
                        hard to configure, so people skipped the homepage and went straight to
                        what they actually came for: search.
                    </p>

                    <div className="arrive-cs-block-figure" style={{ marginTop: "3rem" }}>
                        <ZiProblemAnimation />
                    </div>
                </div>
            </section>

            {/* Strategy */}
            <section id="strategy" className="arrive-cs-block">
                <h2 className="arrive-cs-block-label">Strategy</h2>
                <div className="arrive-cs-block-body">
                    <p className="arrive-cs-block-text">
                        The instinct was to make the homepage better — more relevant modules,
                        smarter recommendations, tighter widgets. But research showed the
                        homepage wasn&apos;t failing because it had the wrong content. It was
                        failing because it buried the one thing people valued.
                    </p>
                    <p className="arrive-cs-block-text">
                        So we didn&apos;t add. We removed. We turned the homepage into a clean,
                        search-first start — and made that search something you could begin in
                        plain language, building on an entity-recognition model the data team
                        had prototyped with ChatGPT.
                    </p>
                    <div className="arrive-cs-block-figure">
                        <Image
                            src="/images/zi-new-homepage.png"
                            alt="New SalesOS AI homepage — clean, search-first start"
                            width={1200}
                            height={700}
                            className="arrive-cs-block-figure-img"
                        />
                    </div>
                    <p className="arrive-cs-block-text">
                        This became the AI homepage — a natural-language front door for SalesOS.
                    </p>
                    <p className="arrive-cs-block-text">
                        We then released this alpha to 15 customers who were interested in this search language pilot, to gather feedback.
                    </p>
                </div>
            </section>

            {/* What we set out to learn */}
            <section id="goals" className="arrive-cs-block">
                <h2 className="arrive-cs-block-label">What we set out to learn</h2>
                <div className="arrive-cs-block-body">
                    <p className="arrive-cs-block-text">
                        A new search experience shipped as a toggleable alpha to a limited set
                        of SalesOS users, to answer three questions:
                    </p>
                    <ol style={{ paddingLeft: '1.25rem', margin: '0', display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'decimal' }}>
                        <li className="arrive-cs-block-text" style={{ margin: 0 }}>
                            Do users prefer this natural language search to a traditional advanced search?
                        </li>
                        <li className="arrive-cs-block-text" style={{ margin: 0 }}>
                            Does natural language search lead to better outcomes as measured by search conversions, time to value?
                        </li>
                        <li className="arrive-cs-block-text" style={{ margin: 0 }}>
                            What types of searches users will enter in a search box without restrictions?
                        </li>
                    </ol>
                </div>
            </section>

            {/* Outcomes */}
            <section id="outcomes" className="arrive-cs-block">
                <h2 className="arrive-cs-block-label">Outcomes</h2>
                <div className="arrive-cs-block-body">
                    <p className="zi-block-stat">13 of 15 testers preferred the new homepage to the existing experience.</p>
                    <p className="arrive-cs-block-text">
                        The alpha did its job: a clear preference signal, plus a live stream of
                        real, unrestricted queries to learn the rest from.
                    </p>
                </div>
            </section>

            {/* Impact */}
            <section id="impact" className="arrive-cs-block arrive-cs-impact">
                <h2 className="arrive-cs-block-label">Impact</h2>
                <div className="arrive-cs-block-body">
                    <p className="arrive-cs-block-text">
                        Ten months later, ZoomInfo shipped Copilot — its flagship AI product,
                        built on searching the database in plain language. This alpha tested
                        that bet first, live, with real sellers.
                    </p>
                    <ul style={{ paddingLeft: '1.25rem', margin: '1.5rem 0 0', display: 'flex', flexDirection: 'column', gap: '1rem', listStyle: 'disc' }}>
                        <li className="arrive-cs-block-text" style={{ margin: 0 }}>
                            <strong>Decreased time to value</strong> — by providing users a simplified method of searching, we decreased the effort to find the right companies and contacts for prospecting.
                        </li>
                        <li className="arrive-cs-block-text" style={{ margin: 0 }}>
                            <strong>Improved Search UX</strong> — no longer requiring users to learn how to use all of our filters greatly simplified the search experience.
                        </li>
                        <li className="arrive-cs-block-text" style={{ margin: 0 }}>
                            <strong>[Marketing] Face the Competition</strong> — According to Google, ZI was perceived as &quot;manual&quot; compared to Apollo.io&apos;s &quot;AI-driven&quot; capabilities. Simplifying search with best-in-class natural language capabilities served as a shot across the bow for Apollo.io and an opportunity to capitalize on market sentiment around AI.
                        </li>
                    </ul>
                </div>
            </section>

            {/* ── DESIGN ────────────────────────────────────────────── */}
            <div id="design" className="zi-design-header">Design Process</div>

            <ZiInsightBlock
                isFirst
                title="Less is More"
                body={
                    <>
                        <p>
                            The old homepage answered &ldquo;what could we show you?&rdquo;
                            <br />
                            The new one answers &ldquo;what did you come to do?&rdquo;
                        </p>
                        <p>
                            I cut the modules to a single instruction in a search field:
                            &ldquo;Describe your perfect contact or company list,&rdquo; with
                            working examples split into finding Contacts or Companies.
                            <br />
                            The examples do the onboarding the old page tried to do with widgets.
                        </p>
                    </>
                }
                media={
                    <video
                        src="/images/zi-new-search.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="zi-block-video"
                    />
                }
            />

            <ZiInsightBlock
                title="Plain language is messy — design for the bad query"
                body={
                    <p>
                        Open input invites vague, oversized, and broken requests. I designed
                        the guardrails: a nudge under five words, a warning when a query will
                        flood results, a 20-second timeout with retry on model failure, a
                        1024-character ceiling, and prompt truncation before scroll. The
                        model&apos;s uncertainty lived in the UI, not just the backend.
                    </p>
                }
                media={<Image src="/images/zi-states.png" alt="Possibly too many results and long-prompt states" width={1200} height={800} style={{ width: '100%', height: 'auto', borderRadius: '12px' }} />}
            />

            <ZiInsightBlock
                title="If you're running an experiment, design the instrument"
                body={
                    <p>
                        This was an alpha, so the point was the learning. I built feedback
                        into the flow: thumbs up/down on every result set (up → thank-you
                        toast; down → a &ldquo;Didn&apos;t like the experience?&rdquo; form), a toggle to
                        revert to the old homepage with a reason-coded survey on opt-out,
                        and tracking of the full query alongside its parsed output. Every
                        interaction was a data point — including from the people who turned
                        it off.
                    </p>
                }
                media={
                    <video
                        src="/images/zi-thumbsup.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="zi-block-video"
                    />
                }
            />

            <ZiInsightBlock
                title="What we killed"
                body={
                    <p>
                        I designed a Search Assist drawer — the AI as a floating panel over
                        results, with a live result count and pre-written follow-up suggestions.
                        Leadership pushed back: splitting attention between a chatbox and the
                        table felt chair-swivelly, and risky for a user base that ranged widely
                        in technical comfort. The critique was fair, so we cut it and folded
                        the good parts into the in-table experience.
                    </p>
                }
                media={
                    <video
                        src="/images/zi-future.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="zi-block-video"
                    />
                }
            />


            {/* Footer note */}
            <p style={{ maxWidth: '520px', margin: '5rem auto 0', textAlign: 'center', fontSize: '15px', lineHeight: '1.65', color: '#6b7280', fontStyle: 'italic', fontFamily: 'Graphik, sans-serif' }}>
                From research framing through a shipped alpha in sellers&apos; hands, I owned
                this end to end — and the most important design calls I made were the ones
                to remove, not add.
            </p>

            {/* Bottom Navigation */}
            <div className="case-study-bottom-nav" style={{ marginTop: '4rem' }}>
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
        </>
    );
}
