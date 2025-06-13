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
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setErrorMsg('');
      try {
        const [usersRes, productsRes, ordersRes] = await Promise.all([
          api.get('/user', { headers: { Authorization: `Bearer ${token}` } }),
          api.get('/product', { headers: { Authorization: `Bearer ${token}` } }),
          api.get('/order/all', { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setUserCount(usersRes.data.length);
        setProductCount(productsRes.data.length);
        setOrderCount(ordersRes.data.length);
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          navigate('/login');
        } else {
          setErrorMsg('Failed to fetch data. Please try again later.');
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
        backgroundColor: ['#ff6f91', '#ffb3c1', '#ffd6e8'],
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
        labels: { color: '#b3385b', font: { weight: '700', size: 15 } },
      },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar" aria-label="Sidebar Navigation">
        <h4 className="sidebar-title">
          <FaRegHeart className="icon-pink" aria-hidden="true" /> Admin Panel
        </h4>
        <nav className="nav-links" aria-label="Admin Navigation Links">
          <Link className="nav-link" to="/adminDashboard/products">
            <GiLipstick className="icon-pink" aria-hidden="true" /> Manage Products
          </Link>
          <Link className="nav-link" to="/adminDashboard/users">
            <MdFaceRetouchingNatural className="icon-pink" aria-hidden="true" /> Manage Users
          </Link>
        </nav>
        <button
          className="logout-btn"
          onClick={handleLogout}
          aria-label="Logout"
          type="button"
        >
          <IoMdExit className="icon-pink" aria-hidden="true" /> Logout
        </button>
      </aside>

      <main className="main-content" role="main">
        <h2 className="welcome">Welcome Admin 🌸</h2>
        <p className="subtitle">Here's a snapshot of your dashboard:</p>

        {loading ? (
          <p className="loading-message">Loading dashboard data...</p>
        ) : errorMsg ? (
          <p className="error-message">{errorMsg}</p>
        ) : (
          <>
            <section className="cards-grid" aria-label="Dashboard stats cards">
              <article
                className="dashboard-card"
                tabIndex="0"
                aria-labelledby="products-title products-count"
              >
                <GiPerfumeBottle className="card-icon" aria-hidden="true" />
                <h4 id="products-title">Total Products</h4>
                <p id="products-count" className="count">
                  {productCount}
                </p>
              </article>
              <article
                className="dashboard-card"
                tabIndex="0"
                aria-labelledby="users-title users-count"
              >
                <FaUserFriends className="card-icon" aria-hidden="true" />
                <h4 id="users-title">Total Users</h4>
                <p id="users-count" className="count">
                  {userCount}
                </p>
              </article>
              <article
                className="dashboard-card"
                tabIndex="0"
                aria-labelledby="orders-title orders-count"
              >
                <GiGiftOfKnowledge className="card-icon" aria-hidden="true" />
                <h4 id="orders-title">Total Orders</h4>
                <p id="orders-count" className="count">
                  {orderCount}
                </p>
              </article>
            </section>

            <section className="chart-wrapper" aria-label="Dashboard data overview chart">
              <h4 className="text-center chart-title">Overview Chart</h4>
              <Pie data={data} options={options} />
            </section>

            <p className="footer-note" aria-live="polite">
              Use the sidebar to manage content
            </p>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
