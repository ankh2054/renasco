import { useState, useEffect } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<'loading' | 'fading'>('loading');

  useEffect(() => {
    const fadeTimer = setTimeout(() => setPhase('fading'), 2200);
    const completeTimer = setTimeout(() => onComplete(), 2800);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

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
