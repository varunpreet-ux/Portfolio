import React from 'react';
import { Project } from '../types';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import HSCPlaygrounds from './HSCPlaygrounds';
import EGPPlaygrounds from './EGPPlaygrounds';
import PPPlaygrounds from './PPPlaygrounds';

interface CustomProps {
  project: Project;
  onBack: () => void;
  mockupUrl?: string;
}

export default function HealthSyncCaseStudy({ project, onBack, mockupUrl }: CustomProps) {
  const displayImage = mockupUrl || "./assets/images/case-studies/personality-plus/regenerated_image_1781030760041.png";

  return (
    <article className="min-h-screen bg-[#FAFAFA] text-[#111111] font-sans relative overflow-hidden selection:bg-[#3B6FD6]/20">
      
      {/* SECTION 1: HERO / INTRO */}
      <section className="bg-[#f1f5f8] text-[#111111] pt-28 md:pt-36 pb-28">
        <div className="max-w-[1360px] mx-auto w-full px-6 sm:px-8 md:px-12">
          
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
              <h1 className="text-4xl sm:text-5xl md:text-[64px] font-sans font-light tracking-tight text-[#111111] leading-[1.05]">
                {project.title}
              </h1>
            </div>

            {/* Right side: Body copy aligned to bottom */}
            <div className="lg:col-span-6 flex lg:justify-end text-neutral-800 font-sans w-full lg:ml-auto items-end pt-8 lg:pt-0 pb-1 transform lg:translate-y-[140px] transition-transform duration-300">
              <div className="w-full max-w-[480px] text-left">
                <p className="text-neutral-800 font-sans font-light text-base sm:text-[20px] leading-relaxed">
                  {project.tagline}
                </p>
              </div>
            </div>
          </div>
          
          {/* Custom Hero Image */}
          <div className={project.id === 'healthsync-mobile' ? "w-full max-w-[1360px] mx-auto relative mt-16 lg:mt-48 aspect-[1360/968] rounded-2xl bg-neutral-100 overflow-hidden shadow-xs border border-neutral-300/40" : "w-full relative mt-16 lg:mt-48 aspect-[16/8] rounded-2xl bg-neutral-200 overflow-hidden shadow-xs border border-neutral-300/40"}>
            <img
              src={displayImage}
              alt={project.imageAlt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* SECTION 1.5: DEDICATED NARRATIVE OVERVIEW */}
      <section className="py-20 bg-[#FAFAFA] font-sans border-b border-neutral-200/80">
        <div className="max-w-[1360px] mx-auto w-full px-6 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
            <div className="lg:col-span-4">
              <h2 className="text-2xl sm:text-[36px] font-sans font-light text-neutral-900 leading-tight">
                {project.id === 'healthsync-mobile' ? 'Presenting Candidates Beyond the Conventional Resume' : 'Optimized Layouts to Relieve Clinical Burnout'}
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-6">
              {project.overview.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-neutral-700 text-base sm:text-lg leading-relaxed font-light">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: STATS AND KPI PROMPT MATRIX */}
      <section className="bg-black text-white py-20 md:py-28">
        <div className="max-w-[1360px] mx-auto w-full px-6 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-[250] tracking-tight text-white leading-tight">
                {project.id === 'healthsync-mobile' ? 'Designed to Connect Authentically' : 'Designed to Relieve Cognitive Strain'}
              </h2>
              <div className="h-[2px] bg-[#3B6FD6] w-24 animate-pulse"></div>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-light">
                {project.id === 'healthsync-mobile'
                  ? 'We designed an interactive video-recording platform configured to support job seekers in presenting themselves authentically. Candidate success is measured by candidate confidence during creation and improved interview invitation rates through professional video introductions.'
                  : 'We designed clinical tracking dashboards configured for real environments. Ward workflow efficiency is measured not in abstract design tokens, but in direct patient engagement hours preserved and critical charting error reductions.'}
              </p>
            </div>

            <div className="lg:col-span-6 space-y-4 font-sans">
              <div className="border border-neutral-800 rounded-lg overflow-hidden bg-neutral-950 shadow-md p-6 sm:p-8 space-y-6 text-neutral-300">
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-1.5 font-sans">Role</h3>
                  <p className="text-base sm:text-lg text-white font-light font-sans">{project.role}</p>
                </div>
                
                <div className="h-[1px] bg-neutral-800/80"></div>

                <div>
                  <h3 className="text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-1.5 font-sans">Duration</h3>
                  <p className="text-base sm:text-lg text-white font-light font-sans">{project.duration}</p>
                </div>

                <div className="h-[1px] bg-neutral-800/80"></div>

                <div>
                  <h3 className="text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-1.5 font-sans">Team</h3>
                  <p className="text-base sm:text-lg text-white font-light font-sans">
                    {project.id === 'healthsync-mobile'
                      ? 'PM, 1 UX Designer (me), 3 Developers'
                      : 'Director of Clinical UX, 1 Lead Developer, Hospital Pilot Board'}
                  </p>
                </div>

                <div className="h-[1px] bg-neutral-800/80"></div>

                <div>
                  <h3 className="text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-3 font-sans">My Contribution</h3>
                  <div className="space-y-4">
                    <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed font-sans">
                      {project.id === 'healthsync-mobile'
                        ? 'Designed guided video recording interfaces with teleprompter systems and established accessible audio/video threshold gauges.'
                        : 'Conducted exhaustive shift UX audits, shadowed emergency medical coordinators, designed tactile wireframes under fluorescent light constraints, and generated zero-fault assets.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: THE BUSINESS OPPORTUNITY */}
      <section className="bg-[#ECF0F4] text-neutral-900 py-20 md:py-28 border-b border-neutral-200">
        <div className="max-w-[1360px] mx-auto w-full px-6 sm:px-8 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-12">
            <div className="lg:col-span-5">
              <h2 className="text-3xl md:text-5xl font-sans font-[250] tracking-tight text-neutral-900 leading-tight">
                The Business Opportunity
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pt-28 text-neutral-850 text-base md:text-[18px] font-[300] leading-relaxed font-sans lg:ml-auto w-full space-y-6" style={{ maxWidth: '614px' }}>
              {project.businessProblem.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="border-t border-neutral-300 divide-y divide-neutral-300/85 mt-12">
            {(project.id === 'healthsync-mobile'
              ? [
                  "Communication ability",
                  "Professional presence",
                  "Confidence",
                  "Personality"
                ]
              : [
                  "Reduce documentation liability and malpractice error rates",
                  "Accelerate ward handoff transition velocity",
                  "Erase 7 nested browser tabs with continuous single-screen streams",
                  "Increase direct bedside care time",
                  "Demonstrate medical UX compliance with local health metrics"
                ]
              ).map((goal, idx) => (
              <div key={idx} className="group py-5 px-4 rounded transition-all">
                <h4 className="text-neutral-900 text-base md:text-lg font-normal font-sans flex items-baseline">
                  <span className="text-neutral-400 mr-3 text-sm font-light">0{idx + 1}.</span>
                  <span>{goal}</span>
                </h4>
              </div>
            ))}
          </div>

          {project.id === 'healthsync-mobile' && (
            <div className="mt-12 pt-8 border-t border-neutral-300 w-full text-neutral-800 text-base md:text-[18px] font-[300] leading-relaxed font-sans">
              <p className="text-center">This creates a gap between application and interview stages. The opportunity was to help candidates communicate these qualities earlier in the hiring process without requiring recruiters to adopt entirely new workflows.</p>
            </div>
          )}

        </div>
      </section>

      {/* SECTION 4.2: UNDERSTANDING THE OPPORTUNITY */}
      <section className="bg-white text-neutral-900 py-20 md:py-28 border-b border-neutral-200">
        <div className="max-w-[1360px] mx-auto w-full px-6 sm:px-8 md:px-12 space-y-12">
          
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-sans font-[250] tracking-tight text-neutral-900 leading-tight">
              {project.id === 'healthsync-mobile' ? 'Understanding the Problem' : 'Understanding the Emergency Ward Opportunity'}
            </h2>
          </div>

          {project.id === 'healthsync-mobile' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
              <div className="lg:col-span-12 space-y-8 text-neutral-800 text-base md:text-[18px] font-[300] leading-relaxed font-sans">
                <p className="text-xl sm:text-2xl font-light text-neutral-950 tracking-tight leading-normal">
                  Through product exploration, one insight quickly emerged:
                </p>
                <p className="text-2xl sm:text-3xl font-normal text-neutral-950 tracking-tight leading-normal border-l-2 border-[#3B6FD6] pl-6 py-1">
                  The biggest obstacle wasn't recording. It was confidence.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 pt-8 border-t border-neutral-200/60">
                  <p>
                    Many users knew they wanted to introduce themselves professionally. Few knew how to structure their story or felt comfortable speaking directly to a camera.
                  </p>
                  <div className="space-y-4">
                    <span className="text-[10px] uppercase font-sans font-semibold tracking-wider text-[#3B6FD6] block">The design challenge became:</span>
                    <p className="text-xl sm:text-2xl font-light text-neutral-900 leading-normal">
                      How might we reduce the anxiety associated with creating a professional video introduction?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Left Column */}
              <div className="space-y-8">
                <p className="text-xl sm:text-2xl font-light text-neutral-800 tracking-tight leading-normal">
                  {project.userProblem}
                </p>
                
                <div className="space-y-6 pt-6 border-t border-neutral-200/60">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-sans font-semibold tracking-wider text-neutral-400 block">The Premise</span>
                    <p className="text-neutral-600 text-base sm:text-[17px] font-light leading-relaxed">
                      Hospital software is historically built for quiet, static office desks.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-sans font-semibold tracking-wider text-[#3B6FD6] block">The Reality</span>
                    <p className="text-neutral-900 text-base sm:text-[17px] font-medium leading-relaxed">
                      Clinical tools are navigated on the move, with gloved hands, under extreme fatigue.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8 lg:pl-6 flex flex-col justify-between">
                <div className="space-y-6">
                  <p className="text-neutral-700 text-base sm:text-[17px] leading-relaxed font-light">
                    Nurses do not have the visual tolerance to map minor pixels or search secondary menus when monitoring clinical statuses.
                  </p>

                  <div className="p-6 bg-neutral-50/80 rounded-xl border border-neutral-200/50 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-sans font-semibold tracking-wider text-neutral-400 block">Before</span>
                        <span className="text-neutral-400 line-through font-light text-sm sm:text-base block">
                          7 nested desktop tabs on a tablet
                        </span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-sans font-semibold tracking-wider text-[#3B6FD6] block">After</span>
                        <span className="text-neutral-900 font-medium text-sm sm:text-base block">
                          Acuity-sorted tactile grid
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-200">
                  <p className="text-[#3B6FD6] text-base leading-relaxed font-medium">
                    This core tension informed every layout rule and gesture blueprint.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* SECTION 4.5: THE BLUEPRINT CALLOUT */}
      <section className="bg-neutral-950 text-white py-20 border-b border-neutral-900">
        <div className="max-w-[1360px] mx-auto w-full px-6 sm:px-8 md:px-12">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <div className="flex items-center justify-center gap-2">
              <span className="inline-block w-2.5 h-2.5 bg-[#3B6FD6] rounded-full"></span>
              <h3 className="text-xs uppercase tracking-widest text-[#3B6FD6] font-semibold font-sans">
                {project.id === 'healthsync-mobile' ? 'DESIGN PRINCIPLE' : 'DESIGNING FOR HIGH STRESS'}
              </h3>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-[48px] font-sans font-light tracking-tight text-white leading-tight">
              {project.id === 'healthsync-mobile' ? 'Guide First. Record Second.' : 'Designed for Cognitive Fatigue'}
            </h2>
            {project.id === 'healthsync-mobile' ? (
              <div className="text-neutral-400 text-sm sm:text-base leading-relaxed font-light max-w-2xl mx-auto font-sans space-y-4">
                <p>
                  Rather than asking users to immediately record themselves, the experience was designed to progressively build confidence through guidance, preparation, and iteration.
                </p>
                <p>
                  Every feature supports this principle.
                </p>
              </div>
            ) : (
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-light max-w-2xl mx-auto font-sans">
                Tactile, large gesture-based interactions eliminate typing errors and accidental screen double-taps. When medical staff operate on empty tanks, software must carry the cognitive safety net.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 3: THE MEDICAL SECTORS */}
      <section className="bg-[#E9EBEF] text-neutral-900 py-20 md:py-24">
        <div className="max-w-[1360px] mx-auto w-full px-6 sm:px-8 md:px-12">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl md:text-5xl font-sans font-[250] tracking-tight text-neutral-900 leading-tight">
              {project.id === 'healthsync-mobile' 
                ? 'A Symmetrical Multi-Sided Candidate-Recruiter Synergy'
                : 'A Symmetrical Multi-Sided Ward Synergy'
              }
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-neutral-300">
            {project.id === 'healthsync-mobile' ? (
              <>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2.5 h-2.5 bg-[#3B6FD6] rounded-full"></span>
                    <h3 className="font-medium text-lg text-neutral-900">Active Candidates</h3>
                  </div>
                  <p className="text-sm font-light leading-relaxed text-neutral-600 font-sans">
                    Build structured professional stories via interactive scripting helper systems, record securely using user-paced teleprompters, and publish with complete creative control.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2.5 h-2.5 bg-[#3B6FD6] rounded-full"></span>
                    <h3 className="font-medium text-lg text-neutral-900">Recruiters & Hiring Managers</h3>
                  </div>
                  <p className="text-sm font-light leading-relaxed text-neutral-600 font-sans">
                    Evaluate complex communication, personality parameters, and user culture alignments inside 60 seconds of secure candidate-video playback.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2.5 h-2.5 bg-[#3B6FD6] rounded-full"></span>
                    <h3 className="font-medium text-lg text-neutral-900">Integration Platforms</h3>
                  </div>
                  <p className="text-sm font-light leading-relaxed text-neutral-600 font-sans">
                    Distribute unified candidate video media hooks across existing resumes, applicant tracking systems, LinkedIn handles, and team queues frictionless.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2.5 h-2.5 bg-[#3B6FD6] rounded-full"></span>
                    <h3 className="font-medium text-lg text-neutral-900">Ward Coordinators</h3>
                  </div>
                  <p className="text-sm font-light leading-relaxed text-neutral-600 font-sans">
                    Review macro ward capacity and patient assignment in real-time, matching clinical acuity directly without switching dashboard perspectives.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2.5 h-2.5 bg-[#3B6FD6] rounded-full"></span>
                    <h3 className="font-medium text-lg text-neutral-900">Active Duty Nurses</h3>
                  </div>
                  <p className="text-sm font-light leading-relaxed text-neutral-600 font-sans">
                    Input vitals on-the-fly inside corridors using 48px tactile input triggers. Swipe-to-commit eliminates safety and mislogging discrepancies.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2.5 h-2.5 bg-[#3B6FD6] rounded-full"></span>
                    <h3 className="font-medium text-lg text-neutral-900">Attending Physicians</h3>
                  </div>
                  <p className="text-sm font-light leading-relaxed text-[#555555] font-sans">
                    Access a programmatically compiled chronological overview of the patient shifts, diagnosing trends immediately on single-screen feeds.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 5: INTERACTIVE PROTOTOYPES PLATFORM (Interactive Carousel/Gallery cards in pitch dark matching the screenshot) */}
      <section className="bg-[#111111] text-white py-12 md:py-32 border-b border-neutral-950 font-sans relative overflow-hidden">
        <div className="max-w-[1360px] mx-auto w-full px-6 sm:px-8 md:px-12">
          
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
          {project.id === 'healthsync-mobile' ? <PPPlaygrounds /> : <EGPPlaygrounds />}

        </div>
      </section>

      {/* SECTION: DESIGNING FOR TRUST / CLINICAL ACCURACY */}
      {project.id !== 'healthsync-mobile' && (
        <section className="bg-[#000000] text-white py-24 md:py-32 border-t border-neutral-900 border-b border-neutral-950 font-sans relative overflow-hidden">
          <div className="max-w-[1360px] mx-auto w-full px-6 sm:px-8 md:px-12 relative z-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
              
              {/* Left Column */}
              <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-12 lg:-mt-3">
                <div className="space-y-6">
                  <h2 
                    className="block text-3xl sm:text-4xl md:text-[48px] tracking-tight text-white leading-[1.05] font-sans font-[250]"
                  >
                    Designing for Clinical Trust
                  </h2>
                  <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed max-w-lg">
                    In life-and-death medicine, designers cannot larp with safety margins. Nurses and coordinators need absolute validation before any clinical change writes back to server databases:
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-7 lg:max-w-[calc(100%-80px)] lg:ml-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
                  {[
                    {
                      id: "01",
                      label: "Pattern 01",
                      title: "Dual-signoff logging verification"
                    },
                    {
                      id: "02",
                      label: "Pattern 02",
                      title: "High-contrast clinical alert color flare"
                    },
                    {
                      id: "03",
                      label: "Pattern 03",
                      title: "Swipe-to-commit physical intent"
                    },
                    {
                      id: "04",
                      label: "Pattern 04",
                      title: "Local database auto-commit backup"
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
                      <div className="text-[13px] text-neutral-500 font-sans tracking-wide">
                        {pattern.label}
                      </div>

                      <div className="flex items-center text-[16px] sm:text-[18px] text-white font-light tracking-tight mt-auto leading-snug">
                        <span className="inline-block w-2.5 h-2.5 rounded-full bg-white mr-3 shrink-0" />
                        {pattern.title}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>

            <div className="mt-16 md:mt-24 pt-8 border-t border-neutral-900 w-full">
              <p className="text-[18px] md:text-[20px] text-center font-light leading-relaxed text-neutral-400">
                These details proved essential to earning complete compliance approval from hospital pilot boards.
              </p>
            </div>

          </div>
        </section>
      )}

      {/* SECTION: MY CONTRIBUTION */}
      <section className="bg-[#ffffff] text-neutral-900 border-b border-neutral-200 py-24 md:py-32 font-sans relative overflow-hidden">
        <div className="max-w-[1360px] mx-auto w-full px-6 sm:px-8 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-start border-b border-neutral-200 pb-12">
            <div className="lg:col-span-6">
              <h2 
                className="text-4xl md:text-[48px] tracking-tight text-neutral-950 leading-[1.05] font-sans font-[250]"
              >
                My Contribution
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-24 gap-y-16 mt-16 md:mt-24">
            {/* Left Column */}
            <div className="space-y-16">
              {(project.id === 'healthsync-mobile'
                ? [
                    {
                      title: "End-to-End UX Leadership",
                      text: "Led UX design across the end-to-end product experience"
                    },
                    {
                      title: "User Flows & Architecture",
                      text: "Defined user flows and interaction models"
                    },
                    {
                      title: "AI-Assisted Workflows",
                      text: "Designed AI-assisted scripting workflows"
                    }
                  ]
                : [
                    {
                      title: "Shift Shadows & Audits",
                      text: "Conducted 42 shadow-hours during high-pressure emergency department night shifts to isolate tactile user fatigue patterns."
                    },
                    {
                      title: "Acuity Mapping Wireframes",
                      text: "Designed simple grid models optimized to surface patient emergency level flags within the physical thumbreach."
                    },
                    {
                      title: "Development Collaboration",
                      text: "Partnered with technical team engineers to implement responsive Tailwind structures, reducing documentation lag."
                    }
                  ]
              ).map((item, idx) => (
                <div key={idx} className="group">
                  <h3 className="text-xl font-normal text-neutral-900 tracking-tight">
                    {item.title}
                  </h3>
                  <div className="border-t border-neutral-200 group-hover:border-neutral-400 my-4 transition-colors duration-300" />
                  <p className="text-[15px] sm:text-[16px] text-neutral-600 font-light leading-relaxed max-w-xl">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-16">
              {(project.id === 'healthsync-mobile'
                ? [
                    {
                      title: "Teleprompter & Recording",
                      text: "Designed teleprompter-based recording experiences"
                    },
                    {
                      title: "Sharing & Dashboards",
                      text: "Designed sharing and dashboard experiences"
                    },
                    {
                      title: "Strategic Stakeholder Alignment",
                      text: "Collaborated with stakeholders and engineering teams throughout development"
                    }
                  ]
                : [
                    {
                      title: "Continuous Timeline Hub",
                      text: "Consolidated 7 scattered browser tabs into a chronologically grouped state log, eliminating documentation drift."
                    },
                    {
                      title: "Strategic Impact Pitching",
                      text: "Presented data-backed reduction in average vital log click frequencies to secure executive pilot funding."
                    },
                    {
                      title: "Promotion Catalyst",
                      text: "Recognized with a rapid team promotion from ux intern to full ux designer due to demonstrable business value."
                    }
                  ]
              ).map((item, idx) => (
                <div key={idx} className="group">
                  <h3 className="text-xl font-normal text-neutral-900 tracking-tight">
                    {item.title}
                  </h3>
                  <div className="border-t border-neutral-200 group-hover:border-neutral-400 my-4 transition-colors duration-300" />
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
        <div className="max-w-[1360px] mx-auto w-full px-6 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column */}
            <div className="lg:col-span-4 space-y-6">
              <h2 
                className="text-4xl md:text-[48px] tracking-tight text-white leading-[1.05] font-sans font-[250]"
              >
                Reflection
              </h2>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-8 space-y-10">
              {project.id === 'healthsync-mobile' ? (
                <>
                  <p className="text-xl sm:text-2xl md:text-[24px] text-white font-light leading-relaxed tracking-tight">
                    The most valuable insight from this project was that confidence is often a design problem rather than a user problem.
                  </p>
                  <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed">
                    Many users already possess the skills and experiences necessary to tell compelling professional stories. What they lack is structure, guidance, and a comfortable environment in which to present themselves.
                  </p>
                  <p className="text-base sm:text-lg text-[#3B6FD6] font-medium leading-relaxed">
                    By reducing uncertainty throughout the process, the product helps users focus less on the mechanics of recording and more on communicating who they are.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xl sm:text-2xl md:text-[24px] text-white font-light leading-relaxed tracking-tight">
                    Healthcare design is a powerful equalizer. Real people's safety relies directly on the speed and reliability of our layouts.
                  </p>
                  <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed">
                    Shadowing ward staff in person taught me to design for the physical world—stress, glare, interruptions, and tired fingers—rather than sterile office monitors.
                  </p>
                  <p className="text-base sm:text-lg text-[#3B6FD6] font-medium leading-relaxed">
                    This project cemented my product philosophy: the highest form of UX is reducing user strain to preserve human energy where it matters most.
                  </p>
                </>
              )}
            </div>

          </div>
        </div>
      </section>

    </article>
  );
}
