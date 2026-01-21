'use client';

export function MusicPlayer() {
  return (
    <div id="w-node-_6c8a77c8-e695-9470-df4c-56e39795c572-d4229b69" className="tile sm music about">
      <div className="spotify-embed-wrapper">
        <iframe 
          data-testid="embed-iframe" 
          src="https://open.spotify.com/embed/playlist/1mKoIpQ660c5CSOcDoLOZe?utm_source=generator&theme=0" 
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
