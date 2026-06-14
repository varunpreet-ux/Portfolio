import { PERSONAL_INFO } from '../data';
import { PageType } from '../types';
import FooterCanvas from './FooterCanvas';

interface FooterProps {
  activePage?: PageType;
  onPageChange?: (page: PageType) => void;
}

export default function Footer({ activePage, onPageChange }: FooterProps) {
  const handleNavClick = (page: PageType) => {
    if (onPageChange) {
      onPageChange(page);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const menuItemsCol1 = [
    { label: 'Work', target: 'work' as PageType },
    { label: 'About', target: 'about' as PageType },
    { label: 'Resume', target: 'resume' as PageType },
    { label: 'Contact', target: 'contact' as PageType },
  ];

  return (
    <footer className="w-full bg-[#050505] print:hidden z-10 relative select-text overflow-hidden" id="site-footer">
      
      {/* Top Section with Content and Navigation Columns */}
      <div className="max-w-[1360px] mx-auto px-6 sm:px-8 md:px-12 pt-[100px] pb-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[52%_48%] gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Headline matching the design */}
          <div>
            <h2 
              className="font-sans font-extralight text-[#F5F5F5] tracking-tight leading-[1.12] text-3xl sm:text-4xl lg:text-[46px]" 
              style={{ fontWeight: 200 }}
              id="footer-editorial-heading"
            >
              Let’s build products<br />
              that create impact.
            </h2>
          </div>

          {/* Right Column: Navigation Columns */}
          <div className="grid grid-cols-2 gap-x-6 sm:gap-x-12 gap-y-8 text-left lg:ml-auto w-full max-w-[320px]">
            
            {/* Column 1: Menu */}
            <div className="flex flex-col space-y-4" id="footer-col-nav">
              <ul className="space-y-3.5">
                {menuItemsCol1.map((item) => {
                  const isActive = activePage === item.target || (item.target === 'work' && (activePage === 'home' || activePage === 'project'));
                  return (
                    <li key={item.label}>
                      <button
                        onClick={() => handleNavClick(item.target)}
                        className={`font-sans text-[15px] text-left transition-colors duration-200 focus:outline-none cursor-pointer inline-block relative pb-0.5 group ${
                          isActive ? 'text-white font-medium' : 'text-[#8E8E8E] hover:text-white'
                        }`}
                        id={`footer-link-${item.target}`}
                      >
                        {item.label}
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Column 3: Inquire */}
            <div className="flex flex-col space-y-4" id="footer-col-socials">
              <ul className="space-y-3.5">
                <li>
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-[15px] text-[#8E8E8E] hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5 focus:outline-none cursor-pointer group"
                    id="footer-link-linkedin"
                  >
                    <span className="relative pb-0.5">
                      LinkedIn
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                    </span>
                    <span className="inline-block transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#8E8E8E] group-hover:text-white shrink-0">
                      <svg 
                        id="fi_5343266" 
                        viewBox="0 0 512 512" 
                        className="w-[10px] h-[10px]"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg" 
                        data-name="Layer 1"
                      >
                        <path d="m512 32v359.2a32 32 0 0 1 -64 0v-281.945l-393.372 393.372a32 32 0 0 1 -45.256-45.254l393.373-393.373h-281.945a32 32 0 0 1 0-64h359.2a32 32 0 0 1 32 32z"></path>
                      </svg>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="font-sans text-[15px] text-[#8E8E8E] hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5 focus:outline-none cursor-pointer group"
                    id="footer-link-email"
                  >
                    <span className="relative pb-0.5">
                      Email
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                    </span>
                    <span className="inline-block transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#8E8E8E] group-hover:text-white shrink-0">
                      <svg 
                        id="fi_5343266" 
                        viewBox="0 0 512 512" 
                        className="w-[10px] h-[10px]"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg" 
                        data-name="Layer 1"
                      >
                        <path d="m512 32v359.2a32 32 0 0 1 -64 0v-281.945l-393.372 393.372a32 32 0 0 1 -45.256-45.254l393.373-393.373h-281.945a32 32 0 0 1 0-64h359.2a32 32 0 0 1 32 32z"></path>
                      </svg>
                    </span>
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Decorative Horizontal Band for Animated Characters Canvas */}
      {/* Precisely 20px margin vertically around the animation area (above and below) */}
      <div 
        className="relative w-full h-[100px] sm:h-[140px] md:h-[185px] mt-[20px] mb-[20px] select-none" 
        id="footer-canvas-wrapper"
      >
        <FooterCanvas />
      </div>

      {/* Bottom Row Section: Branding and Copyright */}
      <div className="max-w-[1360px] mx-auto px-6 sm:px-8 md:px-12 pt-6 pb-[60px] relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        
        {/* Striped Globe Logo and Name */}
        <div className="flex items-center gap-4 sm:gap-5 select-none">
          <svg className="w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] text-white shrink-0" viewBox="0 0 100 100" fill="none">
            <defs>
              <clipPath id="sphere-clip">
                <circle cx="50" cy="50" r="45" />
              </clipPath>
            </defs>
            <g clipPath="url(#sphere-clip)">
              <line x1="0" y1="8" x2="100" y2="8" stroke="currentColor" strokeWidth="4.5" />
              <line x1="0" y1="16" x2="100" y2="16" stroke="currentColor" strokeWidth="4.5" />
              <line x1="0" y1="24" x2="100" y2="24" stroke="currentColor" strokeWidth="4.5" />
              <line x1="0" y1="32" x2="100" y2="32" stroke="currentColor" strokeWidth="4.5" />
              <line x1="0" y1="40" x2="100" y2="40" stroke="currentColor" strokeWidth="4.5" />
              <line x1="0" y1="48" x2="100" y2="48" stroke="currentColor" strokeWidth="4.5" />
              <line x1="0" y1="56" x2="100" y2="56" stroke="currentColor" strokeWidth="4.5" />
              <line x1="0" y1="64" x2="100" y2="64" stroke="currentColor" strokeWidth="4.5" />
              <line x1="0" y1="72" x2="100" y2="72" stroke="currentColor" strokeWidth="4.5" />
              <line x1="0" y1="80" x2="100" y2="80" stroke="currentColor" strokeWidth="4.5" />
              <line x1="0" y1="88" x2="100" y2="88" stroke="currentColor" strokeWidth="4.5" />
              <line x1="0" y1="96" x2="100" y2="96" stroke="currentColor" strokeWidth="4.5" />
            </g>
          </svg>
          <span className="font-sans font-medium text-3xl sm:text-4xl text-white tracking-tight">
            Varunpreet Singh
          </span>
         </div>

        {/* Right aligned Copyright details matching image */}
        <div className="flex flex-col items-start sm:items-end text-left sm:text-right font-sans text-xs">
          <span className="text-[#8E8E8E] font-normal">
            © 2026 Varunpreet Singh. All rights reserved.
          </span>
          <span className="text-zinc-600 text-[10px] mt-1 tracking-wide font-normal">
            Designed with Antigravity
          </span>
        </div>

      </div>

    </footer>
  );
}
