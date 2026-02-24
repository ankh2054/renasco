import { useRef, useState, useEffect, useCallback } from 'react';

const loadedVideos = new Set<string>();

export function markVideoLoaded(src: string) {
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

  useEffect(() => {
    if (isVideoLoaded(videoSrc)) {
      setShowFallback(false);
    }
  }, [videoSrc]);

  const handleCanPlay = useCallback(() => {
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
