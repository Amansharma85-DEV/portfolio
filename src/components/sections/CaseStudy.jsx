import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiArrowUpRight } from 'react-icons/fi';

const results = [
  { metric: '↑300%', label: 'Online Orders', icon: '📦', color: '#22c55e' },
  { metric: '↑70%', label: 'Phone Calls', icon: '📞', color: '#3b82f6' },
  { metric: '3x', label: 'Faster Loading', icon: '⚡', color: '#f59e0b' },
  { metric: '100%', label: 'Mobile Ready', icon: '📱', color: '#a78bfa' },
];

const timeline = [
  { phase: 'Problem', desc: 'Small home kitchen business with zero online presence. Customers only found them by word-of-mouth. No way to share menu digitally.' },
  { phase: 'Discovery', desc: 'Interviewed the owner to understand the audience, peak hours, popular dishes, and ordering habits of regular customers.' },
  { phase: 'Design', desc: 'Created a warm, homely brand identity with the Swadeshi Kitchen logo. Chose an earthy orange palette to evoke food and warmth.' },
  { phase: 'Develop', desc: 'Built a fast-loading HTML/CSS/JS website with digital menu, WhatsApp ordering integration, and Instagram link.' },
  { phase: 'Result', desc: 'Online orders jumped 300% in the first month. The owner now gets 20+ WhatsApp orders daily without any calls.' },
];

export default function CaseStudy() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="case-study" style={{
      padding: '100px 0',
      background: 'rgba(255,255,255,0.01)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* BG glow */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        left: '-100px',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(ellipse, rgba(124,58,237,0.1), transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '70px' }}
        >
          <span className="section-tag">Case Study</span>
          <h2 className="section-title" style={{ marginBottom: '16px' }}>
            From Zero to <span className="gradient-text">300% Growth</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
            How we helped Swadeshi Kitchen, a home-based food business, 3x their orders in 30 days.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start mb-16">
          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ position: 'relative' }}
          >
            <div style={{
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
              position: 'relative',
            }}>
              <img
                src="/assets/images/food-website.jpeg"
                alt="Swadeshi Kitchen Website"
                style={{ width: '100%', display: 'block', objectFit: 'cover' }}
                onError={e => { e.target.src = `https://placehold.co/700x500/0a0a14/f97316?text=Swadeshi+Kitchen`; }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(5,5,8,0.7), transparent 50%)',
              }} />
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                right: '20px',
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
              }}>
                {results.map((r) => (
                  <div key={r.label} style={{
                    padding: '8px 14px',
                    borderRadius: '10px',
                    background: 'rgba(5,5,8,0.85)',
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${r.color}30`,
                    display: 'flex',
                    gap: '6px',
                    alignItems: 'center',
                  }}>
                    <span style={{ fontSize: '16px' }}>{r.icon}</span>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: r.color, fontFamily: 'Syne, sans-serif', lineHeight: 1 }}>
                        {r.metric}
                      </div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontFamily: 'Outfit, sans-serif' }}>
                        {r.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div style={{
              padding: '16px 20px',
              borderRadius: '12px',
              background: 'rgba(249,115,22,0.08)',
              border: '1px solid rgba(249,115,22,0.2)',
              marginBottom: '32px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <span style={{ fontSize: '24px' }}>🍽️</span>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#fb923c', fontFamily: 'Outfit, sans-serif' }}>
                  Client — Swadeshi Kitchen
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontFamily: 'Outfit, sans-serif' }}>
                  Home-based food delivery · Delhi, India
                </div>
              </div>
            </div>

            {/* Process Timeline */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '14px',
                top: 0,
                bottom: 0,
                width: '2px',
                background: 'linear-gradient(180deg, #7c3aed, #3b82f6, #06b6d4)',
              }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.phase}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                    style={{ display: 'flex', gap: '24px', paddingLeft: '8px' }}
                  >
                    <div style={{
                      width: '12px', height: '12px', borderRadius: '50%',
                      background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
                      flexShrink: 0, marginTop: '4px',
                      boxShadow: '0 0 10px rgba(124,58,237,0.5)',
                    }} />
                    <div>
                      <div style={{
                        fontSize: '13px', fontWeight: 700,
                        color: '#a78bfa', textTransform: 'uppercase',
                        letterSpacing: '0.08em', marginBottom: '4px',
                        fontFamily: 'Syne, sans-serif',
                      }}>
                        {item.phase}
                      </div>
                      <p style={{
                        fontSize: '14px', color: 'rgba(255,255,255,0.6)',
                        lineHeight: 1.65, fontFamily: 'Outfit, sans-serif',
                      }}>
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '32px', display: 'flex', gap: '12px' }}>
              <a
                href="https://amansharma85-dev.github.io/swadeshi-kitchen-live/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ fontSize: '14px', padding: '12px 20px' }}
              >
                View Live Site <FiArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
