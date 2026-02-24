import { useRef, useState, useEffect, useCallback } from 'react';

const loadedVideos = new Set<string>();

// #region agent log
function _dbg(msg: string, data: Record<string, unknown>) {
  const entry = `${new Date().toISOString().slice(11,19)} ${msg} ${JSON.stringify(data)}`;
  const prev = sessionStorage.getItem('__dbg391') || '';
  sessionStorage.setItem('__dbg391', prev + entry + '\n');
  const el = document.getElementById('__dbg391el');
  if (el) el.textContent = sessionStorage.getItem('__dbg391') || '';
}
// #endregion

export function markVideoLoaded(src: string) {
  // #region agent log
  _dbg('markLoaded', { src, set: [...loadedVideos], hyp: 'A' });
  // #endregion
  loadedVideos.add(src);
}

export function isVideoLoaded(src: string) {
  return loadedVideos.has(src);
}

interface VideoBackgroundProps {
  videoSrc: string;
  fallbackSrc: string;
  loop?: boolean;
  className?: string;
  fallbackClassName?: string;
  onEnded?: () => void;
  onReady?: () => void;
}

export function VideoBackground({
  videoSrc,
  fallbackSrc,
  loop = true,
  className = 'absolute inset-0 w-full h-full object-cover',
  fallbackClassName = 'absolute inset-0 w-full h-full object-cover object-center',
  onEnded,
  onReady,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const alreadyLoaded = isVideoLoaded(videoSrc);
  const [showFallback, setShowFallback] = useState(!alreadyLoaded);

  // #region agent log
  _dbg('mount', { videoSrc, alreadyLoaded, showFallback: !alreadyLoaded, set: [...loadedVideos], hyp: 'A+B' });
  // #endregion

  useEffect(() => {
    if (isVideoLoaded(videoSrc)) {
      setShowFallback(false);
    }
  }, [videoSrc]);

  const handleCanPlay = useCallback(() => {
    // #region agent log
    _dbg('onCanPlay', { videoSrc, alreadyInSet: loadedVideos.has(videoSrc), hyp: 'A' });
    // #endregion
    markVideoLoaded(videoSrc);
    setShowFallback(false);
    onReady?.();
  }, [videoSrc, onReady]);

  return (
    <>
      {showFallback && (
        <img
          src={fallbackSrc}
          alt=""
          aria-hidden
          className={`${fallbackClassName} transition-opacity duration-500`}
        />
      )}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop={loop}
        playsInline
        poster={fallbackSrc}
        className={className}
        src={videoSrc}
        onCanPlay={handleCanPlay}
        onEnded={onEnded}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </>
  );
}
