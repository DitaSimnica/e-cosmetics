import React from 'react';
import { Link } from 'react-router-dom';
import '../Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* 🌸 Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1>Welcome to E-Cosmetics</h1>
          <p>Your beauty, your rules — all in one adorable place 💖</p>
          <div className="hero-buttons">
            <Link to="/login" className="btn btn-login">Login</Link>
            <Link to="/register" className="btn btn-register">Register</Link>
          </div>
        </div>
      </section>

      {/* ✨ Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>Why You'll Love Us</h2>
          <div className="row mt-4 text-center">
            {[
              { icon: '🌷', text: 'Handpicked Korean skincare & makeup' },
              { icon: '🎁', text: 'Cute packaging with every order' },
              { icon: '💌', text: 'Personalized beauty recommendations' }
            ].map(({ icon, text }, idx) => (
              <div key={idx} className="col-md-4 feature-item p-3">
                <div className="feature-icon">{icon}</div>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 💕 About Section */}
      <section className="about-section">
        <div className="container text-center">
          <h2>About Us</h2>
          <p className="about-text">
            We’re a small team of beauty lovers committed to bringing you the most effective and adorable products.<br />
            Our mission is to make skincare fun, affordable, and confidence-boosting 🌼
          </p>
        </div>
      </section>

      {/* 💫 CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Start Your Glow-Up ✨</h2>
          <p>Sign up and get 10% off your first purchase!</p>
          <button className="btn btn-join">Join Now</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
