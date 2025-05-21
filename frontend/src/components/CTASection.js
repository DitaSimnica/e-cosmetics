import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const CTASection = () => {
  return (
    <section className="cta-section">
      <h3>Ready to Glow?</h3>
      <Link to="/register">
        <button className="primary-button">Join Us Now</button>
      </Link>
    </section>
  );
};

export default CTASection;
