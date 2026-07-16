import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { faqs } from '../../data/siteData';
import { getSiteSettings } from '../../data/defaultSettings';
import { FiPlus, FiMinus } from 'react-icons/fi';

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div
      className={`faq-item ${isOpen ? 'open' : ''}`}
      style={{ overflow: 'hidden' }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 24px',
          background: 'transparent',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          textAlign: 'left',
          gap: '16px',
        }}
      >
        <span style={{
          fontSize: '16px',
          fontWeight: 600,
          lineHeight: 1.4,
          fontFamily: 'Syne, sans-serif',
        }}>
          {faq.question}
        </span>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: isOpen ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.05)',
          border: `1px solid ${isOpen ? 'rgba(124,58,237,0.4)' : 'rgba(255,255,255,0.1)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'all 0.3s ease',
          color: isOpen ? '#a78bfa' : 'rgba(255,255,255,0.5)',
        }}>
          {isOpen ? <FiMinus size={14} /> : <FiPlus size={14} />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="faq-answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              padding: '0 24px 20px 24px',
              fontSize: '15px',
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.75,
              fontFamily: 'Outfit, sans-serif',
            }}>
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openId, setOpenId] = useState(1);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { whatsapp, email } = getSiteSettings();

  const [localFaqs] = useState(() => {
    const saved = localStorage.getItem('dm_faqs');
    return saved ? JSON.parse(saved) : faqs;
  });

  return (
    <section id="faq" style={{ padding: '100px 0', background: 'rgba(255,255,255,0.01)' }}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ position: 'sticky', top: '100px' }}
          >
            <span className="section-tag">FAQ</span>
            <h2 className="section-title" style={{ marginBottom: '20px' }}>
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="section-subtitle" style={{ marginBottom: '32px' }}>
              Got questions? We've got answers. If you don't find what you are looking for, feel free to contact us.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/${whatsapp}?text=Hi DigiMantra, I have a question!`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 20px',
                  borderRadius: '12px',
                  background: 'rgba(37,211,102,0.1)',
                  border: '1px solid rgba(37,211,102,0.25)',
                  color: '#25d366',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 500,
                  fontFamily: 'Outfit, sans-serif',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(37,211,102,0.15)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(37,211,102,0.1)'}
              >
                💬 Chat on WhatsApp
              </a>
              <a
                href={`mailto:${email}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 20px',
                  borderRadius: '12px',
                  background: 'rgba(124,58,237,0.08)',
                  border: '1px solid rgba(124,58,237,0.2)',
                  color: '#a78bfa',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 500,
                  fontFamily: 'Outfit, sans-serif',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,58,237,0.15)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(124,58,237,0.08)'}
              >
                📧 hello@digimantra.in
              </a>
            </div>
          </motion.div>

          {/* Right — Accordion */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            {localFaqs.map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
