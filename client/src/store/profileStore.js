import { create } from 'zustand';
import api from '../services/api';

export const useProfileStore = create((set, get) => ({
  profile: null,
  isLoading: false,
  error: null,

  fetchProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.get('/profile');
      set({ profile: data.data, isLoading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch profile', 
        isLoading: false 
      });
    }
  },

  updateProfile: async (updateData) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.patch('/profile', updateData);
      set({ profile: data.data, isLoading: false });
      return { success: true };
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to update profile', 
        isLoading: false 
      });
      return { success: false, error: error.response?.data?.message };
    }
  },

  uploadAvatar: async (avatarUrl) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.patch('/profile/avatar', { avatarUrl });
      set({ profile: data.data, isLoading: false });
      return { success: true };
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to update avatar', 
        isLoading: false 
      });
      return { success: false, error: error.response?.data?.message };
    }
  },
}));
