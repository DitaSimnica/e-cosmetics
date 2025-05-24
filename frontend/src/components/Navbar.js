// src/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <div className="logo">E-Cosmetics</div>
        <ul className="nav-links">
          <li><a href="/login" className="nav-link">Login</a></li>
          <li><a href="/register" className="nav-link btn-register">Register</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
