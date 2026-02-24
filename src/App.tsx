import { useState, useCallback, useRef, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './sections/Navigation';
import { Hero } from './sections/Hero';
import { FeatureCards } from './sections/FeatureCards';
import { HowToBook } from './sections/HowToBook';
import { Newsletter } from './sections/Newsletter';
import { Footer } from './sections/Footer';
import { WhyRenascoPage } from './sections/WhyRenascoPage';
import { RetreatsPage } from './sections/RetreatsPage';
import { FAQsPage } from './sections/FAQsPage';
import { ContactPage } from './sections/ContactPage';
import { Preloader } from './components/Preloader';
import { preloadOtherPageVideos, RENASCO_HOME_VIDEO_READY } from './utils/preloadPageVideos';

function HomePage() {
  return (
    <main>
      <Hero />
      <FeatureCards />
      <HowToBook />
      <Newsletter />
    </main>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!isLoading && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, [isLoading]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    el.addEventListener('play', onPlay);
    el.addEventListener('pause', onPause);
    return () => {
      el.removeEventListener('play', onPlay);
      el.removeEventListener('pause', onPause);
    };
  }, [isLoading]);

  useEffect(() => {
    const onHomeVideoReady = () => preloadOtherPageVideos();
    window.addEventListener(RENASCO_HOME_VIDEO_READY, onHomeVideoReady);
    return () => window.removeEventListener(RENASCO_HOME_VIDEO_READY, onHomeVideoReady);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, []);

  return (
    <HashRouter>
      <audio
        ref={audioRef}
        src="/images/music.mp3"
        loop
        onError={(e) => console.error('Audio failed to load. Expected public/images/music.mp3', e)}
      />

      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Global Noise Overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      <div className={`min-h-screen bg-[#f5f0e8] ${isLoading ? 'overflow-hidden max-h-screen' : ''}`}>
        <Navigation
          isPlaying={isPlaying}
          onToggleMusic={toggleMusic}
          showMusicButton={!isLoading}
        />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/why-renasco" element={<WhyRenascoPage />} />
          <Route path="/retreats" element={<RetreatsPage />} />
          <Route path="/faqs" element={<FAQsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
      {/* #region agent log */}
      <pre
        id="__dbg391el"
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 99999,
          background: 'rgba(0,0,0,0.85)', color: '#0f0', fontSize: 9,
          maxHeight: '30vh', overflow: 'auto', padding: 6, margin: 0,
          pointerEvents: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all',
        }}
      />
      {/* #endregion */}
    </HashRouter>
  );
}

export default App;
