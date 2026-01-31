'use client';

import { useRef, useState } from 'react';

export function MusicPlayer() {
  const [isHovering, setIsHovering] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    // Temporarily disable overlay to let click through to iframe
    if (overlayRef.current) {
      overlayRef.current.style.pointerEvents = 'none';
      setTimeout(() => {
        if (overlayRef.current) {
          overlayRef.current.style.pointerEvents = 'auto';
        }
      }, 100);
    }
  };

  return (
    <div id="w-node-_6c8a77c8-e695-9470-df4c-56e39795c572-d4229b69" className="tile sm music about">
      <div className="spotify-embed-wrapper" style={{ position: 'relative' }}>
        {/* Overlay to capture mouse events for custom cursor */}
        <div
          ref={overlayRef}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={handleClick}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            cursor: 'none',
          }}
        />
        <iframe
          data-testid="embed-iframe"
          src="https://open.spotify.com/embed/artist/3b9yCm5iWBKNIDqq1utESQ?utm_source=generator&theme=0"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify Playlist - Haüs"
        />
      </div>
    </div>
  );
}

