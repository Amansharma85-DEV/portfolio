import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import toast from 'react-hot-toast';
import { FiSend, FiMapPin, FiMail, FiInstagram } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const budgetOptions = [
  'Under ₹5,000', '₹5,000 - ₹10,000', '₹10,000 - ₹20,000', 'Above ₹20,000',
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', business: '', phone: '', email: '', project: '', budget: '',
  });
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    toast.success('🎉 Message sent! We\'ll respond within 2 hours.');
    setFormData({ name: '', business: '', phone: '', email: '', project: '', budget: '' });
  };

  const waMessage = `Hi DigiMantra! 👋\nName: ${formData.name || 'Your Name'}\nBusiness: ${formData.business || 'Business Name'}\nProject: ${formData.project || 'Tell us about your project'}`;

  return (
    <section id="contact" style={{ padding: '100px 0', background: 'rgba(255,255,255,0.01)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '70px' }}
        >
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title" style={{ marginBottom: '16px' }}>
            Let's Build Something <span className="gradient-text">Great Together</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
            Share your project details and we'll get back to you with a free proposal within 2 hours.
          </p>
        </motion.div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start"
        >
          {/* Left — Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', fontFamily: 'Outfit, sans-serif', fontWeight: 500 }}>
                    Your Name *
                  </label>
                  <input
                    type="text" name="name" required
                    value={formData.name} onChange={handleChange}
                    placeholder="Aman Sharma"
                    className="form-input"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', fontFamily: 'Outfit, sans-serif', fontWeight: 500 }}>
                    Business Name *
                  </label>
                  <input
                    type="text" name="business" required
                    value={formData.business} onChange={handleChange}
                    placeholder="Your Business"
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', fontFamily: 'Outfit, sans-serif', fontWeight: 500 }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel" name="phone" required
                    value={formData.phone} onChange={handleChange}
                    placeholder="+91 9999999999"
                    className="form-input"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', fontFamily: 'Outfit, sans-serif', fontWeight: 500 }}>
                    Email Address
                  </label>
                  <input
                    type="email" name="email"
                    value={formData.email} onChange={handleChange}
                    placeholder="hello@business.com"
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', fontFamily: 'Outfit, sans-serif', fontWeight: 500 }}>
                  Project Details *
                </label>
                <textarea
                  name="project" required rows={4}
                  value={formData.project} onChange={handleChange}
                  placeholder="Tell us about your project — what type of website, any specific features, timeline, etc."
                  className="form-input"
                  style={{ resize: 'vertical', minHeight: '100px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', fontFamily: 'Outfit, sans-serif', fontWeight: 500 }}>
                  Budget Range
                </label>
                <select
                  name="budget"
                  value={formData.budget} onChange={handleChange}
                  className="form-input"
                  style={{ cursor: 'pointer' }}
                >
                  <option value="" style={{ background: '#0a0a14' }}>Select budget range</option>
                  {budgetOptions.map(b => (
                    <option key={b} value={b} style={{ background: '#0a0a14' }}>{b}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '12px', paddingTop: '8px' }}>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ flex: 1, justifyContent: 'center', opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? (
                    <>⏳ Sending...</>
                  ) : (
                    <><FiSend size={16} /> Send Message</>
                  )}
                </button>
                <a
                  href={`https://wa.me/919999999999?text=${encodeURIComponent(waMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '14px 20px',
                    borderRadius: '50px',
                    background: '#25d366',
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '15px',
                    fontWeight: 600,
                    fontFamily: 'Outfit, sans-serif',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                >
                  <FaWhatsapp size={20} /> WhatsApp
                </a>
              </div>
            </form>
          </motion.div>

          {/* Right — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 style={{
              fontSize: '24px', fontWeight: 700,
              color: 'white', marginBottom: '8px',
              fontFamily: 'Syne, sans-serif',
            }}>
              Get A Free Consultation
            </h3>
            <p style={{
              fontSize: '15px', color: 'rgba(255,255,255,0.55)',
              marginBottom: '32px', lineHeight: 1.7,
              fontFamily: 'Outfit, sans-serif',
            }}>
              We respond within 2 hours. Book a free 30-minute strategy call to discuss your project.
            </p>

            {/* Contact Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              {[
                { icon: <FaWhatsapp size={18} />, label: 'WhatsApp', value: '+91 9999 999 999', href: 'https://wa.me/919999999999', color: '#25d366' },
                { icon: <FiMail size={18} />, label: 'Email', value: 'hello@digimantra.in', href: 'mailto:hello@digimantra.in', color: '#a78bfa' },
                { icon: <FiInstagram size={18} />, label: 'Instagram', value: '@digimantra.in', href: 'https://instagram.com/digimantra.in', color: '#e1306c' },
                { icon: <FiMapPin size={18} />, label: 'Location', value: 'Delhi, India', href: '#', color: '#06b6d4' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '16px',
                    padding: '16px 20px',
                    borderRadius: '14px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    color: 'inherit',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.borderColor = `${item.color}33`;
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  <div style={{
                    width: '42px', height: '42px', borderRadius: '10px',
                    background: `${item.color}15`,
                    border: `1px solid ${item.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: item.color, flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontFamily: 'Outfit, sans-serif', marginBottom: '2px' }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: 500, color: 'rgba(255,255,255,0.85)', fontFamily: 'Outfit, sans-serif' }}>
                      {item.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Map Embed */}
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.07)',
              height: '200px',
            }}>
              <iframe
                title="DigiMantra Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448193.95053595!2d76.76355697774669!3d28.64428418485657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1705000000000!5m2!1sen!2sin"
                width="100%"
                height="200"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.5)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
