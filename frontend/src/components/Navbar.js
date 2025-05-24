import React from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css';
import { FaHome, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/home" className="logo">e-Cosmetics</NavLink>

      <div className="nav-links">
        <NavLink
          to="/home"
          className={({ isActive }) => isActive ? 'active-link' : undefined}
        >
          <FaHome /> Home
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) => isActive ? 'active-link' : undefined}
        >
          <FaSignInAlt /> Login
        </NavLink>
        <NavLink
          to="/register"
          className={({ isActive }) => isActive ? 'active-link' : undefined}
        >
          <FaUserPlus /> Register
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
