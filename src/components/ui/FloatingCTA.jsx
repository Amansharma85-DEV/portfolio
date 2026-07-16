import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { FiArrowUp } from 'react-icons/fi';

const WHATSAPP_URL = 'https://wa.me/919999999999?text=Hi DigiMantra, I need a website!';
const SCROLL_THRESHOLD = 300;

export default function FloatingCTA() {
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackTop(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="fixed z-40 flex flex-col gap-3"
      style={{
        right: '16px',
        bottom: '80px', // Positioned above the BottomActionBar (which occupies bottom-0 to bottom-64px) on mobile
      }}
    >
      {/* ── Scroll to Top Button (visible only when scrolled down) ── */}
      <AnimatePresence>
        {showBackTop && (
          <motion.button
            key="back-to-top"
            onClick={scrollToTop}
            aria-label="Scroll to Top"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(124, 58, 237, 0.35)',
              outline: 'none',
            }}
          >
            <FiArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── WhatsApp Button (always visible) ── */}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          backgroundColor: '#25d366',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(37, 211, 102, 0.35)',
          outline: 'none',
        }}
      >
        <FaWhatsapp size={22} color="white" />
      </motion.a>

      {/* Desktop style overrides */}
      <style>{`
        @media (min-width: 1024px) {
          /* Move down slightly on desktop since there's no bottom action bar */
          div.fixed {
            bottom: 24px !important;
            right: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
