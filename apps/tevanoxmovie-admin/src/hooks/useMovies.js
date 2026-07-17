import { useState } from 'react';
import {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  toggleMovieStatus,
  getMovieCategories,
  getMovieGenres,
} from '../api/movies';

export const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [genres, setGenres] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (params = {}) => {
    setLoading(true);
    try {
      const response = await getMovies(params);
      setMovies(response.data.data || []);
      setTotal(response.data.total || 0);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getMovieCategories();
      setCategories(response.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await getMovieGenres();
      setGenres(response.data || []);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const fetchMovie = async (id) => {
    setLoading(true);
    try {
      const response = await getMovie(id);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createMovie = async (data) => {
    const response = await createMovie(data);
    return response.data;
  };

  const updateMovie = async (id, data) => {
    const response = await updateMovie(id, data);
    return response.data;
  };

  const deleteMovie = async (id) => {
    await deleteMovie(id);
  };

  const toggleStatus = async (id) => {
    const response = await toggleMovieStatus(id);
    return response.data;
  };

  return {
    movies,
    categories,
    genres,
    total,
    loading,
    fetchMovies,
    fetchMovie,
    fetchCategories,
    fetchGenres,
    createMovie,
    updateMovie,
    deleteMovie,
    toggleStatus,
  };
};