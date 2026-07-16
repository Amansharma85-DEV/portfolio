import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { FiArrowLeft, FiExternalLink, FiGithub, FiCheck } from 'react-icons/fi';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = (() => {
    const saved = localStorage.getItem('dm_projects');
    const projectList = saved ? JSON.parse(saved) : projects;
    return projectList.find((p) => p.id === Number(id));
  })();

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: 'white', fontFamily: 'Syne, sans-serif', fontSize: '48px', marginBottom: '16px' }}>
            Project Not Found
          </h1>
          <button onClick={() => navigate('/')} className="btn-primary">
            ← Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <main style={{ paddingTop: '80px' }}>
        {/* Hero */}
        <section style={{ padding: '60px 0 0', position: 'relative', overflow: 'hidden' }}>
          {/* BG */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at top, rgba(124,58,237,0.15), transparent 60%)',
            pointerEvents: 'none',
          }} />

          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            {/* Back button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate('/#work')}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '50px',
                padding: '10px 20px',
                color: 'rgba(255,255,255,0.7)',
                cursor: 'pointer',
                fontSize: '14px',
                fontFamily: 'Outfit, sans-serif',
                marginBottom: '40px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.1)'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
            >
              <FiArrowLeft size={16} /> Back to Portfolio
            </motion.button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', marginBottom: '60px' }}
              className="project-hero-grid">
              {/* Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '6px 14px', borderRadius: '50px',
                  background: 'rgba(124,58,237,0.1)',
                  border: '1px solid rgba(124,58,237,0.3)',
                  fontSize: '12px', fontWeight: 600,
                  color: '#a78bfa', fontFamily: 'Outfit, sans-serif',
                  marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>
                  {project.category}
                </div>

                <h1 style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: 'clamp(32px, 5vw, 56px)',
                  fontWeight: 800, color: 'white',
                  lineHeight: 1.1, marginBottom: '16px',
                }}>
                  {project.title}
                </h1>

                <p style={{
                  fontSize: '17px', color: 'rgba(255,255,255,0.6)',
                  lineHeight: 1.75, marginBottom: '28px',
                  fontFamily: 'Outfit, sans-serif',
                }}>
                  {project.description}
                </p>

                {/* Meta */}
                <div style={{ display: 'flex', gap: '24px', marginBottom: '32px', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', fontFamily: 'Outfit, sans-serif', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Client</div>
                    <div style={{ fontSize: '15px', color: 'white', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{project.client}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', fontFamily: 'Outfit, sans-serif', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Year</div>
                    <div style={{ fontSize: '15px', color: 'white', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{project.completedDate}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', fontFamily: 'Outfit, sans-serif', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Status</div>
                    <div style={{ fontSize: '15px', color: '#22c55e', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>✓ {project.status}</div>
                  </div>
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '14px', padding: '12px 22px' }}>
                    <FiExternalLink size={15} /> Live Demo
                  </a>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ fontSize: '14px', padding: '12px 22px' }}>
                    <FiGithub size={15} /> GitHub
                  </a>
                </div>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                style={{
                  borderRadius: '20px', overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
                }}
              >
                <img
                  src={project.image && project.image.startsWith('/') ? `${import.meta.env.BASE_URL.slice(0, -1)}${project.image}` : project.image}
                  alt={project.title}
                  style={{ width: '100%', display: 'block', objectFit: 'cover' }}
                  onError={e => { e.target.src = `https://placehold.co/700x450/0a0a14/7c3aed?text=${encodeURIComponent(project.title)}`; }}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Details */}
        <section style={{ padding: '60px 0 100px' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '60px' }}
              className="project-detail-grid">
              {/* Left */}
              <div>
                {/* Technologies */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  style={{ marginBottom: '40px' }}
                >
                  <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'white', fontFamily: 'Syne, sans-serif', marginBottom: '16px' }}>
                    Technologies Used
                  </h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {project.technologies.map((tech) => (
                      <span key={tech} style={{
                        padding: '8px 16px', borderRadius: '8px',
                        background: 'rgba(124,58,237,0.1)',
                        border: '1px solid rgba(124,58,237,0.25)',
                        fontSize: '14px', fontWeight: 500,
                        color: '#c4b5fd', fontFamily: 'Outfit, sans-serif',
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  style={{ marginBottom: '40px' }}
                >
                  <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'white', fontFamily: 'Syne, sans-serif', marginBottom: '16px' }}>
                    Key Features
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {project.features.map((feat) => (
                      <div key={feat} style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '12px 16px', borderRadius: '10px',
                        background: 'rgba(34,197,94,0.05)',
                        border: '1px solid rgba(34,197,94,0.15)',
                      }}>
                        <FiCheck size={14} color="#22c55e" />
                        <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', fontFamily: 'Outfit, sans-serif' }}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Challenge + Solution */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div style={{
                      padding: '24px', borderRadius: '16px',
                      background: 'rgba(239,68,68,0.06)',
                      border: '1px solid rgba(239,68,68,0.15)',
                    }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f87171', fontFamily: 'Syne, sans-serif', marginBottom: '10px' }}>
                        🎯 Challenge
                      </h3>
                      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontFamily: 'Outfit, sans-serif' }}>
                        {project.challenge}
                      </p>
                    </div>
                    <div style={{
                      padding: '24px', borderRadius: '16px',
                      background: 'rgba(34,197,94,0.06)',
                      border: '1px solid rgba(34,197,94,0.15)',
                    }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#4ade80', fontFamily: 'Syne, sans-serif', marginBottom: '10px' }}>
                        💡 Solution
                      </h3>
                      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontFamily: 'Outfit, sans-serif' }}>
                        {project.solution}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right — Results */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                style={{ position: 'sticky', top: '100px' }}
              >
                <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'white', fontFamily: 'Syne, sans-serif', marginBottom: '20px' }}>
                  Results
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                  {project.results.map((result) => (
                    <div key={result} style={{
                      padding: '16px 20px', borderRadius: '12px',
                      background: 'rgba(124,58,237,0.08)',
                      border: '1px solid rgba(124,58,237,0.2)',
                      display: 'flex', alignItems: 'center', gap: '10px',
                    }}>
                      <span style={{ fontSize: '20px' }}>⭐</span>
                      <span style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.85)', fontFamily: 'Outfit, sans-serif' }}>{result}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div style={{
                  padding: '24px', borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(59,130,246,0.1))',
                  border: '1px solid rgba(124,58,237,0.3)',
                }}>
                  <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', marginBottom: '16px', fontFamily: 'Outfit, sans-serif', lineHeight: 1.6 }}>
                    Want a similar website for your business?
                  </p>
                  <a
                    href="/#contact"
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center', fontSize: '14px' }}
                  >
                    Get A Free Quote →
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .project-hero-grid { grid-template-columns: 1fr !important; }
          .project-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
