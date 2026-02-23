import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Step {
  number: string;
  description: string;
}

const steps: Step[] = [
  {
    number: '1',
    description: 'Visit our retreats page and find out about our upcoming trips.',
  },
  {
    number: '2',
    description: 'Then simply fill out the request form.',
  },
  {
    number: '3',
    description: 'We will be in touch with everything we need to get your trip secured.',
  },
];

export function HowToBook() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const stepsRef = useRef<(HTMLAnchorElement | HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Steps animation
      stepsRef.current.forEach((step, index) => {
        if (step) {
          gsap.fromTo(
            step,
            { opacity: 0, y: 50, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: step,
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

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/how-to-book-bg.jpg)',
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 container-custom">
        {/* Title */}
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-serif text-white text-center mb-16 md:mb-24"
        >
          How to book
        </h2>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <Link
              key={step.number}
              ref={(el) => { stepsRef.current[index] = el; }}
              to="/retreats"
              className="step-card p-8 md:p-10 block cursor-pointer"
            >
              {/* Step Number */}
              <div className="flex items-center justify-between mb-6">
                <span 
                  className="text-5xl md:text-6xl font-serif font-light"
                  style={{ color: '#d4a574' }}
                >
                  {step.number}
                </span>
                <span 
                  className="text-5xl md:text-6xl font-serif font-light"
                  style={{ color: '#d4a574', opacity: 0.3 }}
                >
                  {step.number}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                {step.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
