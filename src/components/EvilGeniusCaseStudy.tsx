import React from 'react';
import { Project } from '../types';
import NumberShuffle from './NumberShuffle';
import { ArrowLeft, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { motion } from 'motion/react';
import EGPPlaygrounds from './EGPPlaygrounds';

interface CustomProps {
  project: Project;
  onBack: () => void;
  mockupUrl?: string;
}

export default function EvilGeniusSidekickCaseStudy({ project, onBack, mockupUrl }: CustomProps) {
  const displayImage = mockupUrl || "./assets/images/case-studies/evil-genius/Sidekick.png";
  const carouselRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 450;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <article className="min-h-screen bg-[#FAFAFA] text-[#111111] font-sans relative overflow-hidden selection:bg-[#3B6FD6]/20">
      
      {/* SECTION 1: HERO / INTRO (Spacious layout: Light grey background text with giant refined light font and bottom-right dual column body copy) */}
      <section className="bg-[#f1f5f8] text-[#111111] pt-28 md:pt-36 pb-28">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-8 md:px-12 w-full">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-3 text-[16px] font-sans mb-10 tracking-wide">
            <button 
              onClick={onBack} 
              className="text-[#999999] hover:text-black cursor-pointer transition-colors focus:outline-none font-light text-[16px]"
            >
              Home
            </button>
            <span className="text-[#CCCCCC] font-light select-none text-[16px]">/</span>
            <span className="text-[#111111] font-normal text-[16px]">{project.title}</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            {/* Left side: Huge title */}
            <div className="lg:col-span-6 animate-fade-in">
              <h1 className="text-4xl sm:text-5xl md:text-[64px] font-sans font-light tracking-tight text-[#111111] leading-[1.05] animate-fade-in">
                {project.title}
              </h1>
            </div>

            {/* Right side: Body copy aligned to bottom and hugging text */}
            <div className="lg:col-span-6 flex lg:justify-end text-neutral-800 font-sans w-full lg:ml-auto items-end pt-8 lg:pt-0 pb-1 transform lg:translate-y-[140px] transition-transform duration-300">
              <div className="w-full max-w-[480px] text-left">
                <p className="text-neutral-800 font-sans font-light text-base sm:text-[20px] leading-relaxed">
                  {project.tagline}
                </p>
              </div>
            </div>
          </div>
          
          {/* Custom Hero Image */}
          <div className="w-full max-w-[1360px] mx-auto relative mt-16 lg:mt-48 aspect-[1360/968] rounded-2xl bg-neutral-100 overflow-hidden shadow-xs border border-neutral-300/40">
            <img
              src={displayImage}
              alt={project.imageAlt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* SECTION 1.5: DEDICATED NARRATIVE OVERVIEW (Un-framed spacious segment) */}
      <section className="py-20 bg-[#FAFAFA] font-sans border-b border-neutral-200/80">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-8 md:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
            <div className="lg:col-span-4">
              <h2 className="text-2xl sm:text-[36px] font-sans font-light text-neutral-900 leading-tight">
                An Integrated Suite of AI Creativity Workflows
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-neutral-700 text-base sm:text-lg leading-relaxed font-light">
                {project.overview}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: STATS AND KPI PROMPT MATRIX (Premium look: Engineered for Performance + Key Stats Black Table) */}
      <section className="bg-black text-white py-20 md:py-28">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-8 md:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-[250] tracking-tight text-white leading-tight">
                Designed to Accelerate Gameplay Mechanics
              </h2>
              <div className="h-[2px] bg-[#3B6FD6] w-24 animate-pulse"></div>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-light">
                We designed these AI-powered workflows to integrate into energetic gameplay. Every system is optimized to erase manual catalog reading and lore retrieval, allowing Game Masters and players to remain fully immersed in their campaign sessions.
              </p>
            </div>

            <div className="lg:col-span-6 space-y-4 font-sans">
              <div className="border border-neutral-800 rounded-lg overflow-hidden bg-neutral-950 shadow-md p-6 sm:p-8 space-y-6 text-neutral-300">
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-1.5 font-sans">Role</h3>
                  <p className="text-base sm:text-lg text-white font-light font-sans">Product / UX Designer</p>
                </div>
                
                <div className="h-[1px] bg-neutral-800/80"></div>

                <div>
                  <h3 className="text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-1.5 font-sans">Duration</h3>
                  <p className="text-base sm:text-lg text-white font-light font-sans">1.5 Months</p>
                </div>

                <div className="h-[1px] bg-neutral-800/80"></div>

                <div>
                  <h3 className="text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-1.5 font-sans">Team</h3>
                  <p className="text-base sm:text-lg text-white font-light font-sans">CEO, PM, 4 Engineers, 1 Designer</p>
                </div>

                <div className="h-[1px] bg-neutral-800/80"></div>

                <div>
                  <h3 className="text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-3 font-sans">My Contribution</h3>
                  <div className="space-y-4">
                    <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed font-sans">
                      Led design for all AI-powered initiatives across the platform, including content publishing, knowledge retrieval, character visualization, and campaign preparation experiences.
                    </p>
                    <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed font-sans">
                      Worked directly with executive leadership and engineering teams to define requirements, user flows, interaction patterns, and end-to-end experiences.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: THE BUSINESS OPPORTUNITY (Clean vertical list layout) */}
      <section className="bg-[#ECF0F4] text-neutral-900 py-20 md:py-28 border-b border-neutral-200">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-8 md:px-12 w-full">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-12">
            <div className="lg:col-span-5">
              <h2 className="text-3xl md:text-5xl font-sans font-[250] tracking-tight text-neutral-900 leading-tight" style={{ maxWidth: '300px' }}>
                The Business Opportunity
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pt-28 text-neutral-850 text-base md:text-[18px] font-[300] leading-relaxed font-sans lg:ml-auto w-full" style={{ maxWidth: '614px' }}>
              <p>
                The platform was being positioned as a modern cinematic alternative to traditional tabletop role-playing tools. While established competitors already offered mature gameplay experiences, the opportunity was not simply to replicate existing functionality. The challenge was identifying areas where emerging AI capabilities could create genuine user value while helping the platform establish a differentiated market position.
              </p>
            </div>
          </div>

          <div className="border-t border-neutral-300 divide-y divide-neutral-300/80 mt-12">
            {[
              "Increasing creator productivity",
              "Accelerating content publishing",
              "Reducing gameplay interruptions",
              "Improving campaign preparation workflows",
              "Supporting future premium experiences",
              "Demonstrating product innovation in a rapidly evolving market"
            ].map((goal, idx) => (
              <div key={idx} className="group py-5 px-4 rounded transition-all">
                <h4 className="text-neutral-900 text-base md:text-lg font-normal font-sans flex items-baseline">
                  <span className="text-neutral-400 mr-3 text-sm font-light">0{idx + 1}.</span>
                  <span>{goal}</span>
                </h4>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-neutral-100/50 p-6 rounded-lg border border-neutral-300/60 max-w-2xl">
            <h3 className="text-neutral-500 text-xs font-semibold mb-2 font-sans uppercase tracking-wider">Contextual Horizon</h3>
            <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-light font-sans">
              The project was developed during a period of significant market interest in AI-enabled products, making strategic AI investments an important component of the company's broader product vision.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 4.2: UNDERSTANDING THE OPPORTUNITY (Standalone polished section with copy text) */}
      <section className="bg-white text-neutral-900 py-20 md:py-28 border-b border-neutral-200">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-8 md:px-12 w-full space-y-12">
          
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-sans font-[250] tracking-tight text-neutral-900 leading-tight font-sans" style={{ maxWidth: '380px' }}>
              Understanding the Opportunity
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Column: Workflow and Patterns */}
            <div className="space-y-8">
              <p className="text-xl sm:text-2xl font-light text-neutral-800 tracking-tight leading-normal">
                As I explored creator, player, and Game Master workflows, a recurring pattern emerged.
              </p>
              
              <div className="space-y-6 pt-6 border-t border-neutral-200/60">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-sans font-semibold tracking-wider text-neutral-400 block">The Premise</span>
                  <p className="text-neutral-600 text-base sm:text-[17px] font-light leading-relaxed">
                    Users were not looking for AI to replace creativity.
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-sans font-semibold tracking-wider text-[#3B6FD6] block">The Core Need</span>
                  <p className="text-neutral-900 text-base sm:text-[17px] font-medium leading-relaxed">
                    They wanted AI to eliminate repetitive work.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Key Takeaway */}
            <div className="space-y-8 lg:pl-6 flex flex-col justify-between">
              <div className="space-y-6">
                <p className="text-neutral-700 text-base sm:text-[17px] leading-relaxed font-light">
                  Across every workflow, users still wanted ownership over the final outcome.
                </p>

                <div className="p-6 bg-neutral-50/80 rounded-xl border border-neutral-200/50 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-sans font-semibold tracking-wider text-neutral-400 block">From</span>
                      <span className="text-neutral-400 line-through font-light text-sm sm:text-base block">
                        The opportunity was not automation.
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-sans font-semibold tracking-wider text-[#3B6FD6] block">To</span>
                      <span className="text-neutral-900 font-medium text-sm sm:text-base block">
                        The opportunity was acceleration.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-200">
                <p className="text-[#3B6FD6] text-base leading-relaxed font-medium">
                  This insight became the guiding principle for every AI initiative.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 4.5: THE DESIGN BLUEPRINT CALLOUT (Clean, high-contrast dedicated block) */}
      <section className="bg-neutral-950 text-white py-20 border-b border-neutral-900">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-8 md:px-12 w-full">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <div className="flex items-center justify-center gap-2">
              <span className="inline-block w-2.5 h-2.5 bg-[#3B6FD6] rounded-full"></span>
              <h3 className="text-xs uppercase tracking-widest text-[#3B6FD6] font-semibold font-sans">THE DESIGN BLUEPRINT</h3>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-[48px] font-sans font-light tracking-tight text-white leading-tight font-sans">
              Accelerate, Don't Replace
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-light max-w-2xl mx-auto font-sans">
              AI handles formatting, schema construction, and reference lookups, allowing creators to retain full control of their stories. This is the single most valuable blueprint when designing AI collaborations.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE ECOSYSTEM SEGMENTS (Structured callouts with soft background) */}
      <section className="bg-[#E9EBEF] text-neutral-900 py-20 md:py-24">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-8 md:px-12 w-full">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl md:text-5xl font-sans font-[250] tracking-tight text-neutral-900 leading-tight">
              A Connected Multilateral Tabletop Landscape
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-neutral-300">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 bg-[#3B6FD6] rounded-full"></span>
                <h3 className="font-medium text-lg text-neutral-900">Book Creators</h3>
              </div>
              <p className="text-sm font-light leading-relaxed text-neutral-600 font-sans">
                Publishers upload draft rulebook files. The parser automates structure indexing, instantly preparing collections for monetization on the market.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 bg-[#3B6FD6] rounded-full"></span>
                <h3 className="font-medium text-lg text-neutral-900">Campaign Players</h3>
              </div>
              <p className="text-sm font-light leading-relaxed text-neutral-600 font-sans">
                In-game reference companions pull rules, indices, and mechanics details instantly without breaking standard narrative setups or session speed.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 bg-[#3B6FD6] rounded-full"></span>
                <h3 className="font-medium text-lg text-neutral-900">Game Masters</h3>
              </div>
              <p className="text-sm font-light leading-relaxed text-neutral-600 font-sans">
                Smart campaign generators deliver rich scenario frameworks, eliminating the blank-page dilemma while preserving creative choice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: INTERACTIVE PROTOTOYPES PLATFORM (Interactive Carousel/Gallery cards in pitch dark matching the screenshot) */}
      <section className="bg-[#111111] text-white py-12 md:py-32 border-b border-neutral-950 font-sans relative overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-8 md:px-12 w-full">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start mb-8 md:mb-24">
            <div className="lg:col-span-4 space-y-2">
              <span className="block text-sm font-semibold tracking-tight text-white leading-snug">
                Leveraging AI to Reduce Frictions
              </span>
              <span className="block text-sm font-light tracking-tight text-[#3B6FD6] leading-snug">
                Accelerating Companion Experience
              </span>
            </div>
            <div className="lg:col-span-8">
              <p className="text-xl sm:text-2xl md:text-[32px] font-[300] tracking-tight text-white/95 leading-[1.3] max-w-4xl">
                Four AI-powered workflows that transformed hours of manual preparation into seconds of automated creation.
              </p>
            </div>
          </div>

          {/* PLAYGROUND CAROUSEL EMBED */}
          <EGPPlaygrounds />

        </div>
      </section>





      {/* SECTION: DESIGNING FOR TRUST */}
      <section className="bg-[#000000] text-white py-24 md:py-32 border-t border-neutral-900 border-b border-neutral-950 font-sans relative overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-8 md:px-12 w-full relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
            
            {/* Left Column: Heading and Context */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-12 lg:-mt-3">
              <div className="space-y-6">
                <h2 
                  className="block text-3xl sm:text-4xl md:text-[48px] tracking-tight text-white leading-[1.05] font-sans"
                  style={{ fontWeight: 250 }}
                >
                  Designing For Trust
                </h2>
                <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed max-w-lg">
                  Designing AI experiences required more than generating outputs. A recurring challenge across all initiatives was maintaining user trust. To address this, several patterns were consistently applied:
                </p>
              </div>
            </div>

            {/* Right Column: Visual patterns block layout matching screenshot */}
            <div className="lg:col-span-7 lg:max-w-[calc(100%-80px)] lg:ml-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
                {[
                  {
                    id: "01",
                    label: "Pattern 01",
                    title: "Editable AI-generated outputs"
                  },
                  {
                    id: "02",
                    label: "Pattern 02",
                    title: "Transparent source attribution"
                  },
                  {
                    id: "03",
                    label: "Pattern 03",
                    title: "User-controlled iterations"
                  },
                  {
                    id: "04",
                    label: "Pattern 04",
                    title: "Manual overrides & human review"
                  }
                ].map((pattern, index) => (
                  <motion.div
                    key={pattern.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-[#161616] hover:bg-[#1a1a1a] p-5 rounded-[8px] transition-all duration-300 flex flex-col justify-between min-h-[150px]"
                  >
                    {/* Top Left Label */}
                    <div className="text-[13px] text-neutral-500 font-sans tracking-wide">
                      {pattern.label}
                    </div>

                    {/* Bottom Left Content */}
                    <div className="flex items-center text-[16px] sm:text-[18px] text-white font-light tracking-tight mt-auto leading-snug">
                      <span className="inline-block w-2 h-2 rounded-full bg-white mr-3 shrink-0" />
                      {pattern.title}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

          {/* bottom full width section with border */}
          <div className="mt-16 md:mt-24 pt-8 border-t border-neutral-900 w-full">
            <p className="text-[18px] md:text-[20px] text-center font-light leading-relaxed text-neutral-400">
              These decisions ensured that AI functioned as a collaborator rather than an authority.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION: MY CONTRIBUTION */}
      <section className="bg-[#ffffff] text-neutral-900 py-24 md:py-32 border-b border-neutral-200 font-sans relative overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-8 md:px-12 w-full">
          
          {/* Top Row: Title and Introduction */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-start border-b border-neutral-200 pb-12">
            <div className="lg:col-span-6">
              <h2 
                className="text-4xl md:text-[48px] tracking-tight text-neutral-950 leading-[1.05] font-sans"
                style={{ fontWeight: 250 }}
              >
                My Contribution
              </h2>
            </div>
          </div>

          {/* Details Grid: Two columns of content with elegant dividers, matching screenshot concept */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-24 gap-y-16 mt-16 md:mt-24">
            
            {/* Left Column of Contributions */}
            <div className="space-y-16">
              {[
                {
                  title: "Initiative Leadership",
                  text: "Led UX design for all AI-powered initiatives"
                },
                {
                  title: "Interaction Frameworks",
                  text: "Defined user journeys and interaction models"
                },
                {
                  title: "Experience Uniformity",
                  text: "Established consistency across multiple AI experiences"
                }
              ].map((item, idx) => (
                <div key={idx} className="group">
                  <h3 className="text-xl font-normal text-neutral-900 tracking-tight">
                    {item.title}
                  </h3>
                  <div className="border-t border-neutral-200 my-4 group-hover:border-neutral-400 transition-colors duration-300" />
                  <p className="text-[15px] sm:text-[16px] text-neutral-600 font-light leading-relaxed max-w-xl">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Right Column of Contributions */}
            <div className="space-y-16">
              {[
                {
                  title: "Strategic Alignment",
                  text: "Collaborated directly with the CEO and engineering teams"
                },
                {
                  title: "High-Fidelity Delivery",
                  text: "Designed workflows from concept through high-fidelity delivery"
                },
                {
                  title: "Pragmatic Balancing",
                  text: "Balanced user needs, business goals, and technical feasibility"
                }
              ].map((item, idx) => (
                <div key={idx} className="group">
                  <h3 className="text-xl font-normal text-neutral-900 tracking-tight">
                    {item.title}
                  </h3>
                  <div className="border-t border-neutral-200 my-4 group-hover:border-neutral-400 transition-colors duration-300" />
                  <p className="text-[15px] sm:text-[16px] text-neutral-600 font-light leading-relaxed max-w-xl">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* SECTION: REFLECTION */}
      <section className="bg-[#1b1b1b] text-white py-24 md:py-32 relative font-sans border-t border-neutral-900">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-8 md:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Heading */}
            <div className="lg:col-span-4 space-y-6">
              <h2 
                className="text-4xl md:text-[48px] tracking-tight text-white leading-[1.05] font-sans"
                style={{ fontWeight: 250 }}
              >
                Reflection
              </h2>
            </div>

            {/* Right Column: Detailed Narrative with deep spacing */}
            <div className="lg:col-span-8 space-y-10">
              <p className="text-xl sm:text-2xl md:text-[24px] text-white font-light leading-relaxed tracking-tight">
                The most important lesson from this project was that users rarely wanted AI to create for them.
              </p>
              <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed">
                What they wanted was help overcoming repetitive work, information overload, and creative friction.
              </p>
              <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed">
                The most successful concepts were those that accelerated progress while preserving ownership of the final outcome.
              </p>
              <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed">
                Designing these experiences reinforced the importance of treating AI as a collaborator rather than a replacement for human creativity.
              </p>
            </div>

          </div>
        </div>
      </section>



    </article>
  );
}
