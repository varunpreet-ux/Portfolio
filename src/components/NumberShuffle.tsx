import { useState, useEffect, useRef } from 'react';

interface NumberShuffleProps {
  text: string;
  className?: string;
  delay?: number;
}

const CHARS = '!@#$%^&*()_+{}[]|:;<>?,./~0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default function NumberShuffle({ text, className = '', delay = 0 }: NumberShuffleProps) {
  const [displayText, setDisplayText] = useState(() => {
    // Initialize with randomized characters of the same length
    return text
      .split('')
      .map((char) => (char === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]))
      .join('');
  });

  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    let active = true;
    const startTimeout = setTimeout(() => {
      if (!active) return;

      const duration = 1000; // 1 second total
      const startTime = performance.now();
      const targetLength = text.length;

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Calculate how many characters are resolved from left to right
        const resolvedCount = Math.floor(progress * targetLength);

        const current = text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < resolvedCount) {
              return char; // Resolved
            }
            // Scrambled
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');

        setDisplayText(current);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(tick);
        } else {
          setDisplayText(text); // Ensure precise resolution
        }
      };

      animationRef.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      active = false;
      clearTimeout(startTimeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [text, delay]);

  return (
    <span className={`${className} font-mono select-none tracking-tight`}>
      {displayText}
    </span>
  );
}
