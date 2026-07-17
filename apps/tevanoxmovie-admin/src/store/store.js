import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import agentSlice from './agentSlice';
import movieSlice from './movieSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    agents: agentSlice,
    movies: movieSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;