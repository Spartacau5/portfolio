'use client';

import Image from "next/image";

import { MusicPlayer } from "../components/MusicPlayer";
import { PhotoCarousel } from "../components/PhotoCarousel";
import { PodcastPlayer } from "../components/PodcastPlayer";
import { IMessageChat } from "../components/IMessageChat";
import CatAnimation from "../components/CatAnimation";

// IMPORTANT (Next.js App Router):
// Move this global CSS import to: src/app/layout.tsx (or src/app/globals.css)
// import "../styles/photo-carousel.css";

export default function About() {
  return (
    <main className="min-h-screen bg-gray-50">

      <div className="container home">
        <div className="grid-top-bar">
          <div className="view-controls-div">
            <Image
              src="/images/arrow.svg"
              alt=""
              width={16}
              height={16}
              className="list-icon"
            />
            <div className="caption-text-w-icon">Click around...</div>
          </div>
        </div>

        <div className="w-layout-grid about-grid">
          {/* Left Column - Main Content */}
          <div
            id="w-node-_6c8a77c8-e695-9470-df4c-56e39795bf33-d4229b69"
            className="card-wrapper"
          >
            {/* Cat Animation - positioned above the card */}
            <div className="cat-position-wrapper">
              <CatAnimation />
            </div>
            <div className="tile xl me about">
            <div className="internal-div">
              <div className="about-me-div">
                <div className="about-header-flex">
                  <h1 className="display-heading">
                    What I&apos;m <span className="display-emphasis">bout.</span>
                  </h1>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-button secondary"
                  >
                    Download Resume
                    <Image src="/images/arrow-angle.svg" alt="" width={16} height={16} className="cta-arrow" />
                  </a>
                </div>

                <div className="intro-hr" />

                <div className="about-me-block">
                  <h2 className="work-label">WHERE I&apos;M FROM</h2>
                  <div className="display-heading-2-about">
                    I was born and raised in India, where I grew up always tinkering with something,convinced the next idea would be the one.
                    Spoiler: it never was, but it trained me to keep iterating.
                  </div>
                </div>

                <div className="about-me-block">
                  <h2 className="work-label">WHAT I USED TO DO</h2>
                  <div className="display-heading-2-about">
                    I didn&apos;t take the scenic route to design. I bounced
                    across roles and rooms where you learn fast or you get left
                    behind: early gigs, scrappy projects, and a lot of figuring
                    it out in public.
                  </div>
                </div>

                <div className="about-me-block">
                  <h2 className="work-label">WHAT I DO NOW</h2>
                  <div className="display-heading-2-about">
                    Today I&apos;m studying{" "}
                    <span className="font-semibold">Strategic Design</span> at{" "}
                    <span className="font-semibold">Parsons</span>. Previously,
                    I was a <span className="font-semibold">UX Designer </span>
                    at <span className="font-semibold">ZoomInfo</span>. I&apos;ve also worked as a
                    contractor at{" "}
                    <span className="font-semibold">
                      Craft
                    </span>
                    , <span className="font-semibold">Johnson&amp;Johnson</span>{" "}
                    and <span className="font-semibold">Mt. Sinai. </span>

                  </div>
                </div>

                <div className="about-me-block">
                  <h2 className="work-label">WHERE I&apos;M AT NOW</h2>
                  <div className="display-heading-2-about">
                    I&apos;m currently based in New York City. I&apos;m usually
                    bouncing between campus, client work, and whatever new
                    experiment I obsess over (currently streaming Arc Raiders on
                    Youtube).
                  </div>
                </div>

                <div className="about-me-block">
                  <h2 className="work-label">WHAT I&apos;M LOOKING FOR</h2>
                  <div className="display-heading-2-about">
                    Impactful, purposeful work with a diverse team of talented
                    people! I also think the personal computer needs its{" "}
                    <span className="font-semibold">iPhone moment</span> ↗.
                  </div>
                </div>
              </div>

              <div className="nav-icons-div">
                <a
                  id="w-node-_6c8a77c8-e695-9470-df4c-56e39795c900-d4229b69"
                  href="#"
                  className="nav-icon w-inline-block"
                >
                  <span className="tooltip">Text Me</span>
                  <Image
                    src="/images/imessage-icon.svg"
                    alt="iMessage"
                    width={24}
                    height={24}
                  />
                </a>

                <a
                  id="w-node-_6c8a77c8-e695-9470-df4c-56e39795c901-d4229b69"
                  href="mailto:arpit.ahluwalia1@gmail.com"
                  className="nav-icon w-inline-block"
                >
                  <span className="tooltip">Email Me</span>
                  <Image
                    src="/images/email-contact-icon.svg"
                    alt="Email"
                    width={24}
                    height={24}
                  />
                </a>

                <a
                  id="w-node-_6c8a77c8-e695-9470-df4c-56e39795c902-d4229b69"
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-icon w-inline-block"
                >
                  <span className="tooltip">CV</span>
                  <Image
                    src="/images/read-cv-icon.svg"
                    alt="Read CV"
                    width={24}
                    height={24}
                  />
                </a>

                <a
                  id="w-node-_6c8a77c8-e695-9470-df4c-56e39795c903-d4229b69"
                  href="https://x.com/HomeyBabaRB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-icon w-inline-block"
                >
                  <span className="tooltip">@HomeyBabaRB</span>
                  <Image
                    src="/images/twitter-contact-icon.svg"
                    alt="Twitter"
                    width={24}
                    height={24}
                  />
                </a>
              </div>
            </div>
            </div>
          </div>

          {/* Twitter Card */}
          <div
            id="twitter"
            className="tile-twitter sm twitter about w-node-ad3c41ab-6071-5e6c-3932-6d9df03bfcb6-d4229b69"
          >
            <div className="small-app-flex">
              <div className="twtitter-top-div">
                <div className="twitter-top-flex">
                  <a
                    href="https://twitter.com/HomeyBabaRB"
                    className="twitter-info-div w-inline-block"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="twitter-avi-div">
                      <Image
                        src="/images/profilepic.png"
                        alt="Arpit Ahluwalia"
                        width={40}
                        height={40}
                        className="twitter-img"
                      />
                    </div>

                    <div className="twitter-name-div">
                      <div className="twitter-name" style={{ color: "rgb(0, 0, 0)" }}>
                        Arpit Ahluwalia
                      </div>
                      <div
                        className="twitter-handle"
                        style={{ color: "rgb(148, 148, 149)" }}
                      >
                        @HomeyBabaRB
                      </div>
                    </div>
                  </a>

                  <div className="small-app-icon-div">
                    <a
                      href="https://twitter.com/HomeyBabaRB"
                      className="app-icon-link w-inline-block"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Image
                        src="/images/twitter-icon-min.png"
                        alt="Twitter"
                        width={56}
                        height={56}
                        className="small-tile-icon-hover"
                      />
                    </a>

                    <div
                      className="small-app-background"
                      style={{
                        transform:
                          "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                        transformStyle: "preserve-3d",
                      }}
                    />
                  </div>
                </div>

                <div className="tweet-div">
                  <div className="twitter-tweet" style={{ color: "rgb(0, 0, 0)" }}>
                    cooking up • prev{" "}
                    <a
                      href="https://x.com/vercel"
                      className="tweet-link"
                      style={{ color: "rgb(21, 133, 199)" }}
                      target="_blank"
                      rel="noreferrer"
                    >
                      @craft
                    </a>{" "}
                    <a
                      href="https://x.com/v0"
                      className="tweet-link"
                      style={{ color: "rgb(21, 133, 199)" }}
                      target="_blank"
                      rel="noreferrer"
                    >
                      @zoominfo
                    </a>{" "}
                    <a
                      href="https://twitter.com/figma"
                      className="tweet-link"
                      style={{ color: "rgb(21, 133, 199)" }}
                      target="_blank"
                      rel="noreferrer"
                    >
                      @j&j
                    </a>{" "}
                    <a
                      href="https://twitter.com/diagram"
                      className="tweet-link"
                      style={{ color: "rgb(21, 133, 199)" }}
                      target="_blank"
                      rel="noreferrer"
                    >
                      @mtsinai
                    </a>
                  </div>
                </div>
              </div>

              <a
                id="twitter-button"
                data-w-id="ad3c41ab-6071-5e6c-3932-6d9df03bfcd4"
                href="https://twitter.com/HomeyBabaRB"
                className="twitter-button w-inline-block"
                style={{
                  borderColor: "rgb(222, 222, 224)",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                }}
                target="_blank"
                rel="noreferrer"
              >
                <div className="inner-button-flex">
                  <div className="button-text" style={{ color: "rgb(0, 0, 0)" }}>
                    Read mid tweets
                  </div>

                  <div className="arrow-icon-div">
                    <Image
                      src="/images/arrow-angle.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="arrow-icon"
                      style={{ opacity: 1 }}
                    />
                    <Image
                      src="/images/arrow-hover.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="arrow-icon-white"
                    />
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Apple Music Card */}
          <MusicPlayer />

          {/* Photo Card */}
          <PhotoCarousel />

          {/* Podcast Card */}
          <PodcastPlayer />

          {/* Contact Chat Card */}
          <IMessageChat />

        </div>
      </div>
    </main>
  );
}
