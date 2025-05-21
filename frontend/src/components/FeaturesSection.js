import React from 'react';
import { FaLeaf, FaTruck, FaHeart } from 'react-icons/fa';
import './Home.css';

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <h3>Why Choose Us?</h3>
      <div className="features">
        <div className="feature-item"><FaLeaf /> Vegan & Cruelty-Free</div>
        <div className="feature-item"><FaTruck /> Fast Delivery</div>
        <div className="feature-item"><FaHeart /> Loved by Customers</div>
      </div>
    </section>
  );
};

export default FeaturesSection;
