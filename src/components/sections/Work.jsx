import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiSearch, FiGithub, FiExternalLink } from 'react-icons/fi';
import { projects } from '../../data/projects';

/* ─── animation variants ─────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.96,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' },
  }),
};

/* ─── ProjectCard ─────────────────────────────────────────────── */
function ProjectCard({ project }) {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  const handleImgError = (e) => {
    if (!imgError) {
      setImgError(true);
      e.target.src = `https://placehold.co/800x500/0a0a14/7c3aed?text=${encodeURIComponent(project.title)}`;
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      layout
      style={{
        background: 'rgba(10, 10, 20, 0.6)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '24px',
        overflow: 'hidden',
        transition: 'all 0.5s cubic-bezier(0.25,0.46,0.45,0.94)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        cursor: 'pointer',
      }}
      className="group"
      whileHover={{
        borderColor: 'rgba(124, 58, 237, 0.35)',
        boxShadow: '0 24px 60px rgba(124,58,237,0.15)',
        y: -6,
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* ── Image wrapper ── */}
      <div
        style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}
      >
        <img
          src={imgError ? `https://placehold.co/800x500/0a0a14/7c3aed?text=${encodeURIComponent(project.title)}` : project.image}
          alt={project.title}
          onError={handleImgError}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}
          className="group-hover:scale-[1.08]"
        />

        {/* Badges */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: 'rgba(124,58,237,0.85)',
            backdropFilter: 'blur(8px)',
            borderRadius: '999px',
            padding: '3px 12px',
            fontSize: '11px',
            fontWeight: 600,
            color: '#fff',
            letterSpacing: '0.03em',
            zIndex: 10,
          }}
        >
          {project.category}
        </div>

        {project.featured && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
              borderRadius: '999px',
              padding: '3px 12px',
              fontSize: '11px',
              fontWeight: 700,
              color: '#fff',
              letterSpacing: '0.04em',
              zIndex: 10,
            }}
          >
            ★ Featured
          </div>
        )}

        {/* Hover overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(5,5,8,0.95) 0%, rgba(5,5,8,0.4) 50%, transparent 100%)',
            opacity: 0,
            transition: 'opacity 0.4s ease',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            padding: '20px',
            gap: '12px',
            zIndex: 5,
          }}
          className="group-hover:opacity-100"
        >
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
                color: '#fff',
                borderRadius: '10px',
                padding: '8px 18px',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 4px 20px rgba(124,58,237,0.4)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <FiExternalLink size={14} />
              Live Demo
            </a>
          )}
          <button
            onClick={() => navigate(`/project/${project.id}`)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff',
              borderRadius: '10px',
              padding: '8px 18px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.2s, transform 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Case Study →
          </button>
        </div>
      </div>

      {/* ── Card body ── */}
      <div style={{ padding: '20px 22px 18px' }}>
        <h3
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '20px',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '8px',
            lineHeight: 1.25,
            letterSpacing: '-0.01em',
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '14px',
            color: 'rgba(255,255,255,0.5)',
            marginBottom: '14px',
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.shortDesc}
        </p>

        {/* Tech pills */}
        {project.technologies && project.technologies.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              marginBottom: '16px',
            }}
          >
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                style={{
                  background: 'rgba(124,58,237,0.12)',
                  border: '1px solid rgba(124,58,237,0.25)',
                  color: '#a78bfa',
                  borderRadius: '6px',
                  padding: '3px 10px',
                  fontSize: '11px',
                  fontWeight: 500,
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.4)',
                  borderRadius: '6px',
                  padding: '3px 10px',
                  fontSize: '11px',
                  fontWeight: 500,
                }}
              >
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Bottom links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '14px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div style={{ display: 'flex', gap: '10px' }}>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '34px',
                  height: '34px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: 'rgba(255,255,255,0.6)',
                  transition: 'all 0.2s',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(124,58,237,0.2)';
                  e.currentTarget.style.color = '#a78bfa';
                  e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
                title="GitHub Repository"
              >
                <FiGithub size={15} />
              </a>
            )}
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '34px',
                  height: '34px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: 'rgba(255,255,255,0.6)',
                  transition: 'all 0.2s',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(59,130,246,0.2)';
                  e.currentTarget.style.color = '#93c5fd';
                  e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
                title="Live Demo"
              >
                <FiExternalLink size={15} />
              </a>
            )}
          </div>

          {project.status && (
            <span
              style={{
                fontSize: '11px',
                fontWeight: 500,
                color:
                  project.status === 'Live'
                    ? '#34d399'
                    : project.status === 'In Progress'
                    ? '#fbbf24'
                    : 'rgba(255,255,255,0.4)',
                fontFamily: "'Outfit', sans-serif",
                letterSpacing: '0.03em',
              }}
            >
              {project.status === 'Live' ? '● ' : project.status === 'In Progress' ? '◐ ' : ''}
              {project.status}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Work (main section) ──────────────────────────────────────── */
export default function Work() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const [localProjects] = useState(() => {
    const saved = localStorage.getItem('dm_projects');
    return saved ? JSON.parse(saved) : projects;
  });

  /* derive tab labels */
  const allCategories = ['All', ...new Set(localProjects.map((p) => p.category))];

  /* filtered projects */
  const filtered = localProjects.filter((p) => {
    const matchesCategory = activeFilter === 'All' || p.category === activeFilter;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section
      id="work"
      style={{
        background: '#050508',
        padding: '100px 0 120px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* subtle bg glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '500px',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative' }}>
        {/* ── Header ── */}
        <div ref={ref} style={{ textAlign: 'center', marginBottom: '56px' }}>
          <motion.div
            custom={0}
            variants={headerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <span className="section-tag">Our Portfolio</span>
          </motion.div>

          <motion.h2
            custom={1}
            variants={headerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="section-title"
            style={{ marginTop: '16px' }}
          >
            Featured{' '}
            <span className="gradient-text">Work</span>
          </motion.h2>

          <motion.p
            custom={2}
            variants={headerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="section-subtitle"
            style={{ maxWidth: '520px', margin: '16px auto 0' }}
          >
            Explore our handcrafted digital experiences — from blazing-fast storefronts to stunning brand sites.
          </motion.p>
        </div>

        {/* ── Search Bar ── */}
        <motion.div
          custom={3}
          variants={headerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '32px',
          }}
        >
          <div style={{ position: 'relative', width: '100%', maxWidth: '420px' }}>
            <FiSearch
              size={17}
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgba(255,255,255,0.35)',
                pointerEvents: 'none',
              }}
            />
            <input
              type="text"
              className="form-input"
              placeholder="Search projects…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '46px', width: '100%' }}
            />
          </div>
        </motion.div>

        {/* ── Filter Tabs ── */}
        <motion.div
          custom={4}
          variants={headerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '52px',
          }}
        >
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`filter-tab${activeFilter === cat ? ' active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ── Project Grid ── */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={`${activeFilter}-${searchQuery}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                textAlign: 'center',
                padding: '80px 20px',
                color: 'rgba(255,255,255,0.35)',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '16px',
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
              No projects found for{' '}
              <span style={{ color: '#a78bfa' }}>"{searchQuery || activeFilter}"</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .group-hover\\:scale-\\[1\\.08\\]:hover,
        .group:hover .group-hover\\:scale-\\[1\\.08\\] {
          transform: scale(1.08);
        }
        .group:hover .group-hover\\:opacity-100 {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}
