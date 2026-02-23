import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

interface Feature {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
}

const features: Feature[] = [
  {
    id: 'villa',
    title: 'The Villa',
    description: "Step into paradise! You'll be welcomed by an infinity pool with panoramic views of the Greek coastline.",
    image: '/images/feature-villa.jpg',
  },
  {
    id: 'adventures',
    title: 'Adventures',
    description: 'Hike through the stunning scenery, bike the historic island of Spetses and join us on a boat trip like no other!',
    image: '/images/feature-adventures.jpg',
  },
  {
    id: 'workouts',
    title: 'The Workouts',
    description: 'High-energy workouts, coached by the best coaches in the UK, designed and personalised to push your limits.',
    image: '/images/feature-workouts.jpg',
  },
  {
    id: 'people',
    title: 'The People',
    description: 'A like minded crew who are passionate about fitness, adventures, travel and food.',
    image: '/images/feature-people.jpg',
  },
  {
    id: 'food',
    title: 'The Food',
    description: "All meals are designed and prepared by our world-class private chef, to ensure they are fuelling your goals, whilst also being the best thing you've ever tasted.",
    image: '/images/feature-food.jpg',
  },
];

const teamMembers: TeamMember[] = [
  {
    name: 'Anna Kelly',
    role: 'Chief organiser',
    description: "Big fan of travel, sweaty workouts, and chasing the sun. I'm the organiser behind Renasco — part spreadsheet-lover, part event pro — making sure everything runs smoothly. With qualifications in coaching and a real love for movement and adventure, I'm all for bringing great people together for an unforgettable week. Super excited to see you in Greece!",
    image: '/images/team-anna.jpg',
  },
  {
    name: 'Bill Kelly',
    role: 'Master of the vibes & head coach',
    description: "I started my coaching journey in elite sport out in LA before heading back to the UK to create something more fun and community-driven. In 2018, I founded Leo Gym with one clear goal — high-energy workouts, great vibes, and programming backed by science. I love bringing people together and creating an atmosphere where everyone feels part of it. Combined with my love for experiencing the world, I can't wait to bring that same energy and community feel to the retreats.",
    image: '/images/team-bill.jpg',
  },
  {
    name: 'Donna Minett',
    role: 'Culinary & travel expert',
    description: "With a chef background and 10 years in France, my food has a fresh Mediterranean edge, generous, healthy, and made for sharing. After years cooking for a range of clients and leading teams in VIP hospitality at international sporting events, I now combine my love of food and travel creating memorable experiences. I'm proud to be part of the Leo community — and fitter now than I was in my 20s!",
    image: '/images/team-donna.jpg',
  },
];

export function WhyRenascoPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const featuresRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const teamTitleRef = useRef<HTMLHeadingElement>(null);
  const teamRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero title animation
      gsap.fromTo(
        heroTitleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heroTitleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Features animation
      featuresRef.current.forEach((feature, index) => {
        if (feature) {
          gsap.fromTo(
            feature,
            { opacity: 0, y: 60, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: feature,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
              delay: index * 0.1,
            }
          );
        }
      });

      // CTA banner animation
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Team title animation
      gsap.fromTo(
        teamTitleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: teamTitleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Team members animation
      teamRef.current.forEach((member, index) => {
        if (member) {
          gsap.fromTo(
            member,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: member,
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
    <section ref={sectionRef} className="bg-[#f5f0e8]">
      {/* Hero Section with Video */}
      <div className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 overflow-hidden bg-[#2a4a4a]">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src="/images/wavez.mp4"
          >
            <source src="/images/wavez.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Title */}
        <h1
          ref={heroTitleRef}
          className="relative z-10 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-wide"
        >
          WHY RENASCO?
        </h1>
      </div>

      {/* Features Section */}
      <div className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                ref={(el) => { featuresRef.current[index] = el; }}
                className="text-center"
              >
                {/* Circular Image */}
                <div className="relative w-48 h-48 mx-auto mb-6 overflow-hidden rounded-full">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>

                {/* Title */}
                <h3 
                  className="text-2xl md:text-3xl font-serif mb-4"
                  style={{ color: '#008080' }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div
        ref={ctaRef}
        className="py-16 md:py-20 text-center"
        style={{ backgroundColor: '#008080' }}
      >
        <div className="container-custom">
          <p className="text-white/80 text-lg mb-4">
            - 2026 trip is live now -
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">
            Book your retreat now
          </h2>
          <Link
            to="/retreats"
            className="inline-block magnetic-btn bg-white text-[#008080] px-10 py-4 text-lg font-medium"
            style={{ borderRadius: '2rem' }}
          >
            <span className="btn-bg" style={{ backgroundColor: '#f5f0e8' }}></span>
            <span className="btn-text">LET&apos;S GO</span>
          </Link>
        </div>
      </div>

      {/* Meet the Team Section */}
      <div className="py-16 md:py-24">
        <div className="container-custom">
          {/* Section Title */}
          <h2
            ref={teamTitleRef}
            className="text-4xl md:text-5xl font-serif text-center mb-16"
            style={{ color: '#008080' }}
          >
            Meet the Team
          </h2>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                ref={(el) => { teamRef.current[index] = el; }}
                className="text-center"
              >
                {/* Photo */}
                <div className="relative aspect-[3/4] mb-6 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Role */}
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                  {member.role}
                </p>

                {/* Name */}
                <h3 
                  className="text-xl md:text-2xl font-medium mb-4"
                  style={{ color: '#008080' }}
                >
                  {member.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
