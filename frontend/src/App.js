import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WelcomeMessage from './components/WelcomeMessage';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import ManageProducts from './components/ManageProducts';
import ManageUsers from './components/ManageUsers';
import CustomerDashboard from './components/CustomerDashboard';
import ProductsPage from './components/ProductsPage';
import FavoritesPage from './components/FavoritesPage';
import CartPage from "./components/CartPage";
import MyOrdersPage from './components/MyOrdersPage';
import Home from './components/pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

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
        <Route path="/home" element={<Home />} />
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
        <Route
          path="/adminDashboard/users"
          element={isAuthenticated ? <ManageUsers /> : <Navigate to="/login" />}
        />

        <Route path="/customerDashboard" element={<CustomerDashboard />} />
        <Route path="/shop" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/orders" element={<MyOrdersPage />} />
        {/* Redirect unknown paths to welcome */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
