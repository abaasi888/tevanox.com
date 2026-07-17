import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Box, Typography } from '@mui/material';

const UserChart = ({ data, title = 'User Growth', height = 300, loading = false }) => {
  if (loading) {
    return (
      <Box sx={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography color="textSecondary">Loading chart...</Typography>
      </Box>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Box sx={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography color="textSecondary">No data available</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height, width: '100%' }}>
      {title && (
        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600, mb: 2 }}>
          {title}
        </Typography>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
          <XAxis dataKey="month" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip
            contentStyle={{
              bgcolor: '#1a1a2e',
              border: '1px solid #2a2a3e',
              borderRadius: 8,
            }}
            labelStyle={{ color: '#fff' }}
            itemStyle={{ color: '#fff' }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="users"
            stroke="#2196F3"
            fill="#2196F3"
            fillOpacity={0.3}
          />
          <Area
            type="monotone"
            dataKey="active"
            stroke="#4CAF50"
            fill="#4CAF50"
            fillOpacity={0.3}
          />
          <Line
            type="monotone"
            dataKey="subscribers"
            stroke="#FF4757"
            strokeWidth={2}
            dot={{ fill: '#FF4757' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default UserChart;