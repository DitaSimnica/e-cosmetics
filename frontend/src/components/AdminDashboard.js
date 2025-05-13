import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // Custom styles

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="admin-dashboard-wrapper d-flex">
      {/* Sidebar */}
      <div className="sidebar-cute d-flex flex-column p-3">
        <h4 className="text-center mb-4">💖 Admin Panel</h4>
        <Link className="nav-link mb-3" to="/admin/products">
          📦 Manage Products
        </Link>
        <Link className="nav-link mb-3" to="/admin/users">
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
                <p className="card-text fs-4">--</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card card-cute shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">👩‍💻 Total Users</h5>
                <p className="card-text fs-4">--</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card card-cute shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">📦 Total Orders</h5>
                <p className="card-text fs-4">--</p>
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
