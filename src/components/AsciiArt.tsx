import { useEffect, useRef } from 'react';

interface AsciiArtProps {
  asciiText: string;
  onProgress?: (progress: number) => void;
  heightMode?: 'viewport' | 'fit';
  scrollDriven?: boolean;
}

interface Particle {
  char: string;
  homeX: number;
  homeY: number;
  
  // 2D Polar coordinates relative to canvas center
  homeRadius: number;
  homeAngle: number;
  startRadius: number;
  startAngle: number;

  leftFeather: number; // Opacity feathering factor for left edge
  
  // Static jitter offsets (prevents dynamic wiggling when stationary)
  staticJitterX: number;
  staticJitterY: number;

  // Independent wave & turbulence coefficients
  waveFreq: number;
  wavePhase: number;
  waveAmp: number;
  turbSpeedX: number;
  turbSpeedY: number;
  turbAmp: number;

  startThreshold: number; // Scroll progress point where particle starts moving
}

export default function AsciiArt({ asciiText, onProgress, heightMode = 'viewport', scrollDriven = true }: AsciiArtProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const lines = asciiText.split('\n');
    
    // Programmatically trim empty/whitespace-only lines from the top and bottom of the art
    // ONLY when heightMode is 'fit' (mobile/tablet layouts) to prevent shifting on desktop
    let processedLines = lines;
    if (heightMode === 'fit') {
      let firstNonEmptyRow = 0;
      let lastNonEmptyRow = lines.length - 1;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim() !== '') {
          firstNonEmptyRow = i;
          break;
        }
      }
      for (let i = lines.length - 1; i >= 0; i--) {
        if (lines[i].trim() !== '') {
          lastNonEmptyRow = i;
          break;
        }
      }
      processedLines = lines.slice(firstNonEmptyRow, lastNonEmptyRow + 1);
    }
    
    const matrix = processedLines.map(line => line.split(''));
    const rows = matrix.length;
    const cols = matrix[0]?.length || 0;

    const baseFontSize = 10.26; // 10% smaller than original 11.4
    const baseCharWidth = 6.156;
    const baseCharHeight = 11.016;

    let fontSize = baseFontSize; 
    let charWidth = baseCharWidth; 
    let charHeight = baseCharHeight; 
    let artWidth = cols * charWidth;
    let artHeight = rows * charHeight;

    let animationFrameId: number;
    let isIntersecting = false;
    let particles: Particle[] = [];

    let targetProgress = 0;
    let smoothProgress = 0;

    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;
    let centerX = canvasWidth / 2;
    let centerY = canvasHeight / 2 - 80;

    const setupDimensions = () => {
      canvasWidth = containerRef.current ? containerRef.current.clientWidth : window.innerWidth;
      
      // Calculate dynamic scale factor based on container width to guarantee zero clipping (leave 32px side margins)
      const targetScaleWidth = canvasWidth - 32;
      const computedScale = targetScaleWidth / (cols * baseCharWidth);
      const scale = Math.min(1.1, Math.max(0.42, computedScale));

      fontSize = baseFontSize * scale;
      charWidth = baseCharWidth * scale;
      charHeight = baseCharHeight * scale;
      artWidth = cols * charWidth;
      artHeight = rows * charHeight;

      if (heightMode === 'fit') {
        canvasHeight = artHeight + 8;
      } else {
        canvasHeight = window.innerHeight;
      }
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvasWidth * dpr;
      canvas.height = canvasHeight * dpr;
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;
      ctx.scale(dpr, dpr);

      const artStartX = (canvasWidth - artWidth) / 2;
      const artStartY = heightMode === 'fit' ? 4 : (canvasHeight - artHeight) / 2 - 80;
      centerX = canvasWidth / 2;
      centerY = heightMode === 'fit' ? canvasHeight / 2 : canvasHeight / 2 - 80;

      particles = [];
      const centerCol = cols / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const char = matrix[r][c];
          
          if (!char || char === ' ' || char === '\n' || char === '\r') {
            continue;
          }

          const homeX = artStartX + c * charWidth;
          const homeY = artStartY + r * charHeight + fontSize; 

          // Calculate landing polar coordinates relative to the canvas center
          const dx = homeX - centerX;
          const dy = homeY - centerY;
          const homeRadius = Math.sqrt(dx * dx + dy * dy);
          const homeAngle = Math.atan2(dy, dx);

          // Spawns particles distributed far out on the screen
          const startRadius = homeRadius + 300 + Math.random() * 500;
          
          // Offset the starting angle to force a spiral trajectory
          const angleDirection = Math.random() > 0.5 ? 1 : -1;
          const startAngle = homeAngle + angleDirection * (1.2 + Math.random() * 1.5);

          // Left edge feathering factor (feather first 12 columns)
          const featherZone = 12;
          const leftFeather = c < featherZone ? Math.pow(c / featherZone, 1.8) : 1;

          // Pre-calculated static jitter to prevent dynamic vibration on idle frames
          const staticJitterX = (Math.random() - 0.5) * 4;
          const staticJitterY = (Math.random() - 0.5) * 4;

          // Organic wave & turbulence parameters (keeps the flow loose & chaotic)
          const waveFreq = 1.6 + Math.random() * 2.0;
          const wavePhase = Math.random() * Math.PI * 2;
          const waveAmp = 20 + Math.random() * 25;
          
          const turbSpeedX = 2.0 + Math.random() * 2.5;
          const turbSpeedY = 2.0 + Math.random() * 2.5;
          const turbAmp = 8 + Math.random() * 12;

          // Scroll stagger start thresholds
          const isLeft = c < centerCol;
          const horizontalProgress = isLeft ? c / centerCol : (cols - 1 - c) / centerCol;
          const startThreshold = horizontalProgress * 0.38 + Math.random() * 0.05;

          particles.push({
            char,
            homeX,
            homeY,
            homeRadius,
            homeAngle,
            startRadius,
            startAngle,
            leftFeather,
            staticJitterX,
            staticJitterY,
            waveFreq,
            wavePhase,
            waveAmp,
            turbSpeedX,
            turbSpeedY,
            turbAmp,
            startThreshold
          });
        }
      }
    };

    setupDimensions();

    const easeOutCubic = (t: number): number => {
      return 1 - Math.pow(1 - t, 3);
    };

    const drawFrame = () => {
      if (!isIntersecting) {
        animationFrameId = requestAnimationFrame(drawFrame);
        return;
      }

      // Automatically increment loading progress over time if scroll-independent
      if (!scrollDriven) {
        targetProgress = Math.min(1, targetProgress + 0.009);
      }

      // Smooth scroll lerp (0.07 factor for fluid float)
      smoothProgress += (targetProgress - smoothProgress) * 0.07;
      if (onProgress) {
        onProgress(smoothProgress);
      }

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.font = `${fontSize}px "JetBrains Mono", Courier, monospace`;
      ctx.textBaseline = 'alphabetic';

      // Single, unified particle loop with zero branching transitions
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const span = 0.5;
        const t = Math.max(0, Math.min(1, (smoothProgress - p.startThreshold) / span));

        if (t === 0) {
          continue;
        }

        if (t === 1) {
          ctx.fillStyle = `rgba(245, 245, 245, ${p.leftFeather})`;
          ctx.fillText(p.char, p.homeX, p.homeY);
          continue;
        }

        const easedT = easeOutCubic(t);

        // Interpolate polar radius and angle
        const currentRadius = p.startRadius + (p.homeRadius - p.startRadius) * easedT;
        const currentAngle = p.startAngle + (p.homeAngle - p.startAngle) * easedT;

        // Convert polar coordinate back to 2D baseline Cartesian coordinate
        const baselineX = centerX + Math.cos(currentAngle) * currentRadius;
        const baselineY = centerY + Math.sin(currentAngle) * currentRadius;

        // Wave envelope and turbulence
        const waveEnvelope = Math.sin(t * Math.PI);
        const waveY = Math.sin(t * Math.PI * p.waveFreq + p.wavePhase) * p.waveAmp * waveEnvelope;
        const turbX = Math.cos(t * Math.PI * p.turbSpeedX) * p.turbAmp * waveEnvelope;
        const turbY = Math.sin(t * Math.PI * p.turbSpeedY) * p.turbAmp * waveEnvelope;

        // Calculate coordinates (swirling around the spiral baseline)
        const currentX = baselineX + turbX;
        const currentY = baselineY + waveY + turbY;

        // Scale static pre-calculated jitter offsets instead of calling Math.random() on every frame
        const jitterX = p.staticJitterX * (1 - t);
        const jitterY = p.staticJitterY * (1 - t);
        
        const opacity = easedT * p.leftFeather;

        ctx.fillStyle = `rgba(245, 245, 245, ${opacity})`;
        ctx.fillText(p.char, currentX + jitterX, currentY + jitterY);
      }

      animationFrameId = requestAnimationFrame(drawFrame);
    };

    const handleScroll = () => {
      const parent = canvas.closest('section');
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollBudget = parent.offsetHeight - viewportHeight;
      if (totalScrollBudget <= 0) return;

      const scrollProgress = -rect.top / totalScrollBudget;
      const calculatedProgress = Math.max(0, Math.min(1, scrollProgress));
      
      // Compress animation completion into the first 72% of the scroll track,
      // leaving the remaining 28% of the scroll budget for a fully-assembled static hold phase.
      targetProgress = Math.min(1, calculatedProgress / 0.72);
    };

    const handleResize = () => {
      setupDimensions();
      if (scrollDriven) {
        handleScroll();
      }
    };

    if (scrollDriven) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }
    window.addEventListener('resize', handleResize);

    setupDimensions();
    if (scrollDriven) {
      handleScroll();
      smoothProgress = targetProgress;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isIntersecting = true;
        } else {
          isIntersecting = false;
        }
      },
      { threshold: 0.10 }
    );

    observer.observe(canvas);

    animationFrameId = requestAnimationFrame(drawFrame);

    return () => {
      if (scrollDriven) {
        window.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [asciiText, onProgress, heightMode, scrollDriven]);

  return (
    <div 
      ref={containerRef} 
      className="w-full overflow-hidden flex items-center justify-center select-none bg-transparent"
      id="ascii-art-full-bleed-container"
    >
      <canvas ref={canvasRef} className="block opacity-90" />
    </div>
  );
}
