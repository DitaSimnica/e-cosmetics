import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await api.get('/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
    const token = localStorage.getItem('authToken');
    console.log('Token:', token);

    const response = await api.get('/product', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Product response:', response.data);
    setProductCount(response.data.length);
  } catch (error) {
    console.error('Error fetching products:', error.response?.data || error.message);
  }
};




    fetchUsers();
    fetchProducts();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="admin-dashboard-wrapper d-flex">
      {/* Sidebar */}
      <div className="sidebar-cute d-flex flex-column p-3">
        <h4 className="text-center mb-4">💖 Admin Panel</h4>
        <Link className="nav-link mb-3" to="/adminDashboard/products">
        📦 Manage Products
        </Link>
        <Link className="nav-link mb-3" to="/adminDashboard/users">
        👥 Manage Users
        </Link>

        <button className="btn btn-outline-danger mt-auto" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="main-cute p-4 w-100">
        <h2 className="mb-3">Welcome Admin 🌸</h2>
        <p className="mb-4">Here's a snapshot of your dashboard:</p>

        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card card-cute shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">🛍️ Total Products</h5>
                <p className="card-text fs-4">{productCount}</p> {/* ✅ Product Count */}
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card card-cute shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">👩‍💻 Total Users</h5>
                <p className="card-text fs-4">{userCount}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card card-cute shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">📦 Total Orders</h5>
                <p className="card-text fs-4">--</p> {/* Next: Orders */}
              </div>
            </div>
          </div>
        </div>

        <p className="text-muted">Use the sidebar to manage content 💅</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
