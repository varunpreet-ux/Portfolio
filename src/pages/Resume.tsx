import { MILESTONES, SKILL_GROUPS, PERSONAL_INFO } from '../data';
import ArrowLaunch from '../components/ArrowLaunch';
import NumberShuffle from '../components/NumberShuffle';
import { Mail, Linkedin, MapPin, Calendar, FileDown, Eye } from 'lucide-react';
import { motion } from 'motion/react';

export default function Resume() {
  const handlePrint = () => {
    window.print();
  };
 
  return (
    <section className="bg-[#FAFAFA] text-[#111111] min-h-screen pt-32 pb-24 select-text print:bg-white print:text-black print:pt-4 print:pb-4">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-8 md:px-12 w-full">
        <div className="max-w-4xl mx-auto">
        
        {/* Call to actions trigger to print or export */}
        <div className="flex flex-wrap gap-4 justify-between items-center mb-10 border-b border-zinc-200 pb-6 print:hidden">

          <div className="flex gap-4">
            <button
               onClick={handlePrint}
              className="group px-4 py-2 border border-zinc-200 hover:border-[#3B6FD6] bg-white hover:bg-zinc-50 font-sans text-xs text-[#111111] transition-all rounded flex items-center gap-2 shadow-2xs"
              id="print-resume-btn"
            >
              Print / Save PDF
              <ArrowLaunch>
                <FileDown size={14} className="text-[#3B6FD6]" />
              </ArrowLaunch>
            </button>
          </div>
        </div>
 
        {/* Start Printable Sheet Canvas */}
        <div className="border border-zinc-200 bg-white p-8 md:p-12 rounded-lg print:border-none print:p-0 print:bg-transparent shadow-xs" id="resume-sheet">
          
          {/* Resume Header Panel */}
          <div className="flex flex-col md:flex-row justify-between items-start border-b border-zinc-200 pb-8 mb-8 print:border-black/20">
            <div>
              <h1 className="text-3xl font-sans font-bold text-[#111111] print:text-black leading-none mb-2">
                Varunpreet Singh
              </h1>
              <p className="font-sans text-xs text-[#3B6FD6] print:text-black/80 font-semibold">
                Business-Centered Product Designer
              </p>
              <p className="text-xs font-sans text-zinc-600 print:text-black/60 font-light mt-4 max-w-lg leading-relaxed">
                Applying rigorous behavioral research, spatial wireframing, component tokens architecture, and value proposition analytics to produce high-retention SaaS solutions.
              </p>
            </div>
            
            {/* Quick Contact Block */}
            <div className="mt-6 md:mt-0 space-y-2 font-sans text-left text-xs print:text-black">
              <div className="flex items-center gap-2 text-zinc-600 print:text-black/80">
                <Mail size={13} className="text-[#3B6FD6] shrink-0 print:text-black" />
                <span>{PERSONAL_INFO.email}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-600 print:text-black/80">
                <Linkedin size={13} className="text-[#3B6FD6] shrink-0 print:text-black" />
                <span>{PERSONAL_INFO.linkedin.replace("https://", "")}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-600 print:text-black/80">
                <MapPin size={13} className="text-[#3B6FD6] shrink-0 print:text-black" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>
          </div>
 
          {/* Chronology experience timeline */}
          <div className="mb-10">
            <h2 className="font-sans text-sm text-[#3B6FD6] print:text-black border-b border-zinc-200 print:border-black/20 pb-2 mb-6 font-semibold">
              Professional Work History
            </h2>
            
            <div className="space-y-6">
              {MILESTONES.map((mile, id) => (
                <div key={id} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6">
                  <div className="md:col-span-3 font-sans text-xs">
                    <span className="text-[#111111] print:text-black font-semibold block">{mile.year}</span>
                    <span className="text-zinc-500 print:text-black/60 block text-[10px]">{mile.company}</span>
                  </div>
                  <div className="md:col-span-9 space-y-2">
                    <h3 className="text-sm font-sans font-semibold text-[#111111] print:text-black">
                      {mile.role}
                    </h3>
                    <p className="text-xs text-zinc-600 print:text-black/80 font-sans leading-relaxed font-light">
                      {mile.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
 
          {/* Education credentials */}
          <div className="mb-10">
            <h2 className="font-sans text-sm text-[#3B6FD6] print:text-black border-b border-zinc-200 print:border-black/20 pb-2 mb-6 font-semibold">
              Education & Certifications
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-3 font-sans text-xs">
                <span className="text-[#111111] print:text-black font-semibold block">2020 - 2024</span>
                <span className="text-zinc-500 print:text-black/60 block text-[10px]">University of California</span>
              </div>
              <div className="md:col-span-9">
                <h3 className="text-sm font-sans font-semibold text-[#111111] print:text-black">
                  B.S. Cognitive Science • Human-Computer Interaction
                </h3>
                <p className="text-xs text-zinc-600 print:text-black/70 font-sans mt-1 leading-relaxed font-light">
                  Specialized study focused on sensory processing metrics, psychological friction maps, interface accessibility, and user attention distribution paradigms.
                </p>
              </div>
            </div>
          </div>
 
          {/* Divided Skills Index */}
          <div>
            <h2 className="font-sans text-sm text-[#3B6FD6] print:text-black border-b border-zinc-200 print:border-black/20 pb-2 mb-6 font-semibold">
              Skills System Spec
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {SKILL_GROUPS.map((group, id) => (
                <div key={id} className="space-y-2">
                  <h3 className="font-sans text-xs text-[#111111] print:text-black font-semibold">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 font-sans text-[10px] text-zinc-600 print:text-black/80">
                    {group.items.map((it, idx) => (
                      <span key={idx} className="bg-zinc-50 border border-zinc-200 px-2 py-0.5 rounded print:border-dashed print:border-black/20">
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
 
        </div>
 
        {/* Print only notice banner */}
        <div className="mt-12 text-center print:hidden">
          <p className="font-sans text-[10px] text-zinc-500">
            This CV matches standards required by applicant tracking engines (ATS)
          </p>
        </div>
 
        </div>
      </div>
    </section>
  );
}
