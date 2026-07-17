import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { TrendingUp, AttachMoney, AccountBalance, Receipt, Add } from '@mui/icons-material';

const ProfitDistribution = () => {
  const [profitData, setProfitData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchProfitData();
  }, []);

  const fetchProfitData = async () => {
    setLoading(true);
    // API call will go here
    setLoading(false);
  };

  const formatCurrency = (amount) => {
    return `UGX ${amount?.toLocaleString() || 0}`;
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" sx={{ color: '#fff' }}>
          📊 Profit Distribution
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
          sx={{ bgcolor: '#FF4757' }}
        >
          New Distribution
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3, bgcolor: '#1a1a2e', textAlign: 'center' }}>
            <Typography color="textSecondary">Total Profit</Typography>
            <Typography variant="h4" sx={{ color: '#4CAF50' }}>
              {formatCurrency(profitData?.total_profit || 0)}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3, bgcolor: '#1a1a2e', textAlign: 'center' }}>
            <Typography color="textSecondary">Dividends</Typography>
            <Typography variant="h4" sx={{ color: '#FF9800' }}>
              {formatCurrency(profitData?.dividends_amount || 0)}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {profitData?.dividends_percent || 0}%
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3, bgcolor: '#1a1a2e', textAlign: 'center' }}>
            <Typography color="textSecondary">Reinvested</Typography>
            <Typography variant="h4" sx={{ color: '#2196F3' }}>
              {formatCurrency(profitData?.reinvested_amount || 0)}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {profitData?.reinvested_percent || 0}%
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3, bgcolor: '#1a1a2e', textAlign: 'center' }}>
            <Typography color="textSecondary">Reserves</Typography>
            <Typography variant="h4" sx={{ color: '#9C27B0' }}>
              {formatCurrency(profitData?.reserves_amount || 0)}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {profitData?.reserves_percent || 0}%
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Distribution Breakdown */}
      <Paper sx={{ p: 3, bgcolor: '#1a1a2e', mb: 3 }}>
        <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
          Distribution Breakdown
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography color="textSecondary">Dividends (15%)</Typography>
          <LinearProgress 
            variant="determinate" 
            value={15} 
            sx={{ height: 10, borderRadius: 5, bgcolor: '#333' }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography color="textSecondary">Reinvested (60%)</Typography>
          <LinearProgress 
            variant="determinate" 
            value={60} 
            sx={{ height: 10, borderRadius: 5, bgcolor: '#333' }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography color="textSecondary">Management Bonus (10%)</Typography>
          <LinearProgress 
            variant="determinate" 
            value={10} 
            sx={{ height: 10, borderRadius: 5, bgcolor: '#333' }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography color="textSecondary">Reserves (10%)</Typography>
          <LinearProgress 
            variant="determinate" 
            value={10} 
            sx={{ height: 10, borderRadius: 5, bgcolor: '#333' }}
          />
        </Box>
        <Box>
          <Typography color="textSecondary">Taxes (5%)</Typography>
          <LinearProgress 
            variant="determinate" 
            value={5} 
            sx={{ height: 10, borderRadius: 5, bgcolor: '#333' }}
          />
        </Box>
      </Paper>

      {/* Shareholder Distribution Table */}
      <TableContainer component={Paper} sx={{ bgcolor: '#1a1a2e' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#aaa' }}>Shareholder</TableCell>
              <TableCell sx={{ color: '#aaa' }}>Shares</TableCell>
              <TableCell sx={{ color: '#aaa' }}>Percentage</TableCell>
              <TableCell sx={{ color: '#aaa' }}>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} sx={{ textAlign: 'center', color: '#aaa' }}>
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell colSpan={4} sx={{ textAlign: 'center', color: '#aaa' }}>
                  No distribution data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ProfitDistribution;
