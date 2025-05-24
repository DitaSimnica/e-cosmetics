import React from 'react';
import Navbar from '../Navbar';
import HeroSection from '../HeroSection';
import FeaturesSection from '../FeaturesSection';
import AboutSection from '../AboutSection';
import CTASection from '../CTASection';
import Footer from '../Footer';
import '../Home.css';
import ProductSlider from '../ProductSlider';

const Divider = ({ flip }) => (
  <div className={`divider ${flip ? 'flip' : ''}`}>
    <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
      <path
        d="M0,0 C480,100 960,0 1440,100 L1440,0 L0,0 Z"
        fill="#ffe4e1"
      />
    </svg>
  </div>
);

const Home = () => {
  return (
    <>
      <Navbar />

<section className="product-slider-section">
  <ProductSlider />
</section>
      <section className="hero-section">
        <HeroSection />
      </section>

      <Divider />

      <section className="features-section">
        <FeaturesSection />
      </section>

      <Divider flip />

      <section className="about-section">
        <AboutSection />
      </section>

      <Divider />

      <section className="cta-section">
        <CTASection />
      </section>

      <Footer />
    </>
  );
};

export default Home;