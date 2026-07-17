import { useState } from 'react';
import { getOverview, getRevenueAnalytics, getUserAnalytics, getContentAnalytics } from '../api/analytics';

export const useAnalytics = () => {
  const [stats, setStats] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [contentData, setContentData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAnalytics = async (period = 'monthly') => {
    setLoading(true);
    try {
      const [overview, revenue, users, content] = await Promise.all([
        getOverview(),
        getRevenueAnalytics(period),
        getUserAnalytics(period),
        getContentAnalytics(),
      ]);

      setStats(overview.data);
      setRevenueData(revenue.data || []);
      setUserData(users.data || []);
      setContentData(content.data || []);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    stats,
    revenueData,
    userData,
    contentData,
    loading,
    fetchAnalytics,
  };
};