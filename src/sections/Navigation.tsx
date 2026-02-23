import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Music } from 'lucide-react';
import gsap from 'gsap';

interface NavLink {
  name: string;
  href: string;
  isRoute?: boolean;
}

const navLinks: NavLink[] = [
  { name: 'Why Renasco', href: '/why-renasco', isRoute: true },
  { name: 'Retreats', href: '/retreats', isRoute: true },
  { name: 'FAQs', href: '/faqs', isRoute: true },
  { name: 'Contact', href: '/contact', isRoute: true },
];

interface NavigationProps {
  isPlaying?: boolean;
  onToggleMusic?: () => void;
  showMusicButton?: boolean;
}

export function Navigation({ isPlaying = false, onToggleMusic, showMusicButton }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );

      if (linksRef.current) {
        gsap.fromTo(
          linksRef.current.children,
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08, delay: 0.4 }
        );
      }

      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out', delay: 0.7 }
      );
    });

    return () => ctx.revert();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const isActive = (href: string) => {
    if (href.startsWith('#')) return false;
    return location.pathname === href;
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#f5f0e8]/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div ref={logoRef} className="flex items-center">
              <Link to="/" className="link-lift">
                <img 
                  src={
                    isScrolled
                      ? "/images/Renasco Logo Teal.svg"
                      : "/images/Renasco Logo Beige.svg"
                  }
                  alt="Renasco Retreats"
                  className="h-10 md:h-12 w-auto"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div ref={linksRef} className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                link.isRoute ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`text-sm font-medium link-lift transition-colors duration-300 ${
                      isActive(link.href) ? 'font-bold' : ''
                    } ${isScrolled ? 'text-[#008080]' : 'text-white'}`}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`text-sm font-medium link-lift transition-colors duration-300 ${
                      isScrolled ? 'text-[#008080]' : 'text-white'
                    }`}
                  >
                    {link.name}
                  </a>
                )
              ))}
            </div>

            {/* Music toggle + CTA */}
            <div className="hidden md:flex items-center gap-3">
              {showMusicButton && onToggleMusic && (
                <button
                  type="button"
                  onClick={onToggleMusic}
                  className={`p-1.5 rounded-full transition-colors link-lift ${
                    isScrolled ? 'text-[#008080] hover:bg-[#008080]/10' : 'text-white hover:bg-white/10'
                  }`}
                  aria-label={isPlaying ? 'Pause music' : 'Play music'}
                >
                  <span className="relative inline-flex">
                    <Music size={16} />
                    {!isPlaying && (
                      <span
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        aria-hidden
                      >
                        <span className="w-[140%] h-0.5 bg-current rotate-[-45deg]" />
                      </span>
                    )}
                  </span>
                </button>
              )}
              <Link
                ref={ctaRef}
                to="/retreats"
                className="magnetic-btn btn-primary"
              >
                <span className="btn-bg"></span>
                <span className="btn-text">LET&apos;S GO</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-2 link-lift transition-colors duration-300 ${
                isScrolled ? 'text-[#008080]' : 'text-white'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#f5f0e8] transition-transform duration-500 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            link.isRoute ? (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-medium"
                style={{ 
                  color: '#008080',
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-2xl font-medium"
                style={{ 
                  color: '#008080',
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {link.name}
              </a>
            )
          ))}
          {showMusicButton && onToggleMusic && (
            <button
              type="button"
              onClick={() => { onToggleMusic(); setIsMobileMenuOpen(false); }}
              className="flex items-center gap-2 text-[#008080] font-medium py-2"
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
            >
              <span className="relative inline-flex">
                <Music size={20} />
                {!isPlaying && (
                  <span
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    aria-hidden
                  >
                    <span className="w-[140%] h-0.5 bg-current rotate-[-45deg]" />
                  </span>
                )}
              </span>
              {isPlaying ? 'Pause music' : 'Play music'}
            </button>
          )}
          <Link
            to="/retreats"
            onClick={() => setIsMobileMenuOpen(false)}
            className="magnetic-btn btn-primary mt-4"
          >
            <span className="btn-bg"></span>
            <span className="btn-text">LET&apos;S GO</span>
          </Link>
        </div>
      </div>
    </>
  );
}
