import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Compass, Cpu, Layers, Sparkles, CheckCircle2, ChevronLeft, ChevronRight, X, Plus, UploadCloud } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface InitiativeItem {
  id: string;
  number: string;
  category: string;
  title: string;
  summary: string;
  problem: string;
  approach: string;
  outcome: string;
  bullets?: string[];
  bulletHeader?: string;
  footer?: string;
  metric: string;
  metricLabel: string;
  images: string[];
  imageAlts: string[];
  accentColor: string;
  accentGlow: string;
}

const initiatives: InitiativeItem[] = [
  {
    id: '01',
    number: '01',
    category: 'AI-Assisted Publishing',
    title: 'Helping Creators Move from Documents to Marketplace-Ready Content',
    summary: 'Creators selling books on the platform faced a significant publishing challenge.',
    problem: 'Although they already had source material available in formats such as PDFs and Word documents, they were required to manually rebuild content using platform-specific tools. This created friction, slowed publishing, and introduced unnecessary effort into the content creation process.',
    approach: 'How might we help creators publish content faster without sacrificing control over the final structure?',
    outcome: 'I designed an AI-powered upload workflow that allows creators to upload existing source documents directly into the platform.',
    bulletHeader: 'The system automatically:',
    bullets: [
      'Detects chapters',
      'Organizes sections',
      'Preserves content hierarchy',
      'Creates a structured book'
    ],
    footer: 'Creators can then review and edit generated content before publishing. This approach dramatically reduces setup effort while preserving editorial control.',
    metric: '92% Setup Velocity',
    metricLabel: 'Instant chapters & hierarchy generation from bulk sources',
    images: [
      './assets/images/case-studies/evil-genius/Create new product - Title.png',
      './assets/images/case-studies/evil-genius/Add section-1.png',
      './assets/images/case-studies/evil-genius/Add section-2.png',
      './assets/images/case-studies/evil-genius/Add section.png'
    ],
    imageAlts: [
      'AI Ingestion Dashboard showing structured chapters',
      'Ingestion setup view blueprint',
      'Document structure compiler interface'
    ],
    accentColor: '#10B981',
    accentGlow: 'rgba(16, 185, 129, 0.12)'
  },
  {
    id: '02',
    number: '02',
    category: 'AI-Powered Reference Guide',
    title: 'Finding Answers Without Leaving the Game',
    summary: 'Players frequently need to search sourcebooks during gameplay.',
    problem: 'Manually locating rules, abilities, or lore often interrupts the flow of the session and creates unnecessary friction.',
    approach: 'How might we make information retrieval feel instantaneous while maintaining trust in AI-generated responses?',
    outcome: 'I designed a conversational knowledge assistant that enables users to select one or more books and ask questions directly.',
    bulletHeader: 'The system delivers:',
    bullets: [
      'Contextual answers',
      'Source references',
      'Section citations',
      'Page references'
    ],
    footer: 'Users can also save responses directly into their notes for future use.\n\nProviding source attribution was a deliberate trust-building decision that allows players to verify information rather than relying on AI alone.',
    metric: '<260ms Query Latency',
    metricLabel: 'Instant rule verification with direct PDF links',
    images: [
      './assets/images/case-studies/evil-genius/Squad Details.png',
      './assets/images/case-studies/evil-genius/Refence guide.png',
      './assets/images/case-studies/evil-genius/Refence guide-2.png',
      './assets/images/case-studies/evil-genius/Refence guide-3.png',
      './assets/images/case-studies/evil-genius/Refence guide-1.png'
    ],
    imageAlts: [
      'Companion HUD Overlay Layout preview',
      'Rule retrieval interface mockup',
      'Companion screen lore panel reference'
    ],
    accentColor: '#3B6FD6',
    accentGlow: 'rgba(59, 111, 214, 0.12)'
  },
  {
    id: '03',
    number: '03',
    category: 'AI-Assisted Character Visualization',
    title: 'Turning Character Data into Personalized Artwork',
    summary: 'Many players want visual representations of their characters but lack artistic resources or commissioning budgets.',
    problem: 'Many players want visual representations of their characters but lack artistic resources or commissioning budgets.',
    approach: 'How might we make character visualization accessible while preserving user ownership and personalization?',
    outcome: 'I designed a generative art workflow integrated directly into the character sheet experience. The system uses character attributes as creative inputs to generate visual representations:',
    bulletHeader: '',
    bullets: [
      'Characters',
      'Equipment',
      'Gear'
    ],
    footer: 'Users can iterate through multiple generated concepts, upload their own images, or continue generating additional variations through a credit-based model.\n\nProduct Consideration\nThe generation system was intentionally designed with a limited free iteration model. This approach balanced exploration and engagement while creating opportunities for future monetization.',
    metric: '100% Asset Adherence',
    metricLabel: 'Zero mismatched prompt failures or ratio errors',
    images: [
      './assets/images/case-studies/evil-genius/Persona - Edit mode 1.png',
      './assets/images/case-studies/evil-genius/Persona - Edit mode-2.png',
      './assets/images/case-studies/evil-genius/Persona - Edit mode-3.png',
      './assets/images/case-studies/evil-genius/Persona - Edit mode-4.png'
    ],
    imageAlts: [
      'Character Avatar Configurator UI',
      'Avatar generation portrait frame',
      'Gear selection custom viewport'
    ],
    accentColor: '#8B5CF6',
    accentGlow: 'rgba(139, 92, 246, 0.12)'
  },
  {
    id: '04',
    number: '04',
    category: 'AI-Assisted Campaign Creation',
    title: 'Helping Game Masters Start Faster',
    summary: 'Preparing campaigns often requires significant creative effort before gameplay can begin.',
    problem: 'Game Masters frequently need to create villains, locations, encounters, motivations, and supporting characters before running a session.',
    approach: 'How might we help Game Masters overcome blank-page syndrome while preserving creative ownership?',
    outcome: 'I designed Adventure Hooks, a structured campaign-generation experience that transforms a simple prompt into a fully developed adventure concept. Inputs include: Story Idea, Location, Villain, Setting, Difficulty, Average Level, Maturity Rating, and Number of Players.',
    bulletHeader: 'The system generates:',
    bullets: [
      'Plot & Motivation',
      'Villains',
      'Helpful NPCs',
      'Stat Blocks',
      'Encounter Combinations'
    ],
    footer: 'The output acts as a creative starting point rather than a finished campaign, allowing Game Masters to adapt ideas to their own style.',
    metric: '5x Prep Speedup',
    metricLabel: 'Under 40 seconds to compile complete challenge loops',
    images: [
      './assets/images/case-studies/evil-genius/Adventure Hooks.png',
      './assets/images/case-studies/evil-genius/Plot.png',
      './assets/images/case-studies/evil-genius/Villains.png',
      './assets/images/case-studies/evil-genius/Helpful NPCs.png',
      './assets/images/case-studies/evil-genius/Stat Blocks.png',
      './assets/images/case-studies/evil-genius/Best Encounter Combos.png'
    ],
    imageAlts: [
      'Automated Prep Layout Matrix',
      'Map and node generator system screen',
      'Quest chain compilation matrix'
    ],
    accentColor: '#EF4444',
    accentGlow: 'rgba(239, 68, 68, 0.12)'
  }
];

