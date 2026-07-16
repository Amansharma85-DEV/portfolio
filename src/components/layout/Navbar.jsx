import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { FiPhone, FiMail, FiX } from 'react-icons/fi';
import { getSiteSettings } from '../../data/defaultSettings';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#work' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

const settings = getSiteSettings();
const WHATSAPP_URL = `https://wa.me/${settings.whatsapp}?text=Hi DigiMantra, I need a website!`;
const CALL_URL = `tel:+${settings.whatsapp}`;
const EMAIL_URL = `mailto:${settings.email}`;
const INSTAGRAM_URL = settings.instagram;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  // Track scroll direction for auto-hide/reappear (mobile/tablet only)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);

      // Only auto-hide on mobile/tablet screens to keep desktop navbar static
      if (window.innerWidth < 1024) {
        if (currentScrollY > lastScrollY && currentScrollY > 150) {
          setVisible(false);
        } else {
          setVisible(true);
        }
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Track active section for active indicator
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.getAttribute('id'));
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      // Offset scroll by navbar height
      const offset = window.innerWidth >= 1024 ? 80 : 64;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* ── DESKTOP NAVIGATION (1024px and above) ── */}
      <div
        className="hidden lg:block"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          padding: '0 24px',
        }}
      >
        <motion.nav
          animate={{
            height: scrolled ? 72 : 80,
            backgroundColor: scrolled ? 'rgba(5, 5, 8, 0.95)' : 'rgba(5, 5, 8, 0.65)',
            boxShadow: scrolled ? '0 10px 40px rgba(0, 0, 0, 0.4)' : '0 2px 20px rgba(0, 0, 0, 0.1)',
            borderColor: scrolled ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.04)',
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            borderBottomLeftRadius: '24px',
            borderBottomRightRadius: '24px',
            borderLeft: '1px solid rgba(255, 255, 255, 0.04)',
            borderRight: '1px solid rgba(255, 255, 255, 0.04)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
            backdropFilter: scrolled ? 'blur(30px)' : 'blur(20px)',
            WebkitBackdropFilter: scrolled ? 'blur(30px)' : 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
          }}
        >
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-3 text-white no-underline"
            style={{ flexShrink: 0 }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}>
              <span className="text-white font-bold text-lg" style={{ fontFamily: 'Syne, sans-serif' }}>D</span>
            </div>
            <div>
              <div className="font-bold text-lg leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>DigiMantra</div>
              <div className="text-[10px]" style={{ color: '#a78bfa', letterSpacing: '0.1em' }}>DIGITAL AGENCY</div>
            </div>
          </a>

          {/* Links */}
          <ul
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '28px',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <li key={link.label} style={{ position: 'relative' }}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm font-medium bg-transparent border-none cursor-pointer"
                    style={{
                      color: isActive ? '#a78bfa' : 'rgba(255,255,255,0.65)',
                      fontFamily: 'Outfit, sans-serif',
                      padding: '8px 0',
                      transition: 'color 0.25s ease',
                      position: 'relative',
                    }}
                    onMouseEnter={e => { if (!isActive) e.target.style.color = '#fff'; }}
                    onMouseLeave={e => { if (!isActive) e.target.style.color = 'rgba(255,255,255,0.65)'; }}
                  >
                    {link.label}
                    {/* Animated Underline */}
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '2px',
                        background: 'linear-gradient(90deg, #7c3aed, #3b82f6)',
                        transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                        transformOrigin: 'left',
                        transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      }}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* CTA Button */}
          <div style={{ flexShrink: 0 }}>
            <button
              onClick={() => handleNavClick('#contact')}
              className="btn-primary"
              style={{ padding: '10px 24px', fontSize: '13px', borderRadius: '50px' }}
            >
              Book Free Consultation
            </button>
          </div>
        </motion.nav>
      </div>

      {/* ── MOBILE TOP BAR (below 1024px) ── */}
      <motion.nav
        className="lg:hidden"
        animate={{ y: visible ? 0 : -80 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '64px',
          background: scrolled ? 'rgba(5, 5, 8, 0.85)' : 'rgba(5, 5, 8, 0.5)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
        }}
      >
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-3 text-white no-underline"
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}>
            <span className="text-white font-bold text-base" style={{ fontFamily: 'Syne, sans-serif' }}>D</span>
          </div>
          <div>
            <div className="font-bold text-base leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>DigiMantra</div>
            <div className="text-[9px]" style={{ color: '#a78bfa', letterSpacing: '0.1em' }}>DIGITAL AGENCY</div>
          </div>
        </a>

        {/* Hamburger Menu Button */}
        <button
          className="flex flex-col gap-1.5 justify-center items-center border-none cursor-pointer"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            color: 'white',
            zIndex: 1000,
            outline: 'none',
          }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
            style={{ width: '18px', height: '2px', background: 'white', display: 'block' }}
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
            style={{ width: '18px', height: '2px', background: 'white', display: 'block' }}
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
            style={{ width: '18px', height: '2px', background: 'white', display: 'block' }}
          />
        </button>
      </motion.nav>

      {/* ── MOBILE FULL-SCREEN MENU DRAWER ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
            className="fixed inset-0 z-[998] flex flex-col lg:hidden"
            style={{
              background: 'rgba(5, 5, 8, 0.98)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              padding: '90px 24px 32px',
            }}
          >
            {/* Menu Header Close */}
            <div style={{ position: 'absolute', top: '12px', right: '24px' }}>
              <button
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center border-none cursor-pointer"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  color: 'white',
                  outline: 'none',
                }}
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Menu Items */}
            <div
              className="flex flex-col gap-2 justify-center"
              style={{ flex: 1, overflowY: 'auto', padding: '16px 0' }}
            >
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left px-5 rounded-2xl border-none cursor-pointer font-bold transition-all duration-200"
                    style={{
                      height: '52px',
                      background: isActive ? 'rgba(124, 58, 237, 0.12)' : 'transparent',
                      border: isActive ? '1px solid rgba(124, 58, 237, 0.2)' : '1px solid transparent',
                      color: isActive ? '#a78bfa' : 'rgba(255,255,255,0.7)',
                      fontFamily: 'Syne, sans-serif',
                      fontSize: '17px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>{link.label}</span>
                      {isActive && <span style={{ fontSize: '12px' }}>●</span>}
                    </div>
                  </motion.button>
                );
              })}

              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.04 }}
                onClick={() => handleNavClick('#contact')}
                className="btn-primary justify-center font-semibold"
                style={{
                  height: '52px',
                  borderRadius: '16px',
                  marginTop: '16px',
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '16px',
                  width: '100%',
                }}
              >
                Book Consultation
              </motion.button>
            </div>

            {/* Bottom Contact / Social Links */}
            <div
              style={{
                borderTop: '1px solid rgba(255,255,255,0.06)',
                paddingTop: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(37, 211, 102, 0.1)',
                  border: '1px solid rgba(37, 211, 102, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#25d366',
                }}
              >
                <FaWhatsapp size={20} />
              </a>

              <a
                href={CALL_URL}
                style={{
                  flex: 1,
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#3b82f6',
                }}
              >
                <FiPhone size={18} />
              </a>

              <a
                href={EMAIL_URL}
                style={{
                  flex: 1,
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ef4444',
                }}
              >
                <FiMail size={18} />
              </a>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(217, 70, 239, 0.1)',
                  border: '1px solid rgba(217, 70, 239, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#d946ef',
                }}
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
