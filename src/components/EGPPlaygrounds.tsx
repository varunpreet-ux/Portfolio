import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ScreenItem {
  label: string;
  title: string;
  image: string;
}

interface FeatureChapter {
  id: string;
  number: string;
  headline: string;
  paragraphs: string[];
  accentColor: string;
  accentGlow: string;
  screens: ScreenItem[];
}

const chapters: FeatureChapter[] = [
  {
    id: '01',
    number: '01',
    headline: '01 — Answers players can verify',
    accentColor: '#3B6FD6',
    accentGlow: 'rgba(59, 111, 214, 0.16)',
    paragraphs: [
      'Players needed quick answers about rules and lore, but AI could return off-topic or unsupported information. A source list alone wouldn’t show whether an answer was grounded in the book, so citations lead to the exact passage and highlight it. Players can move between cited passages and copy answers into squad notes.',
      'A right-click interaction was considered, then dropped because it would add complexity. The final entry point is a familiar chat opened with a question-mark button.'
    ],
    screens: [
      {
        label: 'Passage Citation',
        title: 'In-book Passage Citation & Highlighting',
        image: './assets/images/case-studies/evil-genius/Refence guide-2.png'
      },
      {
        label: 'Chat Query',
        title: 'Question-Mark Button Conversational Entry Point',
        image: './assets/images/case-studies/evil-genius/Refence guide.png'
      },
      {
        label: 'Rulebook Context',
        title: 'Full Sourcebook Passage Inspection',
        image: './assets/images/case-studies/evil-genius/Refence guide-3.png'
      },
      {
        label: 'Squad Notes',
        title: 'Verified Rulings Copied to Squad Notes',
        image: './assets/images/case-studies/evil-genius/Squad Details.png'
      }
    ]
  },
  {
    id: '02',
    number: '02',
    headline: '02 — From document to structured book',
    accentColor: '#10B981',
    accentGlow: 'rgba(16, 185, 129, 0.16)',
    paragraphs: [
      'Publishers had to rebuild their documents in the platform’s editor before publishing. AI can parse a text document into a book structure, but the result may need correction.',
      'The generated book therefore stays editable, so publishers can review and adjust it before moving forward.'
    ],
    screens: [
      {
        label: 'Structured Book',
        title: 'Generated Chapter & Section Hierarchy',
        image: './assets/images/case-studies/evil-genius/Add section-1.png'
      },
      {
        label: 'Document Ingestion',
        title: 'Source Document Upload Setup',
        image: './assets/images/case-studies/evil-genius/Create new product - Title.png'
      },
      {
        label: 'Section Compiler',
        title: 'Automated Content Hierarchy Indexer',
        image: './assets/images/case-studies/evil-genius/Add section.png'
      },
      {
        label: 'Live Editor',
        title: 'Editable Book Workspace & Review',
        image: './assets/images/case-studies/evil-genius/Add section-2.png'
      }
    ]
  },
  {
    id: '03',
    number: '03',
    headline: '03 — Character art with room to choose',
    accentColor: '#8B5CF6',
    accentGlow: 'rgba(139, 92, 246, 0.16)',
    paragraphs: [
      'Finding an image that matched a character sheet could be hit or miss. Generating art from the sheet gives players a more relevant starting point, while the limited set of three iterations keeps the flow focused and works within the credit model.',
      'Consistent art direction was another constraint, shaped through iteration with the backend team.'
    ],
    screens: [
      {
        label: 'Three Variations',
        title: 'Three Curated Visual Iterations',
        image: './assets/images/case-studies/evil-genius/Persona - Edit mode-2.png'
      },
      {
        label: 'Sheet Attributes',
        title: 'Character Sheet Data Inputs',
        image: './assets/images/case-studies/evil-genius/Persona - Edit mode 1.png'
      },
      {
        label: 'Version Navigation',
        title: 'Iterative Comparison & Selection',
        image: './assets/images/case-studies/evil-genius/Persona - Edit mode-3.png'
      },
      {
        label: 'Selected Avatar',
        title: 'Final Selected Character Portrait',
        image: './assets/images/case-studies/evil-genius/Persona - Edit mode-4.png'
      }
    ]
  },
  {
    id: '04',
    number: '04',
    headline: '04 — A campaign brief becomes navigable',
    accentColor: '#F43F5E',
    accentGlow: 'rgba(244, 63, 94, 0.16)',
    paragraphs: [
      'Campaign preparation involves several connected elements. Game Masters provide details such as the story idea, setting, difficulty, maturity rating, and party size; the system generates plots and motivations, villains, helpful NPCs, stat blocks, and encounter combinations.',
      'Discussions with experienced Game Masters and community administrators helped shape the inputs and guidance. A two-column results view keeps the five generated sections easy to move between. The prototype did not reach players, so there are no player outcomes to report.'
    ],
    screens: [
      {
        label: 'Setup Form & Guidance',
        title: 'Campaign Brief Inputs & Guidance',
        image: './assets/images/case-studies/evil-genius/Adventure Hooks.png'
      },
      {
        label: 'Plot & Motivation',
        title: 'Generated Plot Arcs & Core Motivations',
        image: './assets/images/case-studies/evil-genius/Plot.png'
      },
      {
        label: 'Villains',
        title: 'Villain Profiles & Tactics',
        image: './assets/images/case-studies/evil-genius/Villains.png'
      },
      {
        label: 'Helpful NPCs',
        title: 'Supporting Cast & Allies',
        image: './assets/images/case-studies/evil-genius/Helpful NPCs.png'
      },
      {
        label: 'Stat Blocks',
        title: 'Creature & Encounter Stat Blocks',
        image: './assets/images/case-studies/evil-genius/Stat Blocks.png'
      },
      {
        label: 'Encounter Combos',
        title: 'Encounter Combinations Matrix',
        image: './assets/images/case-studies/evil-genius/Best Encounter Combos.png'
      }
    ]
  }
];