export default function EGPPlaygrounds() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeImageIndexes, setActiveImageIndexes] = useState<number[]>([0, 0, 0, 0]);
  const activeIndexRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<any>(null);

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);

  const activeInit = initiatives[activeIndex];
  const activeInitImages = activeInit.images;
  const activeInitAlts = activeInit.imageAlts;

  // Lightbox keyboard hotkeys
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowLeft') {
        setLightboxImageIndex(prev => (prev === 0 ? activeInitImages.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setLightboxImageIndex(prev => (prev === activeInitImages.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, activeInitImages]);

  useEffect(() => {
    // Register scrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Using matchMedia for desktop only interaction
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const container = containerRef.current;
      if (!container) return;

      const detailCards = container.querySelectorAll('.detail-card');
      const activeCard = detailCards[activeIndex] as HTMLElement;

      if (activeCard) {
        // Reset all cards' translation
        detailCards.forEach((card) => {
          const inner = card.querySelector('.detail-card-inner') as HTMLElement;
          if (inner) gsap.set(inner, { y: 0 });
        });

        // Use GSAP to animate transition
        detailCards.forEach((card, idx) => {
          if (idx === activeIndex) {
            gsap.killTweensOf(card);
            gsap.set(card, { visibility: 'visible', pointerEvents: 'auto', zIndex: 10 });
            gsap.fromTo(card,
              { opacity: 0 },
              { opacity: 1, duration: 0.5, ease: 'power2.out', overwrite: 'auto' }
            );
          } else {
            gsap.killTweensOf(card);
            gsap.to(card, {
              opacity: 0,
              duration: 0.3,
              ease: 'power2.out',
              overwrite: 'auto',
              onComplete: () => {
                gsap.set(card, { visibility: 'hidden', pointerEvents: 'none', zIndex: 0 });
              }
            });
          }
        });

        const innerEl = activeCard.querySelector('.detail-card-inner') as HTMLElement;
        if (innerEl) {
          const innerHeight = innerEl.scrollHeight;
          const outerHeight = activeCard.clientHeight || 0;
          const excess = Math.max(0, innerHeight - outerHeight + 40);

          // Create the pinned ScrollTrigger for the current activeIndex
          const st = ScrollTrigger.create({
            trigger: container,
            pin: true,
            start: "top top+=110", // locks into screen
            end: () => `+=${excess}`, // scroll duration corresponds exactly to current card's excess height 1:1
            scrub: true,
            onUpdate: (self) => {
              if (excess > 0) {
                gsap.set(innerEl, { y: -excess * self.progress });
              }
            }
          });

          scrollTriggerRef.current = st;

          return () => {
            st.kill();
          };
        }
      }
    });

    return () => {
      mm.revert();
    };
  }, [activeIndex]);

  const handleTabClick = (idx: number) => {
    if (idx === activeIndex) return;

    const isDesktop = window.innerWidth >= 1024;
    if (isDesktop) {
      const st = scrollTriggerRef.current;
      if (st) {
        // Reset scroll immediately to the start of the pinned trigger before switching tabs
        window.scrollTo(0, st.start);
      }
    }

    setActiveIndex(idx);
  };

  return (
    <div 
      ref={containerRef}
      className="main-section-wrapper relative w-full max-w-[1360px] mx-auto text-neutral-300 select-none pb-12 font-sans overflow-visible"
    >
      {/* Background Grid - Crisp tech grid aesthetic */}
      <div className="absolute inset-0 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none -z-10" />

      {/* Extreme ambient back glow mapped to Active Initiative but ultra-tight for cinematic style */}
      <div 
        className="absolute -top-[15%] left-[60%] w-[50%] h-[60%] rounded-full blur-[160px] pointer-events-none transition-all duration-1000 ease-in-out -z-10 opacity-70"
        style={{
          background: `radial-gradient(circle, ${activeInit.accentGlow} 0%, rgba(0,0,0,0) 80%)`
        }}
      />

      {/* Grid wrapper with crisp hair-thin dividers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-t border-neutral-900 relative">
        
        {/* LEFT COLUMN: THE TECHNICAL MONITOR / NAVIGATOR */}
        <div className="col-span-1 lg:col-span-4 lg:sticky lg:top-28 pr-0 lg:pr-8 py-4 lg:py-8 lg:border-r border-neutral-900 flex flex-col justify-between lg:min-h-[480px] min-h-0">
          
          <div className="space-y-6">
            {/* Large Screen Stacked List - Swiss-style Tabular rows */}
            <div className="hidden lg:flex flex-col gap-2 pt-2 lg:w-[240px]">
              {initiatives.map((init, idx) => {
                const isActive = activeIndex === idx;

                return (
                  <button
                    key={init.id}
                    onClick={() => {
                      handleTabClick(idx);
                    }}
                    className={`tab-item group text-left py-4 px-5 border transition-all duration-300 flex items-center relative overflow-hidden cursor-pointer rounded-[6px] ${
                      isActive 
                        ? 'bg-[#242424] text-white border-neutral-800 shadow-md active' 
                        : 'bg-transparent text-neutral-500 border-transparent hover:bg-neutral-900/35 hover:text-neutral-300'
                    }`}
                  >
                    {/* Laser line side indicator */}
                    <span 
                      className={`absolute top-0 left-0 w-[3px] h-full transition-transform duration-500 ease-out origin-top ${
                        isActive ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-[0.3]'
                      }`}
                      style={{ backgroundColor: init.accentColor }}
                    />

                    {/* Primary category name - wrapped in 2 lines, no number */}
                    <span className="font-light font-sans text-[16px] tracking-tight leading-snug whitespace-normal break-words block max-w-[210px]">
                      {init.category}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Mobile 2x2 Grid Selector - Swiss tab strip style */}
            <div className="lg:hidden w-full grid grid-cols-2 gap-3 py-4 border-b border-neutral-900 select-none">
              {initiatives.map((init, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={init.id}
                    onClick={() => {
                      setActiveIndex(idx);
                    }}
                    className={`text-center py-3.5 px-3 border rounded-[6px] flex items-center justify-center min-h-[68px] transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? 'bg-[#242424] text-white border-neutral-800 shadow-sm font-normal' 
                        : 'bg-transparent text-neutral-400 border-neutral-800/40 hover:text-white'
                    }`}
                  >
                    <span className="font-sans text-xs sm:text-sm tracking-tight leading-snug whitespace-normal break-words text-center block px-1">
                      {init.category}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Autoplay Play/Pause state and static indicators removed */}

        </div>

        {/* RIGHT COLUMN: THE NARRATIVE LABORATORY / DYNAMIC SHOWCASE CONTAINER */}
        <div className="details-container col-span-1 lg:col-span-8 pl-0 lg:pl-12 py-8 lg:min-h-[550px] min-h-0 relative lg:h-[82vh] lg:overflow-hidden">
          {initiatives.map((init, idx) => {
            const isActive = activeIndex === idx;
            const activeImageIndex = activeImageIndexes[idx];
            const initImages = init.images;
            const initAlts = init.imageAlts;

            return (
              <div
                key={init.id}
                data-index={idx}
                className={`detail-card w-full lg:absolute lg:top-0 lg:left-0 lg:h-full lg:overflow-hidden ${
                  isActive 
                    ? 'block opacity-100 visible pointer-events-auto z-10' 
                    : 'hidden lg:block opacity-0 invisible pointer-events-none z-0'
                }`}
              >
                {/* Scrollable Inner Element */}
                <div className="detail-card-inner space-y-12 h-full lg:overflow-visible transition-none">
                  
                  {/* LARGE HIGH-TECH PROTOYPING PREVIEW CANVAS */}
                  <div 
                    onClick={() => {
                      if (initImages.length > 0) {
                        setLightboxImageIndex(activeImageIndex);
                        setIsLightboxOpen(true);
                      }
                    }}
                    className={`w-full max-w-[900px] ${(idx === 0 || idx === 2 || idx === 3) ? 'aspect-auto' : 'aspect-[16/10] sm:aspect-[900/640]'} mx-auto overflow-hidden relative bg-black border border-neutral-900 shadow-2xl flex items-center justify-center group/preview ${initImages.length > 0 ? 'cursor-zoom-in' : ''}`}
                    style={(idx === 0 || idx === 2 || idx === 3) ? { height: 'clamp(240px, 56vw, 600px)' } : undefined}
                  >
                    
                    {/* Main image with high depth transitions or elegant placeholder */}
                    <AnimatePresence mode="wait">
                      {initImages.length > 0 ? (
                        <motion.img 
                          key={activeImageIndex}
                          src={initImages[activeImageIndex]} 
                          alt={initAlts[activeImageIndex]} 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="w-full h-full object-contain group-hover/preview:scale-[1.005] transition-transform duration-[1200ms] ease-out select-none pointer-events-none absolute inset-0"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 space-y-4">
                          <div className="w-16 h-16 rounded-full bg-neutral-900/50 border border-neutral-800 flex items-center justify-center mb-2">
                            <span className="text-neutral-500">No Image</span>
                          </div>
                        </div>
                      )}
                    </AnimatePresence>

                    {/* Carousel Dots */}
                    {initImages.length > 0 && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20 bg-neutral-950/80 backdrop-blur-md px-3.5 py-2 rounded-full border border-neutral-900 shadow-xl pointer-events-auto max-w-[92%] overflow-x-auto select-none">
                        {initImages.map((_, imgIdx) => {
                          const isImgActive = activeImageIndex === imgIdx;
                          return (
                            <button
                              key={imgIdx}
                              onClick={(e) => {
                                e.stopPropagation();
                                const updated = [...activeImageIndexes];
                                updated[idx] = imgIdx;
                                setActiveImageIndexes(updated);
                              }}
                              className="w-2.5 h-2.5 rounded-full transition-all duration-300 relative group shrink-0 cursor-pointer"
                              aria-label={`Go to slide ${imgIdx + 1}`}
                            >
                              {/* Dot visual indicator */}
                              <span 
                                className="absolute inset-0 rounded-full transition-transform duration-300" 
                                style={{
                                  backgroundColor: isImgActive ? init.accentColor : 'rgb(115, 115, 115)',
                                  transform: isImgActive ? 'scale(1.2)' : 'scale(0.8)'
                                }}
                              />
                              {/* Hover feedback dot ring */}
                              <span 
                                className="absolute inset-0 rounded-full scale-150 border opacity-0 group-hover:opacity-30 group-hover:scale-125 transition-all duration-300 animate-pulse"
                                style={{ borderColor: init.accentColor }}
                              />
                            </button>
                          );
                        })}
                      </div>
                    )}



                     {/* Ambient spotlight */}
                    <div 
                      className="absolute bottom-0 right-[10%] w-[30%] h-[30%] rounded-full blur-[70px] pointer-events-none mix-blend-screen opacity-20"
                      style={{
                        background: `radial-gradient(circle, ${init.accentColor} 0%, transparent 80%)`
                      }}
                    />
                  </div>

                  {/* EDITORIAL SWISS-STYLE SYSTEM MATRIX */}
                  <div className="space-y-10">
                    
                    {/* Header title */}
                    <div className="space-y-3">
                      <h3 className="text-3xl sm:text-4xl md:text-[44px] font-light tracking-tight text-white leading-[1.1] font-sans">
                        {init.title}
                      </h3>
                      <p className="text-base sm:text-lg text-neutral-400 font-light max-w-2xl leading-relaxed">
                        {init.summary}
                      </p>
                    </div>

                    {/* Swiss Tech Grid - Razor thin rows and data points */}
                    <div className="border-t border-neutral-900 pt-8 mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                      
                      {/* Problem slot */}
                      <div className="space-y-3">
                        <span className="block text-xl font-light font-sans tracking-wide text-neutral-400">
                          // The challenge
                        </span>
                        <p className="text-base text-neutral-300 font-light leading-relaxed">
                          {init.problem}
                        </p>
                      </div>

                      {/* Approach slot */}
                      <div className="space-y-3">
                        <span className="block text-xl font-light font-sans tracking-wide" style={{ color: init.accentColor }}>
                          // Design challenge
                        </span>
                        <p className="text-base text-neutral-300 font-light leading-relaxed">
                          {init.approach}
                        </p>
                      </div>

                      {/* Outcome slot */}
                      <div className="space-y-4 md:col-span-2 border-t border-neutral-900 pt-8">
                        <span className="block text-xl font-light font-sans tracking-wide text-white">
                          // Solution architecture
                    </span>
                    
                        <div className="space-y-6 max-w-3xl">
                          <p className="text-base text-neutral-300 font-light leading-relaxed">
                            {init.outcome}
                          </p>

                          {init.bullets && (
                            <div className="space-y-3">
                              {init.bulletHeader && (
                                <p className="text-sm font-light text-neutral-400 font-sans tracking-wide">
                                  {init.bulletHeader}
                                </p>
                              )}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {init.bullets.map((bullet) => (
                                  <div key={bullet} className="flex items-center gap-3 p-3 bg-neutral-950/60 border border-neutral-900/60 rounded-[4px] pointer-events-none">
                                    <div className="w-1.5 h-1.5 rotate-45 shrink-0" style={{ backgroundColor: init.accentColor }} />
                                    <span className="text-sm font-sans font-light tracking-wide text-neutral-200">{bullet}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {init.footer && (
                            <div className="font-sans text-base leading-[26px] text-neutral-300 space-y-3">
                              {init.footer.split('\n\n').map((para, pIdx) => (
                                <p key={pIdx}>
                                  {para}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* FULL SCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center font-sans tracking-tight"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Top Bar with Close Button only, no gradient or text */}
            <div className="absolute top-0 left-0 right-0 h-20 px-6 sm:px-10 flex items-center justify-end text-white z-10 pointer-events-none select-none">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLightboxOpen(false);
                }}
                className="pointer-events-auto p-3 rounded-full bg-neutral-900/40 hover:bg-neutral-800 border border-neutral-800 text-white cursor-pointer transition-all hover:scale-105"
                aria-label="Close Lightbox"
                id="close-lightbox-btn"
              >
                <X size={20} className="w-5 h-5" />
              </button>
            </div>

            {/* Main Interactive Stage */}
            <div className="relative w-full h-[85vh] md:h-[90vh] flex items-center justify-center px-4 max-w-[95vw] mx-auto">
              
              {/* Left Chevron */}
              {activeInitImages.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxImageIndex(prev => (prev === 0 ? activeInitImages.length - 1 : prev - 1));
                  }}
                  className="absolute left-4 sm:left-8 z-20 p-4 rounded-[6px] bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-800/80 text-white cursor-pointer transition-all hover:scale-110 flex items-center justify-center"
                  aria-label="Previous Slide"
                  id="prev-lightbox-btn"
                >
                  <ChevronLeft size={24} className="w-6 h-6" />
                </button>
              )}

              {/* Main Image Viewport with Slide Transition */}
              <div className="w-full h-full flex items-center justify-center relative select-none max-w-6xl md:max-w-7xl" onClick={(e) => e.stopPropagation()}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={lightboxImageIndex}
                    src={activeInitImages[lightboxImageIndex]}
                    alt={activeInitAlts[lightboxImageIndex]}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="max-w-full max-h-full object-contain shadow-2xl rounded-sm border border-neutral-900/50"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
              </div>

              {/* Right Chevron */}
              {activeInitImages.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxImageIndex(prev => (prev === activeInitImages.length - 1 ? 0 : prev + 1));
                  }}
                  className="absolute right-4 sm:right-8 z-20 p-4 rounded-[6px] bg-[#1a1a1a]/60 hover:bg-neutral-800 border border-neutral-800/80 text-white cursor-pointer transition-all hover:scale-110 flex items-center justify-center"
                  aria-label="Next Slide"
                  id="next-lightbox-btn"
                >
                  <ChevronRight size={24} className="w-6 h-6" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
