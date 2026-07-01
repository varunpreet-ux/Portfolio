import { useState, useEffect, useRef } from 'react';
import { PERSONAL_INFO } from '../data';
import { PageType } from '../types';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavigationProps {
  activePage: PageType;
  setActivePage: (page: PageType) => void;
  onNavigateHome: () => void;
}

export default function Navigation({ activePage, setActivePage, onNavigateHome }: NavigationProps) {
  const [visible, setVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state
      setIsScrolled(currentScrollY > 40);

      // Always show at the very top
      if (currentScrollY < 60) {
        setVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current) {
        setVisible(false); // scrolling down
      } else {
        setVisible(true); // scrolling up
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems: { id: PageType; label: string }[] = [
    { id: 'work', label: 'Work' },
    { id: 'about', label: 'About' },
    { id: 'resume', label: 'Resume' },
  ];

  const handleNavClick = (pageId: PageType) => {
    if (pageId === 'resume' && PERSONAL_INFO.resumeUrl && !PERSONAL_INFO.resumeUrl.includes('_YOUR_GOOGLE_DRIVE_RESUME_ID_HERE')) {
      window.open(PERSONAL_INFO.resumeUrl, '_blank', 'noopener,noreferrer');
      setMobileMenuOpen(false);
      return;
    }
    setActivePage(pageId);
    setMobileMenuOpen(false);
  };

  const isSticky = isScrolled || activePage !== 'home';

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isSticky 
            ? 'bg-[#FAFAFA]/90 backdrop-blur-md py-3 md:py-4' 
            : 'bg-transparent py-5 md:py-6'
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-6 sm:px-8 md:px-12 lg:px-0 w-full flex items-center justify-between">
          
          {/* LEFT: Striped sphere logo and trademark typography */}
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-3 focus:outline-none cursor-pointer group"
          >
            <div className={`shrink-0 opacity-90 group-hover:opacity-100 transition-opacity ${isSticky ? 'text-[#111111]' : 'text-white'}`}>
              <svg className="w-8 h-8 overflow-visible" viewBox="0 0 100 100" fill="currentColor">
                <rect x="25" y="15" width="50" height="5" rx="2.5" className="animate-wave-bar wave-bar-0" />
                <rect x="15" y="27" width="70" height="5" rx="2.5" className="animate-wave-bar wave-bar-1" />
                <rect x="10" y="39" width="80" height="5" rx="2.5" className="animate-wave-bar wave-bar-2" />
                <rect x="10" y="51" width="80" height="5" rx="2.5" className="animate-wave-bar wave-bar-3" />
                <rect x="15" y="63" width="70" height="5" rx="2.5" className="animate-wave-bar wave-bar-4" />
                <rect x="25" y="75" width="50" height="5" rx="2.5" className="animate-wave-bar wave-bar-5" />
              </svg>
            </div>
            <span className={`font-sans font-[400] text-[28px] tracking-tight select-none leading-none ${isSticky ? 'text-[#111111]' : 'text-white'}`}>
              Varunpreet Singh
            </span>
          </button>
 
          {/* CENTER: Clean navigation links */}
          <nav className="hidden md:flex items-center gap-10" id="main-nav-menu">
            {navItems.map((item) => {
              const isActive = activePage === item.id || (item.id === 'work' && activePage === 'project');
              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  className={`font-sans font-[500] text-[16px] tracking-wide select-none py-1 focus:outline-none cursor-pointer relative h-[32px] flex items-center antialiased ${
                    isActive 
                      ? (isSticky ? 'text-[#111111]' : 'text-white') 
                      : (isSticky ? 'text-[#111111]/70 hover:text-[#111111]' : 'text-white/70 hover:text-white')
                  }`}
                  style={{
                    textRendering: 'optimizeLegibility',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                  }}
                >
                  <span
                    className="relative inline-block h-[26px] overflow-hidden"
                  >
                    <span className="relative block h-full w-full">
                      {/* Front Face (Primary label) */}
                      <motion.span
                        className="relative block whitespace-nowrap leading-[26px]"
                        variants={{
                          rest: { y: "0%" },
                          hover: { y: "-100%" },
                        }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                          WebkitFontSmoothing: 'antialiased',
                          MozOsxFontSmoothing: 'grayscale',
                        }}
                      >
                        {item.label}
                      </motion.span>
                      {/* Secondary Face (Slipping in from below) */}
                      <motion.span
                        className="absolute inset-0 block whitespace-nowrap leading-[26px]"
                        variants={{
                          rest: { y: "100%" },
                          hover: { y: "0%" },
                        }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                          WebkitFontSmoothing: 'antialiased',
                          MozOsxFontSmoothing: 'grayscale',
                        }}
                      >
                        {item.label}
                      </motion.span>
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </nav>
 
          {/* RIGHT: Capsule primary CTA button with premium sliding color wipe */}
          <div className="hidden md:block">
            <motion.button
              onClick={() => handleNavClick('contact')}
              initial="initial"
              whileHover="hover"
              animate="initial"
              className={`relative px-5 py-2.5 font-sans font-[400] text-[16px] rounded-[6px] tracking-wide shadow-sm focus:outline-none cursor-pointer overflow-hidden block ${
                isSticky ? 'bg-[#111111] text-white' : 'bg-[#FFFFFF] text-[#111111]'
              }`}
            >
              {/* Premium color-wipe sliding sheet */}
              <motion.div
                className={`absolute inset-0 ${isSticky ? 'bg-[#FFFFFF]' : 'bg-[#111111]'}`}
                variants={{
                  initial: { x: "-101%" },
                  hover: { x: "0%" }
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
              {/* Foreground text positioned above the sliding layer */}
              <motion.span
                className="relative z-10 block whitespace-nowrap"
                variants={{
                  initial: { color: isSticky ? "#ffffff" : "#111111" },
                  hover: { color: isSticky ? "#111111" : "#ffffff" }
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                Get in Touch
              </motion.span>
            </motion.button>
          </div>
 
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`focus:outline-none p-1 shrink-0 relative z-50 ${
                mobileMenuOpen 
                  ? 'text-[#111111]' 
                  : (isSticky ? 'text-[#111111]' : 'text-white')
              } hover:text-[#5B8DFF] transition-colors`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
 
        </div>
      </motion.header>
 
      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col justify-center px-8 md:hidden bg-[#FAFAFA]"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item, id) => {
                const isActive = activePage === item.id || (item.id === 'work' && activePage === 'project');
                return (
                  <motion.button
                    key={item.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ delay: id * 0.05, ease: 'easeOut' }}
                    onClick={() => handleNavClick(item.id)}
                    className="flex justify-between items-center text-left focus:outline-none py-3 border-b border-black/5"
                  >
                    <span
                      className={`text-xl font-sans font-[300] tracking-tight transition-colors ${
                        isActive 
                          ? 'text-[#111111] font-medium' 
                          : 'text-[#111111]/60 hover:text-[#111111]'
                      }`}
                    >
                      {item.label}
                    </span>
                    <span className="text-xs text-[#111111]/40">0{id + 1}</span>
                  </motion.button>
                );
              })}
              
              <motion.button
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ delay: navItems.length * 0.05, ease: 'easeOut' }}
                onClick={() => handleNavClick('contact')}
                className="w-full py-4 mt-4 font-sans font-[400] text-sm text-center rounded-[6px] tracking-wide bg-[#111111] text-white shadow-sm"
              >
                Get in Touch
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
