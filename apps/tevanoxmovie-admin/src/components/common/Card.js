import React from 'react';
import { Paper, Box, Typography, Skeleton } from '@mui/material';

const Card = ({
  title,
  children,
  loading = false,
  action,
  sx = {},
  ...props
}) => {
  if (loading) {
    return (
      <Paper sx={{ p: 3, bgcolor: '#1a1a2e', borderRadius: 2, ...sx }} {...props}>
        <Skeleton variant="text" width="60%" height={32} />
        <Skeleton variant="rectangular" height={200} sx={{ mt: 2, borderRadius: 1 }} />
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3, bgcolor: '#1a1a2e', borderRadius: 2, ...sx }} {...props}>
      {(title || action) && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          {title && (
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>
              {title}
            </Typography>
          )}
          {action && <Box>{action}</Box>}
        </Box>
      )}
      {children}
    </Paper>
  );
};

export default Card;