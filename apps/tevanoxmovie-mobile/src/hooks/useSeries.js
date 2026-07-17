import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTrendingSeries as getTrendingAPI,
  getLatestSeries as getLatestAPI,
  getSeriesById as getByIdAPI,
  getSeriesByCategory as getByCategoryAPI,
  getEpisodes as getEpisodesAPI,
} from '../api/series';
import {
  setTrendingSeries,
  setLatestSeries,
  setSelectedSeries,
  setEpisodes,
  setLoading,
  setError,
} from '../store/seriesSlice';

export const useSeries = () => {
  const dispatch = useDispatch();
  const [loading, setLoadingState] = useState(false);
  const trendingSeries = useSelector((state) => state.series.trending);
  const latestSeries = useSelector((state) => state.series.latest);
  const selectedSeries = useSelector((state) => state.series.selected);
  const episodes = useSelector((state) => state.series.episodes);

  const fetchTrendingSeries = async () => {
    try {
      setLoadingState(true);
      dispatch(setLoading(true));
      const response = await getTrendingAPI();
      dispatch(setTrendingSeries(response.data));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      setLoadingState(false);
      dispatch(setLoading(false));
    }
  };

  const fetchLatestSeries = async () => {
    try {
      setLoadingState(true);
      dispatch(setLoading(true));
      const response = await getLatestAPI();
      dispatch(setLatestSeries(response.data));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      setLoadingState(false);
      dispatch(setLoading(false));
    }
  };

  const fetchSeries = async (id) => {
    try {
      setLoadingState(true);
      dispatch(setLoading(true));
      const response = await getByIdAPI(id);
      dispatch(setSelectedSeries(response.data));

      const episodesResponse = await getEpisodesAPI(id);
      dispatch(setEpisodes(episodesResponse.data));

      return response.data;
    } catch (error) {
      dispatch(setError(error.message));
      return null;
    } finally {
      setLoadingState(false);
      dispatch(setLoading(false));
    }
  };

  const getSeriesByCategory = async (category) => {
    try {
      const response = await getByCategoryAPI(category);
      return response.data;
    } catch (error) {
      dispatch(setError(error.message));
      return [];
    }
  };

  return {
    trendingSeries,
    latestSeries,
    selectedSeries,
    episodes,
    loading,
    fetchTrendingSeries,
    fetchLatestSeries,
    fetchSeries,
    getSeriesByCategory,
  };
};