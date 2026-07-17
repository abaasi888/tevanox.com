import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Box, Typography } from '@mui/material';

const ContentChart = ({
  data,
  type = 'bar',
  title = 'Content Distribution',
  height = 300,
  loading = false,
}) => {
  const COLORS = ['#FF4757', '#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#FFD700'];

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
        {type === 'pie' ? (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                bgcolor: '#1a1a2e',
                border: '1px solid #2a2a3e',
                borderRadius: 8,
              }}
              labelStyle={{ color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
          </PieChart>
        ) : (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
            <XAxis dataKey="name" stroke="#888" />
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
            <Bar dataKey="movies" fill="#FF4757" radius={[4, 4, 0, 0]} />
            <Bar dataKey="music" fill="#4CAF50" radius={[4, 4, 0, 0]} />
            <Bar dataKey="series" fill="#2196F3" radius={[4, 4, 0, 0]} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </Box>
  );
};

export default ContentChart;