import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isloggingIn: false,
  isLoggingOut: false,

  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post('/api/v1/auth/signup', credentials);
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account Created Successfully");
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error.response?.data?.message || "An error occurred");
      set({ isSigningUp: false, user: null });
    }
  },

  login: async (credentials) => {
    set({ isloggingIn: true });
    try {
      const response = await axios.post('/api/v1/auth/login', credentials);
      set({ user: response.data.user, isloggingIn: false });
      toast.success("Logged in Successfully");
    } catch (error) {
      console.error('Login error:', error); // Check error
      toast.error(error.response?.data?.message || "An error occurred");
      set({ isloggingIn: false, user: null });
    }
  },

  Logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post('/api/v1/auth/logout');
      set({ user: null, isLoggingOut: false });
      toast.success("Logged Out successfully");
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(error.response?.data?.message || 'Logout Failed');
      set({ isLoggingOut: false });
    }
  },

  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get('/api/v1/auth/authCheck');
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      console.error('Auth check error:', error); // Check this log
      set({ isCheckingAuth: false, user: null });
    }
  }
  
}));

// Automatically call authCheck on store creation
useAuthStore.getState().authCheck();
