import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './AdminDashboard.css';
import { FaRegHeart, FaUserFriends } from 'react-icons/fa';
import { GiLipstick, GiPerfumeBottle, GiGiftOfKnowledge } from 'react-icons/gi';
import { MdFaceRetouchingNatural } from 'react-icons/md';
import { IoMdExit } from 'react-icons/io';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0); // ✅ New state

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
    fetchOrders(); // ✅ Fetch orders too
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="admin-dashboard-wrapper d-flex">
      <div className="sidebar-cute d-flex flex-column p-3">
        <h4 className="text-center mb-4"><FaRegHeart /> Admin Panel</h4>
        <Link className="nav-link mb-3" to="/adminDashboard/products">
          <GiLipstick className="me-2" /> Manage Products
        </Link>
        <Link className="nav-link mb-3" to="/adminDashboard/users">
          <MdFaceRetouchingNatural className="me-2" /> Manage Users
        </Link>
        <button className="btn btn-outline-danger mt-auto" onClick={handleLogout}>
          <IoMdExit className="me-2" /> Logout
        </button>
      </div>

      <div className="main-cute p-4 w-100">
        <h2 className="mb-3">Welcome Admin 🌸</h2>
        <p className="mb-4">Here's a snapshot of your dashboard:</p>

        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card card-cute shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title"><GiPerfumeBottle className="me-2" /> Total Products</h5>
                <p className="card-text fs-4">{productCount}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card card-cute shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title"><FaUserFriends className="me-2" /> Total Users</h5>
                <p className="card-text fs-4">{userCount}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card card-cute shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title"><GiGiftOfKnowledge className="me-2" /> Total Orders</h5>
                <p className="card-text fs-4">{orderCount}</p> {/* ✅ Show order count */}
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
