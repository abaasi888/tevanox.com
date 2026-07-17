import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/client';
import { setUser, setToken, logout } from '../store/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      if (!user.is_admin) {
        throw new Error('Unauthorized: Admin access required');
      }

      localStorage.setItem('admin_token', token);
      dispatch(setToken(token));
      dispatch(setUser(user));
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Login failed');
      return { success: false, error: err.response?.data?.detail };
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_refresh_token');
    dispatch(logout());
    navigate('/login');
  };

  return {
    login,
    logout: logoutUser,
    loading,
    error,
  };
};