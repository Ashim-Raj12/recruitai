import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  tempEmail: null, // Used for OTP verification flow
  
  login: (userData) => set({ user: userData, isAuthenticated: true, isLoading: false, tempEmail: null }),
  logout: () => set({ user: null, isAuthenticated: false, isLoading: false, tempEmail: null }),
  setLoading: (loading) => set({ isLoading: loading }),
  setTempEmail: (email) => set({ tempEmail: email }),
}));
