import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowUp, FiInstagram, FiMail, FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { getSiteSettings } from '../../data/defaultSettings';

const footerLinks = {
  services: [
    'Website Development', 'Landing Pages', 'Restaurant Websites',
    'Clinic Websites', 'Fashion eCommerce', 'Brand Identity',
  ],
  company: [
    { label: 'About Us', href: '#about' },
    { label: 'Our Work', href: '#work' },
    { label: 'Process', href: '#process' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
    { label: 'Admin', href: '/admin' },
  ],
};

export default function Footer() {
  const navigate = useNavigate();
  const s = getSiteSettings();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollToSection = (href) => {
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(href);
    }
  };
  return (
    <footer style={{
      background: 'rgba(3, 3, 8, 0.98)',
      borderTop: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div className="container">
        {/* Top */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr',
            gap: '60px',
            padding: '70px 0 50px',
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{
                width: '42px', height: '42px', borderRadius: '12px',
                background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: 'white', fontWeight: 800, fontSize: '18px', fontFamily: 'Syne, sans-serif' }}>D</span>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '20px', fontFamily: 'Syne, sans-serif', color: 'white' }}>
                  DigiMantra
                </div>
                <div style={{ fontSize: '11px', color: '#a78bfa', letterSpacing: '0.15em', fontFamily: 'Outfit, sans-serif' }}>
                  DIGITAL AGENCY
                </div>
              </div>
            </div>
            <p style={{
              fontSize: '15px', color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.75, marginBottom: '24px',
              fontFamily: 'Outfit, sans-serif', maxWidth: '320px',
            }}>
              Building websites that grow businesses. Premium web design & development for restaurants, clinics, fashion brands, and more.
            </p>

            {/* Social */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { icon: <FaWhatsapp size={18} />, href: `https://wa.me/${s.whatsapp}`, color: '#25d366', label: 'WhatsApp' },
                { icon: <FiInstagram size={18} />, href: s.instagram, color: '#e1306c', label: 'Instagram' },
                { icon: <FiMail size={18} />, href: `mailto:${s.email}`, color: '#a78bfa', label: 'Email' },
                { icon: <FiPhone size={18} />, href: `tel:+${s.whatsapp}`, color: '#06b6d4', label: 'Phone' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.5)',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = `${s.color}15`;
                    e.currentTarget.style.borderColor = `${s.color}40`;
                    e.currentTarget.style.color = s.color;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{
              fontSize: '14px', fontWeight: 700,
              color: 'rgba(255,255,255,0.8)', marginBottom: '20px',
              textTransform: 'uppercase', letterSpacing: '0.08em',
              fontFamily: 'Syne, sans-serif',
            }}>Services</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {footerLinks.services.map((s) => (
                <li key={s}>
                  <span style={{
                    fontSize: '14px', color: 'rgba(255,255,255,0.4)',
                    fontFamily: 'Outfit, sans-serif', cursor: 'default',
                    transition: 'color 0.2s',
                  }}>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{
              fontSize: '14px', fontWeight: 700,
              color: 'rgba(255,255,255,0.8)', marginBottom: '20px',
              textTransform: 'uppercase', letterSpacing: '0.08em',
              fontFamily: 'Syne, sans-serif',
            }}>Company</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: '14px', color: 'rgba(255,255,255,0.4)',
                      fontFamily: 'Outfit, sans-serif', padding: 0,
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#a78bfa'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          padding: '24px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <p style={{
            fontSize: '13px', color: 'rgba(255,255,255,0.3)',
            fontFamily: 'Outfit, sans-serif',
          }}>
            © {new Date().getFullYear()} DigiMantra. All rights reserved. Crafted with ❤️ in Delhi, India.
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: '40px', height: '40px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white',
              boxShadow: '0 5px 20px rgba(124,58,237,0.3)',
            }}
            aria-label="Back to top"
          >
            <FiArrowUp size={18} />
          </motion.button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
