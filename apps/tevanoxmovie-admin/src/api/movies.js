import apiClient from './client';

export const getMovies = (params) => apiClient.get('/admin/movies', { params });
export const getMovie = (id) => apiClient.get(`/admin/movies/${id}`);
export const createMovie = (data) => apiClient.post('/admin/movies', data);
export const updateMovie = (id, data) => apiClient.put(`/admin/movies/${id}`, data);
export const deleteMovie = (id) => apiClient.delete(`/admin/movies/${id}`);
export const toggleMovieStatus = (id) => apiClient.patch(`/admin/movies/${id}/toggle`);
export const getMovieStats = () => apiClient.get('/admin/movies/stats');
export const bulkUploadMovies = (data) => apiClient.post('/admin/movies/bulk', data);
export const getMovieCategories = () => apiClient.get('/admin/movies/categories');
export const getMovieGenres = () => apiClient.get('/admin/movies/genres');