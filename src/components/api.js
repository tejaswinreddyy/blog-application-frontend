// src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true, // important if your backend uses cookies (e.g., Spring Security)
});

export default api;