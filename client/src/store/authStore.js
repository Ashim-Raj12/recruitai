import { create } from 'zustand';
import api from '../services/api';

export const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true, // initial load check
  isActionLoading: false, // for forms
  accessToken: null,
  error: null,
  tempEmail: null,
  
  setToken: (token) => set({ accessToken: token }),
  setTempEmail: (email) => set({ tempEmail: email }),

  checkAuth: async () => {
    try {
      set({ isLoading: true, error: null });
      // Attempt silent refresh
      const { data: refreshData } = await api.post('/auth/refresh');
      const token = refreshData.accessToken;
      
      set({ accessToken: token });

      // Fetch user profile
      const { data: userData } = await api.get('/auth/me');
      set({ user: userData.user, isAuthenticated: true });
    } catch (error) {
      set({ user: null, isAuthenticated: false, accessToken: null });
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (credentials) => {
    try {
      set({ isActionLoading: true, error: null });
      const { data } = await api.post('/auth/login', credentials);
      set({ 
        user: data.user, 
        accessToken: data.accessToken,
        isAuthenticated: true 
      });
      return { success: true };
    } catch (error) {
      set({ error: error.response?.data?.message || 'Login failed' });
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    } finally {
      set({ isActionLoading: false });
    }
  },

  register: async (userData) => {
    try {
      set({ isActionLoading: true, error: null });
      const { data } = await api.post('/auth/register', userData);
      return { success: true, message: data.message };
    } catch (error) {
      set({ error: error.response?.data?.message || 'Registration failed' });
      return { success: false, error: error.response?.data?.message || 'Registration failed' };
    } finally {
      set({ isActionLoading: false });
    }
  },

  verifyEmail: async (email, otp) => {
    try {
      set({ isActionLoading: true, error: null });
      const { data } = await api.post('/auth/verify-email', { email, otp });
      set({ 
        user: data.user, 
        accessToken: data.accessToken,
        isAuthenticated: true 
      });
      return { success: true };
    } catch (error) {
      set({ error: error.response?.data?.message || 'Verification failed' });
      return { success: false, error: error.response?.data?.message || 'Verification failed' };
    } finally {
      set({ isActionLoading: false });
    }
  },

  logout: async () => {
    try {
      await api.get('/auth/logout');
    } catch (error) {
      console.error('Logout error', error);
    } finally {
      set({ user: null, isAuthenticated: false, accessToken: null });
    }
  },

  updateProfile: async (profileData) => {
    try {
      set({ isActionLoading: true, error: null });
      const { data } = await api.put('/users/profile', profileData);
      set({ user: data.user });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Update failed' };
    } finally {
      set({ isActionLoading: false });
    }
  },
}));
