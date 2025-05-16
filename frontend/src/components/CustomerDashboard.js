import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './CustomerDashboard.css';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await api.get('/user/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  if (!user) return <p>Loading your cute dashboard... 🩷</p>;

  return (
    <div className="customer-dashboard-wrapper">
      <div className="dashboard-box">
        <h2>Welcome, {user.username} 🌸</h2>
        <p>We're so glad to see you again!</p>
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
      </div>
    </div>
  );
};

export default CustomerDashboard;
