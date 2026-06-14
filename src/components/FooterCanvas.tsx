import { useEffect, useRef } from 'react';

interface Particle {
  x: number; // base x coordinate (fractional, from 0 to 1)
  y: number; // base y coordinate (fractional, from 0 to 1)
  size: number;
  shape: 'dot' | 'circle' | 'cross' | 'line';
  layerIndex: number;
}

export default function FooterCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let scrollY = window.scrollY;

    // Define 4 static layers of particles
    // Speeds: 0.2, 0.4, 0.7, 1.0 (px per frame)
    // Parallex scroll factors: 10%, 20%, 40%, 60%
    const layers = [
      { speed: 0.2, scrollFactor: 0.10, opacity: 0.12 },
      { speed: 0.4, scrollFactor: 0.20, opacity: 0.20 },
      { speed: 0.7, scrollFactor: 0.40, opacity: 0.28 },
      { speed: 1.0, scrollFactor: 0.60, opacity: 0.38 },
    ];

    // Horizontal cluster zones to create distinct signals (clusters and gaps)
    // Represents fractional positions across the width where signals clump
    const clusterSeeds = [0.10, 0.15, 0.35, 0.40, 0.45, 0.65, 0.75, 0.80, 0.95];

    // Generate particles
    const initParticles = () => {
      const list: Particle[] = [];
      const countPerLayer = 65; // Total 260 particles. Generous yet highly lightweight

      for (let layerIdx = 0; layerIdx < 4; layerIdx++) {
        for (let i = 0; i < countPerLayer; i++) {
          // Choose a shape
          const shapes: Particle['shape'][] = ['dot', 'circle', 'cross', 'line'];
          const shape = shapes[Math.floor(Math.random() * shapes.length)];
          const size = 1 + Math.random() * 2; // 1px to 3px

          // Place within a cluster zone horizontally
          const seed = clusterSeeds[Math.floor(Math.random() * clusterSeeds.length)];
          // High cluster grouping but let some scatter
          const scatter = (Math.random() - 0.5) * 0.08;
          const x = (seed + scatter + 1.0) % 1.0;

          // Vertical concentrated horizontal band that sits across the canvas height (with elegant margins)
          const y = 0.10 + Math.random() * 0.80;

          list.push({
            x,
            y,
            size,
            shape,
            layerIndex: layerIdx,
          });
        }
      }
      particles = list;
    };

    // Keep track of scroll offset to draw parallax
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle resizing using ResizeObserver
    const resizeCanvas = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      // Adjust to DPR for crisp high-dpi screens
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // Initialize particles if they haven't been created yet
      if (particles.length === 0) {
        initParticles();
      }
    };

    // Debounced Resize Observer to avoid rapid re-initializations
    let resizeTimeout: NodeJS.Timeout;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
      }, 100);
    });
    resizeObserver.observe(container);

    // Initial resize setup
    resizeCanvas();

    // Cumulative horizontal offset accumulation (since speed is in pixels, we accumulate translation)
    const pxOffsets = [0, 0, 0, 0];

    // Main low-overhead render loop
    const render = () => {
      // Clear canvas with transparent clear rect so footer background remains visible
      ctx.clearRect(0, 0, width, height);

      // Check footer position to create a bounded scroll parallax metric
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      // How much the footer has scrolled into the viewport
      const relativeScroll = Math.max(0, viewportHeight - rect.top);

      // Increment horizontal speeds once per frame
      for (let layerIdx = 0; layerIdx < 4; layerIdx++) {
        pxOffsets[layerIdx] += layers[layerIdx].speed;
      }

      // Draw each particle
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const layer = layers[p.layerIndex];

        // 1. Parallax reaction to scrolling (exact scroll factors: 10%, 20%, 40%, 60%)
        const scrollOffset = relativeScroll * layer.scrollFactor;

        // Calculate final X coordinate. Multiply base fractional x by width, add continuous speed movement,
        // and add scroll offset. Wrap horizontally.
        const basePxX = p.x * width;
        // Total movement is accumulated frame speed + scroll translation
        const speedOffset = pxOffsets[p.layerIndex];
        let drawX = (basePxX + speedOffset + scrollOffset) % width;
        if (drawX < 0) drawX += width;

        // Vertical positioning sits strictly within the 20%–30% band of container height
        const drawY = p.y * height;

        // Establish styled alpha and line weights
        ctx.strokeStyle = `rgba(255, 255, 255, ${layer.opacity})`;
        ctx.fillStyle = `rgba(255, 255, 255, ${layer.opacity})`;
        ctx.lineWidth = 1;

        // Render according to shape configuration
        switch (p.shape) {
          case 'dot':
            ctx.beginPath();
            ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
            ctx.fill();
            break;

          case 'circle':
            ctx.beginPath();
            ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
            ctx.stroke();
            break;

          case 'cross':
            ctx.beginPath();
            ctx.moveTo(drawX - p.size, drawY);
            ctx.lineTo(drawX + p.size, drawY);
            ctx.moveTo(drawX, drawY - p.size);
            ctx.lineTo(drawX, drawY + p.size);
            ctx.stroke();
            break;

          case 'line':
            ctx.beginPath();
            ctx.moveTo(drawX - p.size * 1.5, drawY);
            ctx.lineTo(drawX + p.size * 1.5, drawY);
            ctx.stroke();
            break;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0"
      id="footer-canvas-container"
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block opacity-80" 
        style={{ mixBlendMode: 'screen' }}
      />
    </div>
  );
}
