import { useState, useEffect, useRef } from 'react';
import { PageType, Project } from './types';
import { PROJECTS, PERSONAL_INFO } from './data';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import CaseStudyDetail from './components/CaseStudyDetail';

// Animation & Scroll
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register standard ScrollTrigger plugin globally
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [activePage, setActivePage] = useState<PageType>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [shouldScrollToCaseStudies, setShouldScrollToCaseStudies] = useState(false);
  const [shouldScrollToAbout, setShouldScrollToAbout] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const footerWrapRef = useRef<HTMLDivElement | null>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  // Dynamically observe footer height changes for responsive reveal distance
  useEffect(() => {
    const wrap = footerWrapRef.current;
    if (!wrap) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
        setFooterHeight(height);
      }
    });

    resizeObserver.observe(wrap);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Sync GSAP triggers whenever the layout height changes due to page navigation or footer updates
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [footerHeight, activePage]);

  // 1. Initialize Lenis Inertial Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.8,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Reset Lenis scroll position to top immediately on boot
    lenis.scrollTo(0, { immediate: true });

    // Notify ScrollTrigger about any Inertial scroll movements
    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollToCaseStudies = () => {
    const el = document.getElementById('case-studies');
    if (el) {
      if (lenisRef.current) {
        // Scroll using Lenis's premium smooth transition
        lenisRef.current.scrollTo(el, {
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential Out
        });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToAbout = () => {
    const el = document.getElementById('about-section');
    if (el) {
      if (lenisRef.current) {
        // Scroll using Lenis's premium smooth transition
        lenisRef.current.scrollTo(el, {
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential Out
        });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Synchronize Scroll Top when transitioning tabs
  const handlePageChange = (page: PageType) => {
    if (page === 'resume' && PERSONAL_INFO.resumeUrl && !PERSONAL_INFO.resumeUrl.includes('_YOUR_GOOGLE_DRIVE_RESUME_ID_HERE')) {
      window.open(PERSONAL_INFO.resumeUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    if (page === 'work') {
      if (activePage === 'home' || activePage === 'work' || activePage === 'about') {
        setActivePage('work');
        setSelectedProject(null);
        setTimeout(() => {
          scrollToCaseStudies();
        }, 150);
      } else {
        setShouldScrollToCaseStudies(true);
        setActivePage('work');
        setSelectedProject(null);
      }
      return;
    }
    if (page === 'about') {
      if (activePage === 'home' || activePage === 'work' || activePage === 'about') {
        setActivePage('about');
        setSelectedProject(null);
        setTimeout(() => {
          scrollToAbout();
        }, 150);
      } else {
        setShouldScrollToAbout(true);
        setActivePage('about');
        setSelectedProject(null);
      }
      return;
    }
    setActivePage(page);
    setSelectedProject(null);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as any });
    }
  };

  useEffect(() => {
    if ((activePage === 'home' || activePage === 'work' || activePage === 'about') && shouldScrollToCaseStudies) {
      const timer = setTimeout(() => {
        scrollToCaseStudies();
        setShouldScrollToCaseStudies(false);
      }, 550); // let the route exit and entry animation finish
      return () => clearTimeout(timer);
    }
  }, [activePage, shouldScrollToCaseStudies]);

  useEffect(() => {
    if ((activePage === 'home' || activePage === 'work' || activePage === 'about') && shouldScrollToAbout) {
      const timer = setTimeout(() => {
        scrollToAbout();
        setShouldScrollToAbout(false);
      }, 550); // let the route exit and entry animation finish
      return () => clearTimeout(timer);
    }
  }, [activePage, shouldScrollToAbout]);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setActivePage('project');
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as any });
    }
  };

  const navigateHome = () => {
    handlePageChange('home');
  };

  const getLayoutKey = () => {
    if (activePage === 'home' || activePage === 'work' || activePage === 'about') {
      return 'home-layout';
    }
    if (activePage === 'project') {
      return `project-${selectedProject?.id || ''}`;
    }
    return activePage;
  };

  // Render correct route view component
  const renderPageContent = () => {
    switch (activePage) {
      case 'home':
        return (
          <Home
            onNavigateToPage={handlePageChange}
            onSelectProject={handleSelectProject}
          />
        );
      case 'work':
        return (
          <Home
            onNavigateToPage={handlePageChange}
            onSelectProject={handleSelectProject}
          />
        );
      case 'about':
        return (
          <Home
            onNavigateToPage={handlePageChange}
            onSelectProject={handleSelectProject}
          />
        );
      case 'resume':
        return <Resume />;
      case 'contact':
        return <Contact />;
      case 'project':
        if (selectedProject) {
          return (
            <CaseStudyDetail
              project={selectedProject}
              onBack={() => handlePageChange('work')}
            />
          );
        }
        return (
          <Home
            onNavigateToPage={handlePageChange}
            onSelectProject={handleSelectProject}
          />
        );
      default:
        return (
          <Home
            onNavigateToPage={handlePageChange}
            onSelectProject={handleSelectProject}
          />
        );
    }
  };

  // Target page transition configurations based on exact spec guidelines:
  // Enter: Opacity 0 → 1, TranslateY 40 → 0, Duration 0.7s
  // Exit: Opacity 1 → 0, TranslateY 0 → -20, Duration 0.4s
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 40,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1], // premium physical custom ease
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4,
        ease: 'easeIn',
      },
    },
  };

  return (
    <div className="bg-[#FAFAFA] text-[#111111] font-sans antialiased selection:bg-[#5B8DFF] selection:text-white min-h-screen flex flex-col relative" id="app-container">
      
      {/* Sticky Header Navigation */}
      <Navigation
        activePage={activePage}
        setActivePage={handlePageChange}
        onNavigateHome={navigateHome}
      />

      {/* Main Narrative Render Window with AnimatePresence */}
      <main 
        className="flex-grow relative z-[2] bg-[#FAFAFA] shadow-[0_15px_40px_rgba(0,0,0,0.05)]"
        style={{ marginBottom: footerHeight }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={getLayoutKey()}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full"
          >
            {renderPageContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Universal Sticky-Reveal Footer */}
      <div 
        ref={footerWrapRef}
        className="w-full overflow-hidden z-[1] left-0 right-0"
        style={{
          position: 'fixed',
          bottom: 0,
        }}
      >
        <Footer activePage={activePage} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}
