import { useState } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as loginAPI, register as registerAPI } from '../api/auth';
import { setUser, setToken, setLoading, setError, logout as logoutAction } from '../store/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const [loading, setLoadingState] = useState(false);

  const login = async (email, password) => {
    try {
      setLoadingState(true);
      dispatch(setLoading(true));

      const response = await loginAPI({ email, password });
      const { token, user } = response.data;

      await AsyncStorage.setItem('access_token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      dispatch(setToken(token));
      dispatch(setUser(user));

      return { success: true };
    } catch (error) {
      dispatch(setError(error.response?.data?.detail || 'Login failed'));
      return { success: false, error: error.response?.data?.detail };
    } finally {
      setLoadingState(false);
      dispatch(setLoading(false));
    }
  };

  const register = async (userData) => {
    try {
      setLoadingState(true);
      dispatch(setLoading(true));

      const response = await registerAPI(userData);
      const { token, user } = response.data;

      await AsyncStorage.setItem('access_token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      dispatch(setToken(token));
      dispatch(setUser(user));

      return { success: true };
    } catch (error) {
      dispatch(setError(error.response?.data?.detail || 'Registration failed'));
      return { success: false, error: error.response?.data?.detail };
    } finally {
      setLoadingState(false);
      dispatch(setLoading(false));
    }
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(['access_token', 'refresh_token', 'user']);
    dispatch(logoutAction());
  };

  return { login, register, logout, loading };
};