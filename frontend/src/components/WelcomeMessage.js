import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart, FaStar, FaKissWinkHeart, FaMagic } from 'react-icons/fa';
import './WelcomeMessage.css';

const WelcomeMessage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      const el = document.querySelector('.welcome-message');
      if (el) el.style.opacity = '0';
    }, 2500);

    const navTimer = setTimeout(() => {
      navigate('/home');
    }, 3000);

    return () => {
      clearTimeout(navTimer);
      clearTimeout(fadeTimer);
    };
  }, [navigate]);

  return (
    <motion.div
      className="welcome-message"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      <div className="icons">
        <FaHeart className="icon" />
        <FaMagic className="icon" />
        <FaStar className="icon" />
      </div>
      <h1>Welcome to <span className="brand">e-Cosmetics</span>!</h1>
      <p>Enjoy your shopping experience <FaKissWinkHeart /></p>
    </motion.div>
  );
};

export default WelcomeMessage;
