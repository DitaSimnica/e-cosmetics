import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FaRegHeart, FaUserFriends } from 'react-icons/fa';
import { GiLipstick, GiPerfumeBottle, GiGiftOfKnowledge } from 'react-icons/gi';
import { MdFaceRetouchingNatural } from 'react-icons/md';
import { IoMdExit } from 'react-icons/io';
import './AdminDashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    const fetchUsers = async () => {
      try {
        const response = await api.get('/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserCount(response.data.length);
      } catch (error) {
        console.error('Error fetching users:', error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          navigate('/login');
        }
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await api.get('/product', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProductCount(response.data.length);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await api.get('/order/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrderCount(response.data.length);
      } catch (error) {
        console.error('Error fetching orders:', error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          navigate('/login');
        }
      }
    };

    fetchUsers();
    fetchProducts();
    fetchOrders();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const data = {
    labels: ['Products', 'Users', 'Orders'],
    datasets: [
      {
        label: 'Counts',
        data: [productCount, userCount, orderCount],
        backgroundColor: ['#d63384', '#f77eb9', '#ffb6c1'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#880e4f', font: { weight: '600', size: 14 } },
      },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar">
        <h4 className="sidebar-title">
          <FaRegHeart className="icon-pink" /> Admin Panel
        </h4>
        <nav className="nav-links">
          <Link className="nav-link" to="/adminDashboard/products">
            <GiLipstick className="icon-pink" /> Manage Products
          </Link>
          <Link className="nav-link" to="/adminDashboard/users">
            <MdFaceRetouchingNatural className="icon-pink" /> Manage Users
          </Link>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          <IoMdExit className="icon-pink" /> Logout
        </button>
      </aside>

      <main className="main-content">
        <h2 className="welcome">Welcome Admin 🌸</h2>
        <p className="subtitle">Here's a snapshot of your dashboard:</p>

        <section className="cards-grid">
          <div className="dashboard-card">
            <GiPerfumeBottle className="card-icon" />
            <h4>Total Products</h4>
            <p className="count">{productCount}</p>
          </div>
          <div className="dashboard-card">
            <FaUserFriends className="card-icon" />
            <h4>Total Users</h4>
            <p className="count">{userCount}</p>
          </div>
          <div className="dashboard-card">
            <GiGiftOfKnowledge className="card-icon" />
            <h4>Total Orders</h4>
            <p className="count">{orderCount}</p>
          </div>
        </section>

        <section className="chart-wrapper">
          <h4 className="text-center chart-title">Overview Chart</h4>
          <Pie data={data} options={options} />
        </section>

        <p className="footer-note">Use the sidebar to manage content 💅</p>
      </main>
    </div>
  );
};

export default AdminDashboard;
