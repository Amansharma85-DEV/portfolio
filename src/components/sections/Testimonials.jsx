import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { testimonials } from '../../data/testimonials';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';

const StarRating = ({ count = 5 }) => (
  <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
    {Array.from({ length: count }).map((_, i) => (
      <FiStar key={i} size={16} fill="#fbbf24" color="#fbbf24" />
    ))}
  </div>
);

export default function Testimonials() {
  const [localTestimonials] = useState(() => {
    const saved = localStorage.getItem('dm_testimonials');
    return saved ? JSON.parse(saved) : testimonials;
  });
  const [current, setCurrent] = useState(0);
  const { ref: sectionRef, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const cardWidth = el.scrollWidth / localTestimonials.length;
      const index = Math.round(el.scrollLeft / cardWidth);
      setCurrent(index);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [localTestimonials]);

  const scrollToCard = (index) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / localTestimonials.length;
    el.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
    setCurrent(index);
  };

  const prev = () => {
    const index = current === 0 ? localTestimonials.length - 1 : current - 1;
    scrollToCard(index);
  };

  const next = () => {
    const index = current === localTestimonials.length - 1 ? 0 : current + 1;
    scrollToCard(index);
  };

  return (
    <section id="testimonials" style={{ padding: '100px 0', overflow: 'hidden' }}>
      <div className="container">
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <span className="section-tag">Client Love</span>
          <h2 className="section-title" style={{ marginBottom: '16px' }}>
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
            Real results from real businesses. Don't take our word for it.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div style={{ position: 'relative', marginBottom: '40px' }}>
          <div
            ref={scrollRef}
            className="testimonials-carousel"
            style={{
              display: 'flex',
              gap: '24px',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              paddingBottom: '20px',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {localTestimonials.map((t) => (
              <motion.div
                key={t.id}
                style={{
                  padding: '32px',
                  borderRadius: '24px',
                  background: 'rgba(10, 10, 20, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(30px)',
                  WebkitBackdropFilter: 'blur(30px)',
                  position: 'relative',
                  scrollSnapAlign: 'center',
                }}
                className="testimonial-carousel-card"
                whileTap={{ scale: 0.98 }}
              >
                {/* Quote icon */}
                <div style={{
                  position: 'absolute',
                  top: '24px',
                  right: '24px',
                  color: 'rgba(124,58,237,0.2)',
                  fontSize: '36px',
                }}>
                  <FaQuoteLeft />
                </div>

                <StarRating count={t.rating} />

                <p style={{
                  fontSize: '15px',
                  color: 'rgba(255,255,255,0.75)',
                  lineHeight: 1.75,
                  marginBottom: '28px',
                  fontFamily: 'Outfit, sans-serif',
                  fontStyle: 'italic',
                  minHeight: '80px',
                }}>
                  "{t.review}"
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={t.avatar}
                    alt={t.name}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      border: '2px solid rgba(124,58,237,0.3)',
                    }}
                    onError={e => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=7c3aed&color=fff`;
                    }}
                  />
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: 'white', fontFamily: 'Syne, sans-serif' }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: '13px', color: '#a78bfa', fontFamily: 'Outfit, sans-serif' }}>
                      {t.business}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            style={{
              width: '48px', height: '48px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s ease',
              outline: 'none',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.15)'; e.currentTarget.style.borderColor = 'rgba(124,58,237,0.35)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
          >
            <FiChevronLeft size={20} />
          </button>

          {/* Dots */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {localTestimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToCard(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                style={{
                  width: i === current ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: i === current ? 'linear-gradient(135deg, #7c3aed, #3b82f6)' : 'rgba(255,255,255,0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0,
                  outline: 'none',
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next testimonial"
            style={{
              width: '48px', height: '48px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s ease',
              outline: 'none',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.15)'; e.currentTarget.style.borderColor = 'rgba(124,58,237,0.35)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>

      <style>{`
        .testimonials-carousel::-webkit-scrollbar {
          display: none;
        }
        .testimonial-carousel-card {
          flex: 0 0 100%;
        }
        @media (min-width: 640px) {
          .testimonial-carousel-card {
            flex: 0 0 calc(50% - 12px);
          }
        }
        @media (min-width: 1024px) {
          .testimonial-carousel-card {
            flex: 0 0 calc(33.333% - 16px);
          }
        }
      `}</style>
    </section>
  );
}
