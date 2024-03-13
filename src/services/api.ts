import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VITE_BASE_URL,
});

export default api;
