import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    // We would normally get the token from a store or localStorage here
    // const token = useAuthStore.getState().token;
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle global errors like 401 Unauthorized here
    if (error.response && error.response.status === 401) {
      // e.g., trigger a logout action
      // useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default api;
