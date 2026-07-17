import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stats: null,
  referrals: [],
  earnings: [],
  recentActivity: [],
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setStats: (state, action) => {
      state.stats = action.payload;
    },
    setReferrals: (state, action) => {
      state.referrals = action.payload;
    },
    setEarnings: (state, action) => {
      state.earnings = action.payload;
    },
    setRecentActivity: (state, action) => {
      state.recentActivity = action.payload;
    },
    clearDashboard: (state) => {
      state.stats = null;
      state.referrals = [];
      state.earnings = [];
      state.recentActivity = [];
    },
  },
});

export const {
  setLoading,
  setError,
  setStats,
  setReferrals,
  setEarnings,
  setRecentActivity,
  clearDashboard,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;