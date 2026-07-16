import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const features = [
  { icon: '📱', label: 'Responsive Design' },
  { icon: '⚡', label: 'Fast Loading' },
  { icon: '🔍', label: 'SEO Optimized' },
  { icon: '🔒', label: 'Secure' },
  { icon: '✨', label: 'Premium UI' },
  { icon: '📊', label: 'Admin Dashboard' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="about" className="section-padding">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 items-center about-grid"
        >
          {/* Left — Image */}
          <motion.div variants={itemVariants} style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                inset: '-20px',
                background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.2), transparent 70%)',
                borderRadius: '40px',
                filter: 'blur(30px)',
                zIndex: 0,
              }}
            />
            <div
              className="about-image-frame"
              style={{
                position: 'relative',
                zIndex: 1,
                borderRadius: '30px',
                overflow: 'hidden',
                border: '1px solid rgba(124,58,237,0.2)',
                boxShadow: '0 40px 80px rgba(124,58,237,0.15)',
                maxHeight: '600px',
              }}
            >
              <img
                src="/aman-sharma.jpg"
                alt="Aman Sharma - DigiMantra Founder"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.style.background = 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(59,130,246,0.2))';
                  e.target.parentElement.style.minHeight = '500px';
                  e.target.parentElement.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:500px;gap:20px;">
                    <div style="width:120px;height:120px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#3b82f6);display:flex;align-items:center;justify-content:center;font-size:48px;">👨‍💻</div>
                    <p style="color:white;font-size:24px;font-weight:700;font-family:Syne,sans-serif;">Aman Sharma</p>
                    <p style="color:rgba(255,255,255,0.5);font-size:14px;font-family:Outfit,sans-serif;">Founder & Lead Developer</p>
                  </div>`;
                }}
              />

              {/* Floating Badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
                  background: 'rgba(5,5,8,0.85)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(124,58,237,0.3)',
                  borderRadius: '16px',
                  padding: '16px 20px',
                }}
              >
                <div style={{ color: '#a78bfa', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', fontFamily: 'Outfit,sans-serif', marginBottom: '4px' }}>
                  FOUNDER & DEVELOPER
                </div>
                <div style={{ color: 'white', fontSize: '18px', fontWeight: 700, fontFamily: 'Syne,sans-serif' }}>
                  Aman Sharma
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div
              style={{
                position: 'absolute',
                top: '-30px',
                right: '-30px',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                border: '2px dashed rgba(124,58,237,0.3)',
                animation: 'floatSlow 8s ease-in-out infinite',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-20px',
                right: '10%',
                width: '80px',
                height: '80px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(124,58,237,0.2))',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(124,58,237,0.2)',
                animation: 'float 6s ease-in-out infinite',
              }}
            />
          </motion.div>

          {/* Right — Content */}
          <div>
            <motion.div variants={itemVariants}>
              <span className="section-tag">About DigiMantra</span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="section-title"
              style={{ marginBottom: '24px' }}
            >
              We Build Digital{' '}
              <span className="gradient-text">Experiences</span>{' '}
              That Convert
            </motion.h2>

            <motion.p
              variants={itemVariants}
              style={{
                fontSize: '17px',
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.8,
                marginBottom: '16px',
                fontFamily: 'Outfit, sans-serif',
              }}
            >
              We build fast, modern, SEO-friendly websites that help businesses increase sales and establish a strong online presence. From restaurants to fashion brands, clinics to startups — we create digital experiences that drive real results.
            </motion.p>

            <motion.p
              variants={itemVariants}
              style={{
                fontSize: '17px',
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.8,
                marginBottom: '40px',
                fontFamily: 'Outfit, sans-serif',
              }}
            >
              Founded by Aman Sharma, DigiMantra combines technical expertise with creative design to deliver websites that don't just look great — they grow your business.
            </motion.p>

            {/* Feature Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10"
            >
              {features.map((f) => (
                <motion.div
                  key={f.label}
                  variants={itemVariants}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '14px 18px',
                    borderRadius: '12px',
                    background: 'rgba(124,58,237,0.06)',
                    border: '1px solid rgba(124,58,237,0.15)',
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                  }}
                  whileHover={{ scale: 1.02, borderColor: 'rgba(124,58,237,0.35)' }}
                >
                  <span style={{ fontSize: '18px' }}>{f.icon}</span>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.85)',
                    fontFamily: 'Outfit, sans-serif',
                  }}>
                    {f.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                View Our Work
              </button>
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary"
              >
                Get In Touch
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
