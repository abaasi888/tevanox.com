import React from 'react';
import { Pagination as MuiPagination, Box } from '@mui/material';

const Pagination = ({
  count,
  page,
  onChange,
  color = 'primary',
  size = 'medium',
  showFirstButton = true,
  showLastButton = true,
  ...props
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
      <MuiPagination
        count={count}
        page={page}
        onChange={(e, value) => onChange(value)}
        color={color}
        size={size}
        showFirstButton={showFirstButton}
        showLastButton={showLastButton}
        sx={{
          '& .MuiPaginationItem-root': {
            color: '#aaa',
            borderColor: '#2a2a3e',
            '&.Mui-selected': {
              bgcolor: '#FF4757',
              color: '#fff',
              '&:hover': {
                bgcolor: '#CC1A2C',
              },
            },
            '&:hover': {
              bgcolor: 'rgba(255,71,87,0.1)',
            },
          },
        }}
        {...props}
      />
    </Box>
  );
};

export default Pagination;