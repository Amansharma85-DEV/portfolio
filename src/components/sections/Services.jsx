import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { services } from '../../data/siteData';
import { FiArrowRight } from 'react-icons/fi';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Services() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="services" style={{ padding: '100px 0', background: 'rgba(255,255,255,0.01)' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '70px' }}
        >
          <span className="section-tag">What We Do</span>
          <h2 className="section-title" style={{ marginBottom: '16px' }}>
            Our <span className="gradient-text">Premium</span> Services
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
            Everything your business needs to dominate online — from stunning websites to powerful digital marketing tools.
          </p>
        </motion.div>

        {/* Service Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: '32px',
                borderRadius: '20px',
                background: 'rgba(10, 10, 20, 0.6)',
                border: '1px solid rgba(255,255,255,0.06)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(124,58,237,0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Gradient overlay on hover */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(135deg, rgba(124,58,237,0.05), rgba(59,130,246,0.03))`,
                borderRadius: '20px',
                opacity: 0,
                transition: 'opacity 0.4s ease',
                pointerEvents: 'none',
              }} />

              {/* Tag */}
              {service.tag && (
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  padding: '4px 12px',
                  borderRadius: '50px',
                  background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'white',
                  fontFamily: 'Outfit, sans-serif',
                  letterSpacing: '0.05em',
                }}>
                  {service.tag}
                </div>
              )}

              {/* Icon */}
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                background: 'rgba(124,58,237,0.1)',
                border: '1px solid rgba(124,58,237,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                marginBottom: '20px',
              }}>
                {service.icon}
              </div>

              <h3 style={{
                fontSize: '20px',
                fontWeight: 700,
                color: 'white',
                marginBottom: '12px',
                fontFamily: 'Syne, sans-serif',
              }}>
                {service.title}
              </h3>

              <p style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.7,
                marginBottom: '20px',
                fontFamily: 'Outfit, sans-serif',
              }}>
                {service.description}
              </p>

              {/* Features */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                {service.features.map((feat) => (
                  <span
                    key={feat}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      background: 'rgba(124,58,237,0.08)',
                      border: '1px solid rgba(124,58,237,0.15)',
                      fontSize: '12px',
                      color: '#a78bfa',
                      fontFamily: 'Outfit, sans-serif',
                    }}
                  >
                    {feat}
                  </span>
                ))}
              </div>

              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'transparent',
                  border: 'none',
                  color: '#a78bfa',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'Outfit, sans-serif',
                  padding: 0,
                  transition: 'gap 0.3s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.gap = '10px'; e.currentTarget.style.color = '#c4b5fd'; }}
                onMouseLeave={e => { e.currentTarget.style.gap = '6px'; e.currentTarget.style.color = '#a78bfa'; }}
              >
                Get Started <FiArrowRight size={14} />
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
