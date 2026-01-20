'use client';

import { useState } from 'react';
import Image from 'next/image';

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    
    if (!isPlaying) {
      // Open Spotify track in new window when play is clicked
      window.open('https://open.spotify.com/track/44GTgJNoUhktf6BnRiFqD2?si=6319ce164ce34c17', '_blank');
    }
  };

  return (
    <div id="w-node-_6c8a77c8-e695-9470-df4c-56e39795c572-d4229b69" className={`tile sm music about ${isPlaying ? 'is-playing' : ''}`}>
      <div className="mp-track-wrapper">
        <div tmplayer-init="multitrack" className={`mp-track ${isPlaying ? 'is-playing' : 'is-paused'}`}>
          <div className="sp-details-wrapper">
            <div className="player-top-flex">
              <div className="player-info-div">
                <img 
                  src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62ec56d6df1bb8be2bf4a959_Blonde.jpg" 
                  loading="lazy" 
                  tmplayer-element="thumbnail" 
                  alt="" 
                  className={`album-cover ${isPlaying ? 'is-playing' : 'is-paused'}`} 
                  tmplayer-interaction="monitor-state" 
                />
              </div>
              <div className="small-app-icon-div">
                <a href="https://music.apple.com/us/playlist/marcooo-xyz/pl.u-WabZ6WVsWN6K7G" className="app-icon-link w-inline-block">
                  <img 
                    src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62faba206b970a047b1a7e18_apple-music-icon.png" 
                    loading="lazy" 
                    alt="" 
                    className="small-tile-icon-hover" 
                  />
                </a>
                <div 
                  className="small-app-music-background" 
                  style={{transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)', transformStyle: 'preserve-3d'}}
                ></div>
              </div>
            </div>
            <div className="sp-title-wrapper">
              <div className="album-name-div">
                <div 
                  tmplayer-element="title" 
                  className={`album-name ${isPlaying ? 'is-playing' : 'is-paused'}`} 
                  tmplayer-interaction="monitor-state" 
                  style={{color: 'rgb(0, 0, 0)'}}
                >
                  Nights
                </div>
                <div className="explicit-icon-div">
                  <img 
                    src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62fac7cc48a45764308dd489_explicit-icon-dark.svg" 
                    loading="lazy" 
                    alt="" 
                    className="explicit-icon" 
                    style={{opacity: 1}} 
                  />
                  <img 
                    src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62fac888e94ccd33de6baf15_explicit-icon-white.svg" 
                    loading="lazy" 
                    alt="" 
                    className="explicit-icon-hover" 
                    style={{opacity: 0}} 
                  />
                </div>
              </div>
              <div 
                tmplayer-element="artist" 
                className={`artist-name ${isPlaying ? 'is-playing' : 'is-paused'}`} 
                tmplayer-interaction="monitor-state" 
                style={{color: 'rgb(114, 114, 114)'}}
              >
                Frank Ocean — Blonde
              </div>
            </div>
          </div>
          <div className="media-player" style={{backgroundColor: 'rgba(0, 0, 0, 0)'}}>
            <a href="https://music.apple.com/us/playlist/marco-fyi/pl.u-WabZ6WVsWN6K7G" className="library-div w-inline-block">
              <img 
                src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62ca1d5ec50496da5cb597a7_playlist-icon.svg" 
                loading="lazy" 
                alt="" 
                className="library-icon" 
                style={{opacity: 1}} 
              />
              <img 
                src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62fabd36c914a12ffb85f7a0_Library.svg" 
                loading="lazy" 
                style={{opacity: 0}} 
                alt="" 
                className="library-icon-hover" 
              />
            </a>
            <div className="previous-next-div">
              <img 
                src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62fac3ad2ab1e7e474b27d3a_Rewind.svg" 
                loading="lazy" 
                data-w-id="6c8a77c8-e695-9470-df4c-56e39795c58b" 
                tmplayer-button="previous" 
                alt="" 
                className="mp-previous" 
                style={{opacity: 1}} 
              />
              <img 
                src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62fabd363c443cedb5f77703_Rewind.svg" 
                loading="lazy" 
                style={{opacity: 0}} 
                tmplayer-button="previous" 
                alt="" 
                className="mp-previous-hover" 
              />
            </div>
            <div className="play-pause-div" onClick={togglePlay}>
              <img 
                src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62ca1d5e7c26b54ee0453ea4_Pause.svg" 
                loading="lazy" 
                data-w-id="6c8a77c8-e695-9470-df4c-56e39795c58e" 
                tmplayer-button="pause" 
                alt="" 
                className="mp-pause" 
                style={{opacity: isPlaying ? 1 : 0, display: isPlaying ? 'block' : 'none'}} 
              />
              <img 
                src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62fabd36dcf1510d6a51548b_Pause.svg" 
                loading="lazy" 
                style={{opacity: 0, display: 'none'}} 
                alt="" 
                className="mp-pause-hover" 
              />
              <img 
                src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62fabd366b970a019c1aae02_play-icon-1.svg" 
                loading="lazy" 
                data-w-id="6c8a77c8-e695-9470-df4c-56e39795c590" 
                tmplayer-button="play" 
                alt="" 
                className="mp-play" 
                style={{opacity: isPlaying ? 0 : 1, display: isPlaying ? 'none' : 'block'}} 
              />
              <img 
                src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62fabd372363180d2847d568_play-icon.svg" 
                loading="lazy" 
                style={{opacity: 0, display: 'block'}} 
                alt="" 
                className="mp-play-hover" 
              />
            </div>
            <div className="previous-next-div">
              <img 
                src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62fac3ad3c443c4ef6f7c040_Fast%20Fwd.svg" 
                loading="lazy" 
                data-w-id="6c8a77c8-e695-9470-df4c-56e39795c593" 
                tmplayer-button="next" 
                alt="" 
                className="mp-next" 
                style={{opacity: 1}} 
              />
              <div className="skip-blocker" style={{display: 'none'}}></div>
              <img 
                src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62fabd366d18229be480dbe4_Fast%20Fwd.svg" 
                loading="lazy" 
                style={{opacity: 0}} 
                alt="" 
                className="mp-next-hover" 
              />
            </div>
            <div className="volume-div">
              <img 
                src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62fabd366b970a37931aae07_volume-on-dark.svg" 
                loading="lazy" 
                data-w-id="6c8a77c8-e695-9470-df4c-56e39795c597" 
                tmplayer-button="volume-full" 
                alt="" 
                className="player-icon-volume" 
                style={{opacity: 1}} 
              />
              <img 
                src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62fabd361b44f78409545b88_volume-on-white.svg" 
                loading="lazy" 
                style={{opacity: 0}} 
                alt="" 
                className="player-icon-volume-hover" 
              />
              <img 
                src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62fabd36e5a13afbdde3b4f0_volume-off-dark.svg" 
                loading="lazy" 
                data-w-id="6c8a77c8-e695-9470-df4c-56e39795c599" 
                tmplayer-button="volume-mute" 
                alt="" 
                className="player-icon-mute" 
                style={{display: 'none', opacity: 1}} 
              />
              <img 
                src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62fabd3648a4573ca08d4b75_volume-off-white.svg" 
                loading="lazy" 
                style={{opacity: 0}} 
                alt="" 
                className="player-icon-mute-hover" 
              />
            </div>
            <div className="mp-media-player-bar-wrapper">
              <div tmplayer-element="elapsed" className="mp-elapsed">0:00</div>
              <div tmplayer-element="progress-bar-wrapper" className="mp-progress-bar-wrapper">
                <div className="mp-progress-bar-background">
                  <div tmplayer-element="progress-bar" className="progress-bar-2" style={{width: '0%'}}>
                    <div data-w-id="6c8a77c8-e695-9470-df4c-56e39795c5a1" className="true-progress-head"></div>
                  </div>
                </div>
              </div>
              <div tmplayer-element="duration" className="mp-duration">0:00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
