import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logo animation
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Social animation
      gsap.fromTo(
        socialRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          delay: 0.1,
        }
      );

      // Copyright animation
      gsap.fromTo(
        copyrightRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          delay: 0.2,
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="footer-section py-8 md:py-10"
      style={{ backgroundColor: '#008080' }}
    >
      <div className="container-custom">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div ref={logoRef} className="mb-4">
            <img 
              src="/images/logo-full-beige.png" 
              alt="Renasco Retreats"
              className="h-12 md:h-14 w-auto"
            />
          </div>

          {/* Social Links */}
          <div ref={socialRef} className="mb-4 flex items-center justify-center gap-3">
            <a
              href="https://www.instagram.com/renascoretreats"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors link-lift"
              aria-label="Instagram"
            >
              <Instagram size={20} className="text-white" />
            </a>
            <a
              href="mailto:Hello@renascoretreats.com"
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors link-lift"
              aria-label="Email"
            >
              <Mail size={20} className="text-white" />
            </a>
          </div>

          {/* Copyright */}
          <div ref={copyrightRef}>
            <p className="text-sm text-white/70">
              &copy;{new Date().getFullYear()} Renasco Retreats
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
