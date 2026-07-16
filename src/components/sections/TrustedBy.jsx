import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const logos = [
  { name: 'Restaurant', icon: '🍽️' },
  { name: 'Clinic', icon: '🏥' },
  { name: 'Fashion', icon: '👗' },
  { name: 'Gym', icon: '💪' },
  { name: 'Real Estate', icon: '🏠' },
  { name: 'Cafe', icon: '☕' },
  { name: 'Salon', icon: '💇' },
  { name: 'Education', icon: '📚' },
  { name: 'Startup', icon: '🚀' },
  { name: 'Photography', icon: '📸' },
  { name: 'Bakery', icon: '🎂' },
  { name: 'Jewellery', icon: '💎' },
];

const LogoItem = ({ name, icon }) => (
  <div
    className="flex items-center gap-3 px-6 py-3 rounded-full flex-shrink-0"
    style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.07)',
      minWidth: 'max-content',
    }}
  >
    <span className="text-2xl">{icon}</span>
    <span style={{
      fontFamily: 'Outfit, sans-serif',
      fontSize: '15px',
      fontWeight: 500,
      color: 'rgba(255,255,255,0.7)',
      whiteSpace: 'nowrap',
    }}>
      {name}
    </span>
  </div>
);

export default function TrustedBy() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const doubled = [...logos, ...logos];

  return (
    <section
      id="trusted"
      style={{ padding: '60px 0', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-center mb-8 text-sm uppercase tracking-widest"
          style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Outfit, sans-serif', letterSpacing: '0.15em' }}>
          Trusted by businesses across industries
        </p>

        <div className="marquee-wrapper">
          <div className="marquee-track" style={{ gap: '16px' }}>
            {doubled.map((logo, i) => (
              <LogoItem key={i} name={logo.name} icon={logo.icon} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
