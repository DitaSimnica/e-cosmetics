import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../utils/api';
import './CustomerDashboard.css';

const greetings = [
  "You look glowing today! ✨",
  "Hope your skin is feeling amazing 💖",
  "Ready for another beauty spree? 💅",
  "Let’s make today magical 🪄",
  "Your beauty radiates inside & out 🌟",
];

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [greetingText, setGreetingText] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await api.get('/user/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        setGreetingText(randomGreeting);
      } catch (error) {
        console.error('Error fetching user:', error);
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('authToken');
    navigate('/login');
  }, [navigate]);

  if (!user) {
    return (
      <motion.p
        className="loading-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Loading your cute dashboard... 🩷
      </motion.p>
    );
  }

  return (
    <div className="customer-dashboard-wrapper">
      <motion.div
        className="dashboard-box"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2>Welcome, {user.username} 🌸</h2>
        <p>{greetingText}</p>
        <div className="actions">
          <button className="btn btn-shop" onClick={() => navigate('/shop')}>
            🛍️ Go Shopping
          </button>
          <button className="btn btn-orders" onClick={() => navigate('/orders')}>
            📦 View My Orders
          </button>
          <button className="btn btn-logout" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CustomerDashboard;
