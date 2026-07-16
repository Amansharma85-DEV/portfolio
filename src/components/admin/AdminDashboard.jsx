import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { projects as initialProjects } from '../../data/projects';
import { testimonials as initialTestimonials } from '../../data/testimonials';
import { faqs as initialFaqs, pricing as initialPricing } from '../../data/siteData';
import { getSiteSettings } from '../../data/defaultSettings';
import {
  FiGrid, FiFolder, FiStar, FiDollarSign, FiHelpCircle,
  FiSettings, FiLogOut, FiPlus, FiEdit2, FiTrash2,
  FiExternalLink, FiUsers, FiEye,
} from 'react-icons/fi';

// --- Sidebar ---
const navItems = [
  { id: 'overview', icon: <FiGrid size={18} />, label: 'Overview' },
  { id: 'projects', icon: <FiFolder size={18} />, label: 'Projects' },
  { id: 'testimonials', icon: <FiStar size={18} />, label: 'Testimonials' },
  { id: 'pricing', icon: <FiDollarSign size={18} />, label: 'Pricing' },
  { id: 'faq', icon: <FiHelpCircle size={18} />, label: 'FAQ' },
  { id: 'settings', icon: <FiSettings size={18} />, label: 'Settings' },
];

function Sidebar({ active, setActive, onLogout }) {
  return (
    <div className="admin-sidebar" style={{ position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100, display: 'flex', flexDirection: 'column' }}>
      {/* Logo */}
      <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: 'white', fontWeight: 800, fontFamily: 'Syne, sans-serif' }}>D</span>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '15px', fontFamily: 'Syne, sans-serif', color: 'white' }}>DigiMantra</div>
            <div style={{ fontSize: '11px', color: '#a78bfa', fontFamily: 'Outfit, sans-serif' }}>Admin Panel</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`admin-nav-item ${active === item.id ? 'active' : ''}`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Bottom */}
      <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <button
          onClick={onLogout}
          className="admin-nav-item"
          style={{ width: '100%', color: '#f87171', background: 'rgba(239,68,68,0.05)' }}
        >
          <FiLogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
}

