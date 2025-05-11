import axios from 'axios';

const apiUrl = 'https://localhost:7078/api'; // Replace with your backend API URL

// Create an instance of axios
const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
