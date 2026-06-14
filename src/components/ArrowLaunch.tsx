import { ReactNode } from 'react';
import { motion, useAnimation } from 'motion/react';

interface ArrowLaunchProps {
  children: ReactNode;
  className?: string; // Additional classes for positioning
}

export default function ArrowLaunch({ children, className = '' }: ArrowLaunchProps) {
  const controls = useAnimation();

  const handleMouseEnter = async () => {
    // 1. Launch upward & forward while fading out
    await controls.start({
      y: -24,
      x: 12,
      opacity: 0,
      transition: { duration: 0.25, ease: 'easeOut' },
    });

    // 2. Position instantly at below and behind
    controls.set({
      y: 24,
      x: -12,
      opacity: 0,
    });

    // 3. Return to baseline with a highly elastic spring
    await controls.start({
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 15,
        mass: 0.8,
      },
    });
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      className={`inline-block cursor-pointer overflow-hidden ${className}`}
      style={{ verticalAlign: 'middle' }}
    >
      <motion.div animate={controls} className="flex items-center justify-center">
        {children}
      </motion.div>
    </div>
  );
}
