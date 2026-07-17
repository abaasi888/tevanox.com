import React, { useEffect } from 'react';
import { Grid, Box, Typography, Paper } from '@mui/material';
import { useAnalytics } from '../hooks/useAnalytics';
import StatsCards from '../components/dashboard/StatsCards';
import RevenueChart from '../components/dashboard/RevenueChart';
import UserChart from '../components/dashboard/UserChart';
import ContentChart from '../components/dashboard/ContentChart';
import RecentActivity from '../components/dashboard/RecentActivity';
import TopAgents from '../components/dashboard/TopAgents';
import Loading from '../components/common/Loading';

const Dashboard = () => {
  const { stats, revenueData, userData, contentData, activities, topAgents, loading, fetchDashboardData } = useAnalytics();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return <Loading message="Loading dashboard..." />;
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Dashboard
      </Typography>

      <StatsCards stats={stats} />

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, bgcolor: '#1a1a2e', borderRadius: 2 }}>
            <RevenueChart data={revenueData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, bgcolor: '#1a1a2e', borderRadius: 2, height: '100%' }}>
            <ContentChart data={contentData} type="pie" />
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3, bgcolor: '#1a1a2e', borderRadius: 2 }}>
            <UserChart data={userData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, bgcolor: '#1a1a2e', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600, mb: 2 }}>
              🏆 Top Agents
            </Typography>
            <TopAgents agents={topAgents} />
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, bgcolor: '#1a1a2e', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600, mb: 2 }}>
              📋 Recent Activity
            </Typography>
            <RecentActivity activities={activities} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;