import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WelcomeMessage from './components/WelcomeMessage';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import ManageProducts from './components/ManageProducts';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeMessage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Admin Dashboard Routes */}
        <Route
          path="/adminDashboard"
          element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/adminDashboard/products"
          element={isAuthenticated ? <ManageProducts /> : <Navigate to="/login" />}
        />

        {/* Redirect unknown paths to welcome */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
