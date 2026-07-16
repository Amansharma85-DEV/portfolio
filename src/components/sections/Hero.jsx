import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { FiArrowDown } from 'react-icons/fi';

// ---------- animation variants ----------
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.3,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.9, ease: 'easeOut' },
  },
};

const statCardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ---------- stats data ----------
const stats = [
  { number: '50+', label: 'Projects Delivered' },
  { number: '30+', label: 'Happy Clients' },
  { number: '98%', label: 'Client Satisfaction' },
];

// ---------- component ----------
export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef(null);

  // Raw mouse position values (0 → window.innerWidth / innerHeight)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring-smooth parallax offsets for each blob (different depth factors)
  const blob1X = useSpring(useTransform(rawX, [0, typeof window !== 'undefined' ? window.innerWidth : 1440], [-30, 30]), { stiffness: 60, damping: 25 });
  const blob1Y = useSpring(useTransform(rawY, [0, typeof window !== 'undefined' ? window.innerHeight : 900], [-20, 20]), { stiffness: 60, damping: 25 });

  const blob2X = useSpring(useTransform(rawX, [0, typeof window !== 'undefined' ? window.innerWidth : 1440], [20, -20]), { stiffness: 45, damping: 20 });
  const blob2Y = useSpring(useTransform(rawY, [0, typeof window !== 'undefined' ? window.innerHeight : 900], [15, -15]), { stiffness: 45, damping: 20 });

  const blob3X = useSpring(useTransform(rawX, [0, typeof window !== 'undefined' ? window.innerWidth : 1440], [-15, 15]), { stiffness: 35, damping: 18 });
  const blob3Y = useSpring(useTransform(rawY, [0, typeof window !== 'undefined' ? window.innerHeight : 900], [-10, 10]), { stiffness: 35, damping: 18 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [rawX, rawY]);

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#050508',
      }}
    >
      {/* ── CSS Grid pattern overlay ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(124,58,237,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          zIndex: 0,
        }}
      />

      {/* ── Particle dots ── */}
      {mounted && (
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          {Array.from({ length: 28 }).map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: i % 3 === 0 ? 3 : 2,
                height: i % 3 === 0 ? 3 : 2,
                borderRadius: '50%',
                background: i % 3 === 0
                  ? 'rgba(124,58,237,0.6)'
                  : i % 3 === 1
                  ? 'rgba(59,130,246,0.5)'
                  : 'rgba(6,182,212,0.5)',
                left: `${(i * 37 + 5) % 95}%`,
                top: `${(i * 53 + 10) % 90}%`,
              }}
              animate={{
                y: [0, -12, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 4 + (i % 4),
                repeat: Infinity,
                delay: (i * 0.3) % 3,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* ── Floating Blobs ── */}
      {/* Blob 1 — Purple */}
      <motion.div
        aria-hidden="true"
        style={{
          width: 600,
          height: 600,
          position: 'absolute',
          top: -200,
          left: -200,
          background: 'radial-gradient(circle, rgba(124,58,237,0.4), transparent)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          zIndex: 0,
          x: blob1X,
          y: blob1Y,
        }}
        animate={{
          scale: [1, 1.08, 1],
          rotate: [0, 6, 0],
        }}
        transition={{
          duration: 8,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      />

      {/* Blob 2 — Blue */}
      <motion.div
        aria-hidden="true"
        style={{
          width: 500,
          height: 500,
          position: 'absolute',
          top: '50%',
          right: -200,
          background: 'radial-gradient(circle, rgba(59,130,246,0.35), transparent)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          zIndex: 0,
          x: blob2X,
          y: blob2Y,
        }}
        animate={{
          scale: [1, 1.12, 1],
          rotate: [0, -8, 0],
        }}
        transition={{
          duration: 10,
          ease: 'easeInOut',
          repeat: Infinity,
          delay: 1.5,
        }}
      />

      {/* Blob 3 — Cyan */}
      <motion.div
        aria-hidden="true"
        style={{
          width: 400,
          height: 400,
          position: 'absolute',
          bottom: -100,
          left: '40%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.3), transparent)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          zIndex: 0,
          x: blob3X,
          y: blob3Y,
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 12,
          ease: 'easeInOut',
          repeat: Infinity,
          delay: 3,
        }}
      />

      {/* ── Main content ── */}
      <motion.div
        className="container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          paddingTop: 'min(14vh, 120px)',
          paddingBottom: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        {/* Agency tag */}
        <motion.div variants={fadeUpVariants}>
          <span className="section-tag" style={{ marginBottom: '8px' }}>✦ Premium Digital Agency</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUpVariants}
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(34px, 7vw, 90px)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: '#ffffff',
            maxWidth: '900px',
            margin: '0 auto',
            letterSpacing: '-0.02em',
          }}
        >
          Building Websites That{' '}
          <span className="gradient-text">Grow Businesses.</span>
        </motion.h1>

        {/* Sub-heading */}
        <motion.p
          variants={fadeUpVariants}
          style={{
            fontSize: 'clamp(15px, 2vw, 19px)',
            color: 'rgba(200,200,220,0.75)',
            maxWidth: '680px',
            margin: '0 auto',
            lineHeight: 1.65,
            fontFamily: 'Outfit, sans-serif',
          }}
        >
          We design premium websites, landing pages, eCommerce stores and
          branding experiences that help businesses get more customers.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUpVariants}
          className="flex flex-col sm:flex-row gap-4 w-full px-4 sm:px-0 sm:w-auto justify-center"
          style={{
            marginTop: '8px',
            maxWidth: '480px',
          }}
        >
          <motion.button
            className="btn-primary w-full sm:w-auto justify-center"
            style={{ height: '48px', padding: '0 28px' }}
            onClick={() => scrollTo('#work')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            View Our Work
          </motion.button>
          <motion.button
            className="btn-secondary w-full sm:w-auto justify-center"
            style={{ height: '48px', padding: '0 28px' }}
            onClick={() => scrollTo('#contact')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            Book Free Consultation
          </motion.button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={fadeInVariants}
          className="flex flex-row gap-2 sm:gap-4 justify-center mt-2 w-full"
          style={{ maxWidth: '480px' }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass-card flex-1"
              custom={i}
              variants={statCardVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 30px rgba(124,58,237,0.25)',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{
                padding: '14px 8px',
                textAlign: 'center',
                cursor: 'default',
                borderRadius: '16px',
              }}
            >
              <div
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: 'clamp(20px, 4.5vw, 42px)',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #7c3aed, #3b82f6, #06b6d4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1.1,
                }}
              >
                {stat.number}
              </div>
              <div
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: 'clamp(9px, 2.2vw, 12px)',
                  color: 'rgba(200,200,220,0.6)',
                  marginTop: '4px',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  lineHeight: 1.2,
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.button
        onClick={() => scrollTo('#work')}
        aria-label="Scroll down"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          bottom: '36px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'none',
          border: '1.5px solid rgba(124,58,237,0.4)',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 2,
          color: 'rgba(200,200,220,0.7)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
        whileHover={{
          borderColor: 'rgba(124,58,237,0.9)',
          color: '#7c3aed',
          scale: 1.1,
          boxShadow: '0 0 20px rgba(124,58,237,0.3)',
        }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FiArrowDown size={20} />
        </motion.div>
      </motion.button>
    </section>
  );
}
