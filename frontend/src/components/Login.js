import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Import Link for navigation
import api from '../utils/api'; // Importing the api utility
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Making the POST request to the backend API to login
      const response = await api.post('/auth/login', {
        email,
        password
      });

      // Assuming the response has a token that you want to store
      const { token } = response.data;

      // Store the token in localStorage or state (for authentication)
      localStorage.setItem('authToken', token);

      // Redirect or show a success message
      console.log('Login successful');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error(err);
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
        {error && <p>{error}</p>}
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
