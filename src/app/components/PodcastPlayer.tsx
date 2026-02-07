'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export function PodcastPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(2186); // 36:26 in seconds
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Format time as MM:SS
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Listen for other audio sources playing and pause this one
    useEffect(() => {
        const handleOtherAudio = (e: Event) => {
            const customEvent = e as CustomEvent;
            if (customEvent.detail?.source !== 'podcast' && audioRef.current && isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        };

        window.addEventListener('audio-play', handleOtherAudio);
        return () => window.removeEventListener('audio-play', handleOtherAudio);
    }, [isPlaying]);

    // Handle play/pause
    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                // Notify other players to stop
                window.dispatchEvent(new CustomEvent('audio-play', { detail: { source: 'podcast' } }));
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Handle volume toggle
    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    // Update progress
    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    // Handle progress bar click
    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (audioRef.current) {
            const rect = e.currentTarget.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            const newTime = percent * duration;
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    // Set duration when metadata loads
    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const progressPercent = (currentTime / duration) * 100;

    return (
        <div
            id="w-node-_6c8a77c8-e695-9470-df4c-56e39795c819-d4229b69"
            className="tile sm podcast about"
        >
            <div
                tmplayer-init="true"
                className={`sp-track-wrapper ${isPlaying ? 'is-playing' : 'is-paused'}`}
            >
                <div className="sp-track">
                    <div className="sp-details-wrapper">
                        <div className="player-top-flex">
                            <div className="player-info-div">
                                <img
                                    src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/63101d0eff915ba7e427e79a_visual-dev-fm.webp"
                                    loading="lazy"
                                    sizes="(max-width: 800px) 100vw, 800px"
                                    srcSet="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/63101d0eff915ba7e427e79a_visual-dev-fm-p-500.webp 500w, https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/63101d0eff915ba7e427e79a_visual-dev-fm-p-800.webp 800w, https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/63101d0eff915ba7e427e79a_visual-dev-fm.webp 800w"
                                    alt=""
                                    className="album-cover"
                                />
                            </div>
                            <div className="small-app-icon-div">
                                <a
                                    href="https://podcasts.apple.com/us/podcast/the-visual-developers-podcast/id1481008550?i=1000465389414"
                                    className="app-icon-link w-inline-block"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/630d83ad134c38403da8c8d3_podcasts-icon-min.png"
                                        loading="lazy"
                                        alt=""
                                        className="small-tile-icon-hover"
                                    />
                                </a>
                                <div
                                    className="small-app-podcast-background"
                                    style={{
                                        transform: `translate3d(0px, 0px, 0px) scale3d(${isPlaying ? '14, 14' : '1, 1'}, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`,
                                        transformStyle: 'preserve-3d',
                                        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                                    }}
                                />
                            </div>
                        </div>
                        <div className="sp-title-wrapper">
                            <div className="album-name-div">
                                <div
                                    className="album-name-2"
                                    style={{
                                        color: isPlaying ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)',
                                        transition: 'color 0.3s ease'
                                    }}
                                >
                                    Career as a Visual Developer?
                                </div>
                            </div>
                            <div
                                className="artist-name-2"
                                style={{
                                    color: isPlaying ? 'rgba(255, 255, 255, 0.8)' : 'rgb(0, 0, 0)',
                                    transition: 'color 0.3s ease'
                                }}
                            >
                                The Visual Developers Podcast
                            </div>
                        </div>
                    </div>

                    <div
                        className="media-player-2"
                        style={{
                            backgroundColor: isPlaying ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0)',
                            transition: 'background-color 0.3s ease'
                        }}
                    >
                        <a
                            href="https://podcasts.apple.com/us/podcast/the-visual-developers-podcast/id1481008550?i=1000465389414"
                            className="library-div w-inline-block"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62ca1d5ec50496da5cb597a7_playlist-icon.svg"
                                loading="lazy"
                                alt=""
                                className="library-icon-2"
                                style={{
                                    opacity: isPlaying ? 0 : 1,
                                    transition: 'opacity 0.3s ease'
                                }}
                            />
                            <img
                                src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62fabd36c914a12ffb85f7a0_Library.svg"
                                loading="lazy"
                                alt=""
                                className="library-icon-hover-2"
                                style={{
                                    opacity: isPlaying ? 1 : 0,
                                    transition: 'opacity 0.3s ease'
                                }}
                            />
                        </a>

                        <div className="previous-next-div">
                            <img
                                src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62fac3ad2ab1e7e474b27d3a_Rewind.svg"
                                loading="lazy"
                                alt=""
                                className="sp-previous"
                                style={{
                                    opacity: isPlaying ? 0 : 1,
                                    transition: 'opacity 0.3s ease'
                                }}
                            />
                            <img
                                src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62fabd363c443cedb5f77703_Rewind.svg"
                                loading="lazy"
                                alt=""
                                className="sp-previous-hover"
                                style={{
                                    opacity: isPlaying ? 1 : 0,
                                    transition: 'opacity 0.3s ease'
                                }}
                            />
                        </div>

                        <div className="play-pause-div" onClick={togglePlay} style={{ cursor: 'pointer' }}>
                            <img
                                src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62fabd366b970a019c1aae02_play-icon-1.svg"
                                loading="lazy"
                                alt=""
                                className="sp-play"
                                style={{
                                    opacity: isPlaying ? 0 : 1,
                                    display: isPlaying ? 'none' : 'block',
                                    transition: 'opacity 0.3s ease'
                                }}
                            />
                            <img
                                src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62ca1d5e7c26b54ee0453ea4_Pause.svg"
                                loading="lazy"
                                alt=""
                                className="sp-pause"
                                style={{
                                    display: isPlaying ? 'block' : 'none',
                                    transition: 'opacity 0.3s ease'
                                }}
                            />
                            <img
                                src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62fabd372363180d2847d568_play-icon.svg"
                                loading="lazy"
                                alt=""
                                className="mp-play-hover-2"
                                style={{
                                    opacity: isPlaying ? 0 : 1,
                                    transition: 'opacity 0.3s ease'
                                }}
                            />
                            <img
                                src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62fabd36dcf1510d6a51548b_Pause.svg"
                                loading="lazy"
                                alt=""
                                className="mp-pause-hover-2"
                                style={{
                                    opacity: isPlaying ? 1 : 0,
                                    transition: 'opacity 0.3s ease'
                                }}
                            />
                        </div>

                        <div className="previous-next-div">
                            <img
                                src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62fac3ad3c443c4ef6f7c040_Fast%20Fwd.svg"
                                loading="lazy"
                                alt=""
                                className="sp-next"
                                style={{
                                    opacity: isPlaying ? 0 : 0.5,
                                    transition: 'opacity 0.3s ease'
                                }}
                            />
                            <img
                                src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62fabd366d18229be480dbe4_Fast%20Fwd.svg"
                                loading="lazy"
                                alt=""
                                className="sp-next-hover"
                                style={{
                                    opacity: isPlaying ? 0.5 : 0,
                                    transition: 'opacity 0.3s ease'
                                }}
                            />
                        </div>

                        <div className="volume-div" onClick={toggleMute} style={{ cursor: 'pointer' }}>
                            <img
                                src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62fabd366b970a37931aae07_volume-on-dark.svg"
                                loading="lazy"
                                alt=""
                                className="player-icon-volume-2"
                                style={{
                                    opacity: isPlaying && !isMuted ? 0 : 1,
                                    display: isMuted ? 'none' : 'block',
                                    transition: 'opacity 0.3s ease'
                                }}
                            />
                            <img
                                src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62fabd361b44f78409545b88_volume-on-white.svg"
                                loading="lazy"
                                alt=""
                                className="player-icon-volume-hover-2"
                                style={{
                                    opacity: isPlaying && !isMuted ? 1 : 0,
                                    transition: 'opacity 0.3s ease'
                                }}
                            />
                            <img
                                src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62fabd36e5a13afbdde3b4f0_volume-off-dark.svg"
                                loading="lazy"
                                alt=""
                                className="player-icon-mute-2"
                                style={{
                                    display: isMuted ? 'block' : 'none',
                                    opacity: isPlaying ? 0 : 1,
                                    transition: 'opacity 0.3s ease'
                                }}
                            />
                            <img
                                src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62fabd3648a4573ca08d4b75_volume-off-white.svg"
                                loading="lazy"
                                alt=""
                                className="player-icon-mute-hover-2"
                                style={{
                                    opacity: isPlaying && isMuted ? 1 : 0,
                                    transition: 'opacity 0.3s ease'
                                }}
                            />
                        </div>
                    </div>

                    {/* Hidden Audio Element */}
                    <audio
                        ref={audioRef}
                        src="https://www.dropbox.com/s/322p5f69svg93hi/visual-dev-fm.mp3?raw=1"
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onEnded={() => setIsPlaying(false)}
                    />
                </div>
            </div>
        </div>
    );
}
