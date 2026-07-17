import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  agents: [],
  selected: null,
  loading: false,
  error: null,
};

const agentSlice = createSlice({
  name: 'agents',
  initialState,
  reducers: {
    setAgents: (state, action) => {
      state.agents = action.payload;
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setAgents, setSelected, setLoading, setError } = agentSlice.actions;
export default agentSlice.reducer;