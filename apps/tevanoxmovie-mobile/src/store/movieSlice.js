import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trending: [],
  latest: [],
  selected: null,
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setTrendingMovies: (state, action) => {
      state.trending = action.payload;
    },
    setLatestMovies: (state, action) => {
      state.latest = action.payload;
    },
    setSelectedMovie: (state, action) => {
      state.selected = action.payload;
    },
    clearSelected: (state) => {
      state.selected = null;
    },
  },
});

export const {
  setLoading,
  setError,
  setTrendingMovies,
  setLatestMovies,
  setSelectedMovie,
  clearSelected,
} = movieSlice.actions;

export default movieSlice.reducer;