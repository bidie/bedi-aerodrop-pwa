import { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  MapPin, 
  Package, 
  Clock, 
  Shield, 
  Zap, 
  Navigation as NavigationIcon,
  ChevronRight,
  Phone,
  Mail,
  ExternalLink,
  CheckCircle2,
  TrendingUp,
  Users,
  Store
} from 'lucide-react';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// Navigation Component
function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
    }`}>
      <div className="flex items-center justify-between px-6 lg:px-12 py-4">
        <div className="font-display font-bold text-xl text-[#111827]">
          AeroDrop
        </div>
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection('how-it-works')} className="text-sm font-medium text-[#5A6478] hover:text-[#111827] transition-colors">
            How it works
          </button>
          <button onClick={() => scrollToSection('coverage')} className="text-sm font-medium text-[#5A6478] hover:text-[#111827] transition-colors">
            Coverage
          </button>
          <button onClick={() => scrollToSection('partners')} className="text-sm font-medium text-[#5A6478] hover:text-[#111827] transition-colors">
            Business
          </button>
          <button onClick={() => scrollToSection('testimonials')} className="text-sm font-medium text-[#5A6478] hover:text-[#111827] transition-colors">
            Support
          </button>
        </div>
        <button onClick={() => scrollToSection('request')} className="btn-primary text-sm py-2.5 px-5">
          Request a delivery
        </button>
      </div>
    </nav>
  );
}

// Section 1: Hero
function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const droneRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const drone = droneRef.current;
    const card = cardRef.current;
    if (!section || !drone || !card) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      gsap.fromTo(drone, 
        { y: '18vh', scale: 0.92, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 1.1, ease: 'power2.out' }
      );
      gsap.fromTo(card,
        { x: '10vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: 'power2.out', delay: 0.15 }
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
          onLeaveBack: () => {
            gsap.set(drone, { x: 0, y: 0, scale: 1, opacity: 1 });
            gsap.set(card, { x: 0, opacity: 1 });
          }
        }
      });

      // EXIT phase (70% - 100%)
      scrollTl.fromTo(card,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(drone,
        { x: 0, y: 0, scale: 1, opacity: 1 },
        { x: '-22vw', y: '-10vh', scale: 0.92, opacity: 0.35, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToRequest = () => {
    const element = document.getElementById('request');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="section-pinned sky-gradient z-10" id="hero">
      {/* Decorative clouds */}
      <div className="absolute top-20 left-10 w-32 h-16 bg-white/30 rounded-full blur-xl cloud-drift" />
      <div className="absolute top-40 right-20 w-48 h-20 bg-white/25 rounded-full blur-2xl cloud-drift" style={{ animationDelay: '-4s' }} />
      
      {/* Drone Image */}
      <img 
        ref={droneRef}
        src="/drone-hero.png" 
        alt="Delivery Drone"
        className="absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2 w-[min(78vw,1100px)] z-[3] drone-hover"
      />
      
      {/* Content Card */}
      <div 
        ref={cardRef}
        className="absolute right-[7vw] top-[18vh] w-[38vw] min-w-[320px] max-w-[520px] z-10"
      >
        <div className="hud-card p-8 lg:p-10">
          <span className="label-mono block mb-4">Autonomous Delivery</span>
          <h1 className="font-display font-bold text-4xl lg:text-5xl xl:text-6xl text-[#111827] leading-[0.95] tracking-tight mb-6">
            Delivery,<br />Reimagined.
          </h1>
          <p className="text-[#5A6478] text-base lg:text-lg leading-relaxed mb-8">
            Autonomous drones for the last mile. Fast, quiet, and built for everyday logistics.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={scrollToRequest} className="btn-primary flex items-center gap-2">
              Request a delivery
              <ChevronRight className="w-4 h-4" />
            </button>
            <button onClick={() => document.getElementById('coverage')?.scrollIntoView({ behavior: 'smooth' })} className="btn-secondary">
              See coverage
            </button>
          </div>
          <button onClick={() => document.getElementById('partners')?.scrollIntoView({ behavior: 'smooth' })} className="mt-6 text-sm text-[#5A6478] hover:text-[#FF4D2E] transition-colors flex items-center gap-1">
            Partner with us
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </section>
  );
}

// Section 2: Request Delivery Form
function RequestSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const droneRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const drone = droneRef.current;
    const card = cardRef.current;
    if (!section || !drone || !card) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(drone,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(card,
        { x: '60vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // EXIT (70% - 100%)
      scrollTl.fromTo(drone,
        { x: 0, y: 0, opacity: 1 },
        { x: '-18vw', y: '-8vh', opacity: 0.35, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(card,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0.25, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Quote request submitted! We\'ll contact you shortly.');
  };

  return (
    <section ref={sectionRef} className="section-pinned sky-gradient z-20" id="request">
      <img 
        ref={droneRef}
        src="/drone-hero.png" 
        alt="Delivery Drone"
        className="absolute left-[8vw] top-[54%] -translate-y-1/2 w-[min(70vw,1040px)] z-[3]"
      />
      
      <div 
        ref={cardRef}
        className="absolute right-[7vw] top-[16vh] w-[40vw] min-w-[340px] max-w-[560px] z-10"
      >
        <div className="hud-card p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#FF4D2E]/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-[#FF4D2E]" />
            </div>
            <h2 className="font-display font-bold text-2xl lg:text-3xl text-[#111827]">
              Request a delivery
            </h2>
          </div>
          <p className="text-[#5A6478] text-sm mb-6">
            Get a quote in seconds. We'll confirm pickup and fly within the hour.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label-mono block mb-2">Pickup Address</label>
              <input type="text" placeholder="Enter pickup location" className="w-full" required />
            </div>
            <div>
              <label className="label-mono block mb-2">Drop-off Address</label>
              <input type="text" placeholder="Enter delivery location" className="w-full" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-mono block mb-2">Package Type</label>
                <select className="w-full">
                  <option>Small parcel</option>
                  <option>Food delivery</option>
                  <option>Medical supplies</option>
                  <option>Documents</option>
                </select>
              </div>
              <div>
                <label className="label-mono block mb-2">Weight</label>
                <select className="w-full">
                  <option>Under 1 kg</option>
                  <option>1-2 kg</option>
                  <option>2-5 kg</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-mono block mb-2">Date</label>
                <input type="date" className="w-full" />
              </div>
              <div>
                <label className="label-mono block mb-2">Time Window</label>
                <select className="w-full">
                  <option>ASAP</option>
                  <option>Within 1 hour</option>
                  <option>Within 2 hours</option>
                  <option>Scheduled</option>
                </select>
              </div>
            </div>
            <div>
              <label className="label-mono block mb-2">Delivery Notes</label>
              <textarea rows={2} placeholder="Any special instructions..." className="w-full resize-none" />
            </div>
            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
              Get quote
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>
          
          <p className="text-xs text-[#5A6478] text-center mt-4">
            No account needed for single deliveries.
          </p>
        </div>
      </div>
    </section>
  );
}

// Section 3: Live Tracking
function TrackingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const droneRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const drone = droneRef.current;
    const card = cardRef.current;
    if (!section || !drone || !card) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
          onEnter: () => {
            if (progressRef.current) {
              progressRef.current.style.width = '72%';
            }
          },
          onLeaveBack: () => {
            if (progressRef.current) {
              progressRef.current.style.width = '0%';
            }
          }
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(drone,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(card,
        { x: '-60vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // EXIT (70% - 100%)
      scrollTl.fromTo(drone,
        { x: 0, y: 0, opacity: 1 },
        { x: '18vw', y: '-8vh', opacity: 0.35, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(card,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0.25, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned sky-gradient z-30" id="how-it-works">
      <img 
        ref={droneRef}
        src="/drone-hero.png" 
        alt="Delivery Drone"
        className="absolute right-[6vw] top-[54%] -translate-y-1/2 w-[min(70vw,1040px)] z-[3]"
      />
      
      <div 
        ref={cardRef}
        className="absolute left-[7vw] top-[18vh] w-[38vw] min-w-[320px] max-w-[520px] z-10"
      >
        <div className="hud-card p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#FF4D2E]/10 flex items-center justify-center">
              <NavigationIcon className="w-5 h-5 text-[#FF4D2E]" />
            </div>
            <h2 className="font-display font-bold text-2xl lg:text-3xl text-[#111827]">
              Live tracking
            </h2>
          </div>
          
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-[#111827]">In flight</span>
            <span className="text-[#5A6478]">•</span>
            <span className="text-sm text-[#5A6478]">Arriving by 2:14 PM</span>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                ref={progressRef}
                className="h-full bg-[#FF4D2E] rounded-full transition-all duration-1000 ease-out"
                style={{ width: '0%' }}
              />
            </div>
            <div className="flex justify-between mt-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-xs font-medium text-[#111827]">Pickup complete</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-[#FF4D2E] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF4D2E]" />
                </div>
                <span className="text-xs font-medium text-[#FF4D2E]">In flight</span>
              </div>
              <div className="flex items-center gap-2 opacity-50">
                <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                <span className="text-xs text-[#5A6478]">Delivered</span>
              </div>
            </div>
          </div>
          
          {/* Map Thumbnail */}
          <div className="relative rounded-xl overflow-hidden mb-4">
            <img 
              src="/map-thumbnail.jpg" 
              alt="Delivery Map"
              className="w-full h-40 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <button className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-medium text-[#111827] hover:bg-white transition-colors flex items-center gap-1">
              View full map
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-[#5A6478]">
              <MapPin className="w-4 h-4" />
              <span>2.4 km away</span>
            </div>
            <div className="flex items-center gap-2 text-[#5A6478]">
              <Clock className="w-4 h-4" />
              <span>~6 min</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Section 4: Safety
function SafetySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const droneRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const drone = droneRef.current;
    const card = cardRef.current;
    if (!section || !drone || !card) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(drone,
        { y: '-40vh', opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(card,
        { y: '40vh', opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // EXIT (70% - 100%)
      scrollTl.fromTo(drone,
        { y: 0, opacity: 1 },
        { y: '-12vh', opacity: 0.35, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(card,
        { y: 0, opacity: 1 },
        { y: '18vh', opacity: 0.25, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned sky-gradient z-40">
      <img 
        ref={droneRef}
        src="/drone-hero.png" 
        alt="Delivery Drone"
        className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 w-[min(72vw,1080px)] z-[3]"
      />
      
      <div 
        ref={cardRef}
        className="absolute left-1/2 bottom-[10vh] -translate-x-1/2 w-[46vw] min-w-[340px] max-w-[640px] z-10"
      >
        <div className="hud-card p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF4D2E]/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#FF4D2E]" />
                </div>
                <h2 className="font-display font-bold text-2xl lg:text-3xl text-[#111827]">
                  Built for safety
                </h2>
              </div>
              <p className="text-[#5A6478] text-sm leading-relaxed">
                Redundant rotors, sense-and-avoid, and real-time weather monitoring. If conditions change, the drone lands safely and reroutes.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              <span className="px-3 py-1.5 bg-white/60 rounded-lg text-xs font-mono font-medium tracking-wider text-[#5A6478]">
                SENSE & AVOID
              </span>
              <span className="px-3 py-1.5 bg-white/60 rounded-lg text-xs font-mono font-medium tracking-wider text-[#5A6478]">
                REDUNDANT POWER
              </span>
              <span className="px-3 py-1.5 bg-white/60 rounded-lg text-xs font-mono font-medium tracking-wider text-[#5A6478]">
                GEO FENCING
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Section 5: Use Cases (Flowing)
function UseCasesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;
    if (!section || !heading || !cards) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(heading,
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1,
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          }
        }
      );

      const cardElements = cards.querySelectorAll('.use-case-card');
      gsap.fromTo(cardElements,
        { y: 60, opacity: 0, scale: 0.98 },
        {
          y: 0, opacity: 1, scale: 1,
          stagger: 0.12,
          scrollTrigger: {
            trigger: cards,
            start: 'top 75%',
            end: 'top 50%',
            scrub: true,
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const useCases = [
    {
      image: '/usecase-food.jpg',
      title: 'Food & catering',
      description: 'Hot, fresh, and on time—without the traffic.',
      icon: Store
    },
    {
      image: '/usecase-pharmacy.jpg',
      title: 'Pharmacy & labs',
      description: 'Temperature-aware flights for sensitive payloads.',
      icon: Zap
    },
    {
      image: '/usecase-retail.jpg',
      title: 'Retail & parts',
      description: 'Same-hour delivery for the last mile.',
      icon: Package
    }
  ];

  return (
    <section ref={sectionRef} className="relative z-50 py-24 lg:py-32 sky-gradient" id="use-cases">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={headingRef} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
          <h2 className="font-display font-bold text-3xl lg:text-5xl text-[#111827]">
            Use cases
          </h2>
          <p className="text-[#5A6478] max-w-md">
            From urgent prescriptions to fresh meals—AeroDrop adapts to the payload.
          </p>
        </div>
        
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <div key={index} className="use-case-card hud-card overflow-hidden group cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={useCase.image} 
                  alt={useCase.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <useCase.icon className="w-4 h-4 text-[#FF4D2E]" />
                  <h3 className="font-display font-semibold text-lg text-[#111827]">
                    {useCase.title}
                  </h3>
                </div>
                <p className="text-sm text-[#5A6478]">{useCase.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Section 6: Coverage & Operations
function CoverageSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const droneRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const drone = droneRef.current;
    const card = cardRef.current;
    if (!section || !drone || !card) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(drone,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(card,
        { x: '60vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // EXIT (70% - 100%)
      scrollTl.fromTo(drone,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0.35, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(card,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0.25, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const stats = [
    { label: 'AVG FLIGHT TIME', value: '8 min' },
    { label: 'DELIVERY RADIUS', value: '6 km' },
    { label: 'SUCCESS RATE', value: '99.7%' },
  ];

  return (
    <section ref={sectionRef} className="section-pinned sky-gradient z-60" id="coverage">
      <img 
        ref={droneRef}
        src="/drone-hero.png" 
        alt="Delivery Drone"
        className="absolute left-[6vw] top-[58%] -translate-y-1/2 w-[min(72vw,1080px)] z-[3]"
      />
      
      <div 
        ref={cardRef}
        className="absolute right-[7vw] top-[18vh] w-[40vw] min-w-[320px] max-w-[560px] z-10"
      >
        <div className="hud-card p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#FF4D2E]/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-[#FF4D2E]" />
            </div>
            <h2 className="font-display font-bold text-2xl lg:text-3xl text-[#111827]">
              Coverage & operations
            </h2>
          </div>
          <p className="text-[#5A6478] text-sm mb-6 leading-relaxed">
            We operate within certified corridors and expand based on demand. Real-time routing keeps every flight efficient.
          </p>
          
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-display font-bold text-2xl lg:text-3xl text-[#FF4D2E] mb-1">
                  {stat.value}
                </div>
                <div className="text-xs font-mono tracking-wider text-[#5A6478]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Section 7: Partners
function PartnersSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const droneRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const drone = droneRef.current;
    const card = cardRef.current;
    if (!section || !drone || !card) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(drone,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(card,
        { x: '-60vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // EXIT (70% - 100%)
      scrollTl.fromTo(drone,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0.35, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(card,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0.25, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const partners = [
    { name: 'QuickRx', icon: Zap },
    { name: 'Noodle & Co', icon: Store },
    { name: 'MediFast', icon: TrendingUp },
    { name: 'FreshBox', icon: Package },
  ];

  return (
    <section ref={sectionRef} className="section-pinned sky-gradient z-70" id="partners">
      <img 
        ref={droneRef}
        src="/drone-hero.png" 
        alt="Delivery Drone"
        className="absolute right-[6vw] top-[54%] -translate-y-1/2 w-[min(70vw,1040px)] z-[3]"
      />
      
      <div 
        ref={cardRef}
        className="absolute left-[7vw] top-[22vh] w-[38vw] min-w-[320px] max-w-[520px] z-10"
      >
        <div className="hud-card p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#FF4D2E]/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-[#FF4D2E]" />
            </div>
            <h2 className="font-display font-bold text-2xl lg:text-3xl text-[#111827]">
              Trusted by local teams
            </h2>
          </div>
          <p className="text-[#5A6478] text-sm mb-6 leading-relaxed">
            Integrated with restaurants, pharmacies, and logistics platforms.
          </p>
          
          <div className="flex flex-wrap gap-3 mb-6">
            {partners.map((partner, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 px-4 py-2 bg-white/60 rounded-xl opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
              >
                <partner.icon className="w-4 h-4 text-[#5A6478]" />
                <span className="text-sm font-medium text-[#111827]">{partner.name}</span>
              </div>
            ))}
          </div>
          
          <button className="btn-secondary text-sm w-full">
            Become a partner
          </button>
        </div>
      </div>
    </section>
  );
}

// Section 8: Testimonials (Flowing)
function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;
    if (!section || !heading || !cards) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(heading,
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1,
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          }
        }
      );

      const cardElements = cards.querySelectorAll('.testimonial-card');
      gsap.fromTo(cardElements,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          stagger: 0.15,
          scrollTrigger: {
            trigger: cards,
            start: 'top 75%',
            end: 'top 50%',
            scrub: true,
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const testimonials = [
    {
      quote: "AeroDrop cut our average delivery time by more than half—and our customers notice.",
      name: "Elena Voss",
      role: "Operations Lead, QuickRx Pharmacy",
      avatar: "/avatar-elena.jpg"
    },
    {
      quote: "Setup took a day. Now we offer 15-minute delivery without adding drivers.",
      name: "Marcus Chen",
      role: "Owner, Noodle & Co",
      avatar: "/avatar-marcus.jpg"
    }
  ];

  return (
    <section ref={sectionRef} className="relative z-80 py-24 lg:py-32 sky-gradient" id="testimonials">
      <div className="max-w-4xl mx-auto px-6">
        <div ref={headingRef} className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl lg:text-5xl text-[#111827] mb-4">
            What partners say
          </h2>
        </div>
        
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card hud-card p-6">
              <p className="text-[#111827] text-base lg:text-lg leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-[#111827]">{testimonial.name}</div>
                  <div className="text-sm text-[#5A6478]">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Section 9: CTA + Footer
function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const droneRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const overlay = overlayRef.current;
    const drone = droneRef.current;
    const card = cardRef.current;
    const footer = footerRef.current;
    if (!section || !overlay || !drone || !card || !footer) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(overlay,
        { opacity: 0 },
        { opacity: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(drone,
        { y: '-40vh', opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(card,
        { y: '40vh', opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(footer,
        { opacity: 0 },
        { opacity: 1, ease: 'none' },
        0.2
      );

      // EXIT (70% - 100%)
      scrollTl.fromTo(drone,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0.35, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(card,
        { y: 0, opacity: 1 },
        { y: '18vh', opacity: 0.25, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned z-90" id="cta">
      {/* Dark overlay */}
      <div ref={overlayRef} className="absolute inset-0 dark-gradient pointer-events-none" />
      
      <img 
        ref={droneRef}
        src="/drone-hero.png" 
        alt="Delivery Drone"
        className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-[min(72vw,1080px)] z-[3]"
      />
      
      <div 
        ref={cardRef}
        className="absolute left-1/2 bottom-[18vh] -translate-x-1/2 w-[46vw] min-w-[340px] max-w-[640px] z-10"
      >
        <div className="hud-card p-6 lg:p-8 text-center">
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-[#111827] mb-4">
            Ready to fly?
          </h2>
          <p className="text-[#5A6478] mb-6 leading-relaxed">
            Request your first delivery or integrate AeroDrop into your platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => document.getElementById('request')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary flex items-center gap-2"
            >
              Request a delivery
              <ChevronRight className="w-4 h-4" />
            </button>
            <button className="btn-secondary">
              Talk to sales
            </button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div 
        ref={footerRef}
        className="absolute bottom-0 left-0 right-0 z-[12] border-t border-white/10"
      >
        <div className="flex flex-col md:flex-row items-center justify-between px-6 lg:px-12 py-6 gap-4">
          <div className="text-white/60 text-sm">
            © 2026 AeroDrop. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button className="text-white/60 hover:text-white text-sm transition-colors">
              Privacy
            </button>
            <button className="text-white/60 hover:text-white text-sm transition-colors">
              Terms
            </button>
            <button className="text-white/60 hover:text-white text-sm transition-colors flex items-center gap-1">
              <Mail className="w-4 h-4" />
              Contact
            </button>
            <button className="text-white/60 hover:text-white text-sm transition-colors flex items-center gap-1">
              <Phone className="w-4 h-4" />
              Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main App Component
function App() {
  useEffect(() => {
    // Global snap for pinned sections
    const setupGlobalSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
            if (!inPinned) return value;

            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        }
      });
    };

    // Delay to ensure all ScrollTriggers are created
    const timer = setTimeout(setupGlobalSnap, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main className="relative">
        <HeroSection />
        <RequestSection />
        <TrackingSection />
        <SafetySection />
        <UseCasesSection />
        <CoverageSection />
        <PartnersSection />
        <TestimonialsSection />
        <CTASection />
      </main>
    </div>
  );
}

export default App;
