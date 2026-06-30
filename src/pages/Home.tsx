import { useState, useEffect, useRef } from 'react';
import { Project } from '../types';
import { PROJECTS, PERSONAL_INFO } from '../data';
import NumberShuffle from '../components/NumberShuffle';
import ArrowLaunch from '../components/ArrowLaunch';
import Hero from '../components/Hero';
import { ArrowDown, TrendingUp, Sparkles, AlertCircle, ArrowUpRight, Award, Zap, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AsciiArt from '../components/AsciiArt';
import { VARUNPREET_ASCII_ART } from '../data/asciiArt';

interface HomeProps {
  onNavigateToPage: (page: 'home' | 'work' | 'about' | 'resume' | 'contact') => void;
  onSelectProject: (project: Project) => void;
}

// Custom animated independent digits transition
const AnimatedNumber = ({ numberStr }: { numberStr: string }) => {
  const digits = numberStr.split("");
  return (
    <span className="inline-flex font-mono text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-light tracking-tight text-[#5B8DFF]/90 select-none mr-4 lg:mr-6 align-baseline leading-none">
      {digits.map((digit, i) => (
        <span key={i} className="inline-block overflow-hidden h-[0.9em] leading-none">
          <motion.span
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.7,
              delay: i * 0.08, // 50-100ms stagger
              ease: [0.22, 1, 0.36, 1], // cubic-bezier ease
            }}
            className="block"
          >
            {digit}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export default function Home({ onNavigateToPage, onSelectProject }: HomeProps) {
  const featuredProjects = PROJECTS; // Shows all curated projects

  const block1Ref = useRef<HTMLDivElement>(null);
  const block2Ref = useRef<HTMLDivElement>(null);
  const block3Ref = useRef<HTMLDivElement>(null);
  const block4Ref = useRef<HTMLDivElement>(null);

  const handleAboutProgress = (progress: number) => {
    // block 1 (UX Beginnings): trigger starts at 0.70, finishes at 0.85
    if (block1Ref.current) {
      const t1 = Math.max(0, Math.min(1, (progress - 0.70) / 0.15));
      block1Ref.current.style.opacity = t1.toString();
      block1Ref.current.style.transform = `translateY(${(1 - t1) * 30}px)`;
    }
    // block 2 (Natural Curiosity): trigger starts at 0.77, finishes at 0.92
    if (block2Ref.current) {
      const t2 = Math.max(0, Math.min(1, (progress - 0.77) / 0.15));
      block2Ref.current.style.opacity = t2.toString();
      block2Ref.current.style.transform = `translateY(${(1 - t2) * 30}px)`;
    }
    // block 3 (Unified Focus): trigger starts at 0.84, finishes at 0.99
    if (block3Ref.current) {
      const t3 = Math.max(0, Math.min(1, (progress - 0.84) / 0.15));
      block3Ref.current.style.opacity = t3.toString();
      block3Ref.current.style.transform = `translateY(${(1 - t3) * 30}px)`;
    }
    // block 4 (Current Interests): trigger starts at 0.90, finishes at 1.00
    if (block4Ref.current) {
      const t4 = Math.max(0, Math.min(1, (progress - 0.90) / 0.10));
      block4Ref.current.style.opacity = t4.toString();
      block4Ref.current.style.transform = `translateY(${(1 - t4) * 30}px)`;
    }
  };

  // GSAP+ScrollTrigger hand-crafted mechanical vertical slot ticker transition of project numbers
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      interface CardGeometry {
        element: HTMLElement;
        digitFirst: HTMLElement | null;
        digitSecond: HTMLElement | null;
        cardIndex: number;
        cardTop: number;
        initialTop: number;
        s_curr: number;
        height: number;
      }

      let cachedCards: CardGeometry[] = [];

      const updateGeometryCache = () => {
        const cardElements = document.querySelectorAll('.project-card');
        cachedCards = Array.from(cardElements).map((cardEl, idx) => {
          const el = cardEl as HTMLElement;
          const digFirst = el.querySelector('.digit-first') as HTMLElement | null;
          const digSecond = el.querySelector('.digit-second') as HTMLElement | null;
          
          const rect = el.getBoundingClientRect();
          const cardTop = rect.top + window.scrollY;
          const initialTop = idx === 0 ? 0 : 40;
          const Y_rest_internal = 180;
          const s_curr = cardTop + initialTop - Y_rest_internal;
          
          return {
            element: el,
            digitFirst: digFirst,
            digitSecond: digSecond,
            cardIndex: idx,
            cardTop,
            initialTop,
            s_curr,
            height: el.offsetHeight,
          };
        });
      };

      // Direct, fast spatial-to-local translation calculation preventing jitter and float drift
      const Y_rest = 180;
      const transitionDistance = 560;

      const calculateYForS = (S: number, card: CardGeometry, allCards: CardGeometry[]) => {
        const idx = card.cardIndex;
        const s_curr = card.s_curr;
        const cardTop_idx = card.cardTop;
        const initialTop_idx = card.initialTop;
        
        const hasPrev = idx > 0;
        const t_prev = hasPrev ? (s_curr - transitionDistance) : -99999;
        
        const hasNext = idx < allCards.length - 1;
        const nextCard = hasNext ? allCards[idx + 1] : null;
        const t_curr = nextCard ? (nextCard.s_curr - transitionDistance) : (s_curr + card.height - transitionDistance);
        const s_next = nextCard ? nextCard.s_curr : (s_curr + card.height);

        const getExitY = (digitIndex: number) => {
          if (idx === 0) {
            if (S <= s_curr) {
              return 0;
            } else if (S < t_curr) {
              const naturalVY = cardTop_idx - S + initialTop_idx;
              return Y_rest - naturalVY;
            } else if (S < s_next) {
              const p = (S - t_curr) / transitionDistance;
              // Stagger the second digit (digitIndex 1) so it starts moving later
              const delay = digitIndex === 0 ? 0 : 0.15;
              const pStaggered = Math.min(1, Math.max(0, (p - delay) / (1 - delay)));
              const pEased = gsap.parseEase("power1.in")(pStaggered);
              
              const targetVY = Y_rest - transitionDistance * pEased;
              const naturalVY = cardTop_idx - S + initialTop_idx;
              return targetVY - naturalVY;
            } else {
              const finalS = s_next;
              const targetVY = Y_rest - transitionDistance;
              const naturalVY = cardTop_idx - finalS + initialTop_idx;
              return targetVY - naturalVY;
            }
          } else {
            if (S <= t_prev) {
              return 0;
            } else if (S < s_curr) {
              const p = (S - t_prev) / transitionDistance;
              const baseDelay = 0.15;
              const digitDelay = digitIndex === 0 ? 0 : 0.15;
              const totalDelay = baseDelay + digitDelay * (1 - baseDelay);
              const pStaggered = Math.max(0, (p - totalDelay) / (1 - totalDelay));
              const pEased = gsap.parseEase("power2.out")(pStaggered);
              
              const targetVY = Y_rest + transitionDistance * (1 - pEased);
              const naturalVY = cardTop_idx - S + initialTop_idx;
              return targetVY - naturalVY;
            } else if (S < t_curr) {
              const naturalVY = cardTop_idx - S + initialTop_idx;
              return Y_rest - naturalVY;
            } else if (S < s_next) {
              const p = (S - t_curr) / transitionDistance;
              const delay = digitIndex === 0 ? 0 : 0.15;
              const pStaggered = Math.min(1, Math.max(0, (p - delay) / (1 - delay)));
              const pEased = gsap.parseEase("power1.in")(pStaggered);
              
              const targetVY = Y_rest - transitionDistance * pEased;
              const naturalVY = cardTop_idx - S + initialTop_idx;
              return targetVY - naturalVY;
            } else {
              const finalS = s_next;
              const targetVY = Y_rest - transitionDistance;
              const naturalVY = cardTop_idx - finalS + initialTop_idx;
              return targetVY - naturalVY;
            }
          }
        };

        return [getExitY(0), getExitY(1)];
      };

      // Perform initial layout measurements
      updateGeometryCache();

      // Continuous loop of coordinate mappings driven by scroll position
      const scrollTriggerInstance = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: () => {
          const S = window.scrollY;
          cachedCards.forEach((card) => {
            const [y1, y2] = calculateYForS(S, card, cachedCards);
            
            // Calculate where the solid plane is relative to this card top in local coords
            const naturalVY = card.cardTop - S + card.initialTop;
            const y_solid_plane = Y_rest - naturalVY;

            const dy1 = y_solid_plane - y1;
            const dy2 = y_solid_plane - y2;

            const clip1 = dy1 > 0.1 ? `inset(${dy1}px 0px 0px 0px)` : "none";
            const clip2 = dy2 > 0.1 ? `inset(${dy2}px 0px 0px 0px)` : "none";

            if (card.digitFirst) {
              gsap.set(card.digitFirst, { y: y1, clipPath: clip1 });
            }
            if (card.digitSecond) {
              gsap.set(card.digitSecond, { y: y2, clipPath: clip2 });
            }
          });
        }
      });

      // Recalibrate layouts continuously on ScrollTrigger refreshes, orientation shifts or system resizes
      ScrollTrigger.addEventListener("refresh", updateGeometryCache);
      window.addEventListener("resize", updateGeometryCache);

      // Force instant updates so components don't flick on initial paint
      setTimeout(() => {
        updateGeometryCache();
        scrollTriggerInstance.update();
      }, 100);

      return () => {
        ScrollTrigger.removeEventListener("refresh", updateGeometryCache);
        window.removeEventListener("resize", updateGeometryCache);
        scrollTriggerInstance.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  // Staggered layout parameters for list animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="bg-[#FAFAFA] text-[#111111] min-h-screen">
      
      {/* 1. HERO SECTION */}
      <Hero onNavigateToPage={onNavigateToPage} />



      {/* 3. MANIFESTO SECTION */}
      <section className="py-24 relative">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-8 md:px-12 w-full text-center">
          <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <blockquote 
              style={{ fontSize: '36px', fontWeight: 250 }}
              className="text-2xl sm:text-3xl md:text-4xl font-sans tracking-tight leading-snug text-[#111111] mb-8 select-none"
            >
              "Products fail when business goals, user needs, and technology move in different directions. <span style={{ fontWeight: 300 }} className="text-[#3B6FD6]">I design experiences that bring them together.</span>"
            </blockquote>
            <p className="font-sans font-normal text-xs text-zinc-500 tracking-widest uppercase">
              Rigorous Product Thinking • Design Engineering Aware
            </p>
          </motion.div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED WORK */}
      <section id="case-studies" className="py-24 bg-[#f1f5f8]">
        <div 
          className="mx-auto w-full max-w-[1360px] px-6 sm:px-8 md:px-12 lg:px-0"
        >
          <div className="flex flex-col sm:flex-row justify-between items-baseline mb-28 w-full">
            <div>
              <h2 className="text-[48px] font-sans font-[250] tracking-tight text-[#111111] leading-none">Featured Case Studies</h2>
            </div>
          </div>

          {/* High-fidelity case studies list inside 1360px container boundary */}
          <div className="space-y-[120px] w-full">
              {featuredProjects.map((project, idx) => (
                <div 
                  key={project.id} 
                  id={`project-${project.id}`}
                  onClick={() => onSelectProject(project)}
                  className={`project-card group cursor-pointer block relative ${idx === 0 ? 'border-t-0 pt-0' : 'border-t border-zinc-200/80 pt-10'} ml-auto w-full max-w-[1200px]`}
                >
                  <div 
                    className="absolute left-[-160px] w-[140px] pointer-events-none hidden xl:block"
                    style={{
                      top: idx === 0 ? '0px' : '40px',
                      bottom: '0px'
                    }}
                  >
                    <div className="project-number text-[64px] font-sans font-medium text-black select-none flex items-center h-[54px] w-fit leading-none absolute top-0 left-0">
                      <span className="digit-first inline-block">{String(idx + 1).padStart(2, '0').charAt(0)}</span>
                      <span className="digit-second inline-block">{String(idx + 1).padStart(2, '0').charAt(1)}</span>
                    </div>
                  </div>
                  {/* Two-row grid metadata layout aligning perfectly with screenshot inside container boundaries */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start mb-6">
                    
                    {/* Column 1: Title, Year pill, and dynamic rounded See it live CTA button */}
                    <div className="md:col-span-4 space-y-3.5">
                      <div className="space-y-1 w-fit">
                        <h3 className="font-sans text-3xl sm:text-[36px] font-light leading-[44px] tracking-tight text-neutral-900 group-hover:text-[#3B6FD6] transition-colors duration-300 w-fit">
                          {project.title}
                        </h3>
                        <p 
                          className="text-base sm:text-lg font-sans font-light tracking-tight text-zinc-500"
                          style={project.id === 'finroute-ai' ? { lineHeight: '30px' } : undefined}
                        >
                          {project.subtitle}
                        </p>
                      </div>

                      {/* Year pill container removed */}
                    </div>

                    {/* Column 2: Challenge Label and content */}
                    <div className="md:col-span-4 space-y-2">
                      <span className="text-[20px] font-sans text-neutral-800 block tracking-wider font-semibold">
                        Challenge:
                      </span>
                      <p className="text-[16px] text-zinc-650 leading-relaxed font-sans font-light">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Column 3: Role Label and description */}
                    <div className="md:col-span-4 space-y-2">
                      <span className="text-[20px] font-sans text-neutral-800 block tracking-wider font-semibold">
                        Role:
                      </span>
                      <p className="text-[16px] text-zinc-650 leading-relaxed font-sans font-light">
                        {project.id === 'finroute-ai' 
                          ? "Led full platform design and mockups, defining the visual language and user flows for a dynamic market launch."
                          : project.id === 'healthsync-mobile'
                          ? "Led user experience design, creating guided video-recording interfaces, integrated teleprompter systems, and accessible audio/video indicators."
                          : "Engineered multi-brand design tokens, standardizing colors, typography, grids and automated export systems."}
                      </p>
                    </div>

                  </div>

                  {/* 4. Large Featured Image Mockup inside container boundary with smooth interactive hover reveal */}
                  <div className={`w-full max-w-[1200px] ${(project.id === 'finroute-ai' || project.id === 'healthsync-mobile') ? 'aspect-[1200/675]' : 'aspect-[1200/800]'} border border-zinc-200/80 bg-zinc-50 overflow-hidden rounded-xl relative shadow-3xs group/img mx-auto`}>
                    <img
                      src={project.mockupUrl}
                      alt={project.imageAlt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain group-hover:scale-[1.005] transition-all duration-700 ease-out"
                    />
                    
                    {/* Explore CTA overlay on hover */}
                    
                    <div className="absolute bottom-6 right-6 flex items-center gap-2 pl-5 pr-4 h-[44px] bg-white text-[#111111] font-sans font-[400] text-[15px] rounded-[6px] tracking-wide border border-[#111111] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-md hover:bg-[#111111] hover:text-white select-none group/btn">
                      <span>Explore Case Study</span>
                      <svg 
                        viewBox="0 0 512 512" 
                        className="w-[11px] h-[11px] transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg" 
                      >
                        <path d="m512 32v359.2a32 32 0 0 1 -64 0v-281.945l-393.372 393.372a32 32 0 0 1 -45.256-45.254l393.373-393.373h-281.945a32 32 0 0 1 0-64h359.2a32 32 0 0 1 32 32z" fill="currentColor"></path>
                      </svg>
                    </div>
                  </div>

                </div>
              ))}
            </div>

        </div>
      </section>

      {/* 6. ABOUT SECTION */}
      
      {/* 6A. DESKTOP VERSION (Scroll-pinned layout) */}
      <section id="about-section" className="hidden lg:block relative w-full h-[300vh] bg-[#000000] text-[#FAFAFA] border-t border-zinc-900">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-start pt-8 lg:pt-10 pb-20 lg:pb-24 overflow-hidden">
          
          {/* Absolute Background Canvas for Full Viewport Particle Animation */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <AsciiArt 
              asciiText={VARUNPREET_ASCII_ART} 
              onProgress={handleAboutProgress}
              heightMode="viewport"
            />
          </div>

          <div className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-0 w-full flex flex-col justify-start h-full relative z-10">
            
            {/* Section Header Statement - Capsule Pill style matching screenshot */}
            <div className="mb-12 w-full flex justify-between items-center">
              <div className="border border-zinc-800 bg-zinc-900/30 px-4 py-1.5 rounded-[4px] font-sans text-[11px] font-normal uppercase tracking-widest text-zinc-400 select-none">
                Hi, I'm Varunpreet
              </div>
            </div>
            {/* Main 3-Column 2-Row Layout to guarantee perfect top-alignment of both rows */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-y-28 gap-x-8 lg:gap-x-12 items-start w-full relative">
              
              {/* Block 1 (UX Beginnings) - Left Column Row 1 */}
              <div 
                ref={block1Ref} 
                className="lg:col-span-3 lg:col-start-1 lg:row-start-1 flex flex-col opacity-0 translate-y-[30px] will-change-[transform,opacity]"
              >
                <h3 className="font-sans text-lg sm:text-xl font-normal text-zinc-100 tracking-tight hover:text-[#5D8EE8] transition-colors duration-300">
                  UX Beginnings
                </h3>
                <div className="h-[1px] w-full bg-[#5D8EE8]/60 mt-1.5 mb-3.5" />
                <p className="text-zinc-300 leading-relaxed font-light text-sm sm:text-base">
                  I started my career as a UX Intern and quickly learned that successful products are rarely design problems alone.
                </p>
              </div>

              {/* Block 2 (Natural Curiosity) - Left Column Row 2 (Top-aligned with Block 4) */}
              <div 
                ref={block2Ref} 
                className="lg:col-span-3 lg:col-start-1 lg:row-start-2 flex flex-col opacity-0 translate-y-[30px] will-change-[transform,opacity]"
              >
                <h3 className="font-sans text-lg sm:text-xl font-normal text-zinc-100 tracking-tight hover:text-[#5D8EE8] transition-colors duration-300">
                  Natural Curiosity
                </h3>
                <div className="h-[1px] w-full bg-[#5D8EE8]/60 mt-1.5 mb-3.5" />
                <p className="text-zinc-300 leading-relaxed font-light text-sm sm:text-base">
                  Growing up, I was fascinated by shows like <span className="italic">How It's Made</span> and <span className="italic">How Do They Do It?</span>. Understanding how things worked behind the scenes—from engineering and technology to business strategy—eventually led me to product design.
                </p>
              </div>

              {/* Center Column Spacer - Spans both rows for ASCII Art background alignment */}
              <div className="lg:col-span-6 lg:col-start-4 lg:row-start-1 lg:row-span-2 flex items-center justify-center min-h-[350px] lg:min-h-[450px]">
                {/* Empty container preserving visual slot spacing for centered portrait */}
              </div>

              {/* Block 3 (Unified Focus) - Right Column Row 1 */}
              <div 
                ref={block3Ref} 
                className="lg:col-span-3 lg:col-start-10 lg:row-start-1 flex flex-col opacity-0 translate-y-[30px] will-change-[transform,opacity]"
              >
                <h3 className="font-sans text-lg sm:text-xl font-normal text-zinc-100 tracking-tight hover:text-[#5D8EE8] transition-colors duration-300">
                  Unified Focus
                </h3>
                <div className="h-[1px] w-full bg-[#5D8EE8]/60 mt-1.5 mb-3.5" />
                <p className="text-zinc-300 leading-relaxed font-light text-sm sm:text-base">
                  Today, I focus on creating products where user needs, business goals, and technical realities move in the same direction.
                </p>
              </div>

              {/* Block 4 (Current Interests) - Right Column Row 2 (Top-aligned with Block 2) */}
              <div 
                ref={block4Ref} 
                className="lg:col-span-3 lg:col-start-10 lg:row-start-2 flex flex-col opacity-0 translate-y-[30px] will-change-[transform,opacity]"
              >
                <h3 className="font-sans text-lg sm:text-xl font-normal text-zinc-100 tracking-tight hover:text-[#5D8EE8] transition-colors duration-300">
                  Current Interests
                </h3>
                <div className="h-[1px] w-full bg-[#5D8EE8]/60 mt-1.5 mb-3.5" />
                <div className="flex flex-wrap gap-2.5 sm:gap-3 font-sans">
                  {["Automobiles", "PC Hardware", "Technology", "Product Strategy"].map((interest) => (
                    <span 
                      key={interest} 
                      className="px-3.5 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/40 text-zinc-300 text-xs sm:text-sm hover:text-white hover:border-zinc-700 transition-all duration-300 select-none"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 6B. MOBILE & TABLET VERSION (Fully vertical scrollable stack layout) */}
      <section id="about-section-mobile" className="block lg:hidden py-16 bg-[#000000] text-[#FAFAFA] border-t border-zinc-900">
        <div className="max-w-[640px] mx-auto px-6 sm:px-8 w-full flex flex-col items-center">
          
          {/* Header Pill */}
          <div className="mb-2 self-start">
            <div className="border border-zinc-800 bg-zinc-900/30 px-4 py-1.5 rounded-[4px] font-sans text-[11px] font-normal uppercase tracking-widest text-zinc-400 select-none">
              Hi, I'm Varunpreet
            </div>
          </div>

          {/* ASCII Art Component - Dynamically scaled inline component fitting screen width */}
          <div className="w-full mb-6 flex justify-center">
            <AsciiArt 
              asciiText={VARUNPREET_ASCII_ART} 
              heightMode="fit"
              scrollDriven={false}
            />
          </div>

          {/* Stacked Content Blocks in a single clean column */}
          <div className="w-full flex flex-col space-y-12">
            {/* Block 1 (UX Beginnings) */}
            <div className="flex flex-col">
              <h3 className="font-sans text-lg sm:text-xl font-normal text-zinc-100 tracking-tight">
                UX Beginnings
              </h3>
              <div className="h-[1px] w-full bg-[#5D8EE8]/60 mt-1.5 mb-3.5" />
              <p className="text-zinc-300 leading-relaxed font-light text-sm sm:text-base">
                I started my career as a UX Intern and quickly learned that successful products are rarely design problems alone.
              </p>
            </div>

            {/* Block 2 (Natural Curiosity) */}
            <div className="flex flex-col">
              <h3 className="font-sans text-lg sm:text-xl font-normal text-zinc-100 tracking-tight">
                Natural Curiosity
              </h3>
              <div className="h-[1px] w-full bg-[#5D8EE8]/60 mt-1.5 mb-3.5" />
              <p className="text-zinc-300 leading-relaxed font-light text-sm sm:text-base">
                Growing up, I was fascinated by shows like <span className="italic">How It's Made</span> and <span className="italic">How Do They Do It?</span>. Understanding how things worked behind the scenes—from engineering and technology to business strategy—eventually led me to product design.
              </p>
            </div>

            {/* Block 3 (Unified Focus) */}
            <div className="flex flex-col">
              <h3 className="font-sans text-lg sm:text-xl font-normal text-zinc-100 tracking-tight">
                Unified Focus
              </h3>
              <div className="h-[1px] w-full bg-[#5D8EE8]/60 mt-1.5 mb-3.5" />
              <p className="text-zinc-300 leading-relaxed font-light text-sm sm:text-base">
                Today, I focus on creating products where user needs, business goals, and technical realities move in the same direction.
              </p>
            </div>

            {/* Block 4 (Current Interests) */}
            <div className="flex flex-col">
              <h3 className="font-sans text-lg sm:text-xl font-normal text-zinc-100 tracking-tight">
                Current Interests
              </h3>
              <div className="h-[1px] w-full bg-[#5D8EE8]/60 mt-1.5 mb-3.5" />
              <div className="flex flex-wrap gap-2.5 sm:gap-3 font-sans">
                {["Automobiles", "PC Hardware", "Technology", "Product Strategy"].map((interest) => (
                  <span 
                    key={interest} 
                    className="px-3.5 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/40 text-zinc-300 text-xs sm:text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. CONTACT CTA */}
      <section className="py-24 text-center relative overflow-hidden bg-[#1b1b1b] text-white">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-8 md:px-12 w-full relative z-10">
          <div className="max-w-[1250px] mx-auto">
          <h2 
            className="font-sans tracking-tight text-white mb-8"
            style={{ fontWeight: 250, fontSize: 'clamp(28px, 4.5vw, 56px)', lineHeight: '1.2' }}
          >
            Building Something Meaningful?
          </h2>
          <div className="max-w-[1150px] mx-auto space-y-4 mb-10 w-full px-2">
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light mx-auto max-w-[1150px] w-full">
              I partner with teams to transform user insights, business objectives, and product strategy into experiences that create measurable impact.
            </p>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light mx-auto max-w-[1150px] w-full">
              If you're looking for a designer who combines UX, product thinking, and AI-assisted workflows, let's connect.
            </p>
          </div>
 
          <motion.button
            onClick={() => onNavigateToPage('contact')}
            initial="initial"
            whileHover="hover"
            animate="initial"
            className="relative pl-8 pr-6 py-3.5 font-sans font-[400] text-[16px] rounded-[6px] tracking-wide shadow-sm focus:outline-none cursor-pointer overflow-hidden inline-flex items-center justify-center gap-2 bg-transparent text-white border border-white/20"
          >
            {/* Premium color-wipe sliding sheet */}
            <motion.div
              className="absolute inset-0 bg-[#FFFFFF]"
              variants={{
                initial: { x: "-101%" },
                hover: { x: "0%" }
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Foreground text positioned above the sliding layer */}
            <motion.span
              className="relative z-10 block whitespace-nowrap font-sans"
              variants={{
                initial: { color: "#ffffff" },
                hover: { color: "#111111" }
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Get in Touch
            </motion.span>

            {/* Vertical cylindrical rolling 3D arrow container */}
            <div 
              className="relative z-10 overflow-hidden inline-flex items-center justify-center select-none"
              style={{ 
                height: '16px', 
                width: '16px',
                perspective: '150px',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Primary Arrow: rolls up and out of view */}
              <motion.span
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                variants={{
                  initial: { 
                    y: "0%", 
                    rotateX: 0, 
                    opacity: 1, 
                    color: "#ffffff" 
                  },
                  hover: { 
                    y: "-110%", 
                    rotateX: 85, 
                    opacity: 0, 
                    color: "#111111" 
                  }
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  transformOrigin: 'center bottom',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  willChange: 'transform, opacity',
                }}
              >
                <svg 
                  viewBox="0 0 512 512" 
                  className="w-[11px] h-[11px]"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg" 
                >
                  <path d="m512 32v359.2a32 32 0 0 1 -64 0v-281.945l-393.372 393.372a32 32 0 0 1 -45.256-45.254l393.373-393.373h-281.945a32 32 0 0 1 0-64h359.2a32 32 0 0 1 32 32z" fill="currentColor"></path>
                </svg>
              </motion.span>

              {/* Secondary Arrow: rolls in from below */}
              <motion.span
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                variants={{
                  initial: { 
                    y: "110%", 
                    rotateX: -85, 
                    opacity: 0, 
                    color: "#ffffff" 
                  },
                  hover: { 
                    y: "0%", 
                    rotateX: 0, 
                    opacity: 1, 
                    color: "#111111" 
                  }
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  transformOrigin: 'center top',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  willChange: 'transform, opacity',
                }}
              >
                <svg 
                  viewBox="0 0 512 512" 
                  className="w-[11px] h-[11px]"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg" 
                >
                  <path d="m512 32v359.2a32 32 0 0 1 -64 0v-281.945l-393.372 393.372a32 32 0 0 1 -45.256-45.254l393.373-393.373h-281.945a32 32 0 0 1 0-64h359.2a32 32 0 0 1 32 32z" fill="currentColor"></path>
                </svg>
              </motion.span>
            </div>
          </motion.button>
          </div>
        </div>
      </section>

    </div>
  );
}
