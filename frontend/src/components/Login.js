import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, refreshToken } = response.data;

      localStorage.setItem('authToken', token);
      localStorage.setItem('refreshToken', refreshToken); // optional but useful

      navigate('/admindashboard');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-container">
      <motion.div
        className="login-form"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h2>Login 💕</h2>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email"
            required 
          />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password"
            required 
          />
          <button type="submit">Login</button>
        </form>

        <p className="register-link">
          Don't have an account?{' '}
          <Link to="/register" className="register-link-text">Register here!</Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
