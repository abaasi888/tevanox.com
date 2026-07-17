import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTrendingMusic as getTrendingAPI,
  getLatestMusic as getLatestAPI,
  getMusicById as getByIdAPI,
  getMusicByCategory as getByCategoryAPI,
} from '../api/music';
import {
  setTrendingMusic,
  setLatestMusic,
  setSelectedMusic,
  setLoading,
  setError,
} from '../store/musicSlice';

export const useMusic = () => {
  const dispatch = useDispatch();
  const [loading, setLoadingState] = useState(false);
  const trendingMusic = useSelector((state) => state.music.trending);
  const latestMusic = useSelector((state) => state.music.latest);
  const selectedMusic = useSelector((state) => state.music.selected);

  const fetchTrendingMusic = async () => {
    try {
      setLoadingState(true);
      dispatch(setLoading(true));
      const response = await getTrendingAPI();
      dispatch(setTrendingMusic(response.data));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      setLoadingState(false);
      dispatch(setLoading(false));
    }
  };

  const fetchLatestMusic = async () => {
    try {
      setLoadingState(true);
      dispatch(setLoading(true));
      const response = await getLatestAPI();
      dispatch(setLatestMusic(response.data));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      setLoadingState(false);
      dispatch(setLoading(false));
    }
  };

  const fetchMusic = async (id) => {
    try {
      setLoadingState(true);
      dispatch(setLoading(true));
      const response = await getByIdAPI(id);
      dispatch(setSelectedMusic(response.data));
      return response.data;
    } catch (error) {
      dispatch(setError(error.message));
      return null;
    } finally {
      setLoadingState(false);
      dispatch(setLoading(false));
    }
  };

  const getMusicByCategory = async (category) => {
    try {
      const response = await getByCategoryAPI(category);
      return response.data;
    } catch (error) {
      dispatch(setError(error.message));
      return [];
    }
  };

  return {
    trendingMusic,
    latestMusic,
    selectedMusic,
    loading,
    fetchTrendingMusic,
    fetchLatestMusic,
    fetchMusic,
    getMusicByCategory,
  };
};