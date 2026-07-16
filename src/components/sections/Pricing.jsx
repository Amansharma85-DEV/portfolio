import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { pricing } from '../../data/siteData';
import { FiCheck, FiX } from 'react-icons/fi';

export default function Pricing() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [localPricing] = useState(() => {
    const saved = localStorage.getItem('dm_pricing');
    return saved ? JSON.parse(saved) : pricing;
  });

  return (
    <section id="pricing" style={{ padding: '100px 0', background: 'rgba(255,255,255,0.01)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <span className="section-tag">Transparent Pricing</span>
          <h2 className="section-title" style={{ marginBottom: '16px' }}>
            Simple <span className="gradient-text">Pricing</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
            No hidden fees. No surprises. Just great websites at fair prices.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
        >
          {localPricing.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              style={{
                padding: '40px',
                borderRadius: '24px',
                background: plan.popular
                  ? 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(59,130,246,0.1))'
                  : 'rgba(10,10,20,0.7)',
                border: plan.popular
                  ? '1px solid rgba(124,58,237,0.4)'
                  : '1px solid rgba(255,255,255,0.07)',
                boxShadow: plan.popular
                  ? '0 0 0 1px rgba(124,58,237,0.15), 0 30px 80px rgba(124,58,237,0.2)'
                  : 'none',
                position: 'relative',
                transform: plan.popular ? 'scale(1.03)' : 'scale(1)',
                transition: 'all 0.4s ease',
              }}
              whileHover={!plan.popular ? { y: -8, borderColor: 'rgba(124,58,237,0.25)' } : {}}
              whileTap={{ scale: 0.98 }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-16px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  padding: '6px 24px',
                  background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
                  borderRadius: '50px',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: 'white',
                  whiteSpace: 'nowrap',
                  fontFamily: 'Outfit, sans-serif',
                  letterSpacing: '0.05em',
                }}>
                  ⭐ MOST POPULAR
                </div>
              )}

              <div style={{ marginBottom: '8px' }}>
                <span style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#a78bfa',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontFamily: 'Outfit, sans-serif',
                }}>
                  {plan.name}
                </span>
              </div>

              <div style={{ marginBottom: '8px' }}>
                <span style={{
                  fontSize: '48px',
                  fontWeight: 800,
                  fontFamily: 'Syne, sans-serif',
                  background: plan.popular
                    ? 'linear-gradient(135deg, #7c3aed, #3b82f6)'
                    : 'white',
                  WebkitBackgroundClip: plan.popular ? 'text' : 'unset',
                  WebkitTextFillColor: plan.popular ? 'transparent' : 'white',
                  color: plan.popular ? 'transparent' : 'white',
                }}>
                  {plan.price}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginLeft: '4px', fontFamily: 'Outfit,sans-serif' }}>
                  /{plan.period}
                </span>
              </div>

              <p style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,0.55)',
                marginBottom: '28px',
                lineHeight: 1.6,
                fontFamily: 'Outfit, sans-serif',
              }}>
                {plan.description}
              </p>

              <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '24px' }} />

              {/* Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                {plan.features.map((feature) => (
                  <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '50%',
                      background: 'rgba(34,197,94,0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <FiCheck size={12} color="#22c55e" />
                    </div>
                    <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', fontFamily: 'Outfit, sans-serif' }}>
                      {feature}
                    </span>
                  </div>
                ))}
                {plan.notIncluded?.map((feature) => (
                  <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '50%',
                      background: 'rgba(239,68,68,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <FiX size={12} color="#ef4444" />
                    </div>
                    <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.3)', textDecoration: 'line-through', fontFamily: 'Outfit, sans-serif' }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '12px',
                  border: plan.popular ? 'none' : '1px solid rgba(124,58,237,0.3)',
                  background: plan.popular
                    ? 'linear-gradient(135deg, #7c3aed, #3b82f6)'
                    : 'transparent',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'Outfit, sans-serif',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  if (!plan.popular) {
                    e.currentTarget.style.background = 'rgba(124,58,237,0.15)';
                  } else {
                    e.currentTarget.style.opacity = '0.9';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = plan.popular ? 'linear-gradient(135deg, #7c3aed, #3b82f6)' : 'transparent';
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                {plan.cta} →
              </button>
            </motion.div>
          ))}
        </motion.div>

        <p style={{ textAlign: 'center', marginTop: '32px', color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontFamily: 'Outfit, sans-serif' }}>
          💬 Need a custom quote? <button onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })} style={{ background: 'none', border: 'none', color: '#a78bfa', cursor: 'pointer', fontFamily: 'Outfit, sans-serif', fontSize: '13px', textDecoration: 'underline' }}>Talk to us →</button>
        </p>
      </div>
    </section>
  );
}