export default function EGPPlaygrounds() {
  const [activeScreenIndices, setActiveScreenIndices] = useState<number[]>([0, 0, 0, 0]);

  // Lightbox modal state
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    chapterIndex: number;
    screenIndex: number;
  }>({
    isOpen: false,
    chapterIndex: 0,
    screenIndex: 0
  });

  const openLightbox = (chapIdx: number, scrIdx: number) => {
    setLightboxState({
      isOpen: true,
      chapterIndex: chapIdx,
      screenIndex: scrIdx
    });
  };

  const closeLightbox = () => {
    setLightboxState(prev => ({ ...prev, isOpen: false }));
  };

  const handleScreenChange = (chapterIndex: number, screenIndex: number) => {
    setActiveScreenIndices(prev => {
      const updated = [...prev];
      updated[chapterIndex] = screenIndex;
      return updated;
    });
  };

  // Lightbox hotkeys
  useEffect(() => {
    if (!lightboxState.isOpen) return;

    const currentChapter = chapters[lightboxState.chapterIndex];
    const screenCount = currentChapter.screens.length;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        setLightboxState(prev => ({
          ...prev,
          screenIndex: prev.screenIndex === 0 ? screenCount - 1 : prev.screenIndex - 1
        }));
      } else if (e.key === 'ArrowRight') {
        setLightboxState(prev => ({
          ...prev,
          screenIndex: prev.screenIndex === screenCount - 1 ? 0 : prev.screenIndex + 1
        }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxState]);

  const activeLightboxChapter = chapters[lightboxState.chapterIndex];
  const activeLightboxScreen = activeLightboxChapter?.screens[lightboxState.screenIndex];

  return (
    <div className="w-full space-y-24 md:space-y-36">
      {chapters.map((chapter, chapIdx) => {
        const activeScreenIdx = activeScreenIndices[chapIdx];
        const activeScreen = chapter.screens[activeScreenIdx] || chapter.screens[0];
        // Alternate desktop layout: Even chapters have visual on left, text on right
        const isVisualFirst = chapIdx % 2 === 1;

        return (
          <article
            key={chapter.id}
            id={`workflow-${chapter.id}`}
            className="w-full min-h-0 lg:min-h-[85vh] py-8 lg:py-16 flex flex-col justify-center border-t border-neutral-900/80 relative"
          >
            {/* Subtle ambient workflow background glow */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full blur-[140px] pointer-events-none opacity-20 transition-all duration-700 ease-out -z-10"
              style={{
                background: chapter.accentGlow,
                left: isVisualFirst ? '15%' : '65%'
              }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center w-full">
              
              {/* TEXT COLUMN */}
              <div
                className={`col-span-1 lg:col-span-5 space-y-6 ${
                  isVisualFirst ? 'order-1 lg:order-2' : 'order-1'
                }`}
              >
                {/* Headline matching case-study typography */}
                <h3 className="text-3xl sm:text-4xl lg:text-[40px] font-sans font-[250] tracking-tight text-white leading-[1.15]">
                  {chapter.headline}
                </h3>

                {/* Narrative copy */}
                <div className="space-y-4 text-neutral-300 font-light text-base sm:text-[17px] leading-relaxed font-sans">
                  {chapter.paragraphs.map((para, pIdx) => (
                    <p key={pIdx}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* VISUAL COLUMN */}
              <div
                className={`col-span-1 lg:col-span-7 flex flex-col gap-3.5 ${
                  isVisualFirst ? 'order-2 lg:order-1' : 'order-2'
                }`}
              >
                {/* Product visual canvas */}
                <div
                  onClick={() => openLightbox(chapIdx, activeScreenIdx)}
                  className="w-full relative aspect-[16/10] max-h-[480px] bg-neutral-950 rounded-xl border border-neutral-800/80 overflow-hidden shadow-2xl flex items-center justify-center cursor-zoom-in group/canvas transition-all duration-300 hover:border-neutral-700"
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeScreen.image}
                      src={activeScreen.image}
                      alt={activeScreen.title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full object-contain p-2 sm:p-3 pointer-events-none select-none transition-transform duration-700 ease-out group-hover/canvas:scale-[1.01]"
                    />
                  </AnimatePresence>

                  {/* Expand badge */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover/canvas:opacity-100 transition-opacity duration-200 bg-neutral-900/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-neutral-700/80 text-[11px] text-neutral-300 flex items-center gap-1.5 pointer-events-none select-none shadow-md font-sans">
                    <Maximize2 size={12} />
                    <span>Expand view</span>
                  </div>
                </div>

                {/* Interactive screen switcher tabs */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1 select-none">
                  {chapter.screens.map((screen, sIdx) => {
                    const isSelected = activeScreenIdx === sIdx;
                    return (
                      <button
                        key={screen.label}
                        onClick={() => handleScreenChange(chapIdx, sIdx)}
                        className={`text-xs px-2.5 py-1 rounded-md transition-all duration-200 cursor-pointer font-sans ${
                          isSelected
                            ? 'bg-neutral-800 text-white border border-neutral-700 font-normal shadow-xs'
                            : 'bg-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60 border border-transparent'
                        }`}
                      >
                        {screen.label}
                      </button>
                    );
                  })}
                </div>

              </div>

            </div>
          </article>
        );
      })}

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxState.isOpen && activeLightboxScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center font-sans tracking-tight"
            onClick={closeLightbox}
          >
            {/* Top Bar with title and close button */}
            <div className="absolute top-0 left-0 right-0 h-20 px-6 sm:px-10 flex items-center justify-between text-white z-10 select-none font-sans">
              <div className="flex items-center gap-3">
                <span className="text-sm font-normal text-white">
                  {activeLightboxChapter.headline}
                </span>
                <span className="text-neutral-600">/</span>
                <span className="text-sm font-light text-neutral-400">
                  {activeLightboxScreen.title}
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeLightbox();
                }}
                className="p-2.5 rounded-full bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-white cursor-pointer transition-all hover:scale-105"
                aria-label="Close Lightbox"
              >
                <X size={18} />
              </button>
            </div>

            {/* Main Stage */}
            <div className="relative w-full h-[85vh] md:h-[90vh] flex items-center justify-center px-4 max-w-[95vw] mx-auto">
              {/* Previous Screen */}
              {activeLightboxChapter.screens.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const len = activeLightboxChapter.screens.length;
                    setLightboxState(prev => ({
                      ...prev,
                      screenIndex: prev.screenIndex === 0 ? len - 1 : prev.screenIndex - 1
                    }));
                  }}
                  className="absolute left-4 sm:left-8 z-20 p-3.5 rounded-lg bg-neutral-900/70 hover:bg-neutral-800 border border-neutral-800 text-white cursor-pointer transition-all hover:scale-105 flex items-center justify-center"
                  aria-label="Previous Screen"
                >
                  <ChevronLeft size={22} />
                </button>
              )}

              {/* Main Image */}
              <div
                className="w-full h-full flex items-center justify-center relative select-none max-w-6xl md:max-w-7xl"
                onClick={(e) => e.stopPropagation()}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeLightboxScreen.image}
                    src={activeLightboxScreen.image}
                    alt={activeLightboxScreen.title}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="max-w-full max-h-full object-contain shadow-2xl rounded-sm border border-neutral-900/50"
                  />
                </AnimatePresence>
              </div>

              {/* Next Screen */}
              {activeLightboxChapter.screens.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const len = activeLightboxChapter.screens.length;
                    setLightboxState(prev => ({
                      ...prev,
                      screenIndex: prev.screenIndex === len - 1 ? 0 : prev.screenIndex + 1
                    }));
                  }}
                  className="absolute right-4 sm:right-8 z-20 p-3.5 rounded-lg bg-neutral-900/70 hover:bg-neutral-800 border border-neutral-800 text-white cursor-pointer transition-all hover:scale-105 flex items-center justify-center"
                  aria-label="Next Screen"
                >
                  <ChevronRight size={22} />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
