'use client';

import { useEffect, useRef, useCallback } from 'react';

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (IFrameAPI: SpotifyIFrameAPI) => void;
    _spotifyIframeAPIReady?: boolean;
    _spotifyIframeAPI?: SpotifyIFrameAPI;
  }
}

interface SpotifyIFrameAPI {
  createController: (
    element: HTMLElement,
    options: Record<string, unknown>,
    callback: (controller: SpotifyEmbedController) => void
  ) => void;
}

interface SpotifyEmbedController {
  addListener: (event: string, callback: (data: Record<string, unknown>) => void) => void;
  togglePlay: () => void;
  pause: () => void;
  resume: () => void;
  destroy: () => void;
}

export function MusicPlayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<SpotifyEmbedController | null>(null);
  const initializedRef = useRef(false);
  const suppressRef = useRef(false);
  const spotifyPlayingRef = useRef(false);
  const lastDispatchRef = useRef(0);

  const initController = useCallback((IFrameAPI: SpotifyIFrameAPI) => {
    if (!containerRef.current || initializedRef.current) return;
    initializedRef.current = true;

    IFrameAPI.createController(
      containerRef.current,
      {
        uri: 'spotify:artist:3b9yCm5iWBKNIDqq1utESQ',
      },
      (controller: SpotifyEmbedController) => {
        controllerRef.current = controller;

        controller.addListener('playback_update', (e: Record<string, unknown>) => {
          // Spotify IFrame API nests playback data under e.data
          const playbackData = (e.data || e) as Record<string, unknown>;
          const isPaused = playbackData.isPaused as boolean;
          const wasPlaying = spotifyPlayingRef.current;
          spotifyPlayingRef.current = !isPaused;

          // Fire event when Spotify transitions from paused to playing
          const now = Date.now();
          if (!isPaused && !wasPlaying && !suppressRef.current && now - lastDispatchRef.current > 500) {
            lastDispatchRef.current = now;
            window.dispatchEvent(new CustomEvent('audio-play', { detail: { source: 'spotify' } }));
          }
        });
      }
    );
  }, []);

  useEffect(() => {
    const handleOtherAudio = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.source !== 'spotify' && controllerRef.current && spotifyPlayingRef.current) {
        // Suppress events while we programmatically pause
        suppressRef.current = true;
        controllerRef.current.togglePlay();
        setTimeout(() => { suppressRef.current = false; }, 1000);
      }
    };

    window.addEventListener('audio-play', handleOtherAudio);

    // Load Spotify IFrame API
    if (window._spotifyIframeAPIReady && window._spotifyIframeAPI) {
      initController(window._spotifyIframeAPI);
    } else {
      window.onSpotifyIframeApiReady = (IFrameAPI: SpotifyIFrameAPI) => {
        window._spotifyIframeAPIReady = true;
        window._spotifyIframeAPI = IFrameAPI;
        initController(IFrameAPI);
      };

      if (!document.querySelector('script[src*="spotify.com/embed/iframe-api"]')) {
        const script = document.createElement('script');
        script.src = 'https://open.spotify.com/embed/iframe-api/v1';
        script.async = true;
        document.body.appendChild(script);
      }
    }

    return () => {
      window.removeEventListener('audio-play', handleOtherAudio);
    };
  }, [initController]);

  return (
    <div id="w-node-_6c8a77c8-e695-9470-df4c-56e39795c572-d4229b69" className="tile sm music about">
      <div className="spotify-embed-wrapper">
        <div ref={containerRef} id="spotify-embed" />
      </div>
    </div>
  );
}
