import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WelcomeMessage from './components/WelcomeMessage'; // Ensure correct path
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if there's a valid token in localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      // You might want to add a check to validate the token, for example by decoding it
      setIsAuthenticated(true); // If token exists, mark as authenticated
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeMessage />} /> {/* Display welcome message first */}
        <Route path="/login" element={<Login />} />  {/* Then go to login */}
        <Route path="/register" element={<Register/>}/>
        <Route
          path="/adminDashboard"
          element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
