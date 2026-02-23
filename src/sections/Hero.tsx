import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fallbackRef = useRef<HTMLImageElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Video fade in
      gsap.fromTo(
        videoRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }
      );

      // Logo animation
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: 50, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
      );

      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.8 }
      );

      // Description animation
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 1 }
      );

      // CTA animation
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out', delay: 1.2 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden bg-[#2a4a4a]">
        <img
          ref={fallbackRef}
          src="/images/home.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500"
        />
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/images/home.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          src="/images/home.mp4"
          onCanPlay={() => {
            fallbackRef.current?.classList.add('opacity-0');
          }}
        >
          <source src="/images/home.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* R Logo with Sun */}
        <div ref={logoRef} className="mb-8">
          <img 
            src="/images/Renasco Logo  R Beige.svg" 
            alt="Renasco"
            className="h-32 sm:h-40 md:h-52 lg:h-64 w-auto mx-auto"
          />
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight"
        >
          The Fitness Retreat
          <br />
          <span className="italic">With Personality</span>
        </h1>

        {/* Description */}
        <p
          ref={descRef}
          className="text-base sm:text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          One week. Luxury villa. Expert led workouts. Unforgettable adventures. 
          Healthy, delicious meals. Join a group of like minded individuals for 
          the best week of your life!
        </p>

        {/* CTA Button */}
        <Link
          ref={ctaRef}
          to="/retreats"
          className="inline-block magnetic-btn btn-outline text-base sm:text-lg px-10 py-4"
        >
          <span className="btn-bg"></span>
          <span className="btn-text">LET&apos;S GO</span>
        </Link>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f5f0e8] to-transparent" />
    </section>
  );
}
