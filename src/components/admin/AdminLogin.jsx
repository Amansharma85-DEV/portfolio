import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';

const ADMIN_CREDENTIALS = { username: 'admin', password: 'digimantra2024' };

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    if (form.username === ADMIN_CREDENTIALS.username && form.password === ADMIN_CREDENTIALS.password) {
      localStorage.setItem('dm_admin_auth', 'true');
      toast.success('Welcome back, Aman! 👋');
      navigate('/admin/dashboard');
    } else {
      toast.error('Invalid credentials. Try admin / digimantra2024');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#050508',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 30% 50%, rgba(124,58,237,0.15), transparent 60%), radial-gradient(ellipse at 70% 20%, rgba(59,130,246,0.12), transparent 50%)',
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '48px 40px',
          borderRadius: '24px',
          background: 'rgba(10,10,20,0.85)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{
            width: '60px', height: '60px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 10px 30px rgba(124,58,237,0.4)',
          }}>
            <span style={{ color: 'white', fontWeight: 800, fontSize: '24px', fontFamily: 'Syne, sans-serif' }}>D</span>
          </div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '24px', fontWeight: 800, color: 'white', marginBottom: '6px' }}>
            DigiMantra Admin
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', fontFamily: 'Outfit, sans-serif' }}>
            Sign in to manage your portfolio
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', fontFamily: 'Outfit, sans-serif' }}>
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <FiUser size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
              <input
                type="text" required
                value={form.username}
                onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
                placeholder="admin"
                className="form-input"
                style={{ paddingLeft: '44px' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', fontFamily: 'Outfit, sans-serif' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <FiLock size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
              <input
                type={showPass ? 'text' : 'password'} required
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                placeholder="••••••••••••"
                className="form-input"
                style={{ paddingLeft: '44px', paddingRight: '44px' }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: 'absolute', right: '16px', top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none', border: 'none',
                  color: 'rgba(255,255,255,0.3)', cursor: 'pointer',
                }}
              >
                {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ justifyContent: 'center', marginTop: '8px', opacity: loading ? 0.7 : 1, width: '100%' }}
          >
            {loading ? '⏳ Signing In...' : '🔑 Sign In'}
          </button>
        </form>

        <div style={{
          marginTop: '24px', padding: '14px',
          borderRadius: '10px',
          background: 'rgba(124,58,237,0.06)',
          border: '1px solid rgba(124,58,237,0.15)',
        }}>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textAlign: 'center', fontFamily: 'Outfit, sans-serif' }}>
            Default: <span style={{ color: '#a78bfa' }}>admin</span> / <span style={{ color: '#a78bfa' }}>digimantra2024</span>
          </p>
        </div>

        <button
          onClick={() => navigate('/')}
          style={{
            display: 'block', width: '100%', marginTop: '16px',
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '13px', color: 'rgba(255,255,255,0.3)',
            fontFamily: 'Outfit, sans-serif', transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#a78bfa'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
        >
          ← Back to Portfolio
        </button>
      </motion.div>
    </div>
  );
}
