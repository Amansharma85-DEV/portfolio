import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  // Spring-smooth the raw progress value for a fluid feel
  const scaleX = useSpring(progress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(Math.min(Math.max(scrolled, 0), 1));
    };

    // Set initial value
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="scroll-progress"
      style={{
        scaleX,
        transformOrigin: 'left',
      }}
      aria-hidden="true"
    />
  );
};

export default ScrollProgress;
