import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://emailproject-8zv0.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
