import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiBriefcase, FiGrid, FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { getSiteSettings } from '../../data/defaultSettings';

export default function BottomActionBar() {
  const { whatsapp } = getSiteSettings();

  const tabs = [
    { id: 'hero', label: 'Home', icon: FiHome, href: '#hero', type: 'scroll' },
    { id: 'work', label: 'Portfolio', icon: FiBriefcase, href: '#work', type: 'scroll' },
    { id: 'services', label: 'Services', icon: FiGrid, href: '#services', type: 'scroll' },
    { id: 'contact', label: 'Contact', icon: FiPhone, href: '#contact', type: 'scroll' },
    { id: 'whatsapp', label: 'WhatsApp', icon: FaWhatsapp, href: `https://wa.me/${whatsapp}?text=Hi DigiMantra, I need a website!`, type: 'link' },
  ];

  const [activeTab, setActiveTab] = useState('hero');
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Track scroll direction for auto-hide/reappear
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setVisible(false); // Scrolling down -> hide
      } else {
        setVisible(true); // Scrolling up -> show
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Track active section for indicator highlight
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            if (['hero', 'about', 'trusted'].includes(id)) {
              setActiveTab('hero');
            } else if (['services', 'process'].includes(id)) {
              setActiveTab('services');
            } else if (['work', 'testimonials'].includes(id)) {
              setActiveTab('work');
            } else if (['pricing', 'contact', 'faq'].includes(id)) {
              setActiveTab('contact');
            }
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const handleAction = (tab) => {
    if (tab.type === 'scroll') {
      setActiveTab(tab.id);
      const target = document.querySelector(tab.href);
      if (target) {
        const offset = 64; // navbar height offset
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    } else {
      window.open(tab.href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="lg:hidden fixed z-[997]"
          initial={{ y: 100, x: '-50%', opacity: 0 }}
          animate={{ y: 0, x: '-50%', opacity: 1 }}
          exit={{ y: 100, x: '-50%', opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            bottom: '20px',
            left: '50%',
            width: 'calc(100% - 40px)',
            maxWidth: '400px',
          }}
        >
          <div
            style={{
              background: 'rgba(10, 10, 20, 0.85)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '24px',
              padding: '12px 8px',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  onClick={() => handleAction(tab)}
                  className="border-none bg-transparent cursor-pointer flex flex-col items-center gap-1.5"
                  style={{
                    outline: 'none',
                    width: '60px',
                    position: 'relative',
                  }}
                >
                  <motion.div
                    animate={isActive ? { scale: 1.15, y: -2 } : { scale: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                    style={{
                      color: isActive ? '#a78bfa' : tab.id === 'whatsapp' ? '#25d366' : 'rgba(255,255,255,0.45)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={20} />
                  </motion.div>

                  <span
                    style={{
                      fontFamily: 'Outfit, sans-serif',
                      fontSize: '9px',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? '#a78bfa' : 'rgba(255,255,255,0.45)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {tab.label}
                  </span>

                  {isActive && (
                    <motion.div
                      layoutId="activeBarIndicator"
                      style={{
                        position: 'absolute',
                        top: '-16px',
                        width: '14px',
                        height: '2px',
                        borderRadius: '1px',
                        background: '#a78bfa',
                        boxShadow: '0 0 8px #a78bfa',
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
