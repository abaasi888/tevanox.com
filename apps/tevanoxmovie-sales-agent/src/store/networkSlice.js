import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tree: null,
  teamStats: null,
  downline: [],
  loading: false,
  error: null,
};

const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setTree: (state, action) => {
      state.tree = action.payload;
    },
    setTeamStats: (state, action) => {
      state.teamStats = action.payload;
    },
    setDownline: (state, action) => {
      state.downline = action.payload;
    },
    clearNetwork: (state) => {
      state.tree = null;
      state.teamStats = null;
      state.downline = [];
    },
  },
});

export const {
  setLoading,
  setError,
  setTree,
  setTeamStats,
  setDownline,
  clearNetwork,
} = networkSlice.actions;

export default networkSlice.reducer;