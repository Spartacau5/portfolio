import Image from "next/image";

import { Header } from "../components/Header";
import { MusicPlayer } from "../components/MusicPlayer";
import { PhotoCarousel } from "../components/PhotoCarousel";
import { PodcastPlayer } from "../components/PodcastPlayer";

// IMPORTANT (Next.js App Router):
// Move this global CSS import to: src/app/layout.tsx (or src/app/globals.css)
// import "../styles/photo-carousel.css";

export default function About() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <div className="container home">
        <div className="grid-top-bar">
          <div className="view-controls-div">
            <img
              src="/images/arrow.svg"
              loading="lazy"
              alt=""
              className="list-icon"
            />
            <div className="caption-text-w-icon">Look around...</div>
          </div>
        </div>

        <div className="w-layout-grid about-grid">
          {/* Left Column - Main Content */}
          <div
            id="w-node-_6c8a77c8-e695-9470-df4c-56e39795bf33-d4229b69"
            className="tile xl me about"
          >
            <div className="internal-div">
              <div className="about-me-div">
                <h1 className="display-heading">
                  What I&apos;m <span className="display-emphasis">bout.</span>
                </h1>

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
                  <Image
                    src="/images/imessage-icon.svg"
                    alt="iMessage"
                    width={24}
                    height={24}
                  />
                </a>

                <a
                  id="w-node-_6c8a77c8-e695-9470-df4c-56e39795c901-d4229b69"
                  href="#"
                  className="nav-icon w-inline-block"
                >
                  <Image
                    src="/images/email-contact-icon.svg"
                    alt="Email"
                    width={24}
                    height={24}
                  />
                </a>

                <a
                  id="w-node-_6c8a77c8-e695-9470-df4c-56e39795c902-d4229b69"
                  href="#"
                  className="nav-icon w-inline-block"
                >
                  <Image
                    src="/images/read-cv-icon.svg"
                    alt="Read CV"
                    width={24}
                    height={24}
                  />
                </a>

                <a
                  id="w-node-_6c8a77c8-e695-9470-df4c-56e39795c903-d4229b69"
                  href="#"
                  className="nav-icon w-inline-block"
                >
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

          {/* Twitter Card */}
          <div
            id="twitter"
            className="tile-twitter sm twitter about w-node-ad3c41ab-6071-5e6c-3932-6d9df03bfcb6-d4229b69"
          >
            <div className="small-app-flex">
              <div className="twtitter-top-div">
                <div className="twitter-top-flex">
                  <a
                    href="https://twitter.com/spartacau5"
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
                        @spartacau5
                      </div>
                    </div>
                  </a>

                  <div className="small-app-icon-div">
                    <a
                      href="https://twitter.com/spartacau5"
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
                href="https://twitter.com/spartacau5"
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
          <div
            id="w-node-e4cacf2e-5d38-4548-b099-9b308486aed2-d4229b69"
            className="tile sm imessage"
          >
            <div id="imessage-div" className="imessage-div">
              <div
                id="imessage-hover-temporary"
                data-w-id="e4cacf2e-5d38-4548-b099-9b308486aed4"
                className="imessage-hover-temporary"
                style={{ display: "block" }}
              />

              <div className="imessage-top">
                <div
                  data-w-id="e4cacf2e-5d38-4548-b099-9b308486aed6"
                  className="multiple-imessages"
                  style={{
                    transform:
                      "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="imessage-form-mirror w-form">
                    <form
                      id="email-form"
                      name="email-form"
                      data-name="Email Form"
                      method="get"
                      data-wf-page-id="651eac915e1d6043d4229b69"
                      data-wf-element-id="e4cacf2e-5d38-4548-b099-9b308486aed8"
                      aria-label="Email Form"
                    >
                      <div className="imessage-flex-intro">
                        <div className="imessage-flex-vertical">
                          <div className="imessage-label">Arpit</div>

                          <div className="imessage-flex-horizontal">
                            <div className="imessage-image">
                              <img
                                src="/images/profilepic.png"
                                loading="lazy"
                                alt="Arpit Ahluwalia"
                                width={60}
                                height={60}
                                className="imessage-avi"
                              />
                            </div>

                            <div className="imessage-my-messages">
                              <a href="#" className="imessage-bubble w-inline-block">
                                <div className="imessage-text">
                                  Want to work together? just want to chat? send me a
                                  text here (no, for real)
                                </div>
                                <img
                                  src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5e31287ee5b38783fa890_imessage-tail.svg"
                                  loading="lazy"
                                  alt=""
                                  className="imessage-tail"
                                />
                              </a>

                              <a
                                href="#"
                                className="imessage-typing-absolute w-inline-block"
                              >
                                <img
                                  src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5e31287ee5b38783fa890_imessage-tail.svg"
                                  loading="lazy"
                                  alt=""
                                  className="imessage-tail"
                                />
                                <div className="imessage-dots-div">
                                  <div
                                    className="typing-dot-1"
                                    style={{
                                      backgroundColor: "rgb(186, 186, 187)",
                                      willChange: "background",
                                    }}
                                  />
                                  <div
                                    className="typing-dot-2"
                                    style={{
                                      backgroundColor: "rgb(164, 164, 167)",
                                      willChange: "background",
                                    }}
                                  />
                                  <div
                                    className="typing-dot-3"
                                    style={{
                                      backgroundColor: "rgb(192, 192, 192)",
                                      willChange: "background",
                                    }}
                                  />
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="imessage-flex sender-1">
                        <a
                          href="#"
                          className="imessage-bubble sender-1 w-inline-block"
                        >
                          <div className="imessage-text sender">sounds good 🙏</div>
                          <img
                            src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5e42f3ef1495b87c63b88_imessage-sender-tail.svg"
                            loading="lazy"
                            alt=""
                            className="imessage-sender-tail intro"
                          />
                        </a>

                        <div
                          className="imessage-delivered-label intro-1"
                          style={{
                            transform:
                              "translate3d(0px, 0px, 0px) scale3d(0, 0, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                            transformStyle: "preserve-3d",
                            opacity: 0,
                          }}
                        >
                          Delivered
                        </div>
                      </div>

                      <div className="imessage-flex-2">
                        <div className="imessage-flex-vertical">
                          <div className="imessage-label">Marco</div>

                          <div className="imessage-flex-horizontal">
                            <div className="imessage-image">
                              <img
                                src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62e855526f99a814aee1bdab_3A63_b90_400x400.webp"
                                loading="lazy"
                                alt=""
                                className="imessage-avi"
                              />
                            </div>

                            <div className="imessage-my-messages">
                              <a
                                href="#"
                                className="imessage-bubble-name auto-1 w-inline-block"
                              >
                                <div className="imessage-text">what&apos;s your name?</div>
                                <img
                                  src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5e31287ee5b38783fa890_imessage-tail.svg"
                                  loading="lazy"
                                  alt=""
                                  className="imessage-tail"
                                />
                              </a>

                              <a
                                href="#"
                                className="imessage-typing-absolute-name-1 w-inline-block"
                              >
                                <img
                                  src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5e31287ee5b38783fa890_imessage-tail.svg"
                                  loading="lazy"
                                  alt=""
                                  className="imessage-tail"
                                />
                                <div className="imessage-dots-div">
                                  <div
                                    className="typing-dot-1"
                                    style={{
                                      backgroundColor: "rgb(186, 186, 187)",
                                      willChange: "background",
                                    }}
                                  />
                                  <div
                                    className="typing-dot-2"
                                    style={{
                                      backgroundColor: "rgb(164, 164, 167)",
                                      willChange: "background",
                                    }}
                                  />
                                  <div
                                    className="typing-dot-3"
                                    style={{
                                      backgroundColor: "rgb(192, 192, 192)",
                                      willChange: "background",
                                    }}
                                  />
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        data-w-id="e4cacf2e-5d38-4548-b099-9b308486af04"
                        className="imessage-flex sender-3"
                        style={{ opacity: 0 }}
                      >
                        <input
                          className="imessage-bubble-name-sender sender-2 w-input"
                          maxLength={256}
                          name="name"
                          data-name="Name"
                          placeholder=""
                          fs-mirrorinput-element="target"
                          type="text"
                          id="name"
                        />
                        <img
                          src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5e42f3ef1495b87c63b88_imessage-sender-tail.svg"
                          loading="lazy"
                          alt=""
                          className="imessage-sender-tail"
                        />
                        <div className="imessage-delivered-label-2">Delivered</div>
                      </div>

                      <div
                        data-w-id="e4cacf2e-5d38-4548-b099-9b308486af09"
                        className="imessage-flex-4"
                        style={{ opacity: 0 }}
                      >
                        <div className="imessage-flex-vertical">
                          <div className="imessage-label">Marco</div>

                          <div className="imessage-flex-horizontal">
                            <div className="imessage-image">
                              <img
                                src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62e855526f99a814aee1bdab_3A63_b90_400x400.webp"
                                loading="lazy"
                                alt=""
                                className="imessage-avi"
                              />
                            </div>

                            <div className="imessage-my-messages">
                              <a
                                data-w-id="e4cacf2e-5d38-4548-b099-9b308486af11"
                                href="#"
                                className="imessage-bubble auto-2 w-inline-block"
                                style={{ opacity: 0 }}
                              >
                                <div className="imessage-text">nice to meet you 👋</div>
                                <img
                                  src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5e31287ee5b38783fa890_imessage-tail.svg"
                                  loading="lazy"
                                  alt=""
                                  className="imessage-tail"
                                />
                              </a>

                              <a
                                data-w-id="e4cacf2e-5d38-4548-b099-9b308486af15"
                                href="#"
                                className="imessage-bubble-2nd auto-3 w-inline-block"
                                style={{ opacity: 0 }}
                              >
                                <div className="imessage-text">
                                  so what did you want to talk about?
                                </div>
                                <img
                                  src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5e31287ee5b38783fa890_imessage-tail.svg"
                                  loading="lazy"
                                  alt=""
                                  className="imessage-tail"
                                />
                              </a>

                              <a
                                data-w-id="e4cacf2e-5d38-4548-b099-9b308486af19"
                                href="#"
                                className="imessage-typing-absolute-4 w-inline-block"
                                style={{ opacity: 0 }}
                              >
                                <img
                                  src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5e31287ee5b38783fa890_imessage-tail.svg"
                                  loading="lazy"
                                  alt=""
                                  className="imessage-tail"
                                />
                                <div className="imessage-dots-div">
                                  <div
                                    className="typing-dot-1"
                                    style={{
                                      backgroundColor: "rgb(186, 186, 187)",
                                      willChange: "background",
                                    }}
                                  />
                                  <div
                                    className="typing-dot-2"
                                    style={{
                                      backgroundColor: "rgb(164, 164, 167)",
                                      willChange: "background",
                                    }}
                                  />
                                  <div
                                    className="typing-dot-3"
                                    style={{
                                      backgroundColor: "rgb(192, 192, 192)",
                                      willChange: "background",
                                    }}
                                  />
                                </div>
                              </a>

                              <a
                                data-w-id="e4cacf2e-5d38-4548-b099-9b308486af1f"
                                href="#"
                                className="imessage-typing-absolute-5 w-inline-block"
                                style={{ opacity: 0 }}
                              >
                                <img
                                  src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5e31287ee5b38783fa890_imessage-tail.svg"
                                  loading="lazy"
                                  alt=""
                                  className="imessage-tail"
                                />
                                <div className="imessage-dots-div">
                                  <div
                                    className="typing-dot-1"
                                    style={{
                                      backgroundColor: "rgb(186, 186, 187)",
                                      willChange: "background",
                                    }}
                                  />
                                  <div
                                    className="typing-dot-2"
                                    style={{
                                      backgroundColor: "rgb(164, 164, 167)",
                                      willChange: "background",
                                    }}
                                  />
                                  <div
                                    className="typing-dot-3"
                                    style={{
                                      backgroundColor: "rgb(192, 192, 192)",
                                      willChange: "background",
                                    }}
                                  />
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        data-w-id="e4cacf2e-5d38-4548-b099-9b308486af25"
                        className="imessage-flex sender-5"
                        style={{ opacity: 0 }}
                      >
                        <input
                          className="imessage-bubble-subject sender-3 w-input"
                          maxLength={256}
                          name="name-2"
                          data-name="Name 2"
                          placeholder=""
                          fs-mirrorinput-element="target-2"
                          type="text"
                          id="name-2"
                        />
                        <div
                          data-w-id="e4cacf2e-5d38-4548-b099-9b308486af27"
                          className="imessage-delivered-label-3"
                          style={{
                            opacity: 0,
                            transform:
                              "translate3d(0px, 0px, 0px) scale3d(0, 0, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                            transformStyle: "preserve-3d",
                          }}
                        >
                          Delivered
                        </div>
                        <img
                          src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5e42f3ef1495b87c63b88_imessage-sender-tail.svg"
                          loading="lazy"
                          alt=""
                          className="imessage-sender-tail"
                        />
                      </div>

                      <div
                        data-w-id="e4cacf2e-5d38-4548-b099-9b308486af2a"
                        className="imessage-flex-6"
                        style={{ opacity: 0 }}
                      >
                        <div className="imessage-flex-vertical">
                          <div className="imessage-label">Marco</div>

                          <div className="imessage-flex-horizontal">
                            <div className="imessage-image">
                              <img
                                src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62e855526f99a814aee1bdab_3A63_b90_400x400.webp"
                                loading="lazy"
                                alt=""
                                className="imessage-avi"
                              />
                            </div>

                            <div className="imessage-my-messages">
                              <a
                                data-w-id="e4cacf2e-5d38-4548-b099-9b308486af32"
                                href="#"
                                className="imessage-bubble auto-3 w-inline-block"
                                style={{ opacity: 0 }}
                              >
                                <div className="imessage-text">ahhh, i see 👀</div>
                                <img
                                  src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5e31287ee5b38783fa890_imessage-tail.svg"
                                  loading="lazy"
                                  alt=""
                                  className="imessage-tail"
                                />
                              </a>

                              <a
                                data-w-id="e4cacf2e-5d38-4548-b099-9b308486af36"
                                href="#"
                                className="imessage-bubble-2nd auto-4 w-inline-block"
                                style={{ opacity: 0 }}
                              >
                                <div className="imessage-text">
                                  what&apos;s your phone number? 📱
                                </div>
                                <img
                                  src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5e31287ee5b38783fa890_imessage-tail.svg"
                                  loading="lazy"
                                  alt=""
                                  className="imessage-tail"
                                />
                              </a>

                              <a
                                data-w-id="e4cacf2e-5d38-4548-b099-9b308486af3a"
                                href="#"
                                className="imessage-typing-absolute-6 w-inline-block"
                                style={{ opacity: 0 }}
                              >
                                <img
                                  src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5e31287ee5b38783fa890_imessage-tail.svg"
                                  loading="lazy"
                                  alt=""
                                  className="imessage-tail"
                                />
                                <div className="imessage-dots-div">
                                  <div
                                    className="typing-dot-1"
                                    style={{
                                      backgroundColor: "rgb(186, 186, 187)",
                                      willChange: "background",
                                    }}
                                  />
                                  <div
                                    className="typing-dot-2"
                                    style={{
                                      backgroundColor: "rgb(164, 164, 167)",
                                      willChange: "background",
                                    }}
                                  />
                                  <div
                                    className="typing-dot-3"
                                    style={{
                                      backgroundColor: "rgb(192, 192, 192)",
                                      willChange: "background",
                                    }}
                                  />
                                </div>
                              </a>

                              <a
                                data-w-id="e4cacf2e-5d38-4548-b099-9b308486af40"
                                href="#"
                                className="imessage-typing-absolute-2-2 w-inline-block"
                                style={{ opacity: 0 }}
                              >
                                <img
                                  src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5e31287ee5b38783fa890_imessage-tail.svg"
                                  loading="lazy"
                                  alt=""
                                  className="imessage-tail"
                                />
                                <div className="imessage-dots-div">
                                  <div
                                    className="typing-dot-1"
                                    style={{
                                      backgroundColor: "rgb(186, 186, 187)",
                                      willChange: "background",
                                    }}
                                  />
                                  <div
                                    className="typing-dot-2"
                                    style={{
                                      backgroundColor: "rgb(164, 164, 167)",
                                      willChange: "background",
                                    }}
                                  />
                                  <div
                                    className="typing-dot-3"
                                    style={{
                                      backgroundColor: "rgb(192, 192, 192)",
                                      willChange: "background",
                                    }}
                                  />
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        data-w-id="e4cacf2e-5d38-4548-b099-9b308486af46"
                        className="imessage-flex sender-7"
                        style={{ opacity: 0 }}
                      >
                        <input
                          className="imessage-bubble-phone sender-4 w-input"
                          maxLength={256}
                          name="name-2"
                          data-name="Name 2"
                          placeholder=""
                          fs-mirrorinput-element="target-3"
                          type="text"
                          id="name-2"
                        />
                        <img
                          src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5e42f3ef1495b87c63b88_imessage-sender-tail.svg"
                          loading="lazy"
                          alt=""
                          className="imessage-sender-tail"
                        />
                        <div
                          data-w-id="e4cacf2e-5d38-4548-b099-9b308486af49"
                          className="imessage-delivered-label-4"
                          style={{
                            opacity: 0,
                            transform:
                              "translate3d(0px, 0px, 0px) scale3d(0, 0, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                            transformStyle: "preserve-3d",
                          }}
                        >
                          Delivered
                        </div>
                      </div>

                      <div
                        data-w-id="e4cacf2e-5d38-4548-b099-9b308486af4b"
                        className="imessage-flex-8"
                      >
                        <div className="imessage-flex-vertical">
                          <div className="imessage-label">Marco</div>

                          <div className="imessage-flex-horizontal">
                            <div className="imessage-image">
                              <img
                                src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62e855526f99a814aee1bdab_3A63_b90_400x400.webp"
                                loading="lazy"
                                alt=""
                                className="imessage-avi"
                              />
                            </div>

                            <div className="imessage-my-messages">
                              <a
                                data-w-id="e4cacf2e-5d38-4548-b099-9b308486af53"
                                href="#"
                                className="imessage-bubble auto-7 w-inline-block"
                                style={{ opacity: 0 }}
                              >
                                <div className="imessage-text">good look 🙏</div>
                                <img
                                  src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5e31287ee5b38783fa890_imessage-tail.svg"
                                  loading="lazy"
                                  alt=""
                                  className="imessage-tail"
                                />
                              </a>

                              <a
                                data-w-id="e4cacf2e-5d38-4548-b099-9b308486af57"
                                href="#"
                                className="imessage-bubble-2nd auto-8 w-inline-block"
                                style={{ opacity: 0 }}
                              >
                                <div className="imessage-text">what about your email? 📧</div>
                                <img
                                  src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5e31287ee5b38783fa890_imessage-tail.svg"
                                  loading="lazy"
                                  alt=""
                                  className="imessage-tail"
                                />
                              </a>

                              <a
                                data-w-id="e4cacf2e-5d38-4548-b099-9b308486af5b"
                                href="#"
                                className="imessage-typing-absolute-7 w-inline-block"
                                style={{ opacity: 0 }}
                              >
                                <img
                                  src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5e31287ee5b38783fa890_imessage-tail.svg"
                                  loading="lazy"
                                  alt=""
                                  className="imessage-tail"
                                />
                                <div className="imessage-dots-div">
                                  <div
                                    className="typing-dot-1"
                                    style={{
                                      backgroundColor: "rgb(186, 186, 187)",
                                      willChange: "background",
                                    }}
                                  />
                                  <div
                                    className="typing-dot-2"
                                    style={{
                                      backgroundColor: "rgb(164, 164, 167)",
                                      willChange: "background",
                                    }}
                                  />
                                  <div
                                    className="typing-dot-3"
                                    style={{
                                      backgroundColor: "rgb(192, 192, 192)",
                                      willChange: "background",
                                    }}
                                  />
                                </div>
                              </a>

                              <a
                                data-w-id="e4cacf2e-5d38-4548-b099-9b308486af61"
                                href="#"
                                className="imessage-typing-absolute-2-3 w-inline-block"
                                style={{ opacity: 0 }}
                              >
                                <img
                                  src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5e31287ee5b38783fa890_imessage-tail.svg"
                                  loading="lazy"
                                  alt=""
                                  className="imessage-tail"
                                />
                                <div className="imessage-dots-div">
                                  <div
                                    className="typing-dot-1"
                                    style={{
                                      backgroundColor: "rgb(186, 186, 187)",
                                      willChange: "background",
                                    }}
                                  />
                                  <div
                                    className="typing-dot-2"
                                    style={{
                                      backgroundColor: "rgb(164, 164, 167)",
                                      willChange: "background",
                                    }}
                                  />
                                  <div
                                    className="typing-dot-3"
                                    style={{
                                      backgroundColor: "rgb(192, 192, 192)",
                                      willChange: "background",
                                    }}
                                  />
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        data-w-id="e4cacf2e-5d38-4548-b099-9b308486af67"
                        className="imessage-flex sender-9"
                        style={{ opacity: 0 }}
                      >
                        <input
                          className="imessage-bubble-email sender-8 w-input"
                          maxLength={256}
                          name="name-2"
                          data-name="Name 2"
                          placeholder=""
                          fs-mirrorinput-element="target-4"
                          type="text"
                          id="name-2"
                        />
                        <div
                          data-w-id="e4cacf2e-5d38-4548-b099-9b308486af69"
                          className="imessage-delivered-label-5"
                          style={{
                            transform:
                              "translate3d(0px, 0px, 0px) scale3d(0, 0, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                            transformStyle: "preserve-3d",
                            opacity: 0,
                          }}
                        >
                          Delivered
                        </div>
                        <img
                          src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5e42f3ef1495b87c63b88_imessage-sender-tail.svg"
                          loading="lazy"
                          alt=""
                          className="imessage-sender-tail"
                        />
                      </div>

                      <div
                        data-w-id="e4cacf2e-5d38-4548-b099-9b308486af6c"
                        className="imessage-flex-10"
                        style={{ opacity: 0 }}
                      >
                        <div className="imessage-flex-vertical">
                          <div className="imessage-label">Marco</div>

                          <div className="imessage-flex-horizontal">
                            <div className="imessage-image">
                              <img
                                src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62e855526f99a814aee1bdab_3A63_b90_400x400.webp"
                                loading="lazy"
                                alt=""
                                className="imessage-avi"
                              />
                            </div>

                            <div className="imessage-my-messages">
                              <a
                                data-w-id="e4cacf2e-5d38-4548-b099-9b308486af74"
                                href="#"
                                className="imessage-bubble auto-9 w-inline-block"
                                style={{ opacity: 0 }}
                              >
                                <div className="imessage-text">thanks 🙏</div>
                                <img
                                  src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5e31287ee5b38783fa890_imessage-tail.svg"
                                  loading="lazy"
                                  alt=""
                                  className="imessage-tail"
                                />
                              </a>

                              <a
                                data-w-id="e4cacf2e-5d38-4548-b099-9b308486af78"
                                href="#"
                                className="imessage-bubble-2nd auto-10 w-inline-block"
                                style={{ opacity: 0 }}
                              >
                                <div className="imessage-text">
                                  anything else you wanna tell me?
                                </div>
                                <img
                                  src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5e31287ee5b38783fa890_imessage-tail.svg"
                                  loading="lazy"
                                  alt=""
                                  className="imessage-tail"
                                />
                              </a>

                              <a
                                data-w-id="e4cacf2e-5d38-4548-b099-9b308486af7c"
                                href="#"
                                className="imessage-typing-absolute-8 w-inline-block"
                                style={{ opacity: 0 }}
                              >
                                <img
                                  src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5e31287ee5b38783fa890_imessage-tail.svg"
                                  loading="lazy"
                                  alt=""
                                  className="imessage-tail"
                                />
                                <div className="imessage-dots-div">
                                  <div
                                    className="typing-dot-1"
                                    style={{
                                      backgroundColor: "rgb(186, 186, 187)",
                                      willChange: "background",
                                    }}
                                  />
                                  <div
                                    className="typing-dot-2"
                                    style={{
                                      backgroundColor: "rgb(164, 164, 167)",
                                      willChange: "background",
                                    }}
                                  />
                                  <div
                                    className="typing-dot-3"
                                    style={{
                                      backgroundColor: "rgb(192, 192, 192)",
                                      willChange: "background",
                                    }}
                                  />
                                </div>
                              </a>

                              <a
                                data-w-id="e4cacf2e-5d38-4548-b099-9b308486af82"
                                href="#"
                                className="imessage-typing-absolute-2-4 w-inline-block"
                                style={{ opacity: 0 }}
                              >
                                <img
                                  src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5e31287ee5b38783fa890_imessage-tail.svg"
                                  loading="lazy"
                                  alt=""
                                  className="imessage-tail"
                                />
                                <div className="imessage-dots-div">
                                  <div
                                    className="typing-dot-1"
                                    style={{
                                      backgroundColor: "rgb(186, 186, 187)",
                                      willChange: "background",
                                    }}
                                  />
                                  <div
                                    className="typing-dot-2"
                                    style={{
                                      backgroundColor: "rgb(164, 164, 167)",
                                      willChange: "background",
                                    }}
                                  />
                                  <div
                                    className="typing-dot-3"
                                    style={{
                                      backgroundColor: "rgb(192, 192, 192)",
                                      willChange: "background",
                                    }}
                                  />
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        data-w-id="e4cacf2e-5d38-4548-b099-9b308486af88"
                        className="imessage-flex sender-11"
                        style={{ opacity: 0 }}
                      >
                        <img
                          src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5e42f3ef1495b87c63b88_imessage-sender-tail.svg"
                          loading="lazy"
                          alt=""
                          className="imessage-sender-tail"
                        />
                        <input
                          className="imessage-bubble-extra sender-11 w-input"
                          maxLength={256}
                          name="name-2"
                          data-name="Name 2"
                          placeholder=""
                          fs-mirrorinput-element="target-5"
                          type="text"
                          id="name-2"
                        />
                        <div
                          data-w-id="e4cacf2e-5d38-4548-b099-9b308486af8b"
                          className="imessage-delivered-label-6"
                          style={{
                            transform:
                              "translate3d(0px, 0px, 0px) scale3d(0, 0, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                            transformStyle: "preserve-3d",
                            opacity: 0,
                          }}
                        >
                          Delivered
                        </div>
                      </div>

                      <div
                        data-w-id="e4cacf2e-5d38-4548-b099-9b308486af8d"
                        className="imessage-flex-12"
                      >
                        <div className="imessage-flex-vertical">
                          <div className="imessage-label">Marco</div>

                          <div className="imessage-flex-horizontal">
                            <div className="imessage-image">
                              <img
                                src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62e855526f99a814aee1bdab_3A63_b90_400x400.webp"
                                loading="lazy"
                                alt=""
                                className="imessage-avi"
                              />
                            </div>

                            <div className="imessage-my-messages">
                              <a
                                data-w-id="e4cacf2e-5d38-4548-b099-9b308486af95"
                                href="#"
                                className="imessage-bubble auto-15 w-inline-block"
                                style={{ opacity: 0 }}
                              >
                                <div className="imessage-text">word ok, got it 🙌</div>
                                <img
                                  src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5e31287ee5b38783fa890_imessage-tail.svg"
                                  loading="lazy"
                                  alt=""
                                  className="imessage-tail"
                                />
                              </a>

                              <a
                                data-w-id="e4cacf2e-5d38-4548-b099-9b308486af99"
                                href="#"
                                className="imessage-bubble-2nd auto-16 w-inline-block"
                                style={{ opacity: 0 }}
                              >
                                <div className="imessage-text">
                                  i&apos;ll hit you back as soon as i can 💬
                                </div>
                                <img
                                  src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5e31287ee5b38783fa890_imessage-tail.svg"
                                  loading="lazy"
                                  alt=""
                                  className="imessage-tail"
                                />
                              </a>

                              <a
                                data-w-id="e4cacf2e-5d38-4548-b099-9b308486af9d"
                                href="#"
                                className="imessage-bubble-2nd auto-17 w-inline-block"
                                style={{ opacity: 0 }}
                              >
                                <div className="imessage-text">talk soon ✨</div>
                                <img
                                  src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5e31287ee5b38783fa890_imessage-tail.svg"
                                  loading="lazy"
                                  alt=""
                                  className="imessage-tail"
                                />
                              </a>

                              <a
                                data-w-id="e4cacf2e-5d38-4548-b099-9b308486afa1"
                                href="#"
                                className="imessage-typing-absolute-9 w-inline-block"
                                style={{ opacity: 0 }}
                              >
                                <img
                                  src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5e31287ee5b38783fa890_imessage-tail.svg"
                                  loading="lazy"
                                  alt=""
                                  className="imessage-tail"
                                />
                                <div className="imessage-dots-div">
                                  <div
                                    className="typing-dot-1"
                                    style={{
                                      backgroundColor: "rgb(186, 186, 187)",
                                      willChange: "background",
                                    }}
                                  />
                                  <div
                                    className="typing-dot-2"
                                    style={{
                                      backgroundColor: "rgb(164, 164, 167)",
                                      willChange: "background",
                                    }}
                                  />
                                  <div
                                    className="typing-dot-3"
                                    style={{
                                      backgroundColor: "rgb(192, 192, 192)",
                                      willChange: "background",
                                    }}
                                  />
                                </div>
                              </a>

                              <a
                                data-w-id="e4cacf2e-5d38-4548-b099-9b308486afa7"
                                href="#"
                                className="imessage-typing-absolute-2-5 w-inline-block"
                                style={{ opacity: 0 }}
                              >
                                <img
                                  src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5e31287ee5b38783fa890_imessage-tail.svg"
                                  loading="lazy"
                                  alt=""
                                  className="imessage-tail"
                                />
                                <div className="imessage-dots-div">
                                  <div
                                    className="typing-dot-1"
                                    style={{
                                      backgroundColor: "rgb(186, 186, 187)",
                                      willChange: "background",
                                    }}
                                  />
                                  <div
                                    className="typing-dot-2"
                                    style={{
                                      backgroundColor: "rgb(164, 164, 167)",
                                      willChange: "background",
                                    }}
                                  />
                                  <div
                                    className="typing-dot-3"
                                    style={{
                                      backgroundColor: "rgb(192, 192, 192)",
                                      willChange: "background",
                                    }}
                                  />
                                </div>
                              </a>

                              <a
                                data-w-id="e4cacf2e-5d38-4548-b099-9b308486afad"
                                href="#"
                                className="imessage-typing-absolute-10 w-inline-block"
                                style={{ opacity: 0 }}
                              >
                                <img
                                  src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5e31287ee5b38783fa890_imessage-tail.svg"
                                  loading="lazy"
                                  alt=""
                                  className="imessage-tail"
                                />
                                <div className="imessage-dots-div">
                                  <div
                                    className="typing-dot-1"
                                    style={{
                                      backgroundColor: "rgb(186, 186, 187)",
                                      willChange: "background",
                                    }}
                                  />
                                  <div
                                    className="typing-dot-2"
                                    style={{
                                      backgroundColor: "rgb(164, 164, 167)",
                                      willChange: "background",
                                    }}
                                  />
                                  <div
                                    className="typing-dot-3"
                                    style={{
                                      backgroundColor: "rgb(192, 192, 192)",
                                      willChange: "background",
                                    }}
                                  />
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>

                    <div
                      className="w-form-done"
                      tabIndex={-1}
                      role="region"
                      aria-label="Email Form success"
                    >
                      <div>Thank you! Your submission has been received!</div>
                    </div>

                    <div
                      className="w-form-fail"
                      tabIndex={-1}
                      role="region"
                      aria-label="Email Form failure"
                    >
                      <div>Oops! Something went wrong while submitting the form.</div>
                    </div>
                  </div>
                </div>
              </div>

              <div data-w-id="e4cacf2e-5d38-4548-b099-9b308486afb9" className="imessage-bottom">
                <a
                  data-w-id="e4cacf2e-5d38-4548-b099-9b308486afba"
                  href="mailto:hi@marco.fyi"
                  className="contact-icon w-inline-block"
                >
                  <img
                    src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5dbe13ef14900c4c5e5f5_email-contact-icon.svg"
                    loading="lazy"
                    alt=""
                    className="contact-icon"
                  />

                  <div
                    className="tooltip-float top"
                    style={{
                      opacity: 0,
                      display: "none",
                      transform:
                        "translate3d(0px, 0px, 0px) scale3d(0.2, 0.2, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div className="tooltip center">
                      <p className="tooltip-text">hi@marco.fyi</p>
                    </div>
                    <img
                      src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/631186cfb4f09ca4b2bb6d53_tooltip-tail.svg"
                      loading="eager"
                      alt=""
                      className="tooltip-arrow bottom"
                    />
                  </div>
                </a>

                <a
                  data-w-id="e4cacf2e-5d38-4548-b099-9b308486afc1"
                  href="https://twitter.com/messages/compose?recipient_id=751196173478850560&amp;text=gm"
                  className="contact-icon twitter w-inline-block"
                >
                  <img
                    src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5dbe10a419234e527d174_twitter-contact-icon.svg"
                    loading="lazy"
                    alt=""
                  />

                  <div
                    className="tooltip-float-twitter top"
                    style={{
                      opacity: 0,
                      display: "none",
                      transform:
                        "translate3d(0px, 0px, 0px) scale3d(0.2, 0.2, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div className="tooltip center">
                      <p className="tooltip-text">@marcofyi</p>
                    </div>
                    <img
                      src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/631186cfb4f09ca4b2bb6d53_tooltip-tail.svg"
                      loading="eager"
                      alt=""
                      className="tooltip-arrow bottom"
                    />
                  </div>
                </a>

                <div className="imessage-form w-form">
                  <form
                    id="wf-form-iMessage-Form"
                    name="wf-form-iMessage-Form"
                    data-name="iMessage Form"
                    method="get"
                    className="form"
                    data-wf-page-id="651eac915e1d6043d4229b69"
                    data-wf-element-id="e4cacf2e-5d38-4548-b099-9b308486afc9"
                    aria-label="iMessage Form"
                  >
                    <div
                      data-w-id="e4cacf2e-5d38-4548-b099-9b308486afca"
                      className="imessage-name"
                      style={{ opacity: 0.5 }}
                    >
                      <div
                        data-w-id="e4cacf2e-5d38-4548-b099-9b308486afcb"
                        className="field-blocker-intro"
                        style={{ display: "block" }}
                      />
                      <input
                        className="imessage-field w-input"
                        maxLength={30}
                        name="name"
                        data-name="Name"
                        placeholder="iMessage"
                        fs-mirrorinput-element="trigger"
                        type="text"
                        id="intro"
                      />
                      <div className="imessage-send">
                        <img
                          alt=""
                          loading="lazy"
                          src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5dd67764027734d11104e_imessage-send.svg"
                        />
                      </div>
                      <div className="imessage-send-disabled">
                        <img
                          alt=""
                          loading="lazy"
                          src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5dd67364a0987037ba6b8_imessage-send-disabled.svg"
                        />
                      </div>
                      <div
                        id="imessage-name-send"
                        data-w-id="e4cacf2e-5d38-4548-b099-9b308486afd1"
                        className="imessage-name-send"
                      />
                    </div>

                    <div
                      data-w-id="e4cacf2e-5d38-4548-b099-9b308486afd2"
                      className="imessage-subject"
                      style={{ opacity: 0.5 }}
                    >
                      <div className="field-blocker-2" />
                      <input
                        className="imessage-field w-input"
                        maxLength={256}
                        name="Subject"
                        data-name="Subject"
                        placeholder="iMessage"
                        fs-mirrorinput-element="trigger-2"
                        type="text"
                        id="Subject"
                      />
                      <div className="imessage-send">
                        <img
                          alt=""
                          loading="lazy"
                          src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5dd67764027734d11104e_imessage-send.svg"
                        />
                      </div>
                      <div className="imessage-send-disabled">
                        <img
                          alt=""
                          loading="lazy"
                          src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5dd67364a0987037ba6b8_imessage-send-disabled.svg"
                        />
                      </div>
                      <div
                        id="imessage-subject-send"
                        data-w-id="e4cacf2e-5d38-4548-b099-9b308486afd9"
                        className="imessage-subject-send"
                      />
                    </div>

                    <div
                      data-w-id="e4cacf2e-5d38-4548-b099-9b308486afda"
                      className="imessage-phone"
                      style={{ opacity: 0.5 }}
                    >
                      <div className="field-blocker-3" />
                      <input
                        className="imessage-field w-input"
                        maxLength={256}
                        name="Phone"
                        data-name="Phone"
                        placeholder="iMessage"
                        fs-mirrorinput-element="trigger-3"
                        type="text"
                        id="Phone"
                      />
                      <div className="imessage-send">
                        <img
                          alt=""
                          loading="lazy"
                          src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5dd67764027734d11104e_imessage-send.svg"
                        />
                      </div>
                      <div className="imessage-send-disabled">
                        <img
                          alt=""
                          loading="lazy"
                          src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5dd67364a0987037ba6b8_imessage-send-disabled.svg"
                        />
                      </div>
                      <div
                        id="imessage-phone-send"
                        data-w-id="e4cacf2e-5d38-4548-b099-9b308486afe1"
                        className="imessage-phone-send"
                      />
                    </div>

                    <div
                      data-w-id="e4cacf2e-5d38-4548-b099-9b308486afe2"
                      className="imessage-email"
                      style={{ display: "none", opacity: 0.5 }}
                    >
                      <div className="field-blocker-4" />
                      <input
                        className="imessage-field w-input"
                        maxLength={256}
                        name="Email"
                        data-name="Email"
                        placeholder="iMessage"
                        fs-mirrorinput-element="trigger-4"
                        type="text"
                        id="Email"
                      />
                      <div className="imessage-send">
                        <img
                          alt=""
                          loading="lazy"
                          src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5dd67764027734d11104e_imessage-send.svg"
                        />
                      </div>
                      <div className="imessage-send-disabled">
                        <img
                          alt=""
                          loading="lazy"
                          src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5dd67364a0987037ba6b8_imessage-send-disabled.svg"
                        />
                      </div>
                      <div
                        id="imessage-email-send"
                        data-w-id="e4cacf2e-5d38-4548-b099-9b308486afe9"
                        className="imessage-email-send"
                      />
                    </div>

                    <div
                      data-w-id="e4cacf2e-5d38-4548-b099-9b308486afea"
                      className="imessage-extra"
                      style={{ opacity: 0.5 }}
                    >
                      <div className="field-blocker-5" />
                      <input
                        className="imessage-field w-input"
                        maxLength={256}
                        name="Extra"
                        data-name="Extra"
                        placeholder="iMessage"
                        fs-mirrorinput-element="trigger-5"
                        type="text"
                        id="Extra"
                      />
                      <div className="imessage-send">
                        <img
                          alt=""
                          loading="lazy"
                          src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5dd67764027734d11104e_imessage-send.svg"
                        />
                      </div>
                      <div className="imessage-send-disabled">
                        <img
                          alt=""
                          loading="lazy"
                          src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5dd67364a0987037ba6b8_imessage-send-disabled.svg"
                        />
                      </div>
                      <input
                        id="imessage-extra-send"
                        type="submit"
                        data-wait="Please wait..."
                        data-w-id="e4cacf2e-5d38-4548-b099-9b308486aff1"
                        className="imessage-extra-send w-button"
                        value=""
                      />
                    </div>
                  </form>

                  <div
                    className="name-success w-form-done"
                    tabIndex={-1}
                    role="region"
                    aria-label="iMessage Form success"
                  >
                    <div className="imessage-success-text">Your iMessage was sent.</div>
                    <div
                      data-w-id="e4cacf2e-5d38-4548-b099-9b308486aff5"
                      className="imessage-submitted"
                      style={{ display: "none" }}
                    >
                      <div className="imessage-send-success">
                        <img
                          alt=""
                          loading="lazy"
                          src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f99a5e4d32ee0d97b21665_imessage-sent-icon.svg"
                          className="imessage-success-check"
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className="imessage-error w-form-fail"
                    tabIndex={-1}
                    role="region"
                    aria-label="iMessage Form failure"
                  >
                    <div className="imessage-error-text">
                      Not Delivered (Something went wrong)
                    </div>
                  </div>
                </div>
              </div>

              <div className="imessage-hover-blocker" style={{ display: "none" }} />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
