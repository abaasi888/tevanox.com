import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { People, Movie, AttachMoney, TrendingUp, MusicNote, LiveTv } from '@mui/icons-material';

const StatsCards = ({ stats, loading = false }) => {
  const cards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: <People sx={{ fontSize: 40 }} />,
      color: '#4CAF50',
      change: stats?.userChange || 0,
    },
    {
      title: 'Total Movies',
      value: stats?.totalMovies || 0,
      icon: <Movie sx={{ fontSize: 40 }} />,
      color: '#2196F3',
      change: stats?.movieChange || 0,
    },
    {
      title: 'Total Music',
      value: stats?.totalMusic || 0,
      icon: <MusicNote sx={{ fontSize: 40 }} />,
      color: '#FF9800',
      change: stats?.musicChange || 0,
    },
    {
      title: 'Total Series',
      value: stats?.totalSeries || 0,
      icon: <LiveTv sx={{ fontSize: 40 }} />,
      color: '#9C27B0',
      change: stats?.seriesChange || 0,
    },
    {
      title: 'Total Agents',
      value: stats?.totalAgents || 0,
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      color: '#FF4757',
      change: stats?.agentChange || 0,
    },
    {
      title: 'Total Revenue',
      value: `UGX ${(stats?.totalRevenue || 0).toLocaleString()}`,
      icon: <AttachMoney sx={{ fontSize: 40 }} />,
      color: '#FFD700',
      change: stats?.revenueChange || 0,
    },
  ];

  if (loading) {
    return (
      <Grid container spacing={3}>
        {[...Array(6)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ bgcolor: '#1a1a2e', height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Loading...
                    </Typography>
                    <Typography variant="h5">---</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
      {cards.map((card, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card
            sx={{
              bgcolor: '#1a1a2e',
              height: '100%',
              borderLeft: `4px solid ${card.color}`,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
              },
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    {card.title}
                  </Typography>
                  <Typography variant="h5" sx={{ color: '#fff', fontWeight: 600 }}>
                    {card.value}
                  </Typography>
                  {card.change !== 0 && (
                    <Typography
                      variant="caption"
                      sx={{
                        color: card.change > 0 ? '#4CAF50' : '#FF4757',
                        display: 'block',
                        mt: 0.5,
                      }}
                    >
                      {card.change > 0 ? '+' : ''}{card.change}%
                    </Typography>
                  )}
                </Box>
                <Box sx={{ color: card.color }}>{card.icon}</Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsCards;