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
  Chip,
  Skeleton,
} from '@mui/material';
import { Person } from '@mui/icons/material';

const TopAgents = ({ agents, loading = false }) => {
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

  if (!agents || agents.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="textSecondary">No agents found</Typography>
      </Box>
    );
  }

  return (
    <List sx={{ p: 0 }}>
      {agents.map((agent, index) => (
        <React.Fragment key={agent.id}>
          <ListItem sx={{ py: 2 }}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: index === 0 ? '#FFD700' : '#9C27B0' }}>
                {agent.name?.charAt(0).toUpperCase() || 'A'}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ color: '#fff' }}>
                    {agent.name}
                  </Typography>
                  <Chip
                    label={`Tier ${agent.tier || 1}`}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(156,39,176,0.2)',
                      color: '#9C27B0',
                      fontSize: 10,
                      height: 20,
                    }}
                  />
                </Box>
              }
              secondary={
                <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                  <Typography variant="caption" sx={{ color: '#888' }}>
                    {agent.referrals || 0} referrals
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#4CAF50' }}>
                    UGX {(agent.earnings || 0).toLocaleString()}
                  </Typography>
                </Box>
              }
            />
            <Box sx={{ color: index === 0 ? '#FFD700' : '#888' }}>
              #{index + 1}
            </Box>
          </ListItem>
          {index < agents.length - 1 && <Divider sx={{ borderColor: '#2a2a3e' }} />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default TopAgents;