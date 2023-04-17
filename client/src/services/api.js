import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@TOKEN');
  if (token) {
    config.headers.authorization = `Bearer ` + token;
  }
  return config;
})

export default api;