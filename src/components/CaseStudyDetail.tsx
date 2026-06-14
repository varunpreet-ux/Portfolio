import { Project } from '../types';
import NumberShuffle from './NumberShuffle';
import { 
  ArrowLeft, CheckCircle2, TrendingUp, Compass, Cpu, Target, FileText, Footprints
} from 'lucide-react';
import ArrowLaunch from './ArrowLaunch';
import EvilGeniusSidekickCaseStudy from './EvilGeniusCaseStudy';
import HealthSyncCaseStudy from './HealthSyncCaseStudy';
import { motion } from 'motion/react';

interface CaseStudyDetailProps {
  project: Project;
  onBack: () => void;
  mockupUrl?: string; // Optional generated image URL
}

export default function CaseStudyDetail({ project, onBack, mockupUrl }: CaseStudyDetailProps) {
  // If this is the "Evil Genius Sidekick" (finroute-ai), render the custom immersive detailed experience
  if (project.id === 'finroute-ai') {
    return <EvilGeniusSidekickCaseStudy project={project} onBack={onBack} mockupUrl={mockupUrl} />;
  }

  // If this is the "HealthSync Mobile" (healthsync-mobile), render the custom immersive clinical tracking experience
  if (project.id === 'healthsync-mobile') {
    return <HealthSyncCaseStudy project={project} onBack={onBack} mockupUrl={mockupUrl} />;
  }

  // Fallback for regular case studies
  const displayImage = mockupUrl || `https://picsum.photos/seed/${project.id}/1200/900`;

  return (
    <article className="min-h-screen bg-[#FAFAFA] text-[#111111] pt-32 pb-24 overflow-hidden select-text font-sans">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-8 md:px-12 w-full">
        <div className="max-w-4xl mx-auto">
        
        {/* Back navigation */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="group mb-8 flex items-center gap-2 text-xs uppercase tracking-widest text-[#555555] hover:text-[#3B6FD6] transition-colors focus:outline-none cursor-pointer"
        >
          <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform text-[#3B6FD6]" />
          <span>Back to Work</span>
        </motion.button>
 
        {/* Big Editorial Header */}
        <header className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs text-[#3B6FD6] uppercase tracking-widest mb-3 font-medium font-sans"
          >
            {project.category}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-sans font-light tracking-tight text-[#111111] leading-none mb-6"
          >
            {project.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-600 font-sans leading-relaxed tracking-wide font-light border-l border-zinc-200 pl-6"
          >
            {project.tagline}
          </motion.p>
        </header>
 
        {/* Project Metadata Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 border border-zinc-200 bg-zinc-100/30 rounded-lg mb-12 text-xs shadow-2xs font-sans"
        >
          <div>
            <span className="text-zinc-500 block mb-1 font-medium">ROLE</span>
            <span className="font-normal text-[#111111]">{project.role}</span>
          </div>
          <div>
            <span className="text-zinc-500 block mb-1 font-medium">DURATION</span>
            <span className="font-normal text-[#111111]">{project.duration}</span>
          </div>
          <div>
            <span className="text-zinc-500 block mb-1 font-medium">TIMELINE</span>
            <span className="font-normal text-[#111111]">{project.year}</span>
          </div>
          <div>
            <span className="text-zinc-500 block mb-1 font-medium">FOCUS</span>
            <span className="font-normal text-[#3B6FD6]">Business Impact</span>
          </div>
        </motion.div>
 
        {/* High-Key Business Impact Metrics */}
        <section className="mb-16">
          <h2 className="text-xs tracking-widest uppercase text-zinc-400 mb-6 font-medium font-sans">Key Performance Indicators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.metrics.map((m, i) => (
              <div key={i} className="border border-zinc-200 bg-white p-6 rounded-lg relative overflow-hidden group hover:border-[#3B6FD6]/40 transition-colors shadow-2xs font-sans">
                <div className="text-3xl md:text-4xl font-sans font-light text-[#3B6FD6] mb-1">
                  <NumberShuffle text={m.value} delay={i * 200} />
                </div>
                <div className="text-[11px] tracking-tight text-zinc-500 uppercase font-medium">{m.label}</div>
              </div>
            ))}
          </div>
        </section>
 
        {/* Case Study Image Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="w-full max-w-[1360px] mx-auto aspect-[1360/968] border border-zinc-200 rounded-2xl overflow-hidden bg-neutral-100 mb-16 relative shadow-xs"
        >
          <img
            src={displayImage}
            alt={project.imageAlt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-all duration-700"
          />
          <div className="absolute bottom-4 right-4 bg-white/95 border border-zinc-200 px-3 py-1 text-[10px] text-[#3B6FD6] rounded backdrop-blur shadow-xs font-sans">
            GPU ACCELERATED PREVIEW
          </div>
        </motion.div>
 
        {/* Narrative Flow */}
        <div className="space-y-16">
          
          {/* Project Overview */}
          <section className="pt-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 font-sans">
              <div className="md:col-span-1">
                <span className="text-xs text-[#3B6FD6] uppercase tracking-wider flex items-center gap-2 font-medium">
                  <Compass size={14} /> OVERVIEW
                </span>
              </div>
              <div className="md:col-span-3 font-sans">
                <p className="text-zinc-650 font-sans text-base leading-relaxed font-light">
                  {project.overview}
                </p>
              </div>
            </div>
          </section>
 
          {/* Business Problem */}
          <section className="pt-8 bg-zinc-100/20 p-4 rounded font-sans">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
              <div className="md:col-span-1">
                <span className="text-xs text-[#3B6FD6] uppercase tracking-wider flex items-center gap-2 font-medium">
                  <Target size={14} /> BUSINESS PROBLEM
                </span>
                <span className="hidden md:block text-[9px] text-zinc-400 mt-2 opacity-60">STRATEGIC ALIGNMENT</span>
              </div>
              <div className="md:col-span-3">
                <p className="text-[#111111] font-sans text-base leading-relaxed font-medium mb-3">
                  How does design solve commercial issues?
                </p>
                <p className="text-zinc-650 font-sans text-base leading-relaxed font-light">
                  {project.businessProblem}
                </p>
              </div>
            </div>
          </section>
 
          {/* User Problem */}
          <section className="pt-8 font-sans">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
              <div className="md:col-span-1">
                <span className="text-xs text-[#3B6FD6] uppercase tracking-wider flex items-center gap-2 font-medium">
                  <Footprints size={14} /> USER PROBLEM
                </span>
                <span className="hidden md:block text-[9px] text-zinc-400 mt-2 opacity-60">BEHAVIORAL FRICTION</span>
              </div>
              <div className="md:col-span-3">
                <p className="text-zinc-650 font-sans text-base leading-relaxed font-light">
                  {project.userProblem}
                </p>
              </div>
            </div>
          </section>
 
          {/* Research & Insights */}
          <section className="pt-8 font-sans">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
              <div className="md:col-span-1">
                <span className="text-xs text-[#3B6FD6] uppercase tracking-wider flex items-center gap-2 font-medium">
                  <FileText size={14} /> RESEARCH & INSIGHTS
                </span>
                <span className="hidden md:block text-[9px] text-zinc-400 mt-2 opacity-60">CONTEXTUAL INQUIRY</span>
              </div>
              <div className="md:col-span-3">
                <p className="text-[#111111] font-sans text-base font-medium mb-4">
                  {project.research.approach}
                </p>
                <div className="space-y-4">
                  {project.research.insights.map((insight, index) => (
                    <div key={index} className="flex gap-3 items-start bg-white p-4 border border-zinc-200 rounded shadow-2xs">
                      <div className="w-5 h-5 flex items-center justify-center rounded-full bg-[#3B6FD6]/10 text-[#3B6FD6] shrink-0 text-[9px] font-bold">
                        {index + 1}
                      </div>
                      <p className="text-xs text-zinc-650 leading-relaxed">
                        {insight}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
 
          {/* Design Process */}
          <section className="pt-8 font-sans">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
              <div className="md:col-span-1">
                <span className="text-xs text-[#3B6FD6] uppercase tracking-wider flex items-center gap-2 font-medium">
                  <Cpu size={14} /> DESIGN PROCESS
                </span>
                <span className="hidden md:block text-[9px] text-zinc-400 mt-2 opacity-60">ENGINEERING AWARENESS</span>
              </div>
              <div className="md:col-span-3 font-sans">
                <p className="text-zinc-650 font-sans text-base leading-relaxed font-light mb-6">
                  {project.designProcess}
                </p>
                
                {/* Process schematic illustration */}
                <div className="border border-zinc-200 bg-white rounded p-6 text-xs space-y-4 shadow-2xs">
                  <div className="flex justify-between border-b border-zinc-200 pb-2 font-medium text-[#111111]">
                    <span>STAGE WORKFLOW</span>
                    <span className="text-[#3B6FD6]">STRICT VALIDATION</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-3 border border-zinc-200 rounded bg-zinc-50 shadow-3xs">
                      <div className="text-[10px] text-[#3B6FD6] mb-1 font-medium">01 / DISCOVER</div>
                      <span className="text-zinc-500 block text-[10px]">Business & Telemetry Sync</span>
                    </div>
                    <div className="p-3 border border-zinc-200 rounded bg-zinc-50 shadow-3xs">
                      <div className="text-[10px] text-[#3B6FD6] mb-1 font-medium">02 / INTERACT</div>
                      <span className="text-zinc-500 block text-[10px]">Macro-frictions Removal</span>
                    </div>
                    <div className="p-3 border border-zinc-200 rounded bg-zinc-50 shadow-3xs">
                      <div className="text-[10px] text-[#3B6FD6] mb-1 font-medium">03 / HANDOFF</div>
                      <span className="text-zinc-500 block text-[10px]">Programmatic Tokens Transfer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
 
          {/* Wireframes */}
          <section className="pt-8 font-sans">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
              <div className="md:col-span-1">
                <span className="text-xs text-[#3B6FD6] uppercase tracking-wider flex items-center gap-2 font-medium">
                  <TrendingUp size={14} /> WIREFRAMES
                </span>
                <span className="hidden md:block text-[9px] text-zinc-400 mt-2 opacity-60">SPATIAL RESOLUTION</span>
              </div>
              <div className="md:col-span-3">
                <p className="text-zinc-650 font-sans text-base leading-relaxed font-light mb-4">
                  {project.wireframesDescription}
                </p>
                
                {/* Wireframe simulated grid layout */}
                <div className="grid grid-cols-12 gap-3 aspect-[16/8] border border-zinc-200 bg-zinc-50 p-4 rounded-lg relative overflow-hidden">
                  <div className="col-span-4 border border-zinc-200 border-dashed rounded p-2 flex flex-col justify-between text-[9px] text-zinc-500">
                    <span>[Primary Action Unit]</span>
                    <div className="h-6 bg-white rounded border border-zinc-200"></div>
                  </div>
                  <div className="col-span-8 border border-zinc-200 border-dashed rounded p-2 flex flex-col justify-between text-[9px] text-zinc-500">
                    <span>[Active Visualization Field]</span>
                    <div className="h-2 w-1/3 bg-[#3B6FD6]/20 rounded mb-1"></div>
                    <div className="h-12 bg-white/60 rounded border border-zinc-200 relative">
                      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-zinc-200 border-dashed animate-pulse"></div>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-white/85 backdrop-blur-xs">
                    <span className="text-[10px] text-[#3B6FD6] border border-[#3B6FD6]/30 px-3 py-1 uppercase tracking-widest bg-white shadow-xs rounded font-medium">
                      Spatial Wireframe Grid Mockup
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
 
          {/* Final Solution */}
          <section className="pt-8 font-sans">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
              <div className="md:col-span-1">
                <span className="text-xs text-[#3B6FD6] uppercase tracking-wider flex items-center gap-2 font-medium">
                  <CheckCircle2 size={14} /> SOLUTION
                </span>
                <span className="hidden md:block text-[9px] text-zinc-400 mt-2 opacity-60">FINISHED CRAFT</span>
              </div>
              <div className="md:col-span-3">
                <h3 className="text-xl font-sans text-[#111111] font-light mb-3">Productized Outcome</h3>
                <p className="text-zinc-650 font-sans text-base leading-relaxed font-light">
                  {project.solution}
                </p>
              </div>
            </div>
          </section>
 
          {/* Outcomes */}
          <section className="pt-8 bg-[#3B6FD6]/5 p-4 rounded font-sans">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
              <div className="md:col-span-1">
                <span className="text-xs text-[#3B6FD6] uppercase tracking-wider flex items-center gap-2 font-medium">
                  <TrendingUp size={14} /> MEASURED OUTCOMES
                </span>
                <span className="hidden md:block text-[9px] text-zinc-400 mt-2 opacity-60 font-medium">QUANTIFIABLE SUCCESS</span>
              </div>
              <div className="md:col-span-3">
                <ul className="space-y-4">
                  {project.outcomes.map((outcome, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-[#3B6FD6] text-xs mt-1 shrink-0">✦</span>
                      <p className="text-[#111111] text-xs leading-relaxed font-sans">
                        {outcome}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
 
          {/* Reflections */}
          <section className="pt-8 font-sans">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
              <div className="md:col-span-1">
                <span className="text-xs text-[#3B6FD6] uppercase tracking-wider flex items-center gap-2 font-semibold">
                  <Compass size={14} /> REFLECTION
                </span>
                <span className="hidden md:block text-[9px] text-zinc-400 mt-2 opacity-60">PRODUCT INSIGHT</span>
              </div>
              <div className="md:col-span-3 font-sans">
                <p className="text-zinc-650 font-sans text-base leading-relaxed font-light">
                  {project.reflections}
                </p>
              </div>
            </div>
          </section>
 
        </div>
 
        {/* Closing Case Study Block */}
        <footer className="mt-24 pt-12 border-t border-zinc-200 text-center font-sans">
          <p className="text-[10px] text-zinc-400 uppercase tracking-widest mb-6 font-medium">Finished Reading?</p>
          <button
            onClick={onBack}
            className="group px-6 py-3 border border-zinc-300 text-xs uppercase tracking-widest text-[#111111] hover:border-[#3B6FD6] hover:text-[#3B6FD6] transition-all rounded shadow-2xs cursor-pointer focus:outline-none"
          >
            Return to Work Space
            <ArrowLaunch className="inline-block ml-2 text-[#3B6FD6]">
              <span className="text-xs">↗</span>
            </ArrowLaunch>
          </button>
        </footer>
 
        </div>
      </div>
    </article>
  );
}
