import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import TrustedBy from '../components/sections/TrustedBy';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Work from '../components/sections/Work';
import CaseStudy from '../components/sections/CaseStudy';
import Testimonials from '../components/sections/Testimonials';
import Process from '../components/sections/Process';
import WhyUs from '../components/sections/WhyUs';
import Pricing from '../components/sections/Pricing';
import FAQ from '../components/sections/FAQ';
import Contact from '../components/sections/Contact';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Services />
        <div className="section-divider" />
        <Work />
        <div className="section-divider" />
        <CaseStudy />
        <div className="section-divider" />
        <Testimonials />
        <div className="section-divider" />
        <Process />
        <div className="section-divider" />
        <WhyUs />
        <div className="section-divider" />
        <Pricing />
        <div className="section-divider" />
        <FAQ />
        <div className="section-divider" />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
