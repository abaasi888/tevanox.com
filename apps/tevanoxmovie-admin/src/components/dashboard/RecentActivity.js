import React from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box,
  Divider,
  Skeleton,
} from '@mui/material';
import {
  PersonAdd,
  Movie,
  MusicNote,
  LiveTv,
  AttachMoney,
  Payment,
} from '@mui/icons-material';

const RecentActivity = ({ activities, loading = false }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'user':
        return <PersonAdd />;
      case 'movie':
        return <Movie />;
      case 'music':
        return <MusicNote />;
      case 'series':
        return <LiveTv />;
      case 'payment':
        return <Payment />;
      default:
        return <AttachMoney />;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'user':
        return '#4CAF50';
      case 'movie':
        return '#FF4757';
      case 'music':
        return '#FF9800';
      case 'series':
        return '#9C27B0';
      case 'payment':
        return '#2196F3';
      default:
        return '#FFD700';
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 2 }}>
        {[...Array(5)].map((_, index) => (
          <Box key={index} sx={{ py: 1 }}>
            <Skeleton variant="text" width="100%" height={40} />
          </Box>
        ))}
      </Box>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="textSecondary">No recent activity</Typography>
      </Box>
    );
  }

  return (
    <List sx={{ p: 0 }}>
      {activities.map((activity, index) => (
        <React.Fragment key={index}>
          <ListItem sx={{ py: 2 }}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: getColor(activity.type) }}>
                {getIcon(activity.type)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="body2" sx={{ color: '#fff' }}>
                  {activity.message}
                </Typography>
              }
              secondary={
                <Typography variant="caption" sx={{ color: '#888' }}>
                  {activity.time}
                </Typography>
              }
            />
          </ListItem>
          {index < activities.length - 1 && <Divider sx={{ borderColor: '#2a2a3e' }} />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default RecentActivity;