import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Search, Link2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FAQ {
  id: string;
  question: string;
  answer: string | React.ReactNode;
}

const faqs: FAQ[] = [
  {
    id: 'age-range',
    question: "What's the age range for Renasco Retreats?",
    answer: (
      <>
        <p className="mb-4">
          <strong>We welcome all like-minded adventurous spirits</strong> with great energy and a love for life, adventure, and making epic memories on our <strong>all-inclusive fitness retreats</strong>.
        </p>
        <p>
          Our retreats are designed to bring people together over a week of fun. All activities, dining, and relaxing are done in a group environment that encourages a strong group dynamic. Being passionate about meeting new people, having an interest in health & fitness, and being keen to be involved is key to being a great fit for Renasco Retreats.
        </p>
      </>
    ),
  },
  {
    id: 'solo-booking',
    question: 'Can I book a spot solo on a fitness retreat?',
    answer: (
      <>
        <p className="mb-4">
          <strong>Yes, absolutely!</strong>
        </p>
        <p className="mb-4">
          In fact, most of our guests choose to join <strong>Renasco Retreats</strong> solo, embracing the prime opportunity to meet like-minded travellers who share a passion for fitness and exploration.
        </p>
        <p className="mb-4">
          Traveling alone to exciting destinations can seem daunting, but we pride ourselves on creating an environment that puts you at ease and makes it really easy to connect with everyone on the trip and make great friends.
        </p>
        <p className="mb-4">
          For those embarking on a fitness escape alone, we offer two accommodation options to suit your preferences and budget:
        </p>
        <p className="mb-2">
          <strong>Shared Rooms:</strong> You can opt for a shared room, often called a "Standard Shared" or "Master Shared" room. This is a perfect, cost-effective solution for guests looking to connect, and you'll be paired with another guest of the same sex for a comfortable and respectful living arrangement.
        </p>
        <p>
          <strong>Private Rooms:</strong> Alternatively, if you prefer more privacy or simply wish to indulge in a bit more space after a day full of high-energy activities, our private rooms (standard private or master private) are ideal sanctuaries. Opting for a private room does come with a higher price tag, but the investment in your comfort and privacy can enhance your escape experience.
        </p>
      </>
    ),
  },
  {
    id: 'injuries',
    question: 'I have some injuries or physical limitations. Can I still come to Renasco Retreats?',
    answer: (
      <>
        <p className="mb-4">
          <strong>Yes, you can likely still come!</strong>
        </p>
        <p className="mb-4">
          We strive to be as inclusive as possible and work hard to accommodate our guests' needs to ensure everyone has a <strong>fun</strong> and safe experience at our all-inclusive fitness retreat.
        </p>
        <p className="mb-4">
          The most important step is for you to contact us before booking your spot. We kindly ask that you provide us with full details of your injuries or physical limitations.
        </p>
        <p className="mb-4">
          Our team will review the information to determine if the specific activities planned for your chosen retreat can be modified safely for you, or if we can make alternative arrangements. While we can cater to most general fitness levels and minor concerns, we want to ensure we can provide an exceptional experience and, most importantly, not risk exacerbating any existing injuries.
        </p>
        <p>
          We want every guest to enjoy the full, high-energy Renasco experience!
        </p>
      </>
    ),
  },
  {
    id: 'dietary',
    question: 'I have dietary requirements - can Renasco Retreats cater to this?',
    answer: (
      <>
        <p className="mb-4">
          <strong>Yes, we can cater to virtually all dietary needs</strong> and allergies to ensure you have an exceptional and safe dining experience during your <strong>all-inclusive fitness retreat</strong>.
        </p>
        <p className="mb-4">
          We understand our guests come from all different backgrounds with various dietary requests (vegan, vegetarian, pescatarian, nut allergies, etc.). We're committed to providing exceptional food around these requirements.
        </p>
        <p className="mb-4">
          <strong>Expert Chefs:</strong> We work with highly skilled, professionally trained chefs who have extensive experience tailoring menus. Many have experience working on super-yachts or in top food scenes like London and Sydney, meaning they are experts at creating diverse, delicious meals that accommodate specific requests without compromising quality.
        </p>
        <p className="mb-4">
          <strong>Seamless Planning:</strong> After booking your spot at Renasco Retreats, guests receive detailed forms. These are specifically designed to gather information around injuries, health info, and dietary preferences, including any allergies or specific food items to avoid.
        </p>
        <p>
          If you'd like to confirm specific requirements before booking, please don't hesitate to get in touch with us using our contact information!
        </p>
      </>
    ),
  },
  {
    id: 'team',
    question: 'Who makes up the Renasco Retreats team on each trip?',
    answer: (
      <>
        <p className="mb-4">
          The <strong>Renasco Retreats team</strong> is a dedicated group of highly skilled professionals committed to ensuring you have a <strong>fun, high-energy, all-inclusive fitness escape</strong>.
        </p>
        <p className="mb-4">
          We love working with the same team members as much as possible to maintain a consistent and reliable experience for our guests. You can expect to meet:
        </p>
        <p className="mb-2">
          <strong>Professional Chef:</strong> Making dishes that belong in the Michelin guide – our chef creates masterpiece after masterpiece that not only taste incredible but also fuel your muscles and recovery, so you can get the most out of your workouts.
        </p>
        <p>
          <strong>2 coaches:</strong> The crew that bring the vibes! Not only will they be putting you through some incredible, high energy workouts each day, they will also be responsible for making your stay as enjoyable as possible.
        </p>
      </>
    ),
  },
  {
    id: 'free-time',
    question: 'Will I get any free time throughout the week at Renasco Retreats?',
    answer: (
      <>
        <p className="mb-4">
          <strong>Absolutely!</strong> The week is yours, and we ensure you have plenty of time to relax and recharge during your <strong>Renasco Retreats</strong> experience.
        </p>
        <p className="mb-4">
          Our fitness retreats are not designed to feel like a strict bootcamp. We program a bunch of exciting activities into the itinerary that we'd love for you to get involved with, but participation is flexible.
        </p>
        <p>
          You are free to tailor your experience: join every high-energy session, or take a day off to chill by the pool, explore the local area, and enjoy some personal downtime. The structure allows you to build the perfect balance of fitness and relaxation.
        </p>
      </>
    ),
  },
  {
    id: 'getting-there',
    question: 'How do I get there?',
    answer: (
      <>
        <p>
          You'll fly into <strong>Athens International Airport</strong>, which is well connected with direct flights from most major airports, including London Gatwick and Heathrow. From there, we'll organise a group transfer straight to the villa — it takes around <strong>2 hours</strong> and brings you right to your 5★ home for the week.
        </p>
      </>
    ),
  },
  {
    id: 'not-included',
    question: "What's not included?",
    answer: (
      <>
        <p className="mb-4">A few bits to be aware of:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Flights</strong> — we'll recommend the best flight options to line up with our organised transfer.</li>
          <li><strong>Alcohol</strong> — we're happy to order any requested alcohol for the villa, but this will be an additional cost.</li>
          <li><strong>One meal out</strong> — one evening we'll eat at a top local restaurant. The bill will be split on the night and isn't included in the retreat price.</li>
          <li><strong>Massages</strong> — available to book on request, but not included in the booking cost.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'weather',
    question: "What's the weather like?",
    answer: (
      <>
        <p>
          June is pretty perfect. Expect warm, dry, sunny days with temperatures around <strong>28–29°C</strong>, and comfortable evenings cooling down to around <strong>17–20°C</strong>. Think sunshine, blue skies, and ideal conditions for training, swimming, and relaxing.
        </p>
      </>
    ),
  },
  {
    id: 'packing',
    question: 'What should I pack?',
    answer: (
      <>
        <p className="mb-4">It's your week — pack for your vibe. We suggest:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Plenty of workout gear</li>
          <li>Swimwear (you'll use it a lot)</li>
          <li>Comfortable clothes for exploring local towns</li>
          <li>Something nice for our evening out (or comfies if that's more your vibe)</li>
          <li>A light layer or cardigan for the evenings</li>
          <li>Running trainers and skipping ropes if you have them</li>
        </ul>
      </>
    ),
  },
];

export function FAQsPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const faqsRef = useRef<HTMLDivElement>(null);
  
  const [openId, setOpenId] = useState<string | null>('age-range');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (typeof faq.answer === 'string' && faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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

      // Search bar animation
      gsap.fromTo(
        searchRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: searchRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // FAQs animation
      gsap.fromTo(
        faqsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: faqsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section ref={sectionRef} className="bg-[#f5f0e8]">
      {/* Hero Section with Video */}
      <div className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 overflow-hidden bg-[#2a4a4a]">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src="/images/faq.mp4"
          >
            <source src="/images/faq.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Title */}
        <h1
          ref={heroTitleRef}
          className="relative z-10 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-wide"
        >
          FAQs
        </h1>
      </div>

      {/* FAQs Section */}
      <div className="py-16 md:py-24">
        <div className="container-custom max-w-4xl mx-auto">
          {/* Search Bar */}
          <div ref={searchRef} className="mb-12">
            <div className="relative max-w-md ml-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Looking for something?"
                className="w-full py-3 px-5 pr-10 bg-white border border-gray-200 rounded-[2rem] text-gray-700 placeholder-gray-500 focus:outline-none focus:border-[#008080] transition-colors"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            </div>
          </div>

          {/* FAQ Items */}
          <div ref={faqsRef} className="space-y-4">
            {filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className={`border-2 rounded-[2rem] transition-all duration-300 ${
                  openId === faq.id 
                    ? 'border-[#008080]' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {/* Question */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-lg md:text-xl font-medium text-gray-800 pr-8">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`w-6 h-6 text-gray-600 flex-shrink-0 transition-transform duration-300 ${
                      openId === faq.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Answer */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openId === faq.id ? 'max-h-[2000px]' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                    {faq.answer}
                    <button 
                      className="mt-4 text-gray-400 hover:text-[#008080] transition-colors"
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/faqs#${faq.id}`);
                      }}
                      title="Copy link to this FAQ"
                    >
                      <Link2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No FAQs found matching your search.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
