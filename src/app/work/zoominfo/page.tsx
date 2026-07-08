'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useScrollDepthTracking, useTimeOnPage } from '@/app/hooks/useAnalytics';
import { ZoominfoHero } from './ZoominfoHero';
import { ZiProblemAnimation } from './ZiProblemAnimation';
import { ZiReferenceCollage } from './ZiReferenceCollage';
import { ZiUserFlow } from './ZiUserFlow';
import { ZiRequirements } from './ZiRequirements';
import { ZiDesignProcess } from './ZiDesignProcess';
import { ZiZoomImage } from './ZiZoomImage';
import { CaseStudyNav, type CaseStudyNavItem } from '@/app/components/CaseStudyNav';

const NAV_ITEMS: CaseStudyNavItem[] = [
    { id: 'background', label: 'Problem' },
    { id: 'problem', label: 'Opportunity' },
    {
        id: 'strategy',
        label: 'Solution',
        children: [
            { id: 'sol-homepage', label: 'New AI Homepage' },
            { id: 'sol-continue', label: 'Continue search' },
            { id: 'sol-feedback', label: 'Feedback' },
        ],
    },
    { id: 'outcomes', label: 'Outcomes' },
    { id: 'impact', label: 'Impact' },
    {
        id: 'design',
        label: 'Design Process',
        children: [
            { id: 'understanding-the-work', label: 'Understanding the Work' },
            { id: 'gathering-references', label: 'Gathering References' },
            { id: 'user-flow', label: 'Mapping out user flow' },
            { id: 'states', label: 'States. States. States' },
            { id: 'dev-handoff', label: 'Dev Handoff' },
            { id: 'bugs', label: 'Bugs & Improvements' },
            { id: 'playground', label: 'Playground' },
        ],
    },
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

            {/* Background */}
            <section id="background" className="arrive-cs-block arrive-cs-block--no-divider">
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

            {/* Opportunity */}
            <section id="problem" className="arrive-cs-block">
                <h2 className="arrive-cs-block-label">Opportunity</h2>
                <div className="arrive-cs-block-body">
                    <p className="arrive-cs-block-text">
                        As part of a data team offsite, an entity recognition model using ChatGPT
                        was created that translates natural language into an Advanced Search query.
                        Given the excitement around AI/ChatGPT and the potential this feature, and
                        Advanced Entity Recognition, had to simplify the overall search experience,
                        I led the design to test this capability on a limited set of SalesOS users
                        to determine:
                    </p>
                    <ol style={{ paddingLeft: '1.25rem', margin: '0', display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'decimal' }}>
                        <li className="arrive-cs-block-text" style={{ margin: 0 }}>
                            <strong>Do users prefer this natural language search to a traditional advanced search?</strong>
                        </li>
                        <li className="arrive-cs-block-text" style={{ margin: 0 }}>
                            <strong>Does natural language search lead to better outcomes as measured by search conversions, time to value?</strong>
                        </li>
                        <li className="arrive-cs-block-text" style={{ margin: 0 }}>
                            <strong>What types of searches users will enter in a search box without restrictions?</strong>
                        </li>
                    </ol>
                </div>
            </section>

            {/* Solution */}
            <section id="strategy" className="arrive-cs-block">
                <h2 className="arrive-cs-block-label">Solution</h2>
                <div className="arrive-cs-block-body">
                    {/* New AI homepage */}
                    <h3 id="sol-homepage" className="zi-sol-subhead">
                        New AI homepage — a natural-language front door for SalesOS.
                    </h3>
                    <p className="arrive-cs-block-text">
                        I cut the modules to a single instruction in a search field:
                        &ldquo;Describe your perfect contact or company list,&rdquo; with working
                        examples split into finding Contacts or Companies. The examples do the
                        onboarding the old page tried to do with widgets.
                    </p>
                    <div className="arrive-cs-block-figure">
                        <video
                            src="/images/zi-new-search.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="arrive-cs-block-figure-img"
                        />
                    </div>

                    {/* Continue or refine search query */}
                    <h3 id="sol-continue" className="zi-sol-subhead">
                        Continue or refine search query
                    </h3>
                    <p className="arrive-cs-block-text">
                        After landing in search results, I wanted users to keep working in the
                        familiar search UX and their filters — while also being able to edit or
                        add to their query inline, without having to go back to the homepage
                        again.
                    </p>
                    <div className="arrive-cs-block-figure">
                        <video
                            src="/images/chip.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="arrive-cs-block-figure-img"
                        />
                    </div>

                    {/* Didn't like it? Let us know */}
                    <h3 id="sol-feedback" className="zi-sol-subhead">
                        Didn&apos;t like it? Let us know
                    </h3>
                    <p className="arrive-cs-block-text">
                        I built feedback into the flow: thumbs up/down on every result set
                        (up → thank-you toast; down → a &ldquo;Didn&apos;t like the
                        experience?&rdquo; form)
                    </p>
                    <div className="arrive-cs-block-figure">
                        <video
                            src="/images/feedback.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="arrive-cs-block-figure-img"
                        />
                    </div>
                    <p className="arrive-cs-block-text">
                        If a user toggles to revert to the old homepage, I added a quick survey
                        to understand why. Every interaction was a data point — including from
                        the people who turned it off.
                    </p>
                    <div className="arrive-cs-block-figure">
                        <video
                            src="/images/off.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="arrive-cs-block-figure-img"
                        />
                    </div>
                </div>
            </section>

            {/* Outcomes */}
            <section id="outcomes" className="arrive-cs-block">
                <h2 className="arrive-cs-block-label">Outcomes</h2>
                <div className="arrive-cs-block-body">
                    <p className="arrive-cs-block-text">
                        We released the alpha to 15 customers in the search-language pilot to gather feedback.
                    </p>
                    <p className="zi-block-stat">13 of 15 testers preferred the new homepage to the existing experience.</p>
                    <ul className="zi-quotes">
                        <li className="zi-quote">
                            <p className="zi-quote-text">&ldquo;[Google-like search] could be very useful in the long-term&rdquo;</p>
                            <span className="zi-quote-author">Customer, Microsoft</span>
                        </li>
                        <li className="zi-quote">
                            <p className="zi-quote-text">&ldquo;[Natural Language] would be beneficial&rdquo;</p>
                            <span className="zi-quote-author">Customer, Siemens</span>
                        </li>
                        <li className="zi-quote">
                            <p className="zi-quote-text">&ldquo;We think that our users could easily use ChatGPT search with a few examples [paraphrased]&rdquo;</p>
                            <span className="zi-quote-author">ZI SalesOS AE Team</span>
                        </li>
                        <li className="zi-quote">
                            <p className="zi-quote-text">&ldquo;Natural language search would be very useful for me&rdquo;</p>
                            <span className="zi-quote-author">Customer, ConneXus</span>
                        </li>
                    </ul>
                </div>
            </section>

            {/* Impact */}
            <section id="impact" className="arrive-cs-block">
                <h2 className="arrive-cs-block-label">Impact</h2>
                <div className="arrive-cs-block-body">
                    <ul style={{ paddingLeft: '1.25rem', margin: '0', display: 'flex', flexDirection: 'column', gap: '1rem', listStyle: 'disc' }}>
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

            {/* Understanding the Work — product requirements + design process */}
            <section id="understanding-the-work" className="zi-insight zi-insight--first">
                <div className="zi-insight-text">
                    <h3 className="zi-insight-title">Understanding the Work</h3>
                    <div className="zi-insight-body">
                        <p>
                            Working with the PM, we turned the alpha&apos;s goals into a shared
                            spec — the product requirements for what it had to do — while I
                            followed our team&apos;s end-to-end design process to get there.
                        </p>
                    </div>
                </div>
                <div className="zi-uw-grid">
                    <ZiRequirements />
                    <ZiDesignProcess />
                </div>
            </section>

            {/* Gathering References */}
            <section id="gathering-references" className="zi-insight">
                <div className="zi-insight-text">
                    <h3 className="zi-insight-title">Gathering References</h3>
                    <div className="zi-insight-body">
                        <p>
                            Before designing, I studied how leading products were framing AI-driven
                            search and chat — pulling patterns and inspiration from these references.
                        </p>
                    </div>
                </div>
                <ZiReferenceCollage />
            </section>

            {/* Mapping out user flow */}
            <section id="user-flow" className="zi-insight">
                <div className="zi-insight-text">
                    <h3 className="zi-insight-title">Mapping out user flow</h3>
                    <div className="zi-insight-body">
                        <p>
                            Before touching pixels, I mapped the end-to-end journey — how a user
                            enters AI search, acts on results, refines with follow-ups, and can
                            always toggle back to classic search.
                        </p>
                    </div>
                </div>
                <ZiUserFlow />
            </section>

            {/* States. States. States */}
            <section id="states" className="zi-insight">
                <div className="zi-insight-text">
                    <h3 className="zi-insight-title">States. States. States</h3>
                    <div className="zi-insight-body">
                        <p>
                            The happy path was the easy part — the real design work lived in the
                            edge cases. Open input invites vague, oversized, and broken requests,
                            so I detailed every state of the search experience down to the pixel:
                            the default prompt, the &ldquo;too few words&rdquo; nudge, single- and
                            multi-line overflow, character limits, and exact widths and spacing —
                            so the model&apos;s uncertainty lived in the UI, and nothing was left
                            to interpretation at handoff.
                        </p>
                    </div>
                </div>
                <div className="zi-states-fullbleed">
                    <ZiZoomImage
                        src="/images/zi-states-full.png"
                        alt="Detailed designs for every state of the search input — default, too-few-words nudge, single-line, and multi-line overflow"
                        width={5065}
                        height={2031}
                        sizes="100vw"
                        quality={100}
                        unoptimized
                        className="zi-states-full-img"
                    />
                </div>
            </section>


            {/* Dev Handoff */}
            <section id="dev-handoff" className="zi-insight">
                <div className="zi-insight-text">
                    <h3 className="zi-insight-title">Dev Handoff</h3>
                    <div className="zi-insight-body">
                        <p>
                            I annotated every card so dev understood the nuances up front —
                            cutting down the back-and-forth of chasing each other down for
                            calls and keeping the build moving efficiently.
                        </p>
                    </div>
                </div>
                <div className="zi-handoff-figure">
                    <ZiZoomImage
                        src="/images/zi-dev-handoff.jpg"
                        alt="Developer handoff — annotated specs and redlines for the search experience"
                        width={2224}
                        height={934}
                        sizes="(max-width: 860px) 100vw, 820px"
                        quality={100}
                        unoptimized
                        className="zi-states-full-img"
                    />
                </div>
            </section>

            {/* Bugs & Improvements */}
            <section id="bugs" className="zi-insight">
                <div className="zi-insight-text">
                    <h3 className="zi-insight-title">Bugs &amp; Improvements</h3>
                    <div className="zi-insight-body">
                        <p>
                            I kept iterating on what dev shipped to Staging — there are almost
                            always discrepancies to catch and refine. Alongside the fixes, I
                            logged JIRA tickets for future enhancements as new decisions were
                            approved through leadership.
                        </p>
                    </div>
                </div>
                <div className="zi-states-fullbleed">
                    <ZiZoomImage
                        src="/images/zi-bugs.jpg"
                        alt="Bugs and improvements tracked and resolved during the alpha"
                        width={13694}
                        height={3346}
                        sizes="100vw"
                        quality={100}
                        className="zi-states-full-img"
                    />
                </div>
            </section>

            {/* Future Concepts */}
            <section id="playground" className="zi-insight zi-future">
                <div className="zi-insight-text">
                    <h3 className="zi-insight-title">Playground</h3>
                </div>
                <div className="zi-future-list">
                    <div className="zi-future-item">
                        <h4 className="zi-future-item-title">
                            <span className="zi-future-num">#1</span> Ai Chatbot
                        </h4>
                        <p className="zi-future-text">
                            I tried an AI Chatbot experience as a floating panel over results, with
                            a live result count and pre-written follow-up suggestions. Leadership
                            pushed back as they felt splitting attention between a chatbox and the
                            table was a lot.
                        </p>
                        <video
                            src="/images/chatdrawer.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="zi-insight-video"
                        />
                    </div>
                    <div className="zi-future-item">
                        <h4 className="zi-future-item-title">
                            <span className="zi-future-num">#2</span> Search via Filters
                        </h4>
                        <p className="zi-future-text">
                            I also tried adding AI queries within the filters panel since that&apos;s
                            the most used part of the search UX — but it felt like over-complicating
                            rather than simplifying the experience.
                        </p>
                        <video
                            src="/images/smartfilters.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="zi-insight-video"
                        />
                    </div>
                </div>
            </section>


            {/* Bottom Navigation */}
            <div className="case-study-bottom-nav">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="back-link"
                >
                    Go to top
                    <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="top-arrow" aria-hidden="true" />
                </button>
            </div>
        </div>
        </>
    );
}
