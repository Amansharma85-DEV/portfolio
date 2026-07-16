import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { processSteps } from '../../data/siteData';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

export default function Process() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="process" style={{ padding: '100px 0', background: 'rgba(255,255,255,0.01)' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <span className="section-tag">How We Work</span>
          <h2 className="section-title" style={{ marginBottom: '16px' }}>
            Our <span className="gradient-text">Proven Process</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
            A systematic approach that ensures quality delivery every single time.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={ref} style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
          {/* Vertical Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'linear-gradient(180deg, #7c3aed, #3b82f6, #06b6d4)',
              transform: 'translateX(-50%)',
              transformOrigin: 'top',
            }}
          />

          {/* Steps */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}
          >
            {processSteps.map((step, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={step.step}
                  variants={{
                    hidden: { opacity: 0, x: isLeft ? -40 : 40 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
                  }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto 1fr',
                    alignItems: 'center',
                    gap: '32px',
                  }}
                >
                  {/* Left content */}
                  <div style={{ textAlign: isLeft ? 'right' : 'left', order: isLeft ? 0 : 2 }}>
                    {isLeft && (
                      <StepCard step={step} />
                    )}
                  </div>

                  {/* Center dot */}
                  <div style={{ order: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        boxShadow: '0 0 30px rgba(124,58,237,0.4)',
                        cursor: 'default',
                      }}
                    >
                      {step.icon}
                    </motion.div>
                  </div>

                  {/* Right content */}
                  <div style={{ textAlign: isLeft ? 'left' : 'right', order: isLeft ? 2 : 0 }}>
                    {!isLeft && (
                      <StepCard step={step} isRight />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, isRight }) {
  return (
    <div
      style={{
        padding: '24px',
        borderRadius: '16px',
        background: 'rgba(10,10,20,0.7)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(20px)',
        transition: 'all 0.3s ease',
        textAlign: isRight ? 'right' : 'left',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)';
        e.currentTarget.style.boxShadow = '0 10px 40px rgba(124,58,237,0.12)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{
        fontSize: '48px',
        fontWeight: 800,
        background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        opacity: 0.3,
        lineHeight: 1,
        marginBottom: '8px',
        fontFamily: 'Syne, sans-serif',
      }}>
        {step.step}
      </div>
      <h3 style={{
        fontSize: '20px',
        fontWeight: 700,
        color: 'white',
        marginBottom: '8px',
        fontFamily: 'Syne, sans-serif',
      }}>
        {step.title}
      </h3>
      <p style={{
        fontSize: '14px',
        color: 'rgba(255,255,255,0.55)',
        lineHeight: 1.7,
        fontFamily: 'Outfit, sans-serif',
      }}>
        {step.description}
      </p>
    </div>
  );
}
