'use client';

import { MusicPlayer } from './MusicPlayer';
import { PhotoCarousel } from './PhotoCarousel';

export function GridCards() {
  return (
    <div className="container home">
      <div className="grid-top-bar">
        <div className="view-controls-div">
          <img src="/images/arrow.svg" loading="lazy" alt="" className="list-icon" />
          <div className="caption-text-w-icon">Look around...</div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        {/* Intro/Bio Card */}
        <div className="col-span-6 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative min-h-[25rem] flex flex-col">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 inline">Arpit Singh Ahluwalia</h2>
            <span className="text-2xl text-gray-400"> – UX Designer and Strategist. Currently, learning at Parsons.</span>
          </div>

          <hr className="my-6 border-gray-200" />

          <div className="space-y-5 text-gray-500 text-base leading-relaxed">
            <p>I'm a UX Designer and Strategist with 4+ years of experience at companies like ZoomInfo and Johnson & Johnson.</p>

            <p>I thrive on figuring out the messy middle through research, translating discoveries into designs that actually work for people. I think strategically but execute quickly, always co-designing with real users along the process.</p>

            <p>When I'm not designing, I'm gaming, making music, or (now) vibe-coding. I'm looking for opportunities to collaborate with people who value thoughtful, human-centered work.</p>
          </div>
        </div>

        {/* Arrive Logo Card */}
        <div className="grid-card col-span-6 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative min-h-[25rem] flex items-center justify-center overflow-hidden group cursor-pointer">
          <img src="/images/arrive-logo.png" alt="Arrive" className="w-48" />

          {/* Sublabels that slide up on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-3">
              <span className="px-4 py-2 bg-gray-100 rounded-xl text-sm text-gray-500 w-fit">Defining the future of mobility solutions</span>
              <div className="flex gap-2">
                <span className="px-4 py-2 bg-gray-100 rounded-xl text-sm text-gray-500">UX Researcher</span>
                <span className="px-4 py-2 bg-gray-100 rounded-xl text-sm text-gray-500">Contract</span>
              </div>
            </div>
          </div>
        </div>

        {/* ZoomInfo Logo Card */}
        <div className="grid-card col-span-6 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative min-h-[25rem] flex items-center justify-center overflow-hidden group cursor-pointer">
          <img src="/images/zoominfo-logo.png" alt="ZoomInfo" className="w-64" />

          {/* Sublabels that slide up on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-3">
              <span className="px-4 py-2 bg-gray-100 rounded-xl text-sm text-gray-500 w-fit">Redesigned how sales & marketing teams hit their number worldwide</span>
              <div className="flex gap-2">
                <span className="px-4 py-2 bg-gray-100 rounded-xl text-sm text-gray-500">UX/UI Designer</span>
                <span className="px-4 py-2 bg-gray-100 rounded-xl text-sm text-gray-500">Full-Time</span>
              </div>
            </div>
          </div>
        </div>

        {/* Johnson & Johnson Logo Card */}
        <div className="grid-card col-span-6 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative min-h-[25rem] flex items-center justify-center overflow-hidden group cursor-pointer">
          <img src="/images/jnj-logo.png" alt="Johnson & Johnson" className="w-80" />

          {/* Sublabels that slide up on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-3">
              <span className="px-4 py-2 bg-gray-100 rounded-xl text-sm text-gray-500 w-fit">Designed JnJ's 2021 Healthy for Humanity & DEI Reports</span>
              <div className="flex gap-2">
                <span className="px-4 py-2 bg-gray-100 rounded-xl text-sm text-gray-500">UI Designer</span>
                <span className="px-4 py-2 bg-gray-100 rounded-xl text-sm text-gray-500">Contract</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mount Sinai Card - Now narrower */}
        <div className="grid-card col-span-3 bg-white rounded-3xl pt-8 px-4 pb-0 shadow-sm border border-gray-100 relative min-h-[20rem] flex flex-col items-center overflow-hidden cursor-pointer">
          {/* Logo */}
          <img src="/images/mount-sinai-logo.png" alt="Mount Sinai" className="w-10 mb-1" />

          {/* Title */}
          <h2 className="text-xl font-black text-gray-900 tracking-tight mb-0">MOUNT SINAI</h2>
          <p className="text-xs text-[#00b4b4] tracking-tight font-medium mb-2">Incident Reporting App</p>

          {/* Phone Mockup Image - extends past bottom */}
          <img src="/images/mount-sinai-mockup.png" alt="Mount Sinai App" className="w-60 rounded-t-[2rem] shadow-2xl mt-4 -mb-24" />
        </div>

        {/* Two stacked placeholder divs */}
        <div className="col-span-3 flex flex-col gap-4">
          {/* Microsoft Card - Variant 2 (Logo with hover sublabels) */}
          <div className="grid-card flex-1 basis-1/2 bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer relative group flex items-center justify-center">
            {/* Centered Logo */}
            <img src="/images/microsoft-full-logo.png" alt="Microsoft" className="w-32" />

            {/* Sublabels that slide up on hover */}
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
              <div className="flex flex-col gap-2">
                <span className="px-3 py-1.5 bg-gray-100 rounded-xl text-xs text-gray-500 w-fit">Collab on the future of education with Microsoft's Inclusive Design Team</span>
                <div className="flex gap-2">
                  <span className="px-3 py-1.5 bg-gray-100 rounded-xl text-xs text-gray-500">Research & Strategy</span>
                  <span className="px-3 py-1.5 bg-gray-100 rounded-xl text-xs text-gray-500">Collab</span>
                </div>
              </div>
            </div>
          </div>

          {/* Twitter Card - duplicated from About page */}
          <div className="tile-twitter sm twitter about flex-1 basis-1/2">
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
                      <img
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
                      <img
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
                    <img
                      src="/images/arrow-angle.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="arrow-icon"
                      style={{ opacity: 1 }}
                    />
                    <img
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
        </div>

        {/* HYPEX Card */}
        <div className="grid-card col-span-6 bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-500 relative min-h-[20rem] flex items-center justify-center overflow-hidden group cursor-pointer">
          <img src="/images/hypex-mockup.png" alt="HYPEX" className="w-full h-full object-contain" />

          {/* Sublabels that slide up on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-gradient-to-t from-white via-white to-transparent">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-3">
              <span className="px-4 py-2 bg-gray-100 rounded-xl text-sm text-gray-500 w-fit">Led marketing and design efforts for an NFT-based trading game.</span>
              <div className="flex gap-2">
                <span className="px-4 py-2 bg-gray-100 rounded-xl text-sm text-gray-500">UI Designer</span>
                <span className="px-4 py-2 bg-gray-100 rounded-xl text-sm text-gray-500">Contract</span>
              </div>
            </div>
          </div>
        </div>

        {/* Spotify Music Player Card */}
        <div className="col-span-3">
          <MusicPlayer />
        </div>

        {/* Photos Carousel Card */}
        <div className="col-span-3">
          <PhotoCarousel />
        </div>

        {/* Empty placeholder div */}
        <div className="col-span-6"></div>

        {/* Row 2 */}
        {/* Availability Calendar Card */}
        <div className="grid-card col-span-6 bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-500  relative min-h-[25rem]">
          <div className="mb-4">
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">Availability Calendar</div>
            <h3 className="text-xl font-semibold text-gray-900">Monday, Nov 21st</h3>
          </div>

          <div className="mb-4">
            <div className="flex gap-2 text-xs">
              <div className="text-center">
                <div className="text-gray-400">Sun</div>
                <div className="text-gray-900">20</div>
              </div>
              <div className="text-center bg-red-500 text-white rounded-lg px-2 py-1">
                <div>Mon</div>
                <div className="font-bold">21</div>
              </div>
              <div className="text-center bg-red-500 text-white rounded-lg px-2 py-1">
                <div>Tue</div>
                <div className="font-bold">22</div>
              </div>
              <div className="text-center">
                <div className="text-gray-400">Wed</div>
                <div className="text-gray-900">23</div>
              </div>
              <div className="text-center">
                <div className="text-gray-400">Thu</div>
                <div className="text-gray-900">24</div>
              </div>
              <div className="text-center">
                <div className="text-gray-400">Fri</div>
                <div className="text-gray-900">25</div>
              </div>
              <div className="text-center">
                <div className="text-gray-400">Sat</div>
                <div className="text-gray-900">26</div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">Days of the Week</div>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs rounded-full border border-gray-200 hover:bg-gray-50">📅</button>
              <button className="px-3 py-1 text-xs rounded-full border border-gray-200 hover:bg-gray-50">Sun</button>
              <button className="px-3 py-1 text-xs rounded-full border border-gray-200 hover:bg-gray-50">Mon</button>
              <button className="px-3 py-1 text-xs rounded-full border border-gray-200 hover:bg-gray-50">Tue</button>
              <button className="px-3 py-1 text-xs rounded-full border border-gray-200 hover:bg-gray-50">Wed</button>
              <button className="px-3 py-1 text-xs rounded-full border border-gray-200 hover:bg-gray-50">Thu</button>
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">Duration</div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⏱</span>
              <span className="text-xl font-semibold">60 minutes</span>
            </div>
          </div>

          <button className="absolute top-4 right-4 w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </button>
        </div>

        {/* Small Moments BiG JoY Card */}
        <div className="grid-card col-span-12 bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-500  relative flex items-center justify-center min-h-[25rem]">
          <div className="text-center">
            <p className="text-3xl text-gray-400 mb-2">Small Moments</p>
            <h2 className="text-7xl font-black text-gray-300">BiG JoY</h2>
          </div>
          <button className="absolute bottom-4 right-4 w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </button>
        </div>

        {/* Lock Icon Card */}
        <div className="grid-card col-span-6 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-500  relative flex items-center justify-center min-h-[25rem]">
          <svg className="w-32 h-32 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <button className="absolute bottom-4 right-4 w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </button>
        </div>

        {/* 3D Logo Card */}
        <div className="grid-card col-span-6 bg-gradient-to-br from-gray-100 to-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-500  relative flex items-center justify-center min-h-[25rem]">
          <div className="text-9xl font-black text-gray-300 transform rotate-12">
            ⌘E
          </div>
          <button className="absolute bottom-4 right-4 w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
