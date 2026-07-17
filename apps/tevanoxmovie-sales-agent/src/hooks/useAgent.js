import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { agentLogin as loginAPI, agentRegister as registerAPI } from '../api/auth';
import { getDashboard, getReferrals, getEarnings } from '../api/agent';
import { setAgent, setToken, setLoading, setError, logout as logoutAction } from '../store/agentSlice';
import { setStats, setReferrals, setEarnings, setRecentActivity } from '../store/dashboardSlice';

export const useAgent = () => {
  const dispatch = useDispatch();
  const [loading, setLoadingState] = useState(false);
  const agent = useSelector((state) => state.agent.agent);

  const login = async (email, password) => {
    try {
      setLoadingState(true);
      dispatch(setLoading(true));
      
      const response = await loginAPI({ email, password });
      const { token, agent } = response.data;
      
      await AsyncStorage.setItem('agent_token', token);
      await AsyncStorage.setItem('agent', JSON.stringify(agent));
      
      dispatch(setToken(token));
      dispatch(setAgent(agent));
      
      return { success: true };
    } catch (error) {
      dispatch(setError(error.response?.data?.detail || 'Login failed'));
      return { success: false, error: error.response?.data?.detail };
    } finally {
      setLoadingState(false);
      dispatch(setLoading(false));
    }
  };

  const register = async (agentData) => {
    try {
      setLoadingState(true);
      dispatch(setLoading(true));
      
      const response = await registerAPI(agentData);
      const { token, agent } = response.data;
      
      await AsyncStorage.setItem('agent_token', token);
      await AsyncStorage.setItem('agent', JSON.stringify(agent));
      
      dispatch(setToken(token));
      dispatch(setAgent(agent));
      
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
    await AsyncStorage.multiRemove(['agent_token', 'agent_refresh_token', 'agent']);
    dispatch(logoutAction());
  };

  const refreshDashboard = async () => {
    try {
      setLoadingState(true);
      const [dashboardRes, referralsRes, earningsRes] = await Promise.all([
        getDashboard(),
        getReferrals(),
        getEarnings(),
      ]);
      
      dispatch(setStats(dashboardRes.data));
      dispatch(setReferrals(referralsRes.data));
      dispatch(setEarnings(earningsRes.data));
      dispatch(setRecentActivity(dashboardRes.data.recent_activity || []));
    } catch (error) {
      console.error('Error refreshing dashboard:', error);
    } finally {
      setLoadingState(false);
    }
  };

  return { agent, loading, login, register, logout, refreshDashboard };
};