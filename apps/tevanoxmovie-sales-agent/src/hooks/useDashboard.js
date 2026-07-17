import { useSelector } from 'react-redux';

export const useDashboard = () => {
  const stats = useSelector((state) => state.dashboard.stats);
  const referrals = useSelector((state) => state.dashboard.referrals);
  const earnings = useSelector((state) => state.dashboard.earnings);
  const recentActivity = useSelector((state) => state.dashboard.recentActivity);
  const loading = useSelector((state) => state.dashboard.loading);

  return {
    stats,
    referrals,
    earnings,
    recentActivity,
    loading,
  };
};