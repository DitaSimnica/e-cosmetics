import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeMessage from './components/WelcomeMessage'; // Ensure correct path
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeMessage />} /> {/* Display welcome message first */}
        <Route path="/login" element={<Login />} />  {/* Then go to login */}
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </Router>
  );
}

export default App;
