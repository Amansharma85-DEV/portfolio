import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Lenis from 'lenis';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import GradientCursor from './components/ui/GradientCursor';
import FloatingCTA from './components/ui/FloatingCTA';
import ScrollProgress from './components/ui/ScrollProgress';
import BottomActionBar from './components/ui/BottomActionBar';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <div className="noise-overlay" />
      <GradientCursor />
      <ScrollProgress />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(10, 10, 20, 0.9)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(124, 58, 237, 0.3)',
            color: 'white',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
      </Routes>
      <FloatingCTA />
      <BottomActionBar />
    </Router>
  );
}

export default App;
