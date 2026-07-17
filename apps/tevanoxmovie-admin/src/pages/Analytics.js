import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
} from '@mui/material';
import {
  Download,
  Refresh,
  TrendingUp,
  People,
  Movie,
  AttachMoney,
} from '@mui/icons-material';
import { useAnalytics } from '../hooks/useAnalytics';
import RevenueChart from '../components/dashboard/RevenueChart';
import UserChart from '../components/dashboard/UserChart';
import ContentChart from '../components/dashboard/ContentChart';
import StatsCard from '../components/dashboard/StatsCards';
import Loading from '../components/common/Loading';

const Analytics = () => {
  const {
    overview,
    revenueData,
    userData,
    contentData,
    agentData,
    loading,
    fetchAnalytics,
    exportData,
  } = useAnalytics();

  const [period, setPeriod] = useState('monthly');
  const [exportType, setExportType] = useState('revenue');
  const [exportFormat, setExportFormat] = useState('csv');

  useEffect(() => {
    fetchAnalytics(period);
  }, [period]);

  const handleExport = async () => {
    try {
      const data = await exportData(exportType, exportFormat);
      // Handle file download
      const blob = new Blob([data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${exportType}_export.${exportFormat}`;
      a.click();
    } catch (error) {
      console.error('Export error:', error);
    }
  };

  if (loading) {
    return <Loading message="Loading analytics..." />;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Analytics
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel sx={{ color: '#888' }}>Period</InputLabel>
            <Select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              sx={{
                color: '#fff',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#2a2a3e' },
              }}
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={() => fetchAnalytics(period)}
            sx={{ color: '#FF4757', borderColor: '#FF4757' }}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            startIcon={<Download />}
            onClick={handleExport}
            sx={{ bgcolor: '#9C27B0', '&:hover': { bgcolor: '#6A1B9A' } }}
          >
            Export
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, bgcolor: '#1a1a2e', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="textSecondary" variant="body2">Total Users</Typography>
                <Typography variant="h5" sx={{ color: '#fff' }}>
                  {overview?.totalUsers || 0}
                </Typography>
                <Typography variant="caption" sx={{ color: '#4CAF50' }}>
                  +{overview?.userGrowth || 0}% this period
                </Typography>
              </Box>
              <People sx={{ fontSize: 40, color: '#2196F3' }} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, bgcolor: '#1a1a2e', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="textSecondary" variant="body2">Total Revenue</Typography>
                <Typography variant="h5" sx={{ color: '#fff' }}>
                  UGX {(overview?.totalRevenue || 0).toLocaleString()}
                </Typography>
                <Typography variant="caption" sx={{ color: '#4CAF50' }}>
                  +{overview?.revenueGrowth || 0}% this period
                </Typography>
              </Box>
              <AttachMoney sx={{ fontSize: 40, color: '#FFD700' }} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, bgcolor: '#1a1a2e', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="textSecondary" variant="body2">Total Content</Typography>
                <Typography variant="h5" sx={{ color: '#fff' }}>
                  {overview?.totalContent || 0}
                </Typography>
                <Typography variant="caption" sx={{ color: '#4CAF50' }}>
                  +{overview?.contentGrowth || 0} new
                </Typography>
              </Box>
              <Movie sx={{ fontSize: 40, color: '#FF4757' }} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, bgcolor: '#1a1a2e', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="textSecondary" variant="body2">Total Views</Typography>
                <Typography variant="h5" sx={{ color: '#fff' }}>
                  {(overview?.totalViews || 0).toLocaleString()}
                </Typography>
                <Typography variant="caption" sx={{ color: '#4CAF50' }}>
                  +{overview?.viewGrowth || 0}% this period
                </Typography>
              </Box>
              <TrendingUp sx={{ fontSize: 40, color: '#4CAF50' }} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, bgcolor: '#1a1a2e', borderRadius: 2 }}>
            <RevenueChart data={revenueData} title="Revenue Analytics" />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, bgcolor: '#1a1a2e', borderRadius: 2, height: '100%' }}>
            <ContentChart data={contentData} type="pie" title="Content Distribution" />
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, bgcolor: '#1a1a2e', borderRadius: 2 }}>
            <UserChart data={userData} title="User Growth" />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, bgcolor: '#1a1a2e', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600, mb: 2 }}>
              Top Performing Content
            </Typography>
            {overview?.topContent?.map((content, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  py: 1,
                  borderBottom: '1px solid #2a2a3e',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip label={`#${index + 1}`} size="small" />
                  <Typography sx={{ color: '#fff' }}>{content.title}</Typography>
                </Box>
                <Typography sx={{ color: '#aaa' }}>
                  {content.views} views
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;