// --- Overview Panel ---
function OverviewPanel({ projects }) {
  const { whatsapp } = getSiteSettings();
  const stats = [
    { label: 'Total Projects', value: projects.length, icon: <FiFolder size={20} />, color: '#7c3aed' },
    { label: 'Featured Projects', value: projects.filter(p => p.featured).length, icon: <FiStar size={20} />, color: '#f59e0b' },
    { label: 'Happy Clients', value: '30+', icon: <FiUsers size={20} />, color: '#22c55e' },
    { label: 'Page Views', value: '1,200+', icon: <FiEye size={20} />, color: '#06b6d4' },
  ];

  return (
    <div>
      <h2 style={{ fontSize: '26px', fontWeight: 800, color: 'white', fontFamily: 'Syne, sans-serif', marginBottom: '8px' }}>
        Dashboard Overview
      </h2>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', fontFamily: 'Outfit, sans-serif', marginBottom: '32px' }}>
        Welcome back, Aman! Here's what's happening with your portfolio.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '40px' }}>
        {stats.map((s) => (
          <motion.div
            key={s.label}
            className="glass-card"
            style={{
              padding: '24px',
              borderRadius: '20px',
              background: 'rgba(10, 10, 20, 0.65)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
            }}
            whileHover={{
              y: -5,
              borderColor: 'rgba(124, 58, 237, 0.35)',
              boxShadow: '0 15px 40px rgba(124, 58, 237, 0.15)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                background: `${s.color}15`,
                border: `1px solid ${s.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: s.color,
              }}>
                {s.icon}
              </div>
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', fontFamily: 'Outfit, sans-serif' }}>{s.label}</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: 'white', fontFamily: 'Syne, sans-serif', marginTop: '4px' }}>{s.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick links */}
      <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'white', fontFamily: 'Syne, sans-serif', marginBottom: '16px' }}>
        Quick Actions
      </h3>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <a href={import.meta.env.BASE_URL} target="_blank" className="btn-secondary" style={{ fontSize: '13px', padding: '10px 18px', textDecoration: 'none' }}>
          <FiExternalLink size={14} /> View Portfolio
        </a>
        <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ fontSize: '13px', padding: '10px 18px', textDecoration: 'none', color: '#25d366', borderColor: 'rgba(37,211,102,0.3)' }}>
          💬 WhatsApp Business
        </a>
      </div>
    </div>
  );
}

// --- Projects Manager ---
function ProjectsManager({ projects, setProjects }) {
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const emptyProject = { id: Date.now(), title: '', category: '', client: '', description: '', shortDesc: '', image: '', github: '', liveDemo: '', technologies: '', features: '', completedDate: '', status: 'Completed', featured: false, results: '' };
  const [form, setForm] = useState(emptyProject);

  const handleEdit = (p) => {
    setEditing(p.id);
    setForm({ ...p, technologies: p.technologies.join(', '), features: p.features.join(', '), results: p.results.join(', ') });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this project?')) {
      setProjects(prev => prev.filter(p => p.id !== id));
      toast.success('Project deleted!');
    }
  };

  const handleSave = () => {
    const processed = {
      ...form,
      technologies: form.technologies.split(',').map(t => t.trim()).filter(Boolean),
      features: form.features.split(',').map(f => f.trim()).filter(Boolean),
      results: form.results.split(',').map(r => r.trim()).filter(Boolean),
    };
    if (editing) {
      setProjects(prev => prev.map(p => p.id === editing ? processed : p));
      toast.success('Project updated!');
    } else {
      setProjects(prev => [...prev, { ...processed, id: Date.now() }]);
      toast.success('Project added!');
    }
    setShowForm(false);
    setEditing(null);
    setForm(emptyProject);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'white', fontFamily: 'Syne, sans-serif' }}>Projects Manager</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontFamily: 'Outfit, sans-serif' }}>{projects.length} projects</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm(emptyProject); }} className="btn-primary" style={{ fontSize: '13px', padding: '10px 18px' }}>
          <FiPlus size={16} /> Add Project
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: '28px', borderRadius: '16px',
            background: 'rgba(124,58,237,0.06)',
            border: '1px solid rgba(124,58,237,0.2)',
            marginBottom: '24px',
          }}
        >
          <h3 style={{ color: 'white', fontFamily: 'Syne, sans-serif', marginBottom: '20px', fontSize: '18px' }}>
            {editing ? 'Edit Project' : 'Add New Project'}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              ['title', 'Project Title'],
              ['category', 'Category (e.g. Restaurant)'],
              ['client', 'Client Name'],
              ['completedDate', 'Completion Year'],
              ['image', 'Image Path (e.g. /assets/images/...)'],
              ['github', 'GitHub URL'],
              ['liveDemo', 'Live Demo URL'],
              ['shortDesc', 'Short Description'],
            ].map(([key, placeholder]) => (
              <input
                key={key}
                className="form-input"
                placeholder={placeholder}
                value={form[key] || ''}
                onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
              />
            ))}
            <textarea
              className="form-input"
              placeholder="Full Description"
              value={form.description || ''}
              onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              rows={3}
              style={{ gridColumn: '1 / -1', resize: 'vertical' }}
            />
            <input className="form-input" placeholder="Technologies (comma separated)" value={form.technologies || ''} onChange={e => setForm(p => ({ ...p, technologies: e.target.value }))} />
            <input className="form-input" placeholder="Features (comma separated)" value={form.features || ''} onChange={e => setForm(p => ({ ...p, features: e.target.value }))} />
            <input className="form-input" placeholder="Results (comma separated)" value={form.results || ''} onChange={e => setForm(p => ({ ...p, results: e.target.value }))} />
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.7)', fontFamily: 'Outfit, sans-serif', fontSize: '14px' }}>
              <input type="checkbox" checked={form.featured || false} onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))} />
              Featured Project
            </label>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button onClick={handleSave} className="btn-primary" style={{ fontSize: '14px', padding: '10px 20px' }}>
              💾 Save Project
            </button>
            <button onClick={() => { setShowForm(false); setEditing(null); }} className="btn-secondary" style={{ fontSize: '14px', padding: '10px 20px' }}>
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Projects List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {projects.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '16px',
              padding: '16px 20px', borderRadius: '14px',
              background: 'rgba(10, 10, 20, 0.65)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              transition: 'all 0.3s ease',
            }}
            whileHover={{
              borderColor: 'rgba(124, 58, 237, 0.35)',
              boxShadow: '0 10px 30px rgba(124, 58, 237, 0.12)',
              x: 6,
            }}
          >
            <img
              src={p.image}
              alt={p.title}
              style={{ width: '64px', height: '44px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }}
              onError={e => { e.target.src = `https://placehold.co/64x44/0a0a14/7c3aed?text=${p.title[0]}`; }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '15px', fontWeight: 600, color: 'white', fontFamily: 'Syne, sans-serif', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {p.title}
                {p.featured && <span style={{ marginLeft: '8px', fontSize: '11px', color: '#f59e0b', background: 'rgba(245,158,11,0.1)', padding: '2px 8px', borderRadius: '50px' }}>★ Featured</span>}
              </div>
              <div style={{ fontSize: '12px', color: '#a78bfa', fontFamily: 'Outfit, sans-serif' }}>{p.category}</div>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <a href={p.liveDemo} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.4)', padding: '6px', borderRadius: '6px', background: 'transparent', border: 'none', cursor: 'pointer', textDecoration: 'none', display: 'flex', alignItems: 'center' }}
                onMouseEnter={e => e.currentTarget.style.color = '#06b6d4'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
                <FiExternalLink size={16} />
              </a>
              <button onClick={() => handleEdit(p)} style={{ color: 'rgba(255,255,255,0.4)', padding: '6px', borderRadius: '6px', background: 'transparent', border: 'none', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.color = '#7c3aed'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
                <FiEdit2 size={16} />
              </button>
              <button onClick={() => handleDelete(p.id)} style={{ color: 'rgba(255,255,255,0.4)', padding: '6px', borderRadius: '6px', background: 'transparent', border: 'none', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.color = '#ef4444'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
                <FiTrash2 size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// --- Generic List Manager ---
function GenericManager({ title, items, setItems, fields, emptyItem }) {
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyItem);

  const handleSave = () => {
    if (editing !== null) {
      setItems(prev => prev.map((it, i) => i === editing ? form : it));
      toast.success(`${title.slice(0, -1)} updated!`);
    } else {
      setItems(prev => [...prev, { ...form, id: Date.now() }]);
      toast.success(`${title.slice(0, -1)} added!`);
    }
    setShowForm(false);
    setEditing(null);
    setForm(emptyItem);
  };

  const handleDelete = (idx) => {
    if (window.confirm(`Delete this ${title.toLowerCase().slice(0, -1)}?`)) {
      setItems(prev => prev.filter((_, i) => i !== idx));
      toast.success('Deleted!');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'white', fontFamily: 'Syne, sans-serif' }}>{title}</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontFamily: 'Outfit, sans-serif' }}>{items.length} items</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm(emptyItem); }} className="btn-primary" style={{ fontSize: '13px', padding: '10px 18px' }}>
          <FiPlus size={16} /> Add New
        </button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          style={{ padding: '24px', borderRadius: '16px', background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)', marginBottom: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {fields.map(({ key, label, type = 'text' }) => (
              type === 'textarea' ? (
                <textarea key={key} className="form-input" placeholder={label} value={form[key] || ''} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} rows={3} style={{ gridColumn: '1/-1', resize: 'vertical' }} />
              ) : (
                <input key={key} type={type} className="form-input" placeholder={label} value={form[key] || ''} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} />
              )
            ))}
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
            <button onClick={handleSave} className="btn-primary" style={{ fontSize: '13px', padding: '10px 18px' }}>💾 Save</button>
            <button onClick={() => setShowForm(false)} className="btn-secondary" style={{ fontSize: '13px', padding: '10px 18px' }}>Cancel</button>
          </div>
        </motion.div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {items.map((item, idx) => (
          <motion.div
            key={item.id || idx}
            style={{
              display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px',
              padding: '16px 20px', borderRadius: '12px',
              background: 'rgba(10, 10, 20, 0.65)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              transition: 'all 0.3s ease',
            }}
            whileHover={{
              borderColor: 'rgba(124, 58, 237, 0.35)',
              boxShadow: '0 10px 30px rgba(124, 58, 237, 0.12)',
              x: 6,
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ color: 'white', fontSize: '14px', fontWeight: 600, fontFamily: 'Syne, sans-serif', marginBottom: '4px' }}>
                {item[fields[0].key]}
              </div>
              {fields[1] && (
                <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', fontFamily: 'Outfit, sans-serif', lineHeight: 1.5 }}>
                  {(item[fields[1].key] || '').toString().slice(0, 120)}{(item[fields[1].key] || '').toString().length > 120 ? '...' : ''}
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <button onClick={() => { setEditing(idx); setForm(item); setShowForm(true); }} style={{ color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.color = '#7c3aed'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
                <FiEdit2 size={15} />
              </button>
              <button onClick={() => handleDelete(idx)} style={{ color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.color = '#ef4444'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
                <FiTrash2 size={15} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// --- Settings Panel ---
function SettingsPanel() {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('dm_settings');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      siteName: 'DigiMantra',
      tagline: 'Building Websites That Grow Businesses.',
      phone: '+91 9310 575 998',
      email: 'amansharma.aslink@gmail.com',
      instagram: 'https://instagram.com/DIGIMANTRA.AGENCY',
      whatsapp: '919310575998',
      location: 'Delhi, India',
    };
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem('dm_settings', JSON.stringify(settings));
    setSaved(true);
    toast.success('Settings saved!');
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'white', fontFamily: 'Syne, sans-serif', marginBottom: '8px' }}>Site Settings</h2>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontFamily: 'Outfit, sans-serif', marginBottom: '28px' }}>Update your portfolio contact info and settings.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', maxWidth: '700px' }}>
        {Object.entries(settings).map(([key, val]) => (
          <div key={key}>
            <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '6px', fontFamily: 'Outfit, sans-serif', textTransform: 'capitalize' }}>
              {key.replace(/([A-Z])/g, ' $1')}
            </label>
            <input
              className="form-input"
              value={val}
              onChange={e => setSettings(p => ({ ...p, [key]: e.target.value }))}
            />
          </div>
        ))}
      </div>
      <button onClick={handleSave} className="btn-primary" style={{ marginTop: '20px', fontSize: '14px' }}>
        {saved ? '✓ Saved!' : '💾 Save Settings'}
      </button>
    </div>
  );
}

// --- Main Dashboard ---
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [active, setActive] = useState('overview');
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('dm_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });
  const [testimonials, setTestimonials] = useState(() => {
    const saved = localStorage.getItem('dm_testimonials');
    return saved ? JSON.parse(saved) : initialTestimonials;
  });
  const [faqs, setFaqs] = useState(() => {
    const saved = localStorage.getItem('dm_faqs');
    return saved ? JSON.parse(saved) : initialFaqs;
  });
  const [pricingData, setPricingData] = useState(() => {
    const saved = localStorage.getItem('dm_pricing');
    return saved ? JSON.parse(saved) : initialPricing;
  });

  // Persist to localStorage
  useEffect(() => { localStorage.setItem('dm_projects', JSON.stringify(projects)); }, [projects]);
  useEffect(() => { localStorage.setItem('dm_testimonials', JSON.stringify(testimonials)); }, [testimonials]);
  useEffect(() => { localStorage.setItem('dm_faqs', JSON.stringify(faqs)); }, [faqs]);
  useEffect(() => { localStorage.setItem('dm_pricing', JSON.stringify(pricingData)); }, [pricingData]);

  // Auth check
  useEffect(() => {
    if (!localStorage.getItem('dm_admin_auth')) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('dm_admin_auth');
    toast.success('Logged out!');
    navigate('/admin');
  };

  const renderPanel = () => {
    switch (active) {
      case 'overview': return <OverviewPanel projects={projects} />;
      case 'projects': return <ProjectsManager projects={projects} setProjects={setProjects} />;
      case 'testimonials':
        return <GenericManager title="Testimonials" items={testimonials} setItems={setTestimonials}
          fields={[
            { key: 'name', label: 'Client Name' }, { key: 'business', label: 'Business' },
            { key: 'role', label: 'Role' }, { key: 'rating', label: 'Rating (1-5)', type: 'number' },
            { key: 'review', label: 'Review Text', type: 'textarea' },
          ]}
          emptyItem={{ name: '', business: '', role: '', rating: 5, review: '', avatar: '' }}
        />;
      case 'pricing':
        return <GenericManager title="Pricing Plans" items={pricingData} setItems={setPricingData}
          fields={[
            { key: 'name', label: 'Plan Name' }, { key: 'price', label: 'Price (e.g. ₹9,999)' },
            { key: 'description', label: 'Description', type: 'textarea' },
          ]}
          emptyItem={{ name: '', price: '', description: '' }}
        />;
      case 'faq':
        return <GenericManager title="FAQs" items={faqs} setItems={setFaqs}
          fields={[
            { key: 'question', label: 'Question' },
            { key: 'answer', label: 'Answer', type: 'textarea' },
          ]}
          emptyItem={{ question: '', answer: '' }}
        />;
      case 'settings': return <SettingsPanel />;
      default: return null;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#050508' }}>
      <Sidebar active={active} setActive={setActive} onLogout={handleLogout} />
      <main style={{ flex: 1, marginLeft: '260px', padding: '40px', overflowY: 'auto' }}>
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderPanel()}
        </motion.div>
      </main>
    </div>
  );
}
