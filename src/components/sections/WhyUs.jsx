import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { whyChooseUs } from '../../data/siteData';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function WhyUs() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="why-us"
      className="grid-pattern"
      style={{ padding: '100px 0', position: 'relative' }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        width: '600px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(124,58,237,0.08), transparent 70%)',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '70px' }}
        >
          <span className="section-tag">Our Advantage</span>
          <h2 className="section-title" style={{ marginBottom: '16px' }}>
            Why Choose <span className="gradient-text">DigiMantra?</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
            We don't just build websites. We build growth engines for your business.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
          }}
          className="why-us-grid"
        >
          {whyChooseUs.map((item) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              style={{
                padding: '32px 28px',
                borderRadius: '20px',
                background: 'rgba(10,10,20,0.7)',
                border: '1px solid rgba(255,255,255,0.06)',
                cursor: 'default',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                textAlign: 'center',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)';
                e.currentTarget.style.boxShadow = '0 15px 50px rgba(124,58,237,0.12)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                fontSize: '40px',
                marginBottom: '16px',
                display: 'block',
                filter: 'drop-shadow(0 0 15px rgba(124,58,237,0.3))',
              }}>
                {item.icon}
              </div>
              <h3 style={{
                fontSize: '17px',
                fontWeight: 700,
                color: 'white',
                marginBottom: '8px',
                fontFamily: 'Syne, sans-serif',
              }}>
                {item.title}
              </h3>
              <p style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.6,
                fontFamily: 'Outfit, sans-serif',
              }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ textAlign: 'center', marginTop: '60px' }}
        >
          <p style={{
            fontSize: '22px',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '24px',
            fontFamily: 'Outfit, sans-serif',
          }}>
            Ready to build something <span style={{ color: '#a78bfa', fontWeight: 600 }}>amazing?</span>
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary btn-glow"
            >
              🚀 Start Your Project
            </button>
            <button
              onClick={() => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary"
            >
              View Portfolio
            </button>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .why-us-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .why-us-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
