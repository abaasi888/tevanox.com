import { createSlice } from '@reduxjs/toolkit';
const initialState = { agent: null, token: null, isAuthenticated: false };
const agentSlice = createSlice({
  name: 'agent',
  initialState,
  reducers: {
    setAgent: (state, action) => { state.agent = action.payload; state.isAuthenticated = true; },
    logout: (state) => { state.agent = null; state.token = null; state.isAuthenticated = false; },
  },
});
export const { setAgent, logout } = agentSlice.actions;
export default agentSlice.reducer;
