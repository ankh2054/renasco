import { useState, useEffect } from 'react';

const PRELOAD_VIDEOS = [
  '/images/home.mp4',
  '/images/ocean.mp4',
  '/images/retreat.mp4',
  '/images/faq.mp4',
  '/images/wavez.mp4',
];

const PRELOAD_TIMEOUT_MS = 15000;
const MIN_DISPLAY_MS = 2200;
const FADE_DURATION_MS = 600;

function preloadVideos(): Promise<void> {
  return Promise.all(
    PRELOAD_VIDEOS.map(
      (src) =>
        new Promise<void>((resolve) => {
          const video = document.createElement('video');
          video.preload = 'auto';
          video.muted = true;
          video.playsInline = true;

          let timeoutId: ReturnType<typeof setTimeout>;
          const onReady = () => {
            clearTimeout(timeoutId);
            video.removeEventListener('canplaythrough', onReady);
            video.removeEventListener('error', onReady);
            video.src = '';
            video.load();
            resolve();
          };
          const onTimeout = () => {
            video.removeEventListener('canplaythrough', onReady);
            video.removeEventListener('error', onReady);
            video.src = '';
            video.load();
            resolve();
          };

          video.addEventListener('canplaythrough', onReady, { once: true });
          video.addEventListener('error', onReady, { once: true });
          timeoutId = setTimeout(onTimeout, PRELOAD_TIMEOUT_MS);

          video.src = src;
          video.load();
        })
    )
  ).then(() => {});
}

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<'loading' | 'fading'>('loading');
  const [mediaReady, setMediaReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    preloadVideos().then(() => {
      if (cancelled) return;
      setMediaReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!mediaReady) return;

    const fadeAt = MIN_DISPLAY_MS;
    const completeAt = MIN_DISPLAY_MS + FADE_DURATION_MS;

    const fadeTimer = setTimeout(() => setPhase('fading'), fadeAt);
    const completeTimer = setTimeout(() => onComplete(), completeAt);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [mediaReady, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#f5f0e8] flex flex-col items-center justify-center transition-opacity duration-600 ${
        phase === 'fading' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* R Logo with Sun */}
      <div className="preloader-text text-center">
        <img 
          src="/images/Renasco Logo  R Beige.svg" 
          alt="Renasco"
          className="h-24 md:h-32 w-auto mx-auto mb-4"
        />
        <h1 
          className="text-2xl md:text-3xl font-bold tracking-tight mb-1"
          style={{ color: '#008080' }}
        >
          RENASCO
        </h1>
        <p 
          className="text-sm tracking-[0.3em]"
          style={{ color: '#008080', opacity: 0.8 }}
        >
          RETREATS
        </p>
      </div>

      {/* Loading Line */}
      <div className="mt-8 w-48 h-px bg-gray-200 overflow-hidden">
        <div 
          className="preloader-line h-full"
          style={{ background: 'linear-gradient(90deg, transparent, #008080, transparent)' }}
        />
      </div>
    </div>
  );
}
