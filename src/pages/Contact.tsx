import { useState } from 'react';
import { PERSONAL_INFO } from '../data';
import { Check, Clipboard, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <section className="bg-[#1b1b1b] text-[#ffffff] min-h-screen pt-44 pb-32 select-text font-sans selection:bg-[#cce3fd] selection:text-black flex items-center justify-center">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-8 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-sans font-[250] tracking-tight text-white leading-[1.1]">
              Have an opportunity in mind?
            </h1>
            <div className="space-y-4 text-zinc-300 font-sans text-[16px] sm:text-[18px] font-[300] leading-relaxed max-w-xl">
              <p>
                I'm always open to conversations about product design, UX strategy, AI-driven experiences, and opportunities where thoughtful design can create meaningful business outcomes.
              </p>
              <p>
                Whether you're hiring, building a product, or simply want to exchange ideas, I'd love to hear from you.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Information & Hero-Styled Actions */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Open to opportunities blinking dot badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[13px] font-medium tracking-wide w-fit">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              Open to opportunities
            </div>

            <div className="space-y-8 bg-black/20 p-8 sm:p-10 rounded-2xl border border-white/5 backdrop-blur-sm w-full">
            <div className="space-y-3">
              <h3 className="text-xs uppercase font-medium tracking-wider text-zinc-400">Contact Information</h3>
              <div>
                <div className="text-[20px] sm:text-[24px] text-zinc-100 select-all tracking-tight font-light truncate" style={{ fontFamily: 'Geist' }}>{PERSONAL_INFO.email}</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center pt-4 border-t border-white/5">
              {/* Copy Email Button */}
              <motion.button
                type="button"
                id="btn-copy-email"
                onClick={handleCopyEmail}
                initial="initial"
                whileHover="hover"
                animate="initial"
                className="relative pl-5 bg-transparent text-white font-sans font-[400] text-[15px] rounded-[6px] tracking-wide border border-white/20 focus:outline-none cursor-pointer overflow-hidden inline-flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto"
                style={{ height: '48px', paddingTop: '12px', paddingBottom: '12px', paddingRight: '16px' }}
              >
                {/* Premium color-wipe sliding sheet */}
                <motion.div
                  className="absolute inset-0 bg-white pointer-events-none"
                  variants={{
                    initial: { x: "-101%" },
                    hover: { x: "0%" }
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />

                <motion.span
                  className="relative z-10 block whitespace-nowrap"
                  variants={{
                    initial: { color: "#ffffff" },
                    hover: { color: "#111111" }
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {copied ? 'Copied!' : 'Copy Email'}
                </motion.span>

                {/* Vertical cylindrical rolling 3D icon container */}
                <div 
                  className="relative z-10 overflow-hidden inline-flex items-center justify-center select-none"
                  style={{ 
                    height: '14px', 
                    width: '14px',
                    perspective: '150px',
                    transformStyle: 'preserve-3d'
                  }}
                >
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
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      transformOrigin: 'center bottom',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      willChange: 'transform, opacity',
                    }}
                  >
                    {copied ? <Check size={14} /> : <Clipboard size={14} />}
                  </motion.span>

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
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      transformOrigin: 'center top',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      willChange: 'transform, opacity',
                    }}
                  >
                    {copied ? <Check size={14} /> : <Clipboard size={14} />}
                  </motion.span>
                </div>
              </motion.button>

              {/* LinkedIn Link Button */}
              <motion.a
                id="link-linkedin"
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                initial="initial"
                whileHover="hover"
                animate="initial"
                className="relative pl-5 bg-transparent text-white font-sans font-[400] text-[15px] rounded-[6px] tracking-wide border border-white/20 focus:outline-none cursor-pointer overflow-hidden inline-flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto"
                style={{ height: '48px', paddingTop: '12px', paddingBottom: '12px', paddingRight: '16px' }}
              >
                {/* Premium color-wipe sliding sheet */}
                <motion.div
                  className="absolute inset-0 bg-white pointer-events-none"
                  variants={{
                    initial: { x: "-101%" },
                    hover: { x: "0%" }
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />

                <motion.span
                  className="relative z-10 block whitespace-nowrap"
                  variants={{
                    initial: { color: "#ffffff" },
                    hover: { color: "#111111" }
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  LinkedIn
                </motion.span>

                {/* Vertical cylindrical rolling 3D icon container */}
                <div 
                  className="relative z-10 overflow-hidden inline-flex items-center justify-center select-none"
                  style={{ 
                    height: '14px', 
                    width: '14px',
                    perspective: '150px',
                    transformStyle: 'preserve-3d'
                  }}
                >
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
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      transformOrigin: 'center bottom',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      willChange: 'transform, opacity',
                    }}
                  >
                    <ExternalLink size={14} />
                  </motion.span>

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
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      transformOrigin: 'center top',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      willChange: 'transform, opacity',
                    }}
                  >
                    <ExternalLink size={14} />
                  </motion.span>
                </div>
              </motion.a>
            </div>
          </div>
        </div>

        </div>
      </div>
    </section>
  );
}

