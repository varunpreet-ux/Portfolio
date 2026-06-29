import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'motion/react';
import NumberShuffle from './NumberShuffle';
import ArrowLaunch from './ArrowLaunch';

interface HeroProps {
  onNavigateToPage: (page: 'home' | 'work' | 'about' | 'resume' | 'contact') => void;
}

export default function Hero({ onNavigateToPage }: HeroProps) {
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  const line1Text = "Business-centered";
  const line2Text = "Product designer";

  useEffect(() => {
    // Premium GSAP stagger reveal for the Geist character typography
    const ctx = gsap.context(() => {
      // Find all characters
      const chars = gsap.utils.toArray('.hero-char');
      
      // Animate opacity 0 -> 1 and translateY 120px -> 0
      gsap.fromTo(
        chars,
        {
          y: 120,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          stagger: 0.035, // sleek rapid stagger character-by-character
          delay: 0.15, // layout settling delay
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      className="relative min-h-[100vh] w-full flex flex-col justify-between px-6 sm:px-8 md:px-12 pt-24 pb-0 border-b border-[#EAEAEA] overflow-hidden bg-[#FFF4EA]" 
      style={{
        backgroundImage: 'radial-gradient(circle at bottom right, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 60%), linear-gradient(to bottom, #628AD1 0%, #7C9CDC 25%, #9BB3E7 50%, #C4D3F3 75%, #FFF4EA 100%)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
      id="cinematic-hero-section"
    >

      {/* BACKGROUND LAYER 2: Subtle Grain Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none select-none z-[1] opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
        id="hero-grain-texture"
      />

      {/* FOREGROUND HERO CONTENT STRUCTURE */}
      <div 
        className="w-[1360px] max-w-full mx-auto flex-grow flex flex-col justify-between relative z-10 py-6 sm:py-8 lg:py-12"
      >
        
        {/* TOP ROW: Small Descriptor Label */}
        <div className="w-full text-left" id="hero-descriptor-lbl">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFFFFF]" />
            <span className="font-sans font-[400] text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#FFFFFF]/80">
              PRODUCT DESIGNER / UX STRATEGIST / AI-NATIVE THINKER
            </span>
          </motion.div>
        </div>

        {/* MIDDLE ROW: Massive lightweight text-dominant Editorial Typography */}
        <div className="my-auto py-8 w-full flex flex-col gap-4 select-none" id="hero-middle-typography">
          <h1 
            className="font-sans font-[250] tracking-[-0.04em] leading-none text-[#FFFFFF] w-full"
            style={{ fontFamily: 'Geist' }}
          >
            {/* MOBILE ONLY INTERACTIVE TITLES (Stacked Vertically, Alternating Extreme Left/Right Alignment & Highly Impactful) */}
            <div className="flex md:hidden flex-col w-full gap-1 py-4 select-none">
              {["Business", "centered", "Product", "Designer"].map((word, wordIdx) => {
                const isLeft = wordIdx % 2 === 0;
                return (
                  <div 
                    key={wordIdx}
                    className={`block overflow-hidden py-1 font-sans font-[250] tracking-tight leading-none text-white whitespace-nowrap ${
                      isLeft ? 'self-start text-left' : 'self-end text-right'
                    }`}
                    style={{ fontSize: 'clamp(3.6rem, 19.5vw, 8.5rem)', fontFamily: 'Geist' }}
                  >
                    {word.split("").map((char, i) => (
                      <span key={`mob-${wordIdx}-${i}`} className="hero-char inline-block select-none transform transition-transform duration-75">
                        {char}
                      </span>
                    ))}
                  </div>
                );
              })}
            </div>

            {/* DESKTOP/TABLET (Medium & Up) */}
            <div className="hidden md:flex md:flex-col md:gap-4">
              {/* Line 1: Left Aligned */}
              <div 
                className="block overflow-hidden py-3 sm:py-5 text-left whitespace-nowrap pr-4 lg:pr-0 font-sans animate-fade-in" 
                ref={line1Ref}
                style={{ fontSize: 'clamp(3.5rem, 9.44vw, 136px)', lineHeight: '1.05', fontFamily: 'Geist' }}
              >
                {line1Text.split("").map((char, i) => (
                  <span key={`l1-${i}`} className="hero-char inline-block select-none transform transition-transform duration-75">
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </div>

              {/* Line 2: Offset Right alignment */}
              <div 
                className="block overflow-hidden py-3 sm:py-5 text-right md:text-right whitespace-nowrap pr-4 lg:pr-0 font-sans animate-fade-in" 
                ref={line2Ref}
                style={{ fontSize: 'clamp(3.5rem, 9.44vw, 136px)', lineHeight: '1.05', fontFamily: 'Geist' }}
              >
                {line2Text.split("").map((char, i) => (
                  <span key={`l2-${i}`} className="hero-char inline-block select-none transform transition-transform duration-75">
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </div>
            </div>
          </h1>
        </div>

        {/* BOTTOM ROW: Supporting statement left */}
        <div className="flex flex-col md:flex-row md:items-end justify-between w-full pt-8" id="hero-bottom-narrative">
          
          {/* Bottom Left Supporting Statement - Left Accent Bar with Horizontal Button */}
          <div 
            className="relative flex flex-col md:flex-row md:items-start gap-6 md:gap-8 w-full md:w-auto pl-[16px] min-h-[124px]"
          >
            {/* Extreme vertical line going down to meet the bottom of the fold */}
            <div className="absolute left-0 top-0 bottom-[-500px] w-[2px] bg-[#111111]/15 pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p 
                className="font-sans font-[250] text-base sm:text-lg md:text-xl lg:text-[24px] leading-relaxed tracking-wide antialiased text-[#222222] w-full max-w-[280px] sm:max-w-[300px]"
                style={{
                  fontWeight: 250,
                  textRendering: 'optimizeLegibility',
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                  transform: 'translate3d(0, 0, 0)',
                  backfaceVisibility: 'hidden',
                }}
              >
                Designing Products at the Intersection of Users, Business and AI.
              </p>
            </motion.div>
            
            {/* CTA Work Launch Button utilizing Geist, Weight 350-400 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 py-1"
            >
              <motion.button
                onClick={() => onNavigateToPage('work')}
                initial="initial"
                whileHover="hover"
                animate="initial"
                className="relative pl-5 bg-transparent text-[#111111] font-sans font-[400] text-[16px] rounded-[6px] tracking-wide border border-[#222222] focus:outline-none cursor-pointer overflow-hidden inline-flex items-center justify-center gap-2 whitespace-nowrap"
                id="hero-cta-trigger"
                style={{ height: '48px', paddingTop: '12px', paddingBottom: '12px', paddingRight: '16px' }}
              >
                {/* Premium color-wipe sliding sheet */}
                <motion.div
                  className="absolute inset-0 bg-[#111111] pointer-events-none"
                  variants={{
                    initial: { x: "-101%" },
                    hover: { x: "0%" }
                  }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />

                <motion.span
                  className="relative z-10 block whitespace-nowrap"
                  variants={{
                    initial: { color: "#111111" },
                    hover: { color: "#FFFFFF" }
                  }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  Explore Works
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
                        color: "#111111" 
                      },
                      hover: { 
                        y: "-110%", 
                        rotateX: 85, 
                        opacity: 0, 
                        color: "#FFFFFF" 
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
                      id="fi_5343266" 
                      viewBox="0 0 512 512" 
                      className="w-[11px] h-[11px]"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg" 
                      data-name="Layer 1"
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
                        color: "#111111" 
                      },
                      hover: { 
                        y: "0%", 
                        rotateX: 0, 
                        opacity: 1, 
                        color: "#FFFFFF" 
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
                      id="fi_5343266" 
                      viewBox="0 0 512 512" 
                      className="w-[11px] h-[11px]"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg" 
                      data-name="Layer 1"
                    >
                      <path d="m512 32v359.2a32 32 0 0 1 -64 0v-281.945l-393.372 393.372a32 32 0 0 1 -45.256-45.254l393.373-393.373h-281.945a32 32 0 0 1 0-64h359.2a32 32 0 0 1 32 32z" fill="currentColor"></path>
                    </svg>
                  </motion.span>
                </div>
              </motion.button>
            </motion.div>
          </div>



        </div>

      </div>
    </section>
  );
}

