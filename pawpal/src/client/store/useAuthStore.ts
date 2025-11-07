import create from 'zustand';
import api from '../api';

interface UserState {
  user: any | null;
  loading: boolean;
  error: string | null;
  setUser: (u: any | null) => void;
  fetchMe: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: { username: string; email: string; password: string; dogBreed?: string; profilePicture?: string }) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<UserState>((set, get) => ({
  user: null,
  loading: false,
  error: null,
  setUser: (u) => set({ user: u }),
  fetchMe: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get('/auth/me');
      set({ user: res.data.user });
    } catch (err: any) {
      set({ user: null, error: err?.response?.data?.message || err.message });
    } finally {
      set({ loading: false });
    }
  },
  login: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post('/auth/login', { email, password });
      set({ user: res.data.user });
    } catch (err: any) {
      set({ error: err?.response?.data?.message || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
  signup: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post('/auth/signup', data);
      set({ user: res.data.user });
    } catch (err: any) {
      set({ error: err?.response?.data?.message || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
  logout: async () => {
    set({ loading: true, error: null });
    try {
      await api.post('/auth/logout');
      set({ user: null });
    } catch (err: any) {
      set({ error: err?.response?.data?.message || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAuthStore;
