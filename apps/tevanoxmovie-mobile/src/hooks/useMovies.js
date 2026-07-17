import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTrendingMovies as getTrendingAPI,
  getLatestMovies as getLatestAPI,
  getMovie as getMovieAPI,
  searchMovies as searchAPI,
  getMoviesByCategory as getByCategoryAPI,
} from '../api/movies';
import {
  setTrendingMovies,
  setLatestMovies,
  setSelectedMovie,
  setLoading,
  setError,
} from '../store/movieSlice';

export const useMovies = () => {
  const dispatch = useDispatch();
  const [loading, setLoadingState] = useState(false);
  const trendingMovies = useSelector((state) => state.movies.trending);
  const latestMovies = useSelector((state) => state.movies.latest);
  const selectedMovie = useSelector((state) => state.movies.selected);

  const fetchTrendingMovies = async () => {
    try {
      setLoadingState(true);
      dispatch(setLoading(true));
      const response = await getTrendingAPI();
      dispatch(setTrendingMovies(response.data));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      setLoadingState(false);
      dispatch(setLoading(false));
    }
  };

  const fetchLatestMovies = async () => {
    try {
      setLoadingState(true);
      dispatch(setLoading(true));
      const response = await getLatestAPI();
      dispatch(setLatestMovies(response.data));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      setLoadingState(false);
      dispatch(setLoading(false));
    }
  };

  const fetchMovie = async (id) => {
    try {
      setLoadingState(true);
      dispatch(setLoading(true));
      const response = await getMovieAPI(id);
      dispatch(setSelectedMovie(response.data));
      return response.data;
    } catch (error) {
      dispatch(setError(error.message));
      return null;
    } finally {
      setLoadingState(false);
      dispatch(setLoading(false));
    }
  };

  const searchMovies = async (query) => {
    try {
      const response = await searchAPI(query);
      return response.data;
    } catch (error) {
      dispatch(setError(error.message));
      return [];
    }
  };

  const getMoviesByCategory = async (category) => {
    try {
      const response = await getByCategoryAPI(category);
      return response.data;
    } catch (error) {
      dispatch(setError(error.message));
      return [];
    }
  };

  return {
    trendingMovies,
    latestMovies,
    selectedMovie,
    loading,
    fetchTrendingMovies,
    fetchLatestMovies,
    fetchMovie,
    searchMovies,
    getMoviesByCategory,
  };
};