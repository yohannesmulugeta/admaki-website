'use client';

import { useEffect, useRef, useState } from 'react';
import type { SocialVideo } from '@/data/portfolio';
import { withBasePath } from '@/lib/siteConfig';

type Props = {
  video: SocialVideo;
  shouldPlay: boolean;
  paused: boolean;
  setPaused: (paused: boolean) => void;
  onPlayingChange?: (playing: boolean) => void;
  onMutedChange?: (muted: boolean) => void;
  className?: string;
};

/** Mounted only for the selected clip; inactive cards never attach an MP4 source. */
export default function CampaignVideoPlayer({
  video, shouldPlay, paused, setPaused, onPlayingChange, onMutedChange,
  className = 'ad-native-video',
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [failure, setFailure] = useState<'blocked' | 'error' | null>(null);

  useEffect(() => { onMutedChange?.(muted); }, [muted, onMutedChange]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let cancelled = false;
    if (shouldPlay) {
      element.play().catch((error: unknown) => {
        if (cancelled || (error instanceof DOMException && error.name === 'AbortError')) return;
        onPlayingChange?.(false);
        setFailure('blocked');
      });
    } else {
      element.pause();
      onPlayingChange?.(false);
    }
    return () => { cancelled = true; };
  }, [shouldPlay, onPlayingChange]);

  const resume = () => {
    const element = ref.current;
    if (!element) return;
    setFailure(null);
    setPaused(false);
    // Keep the play call inside the user's gesture for browsers that block autoplay.
    if (element.error) element.load();
    element.play().catch(() => { setFailure('blocked'); onPlayingChange?.(false); });
  };

  const togglePause = () => {
    if (paused || failure) resume();
    else { ref.current?.pause(); setPaused(true); }
  };

  return <>
    <video ref={ref} src={video.videoSrc ? withBasePath(video.videoSrc) : undefined}
      poster={video.poster ? withBasePath(video.poster) : undefined}
      className={className} playsInline loop muted={muted} preload="none"
      aria-label={video.label}
      onPlaying={() => { setFailure(null); onPlayingChange?.(true); }}
      onPause={() => onPlayingChange?.(false)}
      onWaiting={() => onPlayingChange?.(false)}
      onError={() => { setFailure('error'); onPlayingChange?.(false); }} />
    <button type="button" className={`ad-video-sound-toggle ${muted ? 'is-muted' : 'is-unmuted'}`}
      onClick={() => { if (ref.current) ref.current.muted = !muted; setMuted(!muted); }}
      aria-label={muted ? 'Unmute video audio' : 'Mute video audio'}>
      <span aria-hidden="true">{muted ? '🔇' : '🔊'}</span><span>{muted ? 'UNMUTE' : 'MUTE'}</span>
    </button>
    <button type="button" className="ad-video-toggle" onClick={togglePause}
      aria-label={paused || failure ? 'Resume video preview' : 'Pause preview'}>
      <span aria-hidden="true">{paused || failure ? '▶' : 'Ⅱ'}</span>
      <span>{paused || failure ? 'RESUME' : 'PAUSE'}</span>
    </button>
    {failure && <div className="ad-video-error" role="status">
      <strong>{failure === 'blocked' ? 'Tap to start the preview' : 'Preview unavailable'}</strong>
      <p>{failure === 'blocked' ? 'Your browser needs a play request.' : 'The video could not load on this connection.'}</p>
      <button type="button" onClick={resume}>Try playing video</button>
      <a href={video.url} target="_blank" rel="noopener noreferrer">Watch on TikTok ↗</a>
    </div>}
  </>;
}
