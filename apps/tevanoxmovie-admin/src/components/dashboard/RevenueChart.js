import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
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
import { Box, Typography, useTheme } from '@mui/material';

const RevenueChart = ({
  data,
  type = 'line',
  title = 'Revenue Overview',
  height = 300,
  loading = false,
}) => {
  const theme = useTheme();

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

  const COLORS = ['#FF4757', '#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#FFD700'];

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart data={data}>
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
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#FF4757"
              strokeWidth={2}
              dot={{ fill: '#FF4757' }}
            />
            <Line
              type="monotone"
              dataKey="subscriptions"
              stroke="#4CAF50"
              strokeWidth={2}
              dot={{ fill: '#4CAF50' }}
            />
            <Line
              type="monotone"
              dataKey="referrals"
              stroke="#2196F3"
              strokeWidth={2}
              dot={{ fill: '#2196F3' }}
            />
          </LineChart>
        );
      case 'area':
        return (
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
            <Area
              type="monotone"
              dataKey="revenue"
              stackId="1"
              stroke="#FF4757"
              fill="#FF4757"
              fillOpacity={0.3}
            />
            <Area
              type="monotone"
              dataKey="subscriptions"
              stackId="1"
              stroke="#4CAF50"
              fill="#4CAF50"
              fillOpacity={0.3}
            />
          </AreaChart>
        );
      case 'bar':
        return (
          <BarChart data={data}>
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
            <Bar dataKey="revenue" fill="#FF4757" radius={[4, 4, 0, 0]} />
            <Bar dataKey="subscriptions" fill="#4CAF50" radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      case 'pie':
        return (
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
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ height, width: '100%' }}>
      {title && (
        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600, mb: 2 }}>
          {title}
        </Typography>
      )}
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </Box>
  );
};

export default RevenueChart;