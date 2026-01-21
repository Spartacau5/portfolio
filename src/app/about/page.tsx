import { Header } from '../components/Header';
import { MusicPlayer } from '../components/MusicPlayer';
import { PhotoCarousel } from '../components/PhotoCarousel';
import Image from 'next/image';
import '../styles/photo-carousel.css';

export default function About() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container home">
        <div className="grid-top-bar">
          <div className="view-controls-div">
            <img src="/images/arrow.svg" loading="lazy" alt="" className="list-icon" />
            <div className="caption-text-w-icon">Look around...</div>
          </div>
        </div>
        <div className="w-layout-grid about-grid">
          {/* Left Column - Main Content */}
          <div id="w-node-_6c8a77c8-e695-9470-df4c-56e39795bf33-d4229b69" className="tile xl me about">
            <div className="internal-div">
              <div className="about-me-div">
                <h1 className="display-heading">What I'm <span className="display-emphasis">bout.</span></h1>
                <div className="intro-hr"></div>
                <div className="about-me-block">
                  <h2 className="work-label">WHERE I'M FROM</h2>
                  <div className="display-heading-2-about">
                    I was born and raised in Utica, NY. My Dad worked as a mail carrier for 
                    the Post Office. My Mom worked as a Kindergarten Teacher. Growing up 
                    they repeatedly told me to get off the computer and go outside. The OG 
                    Touch Grass™. I'm glad I did. There's not a ton to do in Utica but there is 
                    a ton to eat and the food is definitely better than where you're from.
                  </div>
                </div>
                <div className="about-me-block">
                  <h2 className="work-label">WHAT I USED TO DO</h2>
                  <div className="display-heading-2-about">
                    When I was 13, I got my first job as a dishwasher at <span className="bg-black text-black">████████</span> [redacted 
                    due to child labor laws]. After that, I made pizzas at a pizzeria, chased 
                    kids around as a security guard at an elementary school, and tried to 
                    sell mattresses I knew nothing about at a furniture store.
                  </div>
                </div>
                <div className="about-me-block">
                  <h2 className="work-label">WHAT I DO NOW</h2>
                  <div className="display-heading-2-about">
                    Today I'm a <span className="font-semibold">Product Designer</span> at{' '}
                    <span className="font-semibold">Figma</span> ↗ designing AI experiences. 
                    Previously, I was the <span className="font-semibold">Founding Product Designer</span> at{' '}
                    <span className="font-semibold">Diagram</span> ↗. Before all of that, I worked as an{' '}
                    <span className="font-semibold">Engineer</span> at{' '}
                    <span className="font-semibold">Romanelli</span> ↗ where I learned how 
                    to code (thanks, <span className="font-semibold">Zac</span> ↗) and how to stop coding (thanks, Webflow).
                  </div>
                </div>
                <div className="about-me-block">
                  <h2 className="work-label">WHERE I'M AT NOW</h2>
                  <div className="display-heading-2-about">
                    Today, I live in San Francisco, California. When I'm not working, you can 
                    usually find me with my dog at the beach, the park, or the redwoods.
                  </div>
                </div>
                <div className="about-me-block">
                  <h2 className="work-label">WHAT I'M LOOKING FOR</h2>
                  <div className="display-heading-2-about">
                    Impactful, purposeful work with a diverse team of talented people. 
                    I also think the personal computer needs its{' '}
                    <span className="font-semibold">iPhone moment</span> ↗.
                  </div>
                </div>
              </div>
              <div className="nav-icons-div">
                <a id="w-node-_6c8a77c8-e695-9470-df4c-56e39795c900-d4229b69" href="#" className="nav-icon w-inline-block">
                  <Image src="/images/imessage-icon.svg" alt="iMessage" width={24} height={24} />
                </a>
                <a id="w-node-_6c8a77c8-e695-9470-df4c-56e39795c901-d4229b69" href="#" className="nav-icon w-inline-block">
                  <Image src="/images/email-contact-icon.svg" alt="Email" width={24} height={24} />
                </a>
                <a id="w-node-_6c8a77c8-e695-9470-df4c-56e39795c902-d4229b69" href="#" className="nav-icon w-inline-block">
                  <Image src="/images/read-cv-icon.svg" alt="Read CV" width={24} height={24} />
                </a>
                <a id="w-node-_6c8a77c8-e695-9470-df4c-56e39795c903-d4229b69" href="#" className="nav-icon w-inline-block">
                  <Image src="/images/twitter-contact-icon.svg" alt="Twitter" width={24} height={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Twitter Card */}
          <div id="twitter" className="tile-twitter sm twitter about w-node-ad3c41ab-6071-5e6c-3932-6d9df03bfcb6-d4229b69">
            <div className="small-app-flex">
              <div className="twtitter-top-div">
                <div className="twitter-top-flex">
                  <a href="https://twitter.com/spartacau5" className="twitter-info-div w-inline-block">
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
                      <div className="twitter-name" style={{color: 'rgb(0, 0, 0)'}}>Arpit Ahluwalia</div>
                      <div className="twitter-handle" style={{color: 'rgb(148, 148, 149)'}}>@spartacau5</div>
                    </div>
                  </a>
                  <div className="small-app-icon-div">
                    <a href="https://twitter.com/spartacau5" className="app-icon-link w-inline-block">
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
                      style={{transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)', transformStyle: 'preserve-3d'}}
                    ></div>
                  </div>
                </div>
                <div className="tweet-div">
                  <div className="twitter-tweet" style={{color: 'rgb(0, 0, 0)'}}>
                    cooking up • prev{' '}
                    <a href="https://x.com/vercel" className="tweet-link" style={{color: 'rgb(21, 133, 199)'}}>@vercel</a>{' '}
                    <a href="https://x.com/v0" className="tweet-link" style={{color: 'rgb(21, 133, 199)'}}>@v0</a>{' '}
                    <a href="https://twitter.com/figma" className="tweet-link" style={{color: 'rgb(21, 133, 199)'}}>@figma</a>{' '}
                    <a href="https://twitter.com/diagram" className="tweet-link" style={{color: 'rgb(21, 133, 199)'}}>@diagram</a>
                  </div>
                </div>
              </div>
              <a 
                id="twitter-button" 
                data-w-id="ad3c41ab-6071-5e6c-3932-6d9df03bfcd4" 
                href="https://twitter.com/spartacau5" 
                className="twitter-button w-inline-block" 
                style={{borderColor: 'rgb(222, 222, 224)', backgroundColor: 'rgba(0, 0, 0, 0)'}}
              >
                <div className="inner-button-flex">
                  <div className="button-text" style={{color: 'rgb(0, 0, 0)'}}>Read mid tweets</div>
                  <div className="arrow-icon-div">
                    <Image 
                      src="/images/arrow-angle.svg" 
                      alt="" 
                      width={16}
                      height={16}
                      className="arrow-icon" 
                      style={{opacity: 1}}
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
          <div id="w-node-_6c8a77c8-e695-9470-df4c-56e39795c819-d4229b69" className="tile sm podcast about">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 shadow-sm border border-gray-100 aspect-square flex flex-col">
            <div className="flex flex-col gap-3 mb-3">
              <div className="flex gap-3">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2a10 10 0 00-10 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
                  </svg>
                </div>
              </div>
            </div>
            <p className="text-sm font-semibold text-white mt-auto">Latest Episode</p>
            <p className="text-xs text-white/80">Podcast Title</p>
          </div>
          </div>

          {/* Contact Chat Card - Full Width Below */}
          <div id="w-node-e4cacf2e-5d38-4548-b099-9b308486aed2-d4229b69" className="tile sm imessage">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between min-h-[22.5rem] mt-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full"></div>
                <span className="font-medium text-gray-900">Let's connect!</span>
              </div>
              <div className="space-y-3">
                <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-3 max-w-xs">
                  <p className="text-sm text-gray-900">Hey! 👋 Looking for a designer?</p>
                </div>
                <div className="bg-blue-500 text-white rounded-2xl rounded-br-sm p-3 max-w-xs ml-auto">
                  <p className="text-sm">Let's chat about your project!</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <input 
                type="text" 
                placeholder="Send a message..." 
                className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                →
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>
    </main>
  );
}
