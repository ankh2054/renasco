import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Newsletter() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      // Description animation
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: descRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: 0.1,
        }
      );

      // Form animation
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: 0.2,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail('');
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 bg-[#f5f0e8]"
    >
      <div className="container-custom max-w-3xl mx-auto text-center">
        {/* Title */}
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6"
          style={{ color: '#008080' }}
        >
          Join the Club
        </h2>

        {/* Description */}
        <p
          ref={descRef}
          className="text-base md:text-lg text-gray-600 mb-10 max-w-xl mx-auto"
        >
          Join our email list and get early access to specials deals and our latest retreats.
        </p>

        {/* Form */}
        {!isSubmitted ? (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
          >
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email here *"
                required
                className="w-full px-6 py-4 bg-white border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#008080] transition-colors"
                style={{ borderRadius: '2rem' }}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="magnetic-btn btn-primary whitespace-nowrap"
              style={{ borderRadius: '2rem' }}
            >
              <span className="btn-bg"></span>
              <span className="btn-text">
                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
              </span>
            </button>
          </form>
        ) : (
          <div 
            className="p-8 rounded-container bg-white/80 backdrop-blur-sm"
          >
            <p className="text-lg text-gray-700">
              Thanks for submitting! We&apos;ll be in touch soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
