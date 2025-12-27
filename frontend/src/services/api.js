import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://emailproject-8zv0.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach latest token to each request to avoid needing a full page reload
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
