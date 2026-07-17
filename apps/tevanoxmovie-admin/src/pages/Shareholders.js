import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  Button,
  Pagination,
} from '@mui/material';
import { Search, Visibility, Edit, Delete, Add } from '@mui/icons-material';

const Shareholders = () => {
  const [shareholders, setShareholders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchShareholders();
  }, [page, searchTerm]);

  const fetchShareholders = async () => {
    setLoading(true);
    // API call will go here
    setLoading(false);
  };

  const getTierColor = (tier) => {
    switch(tier) {
      case 'platinum': return 'success';
      case 'gold': return 'warning';
      case 'silver': return 'info';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" sx={{ color: '#fff' }}>
          👥 Shareholders
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ bgcolor: '#FF4757' }}
        >
          Add Shareholder
        </Button>
      </Box>

      <Paper sx={{ p: 2, bgcolor: '#1a1a2e', mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search shareholders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: '#aaa' }} />
              </InputAdornment>
            ),
            sx: { color: '#fff' }
          }}
        />
      </Paper>

      <TableContainer component={Paper} sx={{ bgcolor: '#1a1a2e' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#aaa' }}>Name</TableCell>
              <TableCell sx={{ color: '#aaa' }}>Email</TableCell>
              <TableCell sx={{ color: '#aaa' }}>Shares</TableCell>
              <TableCell sx={{ color: '#aaa' }}>Investment</TableCell>
              <TableCell sx={{ color: '#aaa' }}>Tier</TableCell>
              <TableCell sx={{ color: '#aaa' }}>Status</TableCell>
              <TableCell sx={{ color: '#aaa' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} sx={{ textAlign: 'center', color: '#aaa' }}>
                  Loading...
                </TableCell>
              </TableRow>
            ) : shareholders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} sx={{ textAlign: 'center', color: '#aaa' }}>
                  No shareholders found
                </TableCell>
              </TableRow>
            ) : (
              shareholders.map((s) => (
                <TableRow key={s.id}>
                  <TableCell sx={{ color: '#fff' }}>{s.full_name}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{s.email}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{s.total_shares}</TableCell>
                  <TableCell sx={{ color: '#4CAF50' }}>
                    UGX {s.total_investment?.toLocaleString() || 0}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={s.tier?.toUpperCase() || 'Bronze'}
                      color={getTierColor(s.tier)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={s.is_active ? 'Active' : 'Inactive'}
                      color={s.is_active ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="View">
                      <IconButton size="small" sx={{ color: '#aaa' }}>
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton size="small" sx={{ color: '#aaa' }}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" sx={{ color: '#ff4444' }}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          count={Math.ceil(total / 20)}
          page={page}
          onChange={(e, v) => setPage(v)}
          sx={{ '& .MuiPaginationItem-root': { color: '#fff' } }}
        />
      </Box>
    </Container>
  );
};

export default Shareholders;
