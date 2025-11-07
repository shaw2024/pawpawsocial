import useAuthStore from '../store/useAuthStore';

// Thin wrapper to keep previous hook API
const useAuth = () => {
  const { user, loading, error, login, signup, logout, fetchMe, setUser } = useAuthStore();
  return { user, loading, error, login, signup, logout, fetchMe, setUser };
};

export default useAuth;