import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FeatureCard {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  href: string;
  isRoute?: boolean;
}

const cards: FeatureCard[] = [
  {
    id: 'why-renasco',
    title: 'WHY',
    subtitle: 'RENASCO',
    image: '/images/card-why.jpg',
    href: '/why-renasco',
    isRoute: true,
  },
  {
    id: 'retreats',
    title: 'RETREATS',
    image: '/images/card-retreats.jpg',
    href: '/retreats',
    isRoute: true,
  },
  {
    id: 'faqs',
    title: 'FAQs',
    image: '/images/card-faqs.jpg',
    href: '/faqs',
    isRoute: true,
  },
];

export function FeatureCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered card reveal animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 60, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
              delay: index * 0.15,
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-[#f5f0e8]"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, index) => {
            const CardContent = (
              <>
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url(${card.image})` }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/70" />

                {/* Content */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-start items-start">
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
                    {card.title}
                  </h3>
                  {card.subtitle && (
                    <h3 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
                      {card.subtitle}
                    </h3>
                  )}
                </div>
              </>
            );

            if (card.isRoute) {
              return (
                <Link
                  key={card.id}
                  ref={(el) => { cardsRef.current[index] = el; }}
                  to={card.href}
                  className="feature-card group relative aspect-[3/4] overflow-hidden cursor-pointer block"
                >
                  {CardContent}
                </Link>
              );
            }

            return (
              <a
                key={card.id}
                ref={(el) => { cardsRef.current[index] = el; }}
                href={card.href}
                onClick={(e) => scrollToSection(e, card.href)}
                className="feature-card group relative aspect-[3/4] overflow-hidden cursor-pointer block"
              >
                {CardContent}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
