import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Customer' // default role
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post('/auth/register', formData);
      console.log('Registration successful');
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError('Registration failed. Please check your inputs.');
    }
  };

  return (
    <div className="register-container">
      <motion.div
        className="register-form"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h2>Register</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="Customer">Customer</option>
            <option value="Admin">Admin</option>
          </select>
          <button type="submit">Register</button>
        </form>

        <p className="login-link">
          Already have an account?{' '}
          <a href="/login" className="login-link-text">Login here!</a>
        </p>
      </motion.div>
    </div>
  );
}

export default Register;
