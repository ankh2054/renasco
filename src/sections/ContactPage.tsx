import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, ThumbsUp } from 'lucide-react';
import { VideoBackground } from '../components/VideoBackground';

gsap.registerPlugin(ScrollTrigger);

export function ContactPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ firstName: '', lastName: '', email: '', message: '' });
  };

  return (
    <section ref={sectionRef} className="bg-[#f5f0e8]">
      {/* Hero Section with Video */}
      <div
        ref={heroRef}
        className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden bg-[#008080]">
          <VideoBackground
            videoSrc="/images/ocean.mp4"
            fallbackSrc="/images/ocean.jpg"
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Contact
          </h1>
          <p className="text-white/90 text-lg max-w-xl mx-auto">
            Got a question? Fill out our general enquiry form or email us and our team will be in touch.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div ref={contentRef} className="py-16 md:py-24">
        <div className="container-custom max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0">
            {/* Left Column - Contact Info */}
            <div className="lg:pr-12 lg:border-r border-gray-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Email Us */}
                <div>
                  <div className="w-12 h-12 flex items-center justify-center mb-4">
                    <Mail className="w-8 h-8 text-gray-700" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Email us</h3>
                  <a 
                    href="mailto:Hello@renascoretreats.com"
                    className="text-gray-600 hover:text-[#008080] transition-colors underline"
                  >
                    Hello@renascoretreats.com
                  </a>
                </div>

                {/* Follow Us */}
                <div>
                  <div className="w-12 h-12 flex items-center justify-center mb-4">
                    <ThumbsUp className="w-8 h-8 text-gray-700" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Follow us</h3>
                  <a 
                    href="https://www.instagram.com/renascoretreats"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#008080] transition-colors underline"
                  >
                    @RenascoRetreats
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:pl-12">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* First Name & Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-[2rem] focus:border-[#008080] focus:outline-none transition-colors bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-[2rem] focus:border-[#008080] focus:outline-none transition-colors bg-white"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-[2rem] focus:border-[#008080] focus:outline-none transition-colors bg-white"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-[2rem] focus:border-[#008080] focus:outline-none transition-colors bg-white resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 text-white font-medium rounded-[2rem] transition-all duration-300 hover:opacity-90"
                    style={{ backgroundColor: '#008080' }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send'}
                  </button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#008080]/10 flex items-center justify-center">
                    <Mail className="w-8 h-8 text-[#008080]" />
                  </div>
                  <h3 className="text-2xl font-medium text-gray-800 mb-4">
                    Thanks for submitting!
                  </h3>
                  <p className="text-gray-600">
                    We'll be in touch soon.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
