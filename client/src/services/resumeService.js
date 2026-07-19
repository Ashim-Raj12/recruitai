import axios from 'axios';

// Ensure you have an environment variable for your API URL or fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // For sending cookies if auth is used
});

export const resumeService = {
  uploadResume: async (file, onUploadProgress) => {
    const formData = new FormData();
    formData.append('resume', file);

    const response = await api.post('/resume/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
    return response.data;
  },

  getResumes: async () => {
    const response = await api.get('/resume');
    return response.data;
  },

  getResumeById: async (id) => {
    const response = await api.get(`/resume/${id}`);
    return response.data;
  },

  deleteResume: async (id) => {
    const response = await api.delete(`/resume/${id}`);
    return response.data;
  }
};
