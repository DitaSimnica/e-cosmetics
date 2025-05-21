import React from 'react';
import Navbar from '../Navbar';
import HeroSection from '../HeroSection';
import FeaturesSection from '../FeaturesSection';
import AboutSection from '../AboutSection';
import CTASection from '../CTASection';
import Footer from '../Footer';
import '../Home.css';

const Home = () => {
  return (
    <>
      <Navbar />
      <section className="hero-section">
        <HeroSection />
      </section>
      <section className="features-section">
        <FeaturesSection />
      </section>
      <section className="about-section">
        <AboutSection />
      </section>
      <section className="cta-section">
        <CTASection />
      </section>
      <Footer />
    </>
  );
};

export default Home;
