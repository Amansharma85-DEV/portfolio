import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * SectionReveal
 * Wraps children in a Framer Motion div that fades+slides up when scrolled into view.
 *
 * Props:
 *  - children   {ReactNode}  Content to animate
 *  - delay      {number}     Delay in seconds before animation starts (default: 0)
 *  - duration   {number}     Animation duration in seconds (default: 0.7)
 *  - y          {number}     Starting Y offset in px (default: 40)
 *  - once       {boolean}    Animate only once (default: true)
 *  - className  {string}     Additional CSS classes for the wrapper div
 *  - threshold  {number}     IntersectionObserver threshold 0–1 (default: 0.15)
 */
const SectionReveal = ({
  children,
  delay = 0,
  duration = 0.7,
  y = 40,
  once = true,
  className = '',
  threshold = 0.15,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    amount: threshold,
  });

  const variants = {
    hidden: {
      opacity: 0,
      y,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuart – smooth premium feel
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SectionReveal;
