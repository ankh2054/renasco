import { useRef, useState, useEffect } from 'react';

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
  const [showFallback, setShowFallback] = useState(!isVideoLoaded(videoSrc));

  useEffect(() => {
    if (isVideoLoaded(videoSrc)) {
      setShowFallback(false);
    }
  }, [videoSrc]);

  const handleCanPlay = () => {
    markVideoLoaded(videoSrc);
    setShowFallback(false);
    onReady?.();
  };

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
