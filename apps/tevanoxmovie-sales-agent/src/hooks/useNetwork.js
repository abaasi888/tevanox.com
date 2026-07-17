import { useSelector } from 'react-redux';

export const useNetwork = () => {
  const tree = useSelector((state) => state.network.tree);
  const teamStats = useSelector((state) => state.network.teamStats);
  const downline = useSelector((state) => state.network.downline);
  const loading = useSelector((state) => state.network.loading);

  return {
    tree,
    teamStats,
    downline,
    loading,
  };
};