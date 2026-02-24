import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { VideoBackground } from '../components/VideoBackground';
import {
  Moon,
  Ship,
  UtensilsCrossed,
  BedDouble,
  Dumbbell,
  Waves,
  MapPin,
  Send,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const RETREAT = {
  title: 'The Porto Cheli Retreat',
  date: '14th – 20th June 2026',
  location: 'Porto Cheli, Greece',
  tagline:
    "Are you ready to rediscover what it means to truly be living? If so, we'll meet you in Porto Cheli where the bluest waters, mediterranean sun and your new best mates await you!",
};

const OVERVIEW_PARAS = [
  "Six unforgettable nights by the sea, where you'll train hard, enjoy downtime, and get the most out of life.",
  "Mornings start with energising workouts, followed by slow breakfasts, great coffee, and nowhere you need to rush off to. Midday is all about balance — mobility sessions, pool time, sea swims, or switching off with a book. Early evenings bring group workouts that pull everyone together, before relaxed, social dinners cooked fresh by our in-house chef. Think shared plates, delicious food, easy conversations, and plenty of laughs.",
  "Outside the villa, we mix things up with a few standout adventures — a scenic hike through the landscape, a bike tour around a nearby island, and a boat trip to hidden bays with crystal-clear water and swims straight from the deck. The villa itself is part of the experience. Set right on the seafront, it's designed for movement, play, and proper downtime — with an infinity pool, courts, SUPs, and plenty of space to stretch out, recover, or do absolutely nothing.",
  "Good people, great movement, unforgettable days — and that feeling of truly living.",
];

const ITINERARY = [
  {
    day: 'Sunday',
    title: null,
    body: 'Arrive in the afternoon and get yourself settled in before relaxing by the infinity pool. Take in the stunning coastal views and enjoy the first taste of the Greek sun. Shake off the travel day with a light workout into a mobility session. We\'ll have a delicious meal on the terrace together and toast to an unforgettable week to come.',
    image: '/images/retreats/villa-pool.jpg',
  },
  {
    day: 'Monday',
    title: "Let's get this retreat started!",
    body: "We start the day strong with a high energy team workout, setting the tone for the rest of the week. We then lock in those gains with a big chef-prepared breakfast before chilling by the pool. Midday brings a mobility session to recover and restore, before sitting down for a long lazy Greek lunch. The afternoon is yours to chill, play, recharge and soak up some rays, before we ramp it up again for sweat session number 2.",
    image: '/images/retreats/breakfast-view.jpg',
  },
  {
    day: 'Tuesday',
    title: "Nature's medicine.",
    body: "We awake with the sunrise to get out on a glorious hike, exploring breathtaking trails and connecting with nature and each other, before heading back for a well earned breakfast. Midday brings another stretch and after another glorious lunch, the afternoon is again yours to chill, chat and splash in the pool, before we gear up for another workout. As the glow of the sunset stretches over the sea, we'll settle in for another nourishing Greek feast on our stunning terrace.",
    image: '/images/retreats/itinerary-1.jpeg',
  },
  {
    day: 'Wednesday',
    title: 'Biker Gang!',
    body: "Get ready for another fun, high energy workout before recovering with some ice baths and breathwork followed by a delightful breakfast prepared by our in-house chef. After breakfast we'll be saddling up with some mountain bikes (or e-bikes if you fancy a more chilled ride) to embark on an awesome adventure — a scenic bike tour around the island of Spetses, where cars are rare, roads hug the coastline, and every turn looks like it belongs on a postcard. Once we are back, the afternoon is yours to fully relax and unwind, get stuck into that book, take out the paddle boards or challenge your friends to a game of beach volleyball or tennis on our private courts. Once you've made the most of the day, we'll settle in for an evening with a proper Greek BBQ.",
    image: '/images/retreats/itinerary-2.jpeg',
  },
  {
    day: 'Thursday',
    title: 'Boat Day baby!',
    body: "Start the day in style with an awesome team workout and then fuel up before we descend on the best day on the water aboard our private yacht. With lunch, drinks and tunes pumping onboard, we'll explore the breathtaking coastline and dive into hidden bays, swimming in the clearest aqua blue waters imaginable. Upon returning to the villa, we'll unwind with a feast prepared by our incredible chef as the sun sets over your very own paradise.",
    image: '/images/retreats/itinerary-3.jpeg',
  },
  {
    day: 'Friday',
    title: 'Our Last Hurrah',
    body: "Our last full day in paradise, so we are making every moment count by starting off with some fun and sweaty team games. After that you'll have plenty of time to chill, recover and soak up more of that Greek sunshine ensuring you're ready to go home as the happiest, healthiest version of yourself. As the sun starts to dip, we'll make our way for a special dinner at a local top spot – where we'll enjoy some of the freshest and tastiest Greek dishes known to man! With ice cold drinks and insane flavours, it's the perfect way to finish off one epic week!",
    image: '/images/retreats/breakfast-view.jpg',
  },
  {
    day: 'Saturday',
    title: null,
    body: "There is time for one last team workout, a cool off in the pool and one last big breakfast to fuel your journey home. Hugs and fist bumps all round – this isn't goodbye, it's until next time!",
    image: null,
  },
];

const INCLUDED = [
  { icon: Moon, label: '6 nights', sub: 'Six nights and seven days of adventure, fitness and fun.' },
  { icon: UtensilsCrossed, label: 'Food & drink', sub: 'Breakfast, lunch, dinner and snacks plus non-alcoholic drinks.' },
  { icon: BedDouble, label: 'Luxury rooms', sub: 'Private ensuite rooms, with incredible views.' },
  { icon: Dumbbell, label: 'Daily workouts', sub: 'Led by our expert coach with all kit included.' },
  { icon: Waves, label: '5* villa', sub: 'With pool, tennis courts, direct beach access and volleyball.' },
  {
    icon: Ship,
    label: 'Activities included',
    sub: 'Epic private yacht day, bike tour of Spetses island, plus lots more.',
  },
];

const PACKAGES = [
  {
    id: 'standard-shared',
    name: 'Standard',
    variant: 'shared',
    price: '£3,150',
    desc: 'Our most affordable option. Book a space in a shared twin room with ensuite. If you would like to share with a friend or partner please book two spots and specify who you wish to share with. These rooms can be booked as twin beds or a double.',
    includes: ['Ensuite room', '6 nights', 'All villa meals & snacks', 'Daily workouts', 'All activities', 'Transfers'],
  },
  {
    id: 'standard-solo',
    name: 'Standard',
    variant: 'solo',
    price: '£4,735',
    desc: 'A private king room with ensuite. Book this option for solo occupancy of the room.',
    includes: ['Ensuite room', '6 nights', 'All villa meals & snacks', 'Daily workouts', 'All activities', 'Transfers'],
  },
  {
    id: 'master-shared',
    name: 'Master',
    variant: 'shared',
    price: '£3,450',
    desc: 'Book a space in a master shared room and ensuite with sea views & a balcony. If you would like to share with a friend or partner please book two spots and specify who you wish to share with. These rooms can be booked as twin beds or a double.',
    includes: ['Ensuite room, balcony & sea views', '6 nights', 'All villa meals & snacks', 'Daily workouts', 'All activities', 'Transfers'],
  },
  {
    id: 'master-solo',
    name: 'Master',
    variant: 'solo',
    price: '£5,175',
    desc: 'Our highest-end option. A king private room with ensuite with a balcony & sea views. Book this option for solo occupancy of the room.',
    includes: ['Ensuite room, balcony & sea views', '6 nights', 'All villa meals & snacks', 'Daily workouts', 'All activities', 'Transfers'],
  },
];

export function RetreatsPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const itineraryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const includedRef = useRef<HTMLDivElement>(null);
  const villaRef = useRef<HTMLDivElement>(null);
  const packagesRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    roomPreference: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [heroVideoEnded, setHeroVideoEnded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: heroRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        }
      );
      gsap.fromTo(
        overviewRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: overviewRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        }
      );
      itineraryRefs.current.forEach((el, i) => {
        if (el) {
          gsap.fromTo(
            el,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
              delay: i * 0.05,
            }
          );
        }
      });
      gsap.fromTo(
        includedRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: includedRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        }
      );
      gsap.fromTo(
        villaRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: villaRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        }
      );
      gsap.fromTo(
        packagesRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: packagesRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        }
      );
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 90%', toggleActions: 'play none none none' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ firstName: '', lastName: '', email: '', phone: '', roomPreference: '', message: '' });
  };

  return (
    <section ref={sectionRef} className="bg-[#f5f0e8]">
      {/* Hero – video only, content on top */}
      <div
        ref={heroRef}
        className="relative min-h-[85vh] flex items-center justify-center py-20 md:py-28 text-center overflow-hidden"
      >
        {!heroVideoEnded ? (
          <VideoBackground
            videoSrc="/images/retreat.mp4"
            fallbackSrc="/images/retreats/villa-pool.jpg"
            loop={false}
            className="absolute inset-0 w-full h-full object-cover scale-[1.15] origin-center"
            fallbackClassName="absolute inset-0 w-full h-full object-cover object-bottom"
            onEnded={() => setHeroVideoEnded(true)}
          />
        ) : (
          <img
            src="/images/retreats/villa-pool.jpg"
            alt="Villa pool and sea view"
            className="absolute inset-0 w-full h-full object-cover object-bottom"
          />
        )}
        <div className="absolute inset-0 bg-[#008080]/60" />
        <div className="container-custom relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-white mb-4">
            {RETREAT.title}
          </h1>
          <p className="text-white/95 text-lg md:text-xl mb-2">{RETREAT.date}</p>
          <p className="text-white/90 flex items-center justify-center gap-2">
            <MapPin className="w-5 h-5" />
            {RETREAT.location}
          </p>
          <p className="text-white/90 max-w-2xl mx-auto mt-6 text-base md:text-lg leading-relaxed">
            {RETREAT.tagline}
          </p>
          <a
            href="#packages"
            className="inline-block mt-10 magnetic-btn bg-white text-[#008080] px-10 py-4 text-lg font-medium rounded-[2rem]"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="btn-bg" style={{ backgroundColor: '#f5f0e8' }} />
            <span className="btn-text relative z-10">PRICING & PACKAGES</span>
          </a>
        </div>
      </div>

      {/* Overview */}
      <div ref={overviewRef} className="py-16 md:py-24">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-serif mb-10" style={{ color: '#008080' }}>
            Overview
          </h2>
          <div className="space-y-6 text-gray-700 leading-relaxed">
            {OVERVIEW_PARAS.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Itinerary */}
      <div className="py-16 md:py-24" style={{ backgroundColor: 'var(--cream-dark, #e8e0d4)' }}>
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-serif mb-14 text-center" style={{ color: '#008080' }}>
            The itinerary
          </h2>
          <div className="space-y-12 md:space-y-16">
            {ITINERARY.map((item, index) => (
              <div
                key={item.day}
                ref={(el) => {
                  itineraryRefs.current[index] = el;
                }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                <div className="lg:col-span-5 order-2 lg:order-1">
                  <h3 className="text-2xl font-serif mb-3" style={{ color: '#008080' }}>
                    {item.day}
                  </h3>
                  {item.title && (
                    <p className="text-lg font-medium text-gray-800 mb-4">{item.title}</p>
                  )}
                  <p className="text-gray-600 leading-relaxed">{item.body}</p>
                </div>
                {item.image && (
                  <div className="lg:col-span-7 order-1 lg:order-2">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.day}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What's included */}
      <div ref={includedRef} className="py-16 md:py-24">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-serif mb-14 text-center" style={{ color: '#008080' }}>
            What&apos;s included
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {INCLUDED.map((item) => (
              <div key={item.label} className="flex gap-4">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: '#008080' }}
                >
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.label}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Villa */}
      <div ref={villaRef} className="py-16 md:py-24" style={{ backgroundColor: 'var(--cream-dark, #e8e0d4)' }}>
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-serif mb-8 text-center" style={{ color: '#008080' }}>
            The villa
          </h2>
          <p className="text-gray-700 text-center max-w-3xl mx-auto leading-relaxed">
            Experience 6 nights in our 5* villa equipped with private rooms, infinity pool with sea views, tennis
            courts, beach volleyball, direct beach access and breathtaking views.
          </p>
          <div className="mt-10 aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden">
            <img
              src="/images/retreats/villa-pool.jpg"
              alt="Renasco villa"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Packages & prices */}
      <div id="packages" ref={packagesRef} className="py-16 md:py-24">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-serif mb-4 text-center" style={{ color: '#008080' }}>
            Packages & prices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-14">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-wrap items-baseline gap-2 mb-4">
                  <h3 className="text-xl font-serif" style={{ color: '#008080' }}>
                    {pkg.name}
                  </h3>
                  <span className="text-sm text-gray-500 capitalize">{pkg.variant}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{pkg.desc}</p>
                <ul className="space-y-2 mb-6 text-sm text-gray-700">
                  {pkg.includes.map((inc) => (
                    <li key={inc} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#008080]" />
                      {inc}
                    </li>
                  ))}
                </ul>
                <p className="text-2xl font-serif font-semibold" style={{ color: '#008080' }}>
                  {pkg.price}
                </p>
                <Link
                  to="/contact"
                  className="mt-6 inline-block magnetic-btn btn-primary rounded-[2rem] px-8 py-3"
                >
                  <span className="btn-bg" />
                  <span className="btn-text">LET&apos;S GO</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking form */}
      <div ref={formRef} className="py-16 md:py-24" style={{ backgroundColor: '#008080' }}>
        <div className="container-custom max-w-xl">
          <h2 className="text-3xl md:text-4xl font-serif text-white text-center mb-4">Let&apos;s go</h2>
          <p className="text-white/90 text-center mb-10">
            Booking could not be easier. Fill out the form below and we&apos;ll be in touch to confirm and get you
            booked in.
          </p>
          {isSubmitted ? (
            <div className="text-center py-12 text-white">
              <p className="text-lg font-medium">Thanks for submitting!</p>
              <p className="text-white/80 mt-2">Our team will be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <select
                name="roomPreference"
                value={formData.roomPreference}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <option value="">Room preference</option>
                <option value="standard-shared">Standard shared</option>
                <option value="standard-solo">Standard solo</option>
                <option value="master-shared">Master shared</option>
                <option value="master-solo">Master solo</option>
              </select>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full magnetic-btn bg-white text-[#008080] py-4 rounded-[2rem] font-medium flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  'Sending…'
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Sign Me Up
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
