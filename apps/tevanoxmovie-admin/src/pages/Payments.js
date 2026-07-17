import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Paper,
} from '@mui/material';
import {
  Refresh,
  CheckCircle,
  Cancel,
  Visibility,
  Payments as PaymentsIcon,
} from '@mui/icons-material';
import { usePayments } from '../hooks/usePayments';
import Table from '../components/common/Table';
import SearchBar from '../components/common/SearchBar';
import { toast } from 'react-toastify';

const Payments = () => {
  const {
    payments,
    withdrawals,
    stats,
    loading,
    total,
    fetchPayments,
    fetchWithdrawals,
    fetchStats,
    processWithdrawal,
    rejectWithdrawal,
  } = usePayments();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [openWithdrawalDialog, setOpenWithdrawalDialog] = useState(false);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
  const [actionType, setActionType] = useState('');

  useEffect(() => {
    loadData();
  }, [page, rowsPerPage, searchQuery]);

  const loadData = async () => {
    await Promise.all([
      fetchPayments({
        page: page + 1,
        limit: rowsPerPage,
        search: searchQuery,
      }),
      fetchWithdrawals(),
      fetchStats(),
    ]);
  };

  const handleProcessWithdrawal = async () => {
    try {
      if (actionType === 'approve') {
        await processWithdrawal(selectedWithdrawal.id);
        toast.success('Withdrawal approved successfully');
      } else {
        await rejectWithdrawal(selectedWithdrawal.id);
        toast.success('Withdrawal rejected');
      }
      setOpenWithdrawalDialog(false);
      loadData();
    } catch (error) {
      toast.error(error.message || 'Operation failed');
    }
  };

  const paymentColumns = [
    {
      header: 'User',
      key: 'user',
      render: (row) => (
        <Box>
          <Typography sx={{ color: '#fff' }}>{row.user_name}</Typography>
          <Typography variant="caption" sx={{ color: '#888' }}>
            {row.user_email}
          </Typography>
        </Box>
      ),
    },
    {
      header: 'Amount',
      key: 'amount',
      render: (row) => (
        <Typography sx={{ color: '#4CAF50' }}>
          UGX {row.amount.toLocaleString()}
        </Typography>
      ),
    },
    {
      header: 'Method',
      key: 'method',
      render: (row) => (
        <Chip
          label={row.method}
          size="small"
          sx={{ bgcolor: 'rgba(156,39,176,0.2)', color: '#9C27B0' }}
        />
      ),
    },
    {
      header: 'Status',
      key: 'status',
      render: (row) => (
        <Chip
          label={row.status}
          size="small"
          color={row.status === 'completed' ? 'success' : row.status === 'pending' ? 'warning' : 'default'}
        />
      ),
    },
    {
      header: 'Date',
      key: 'created_at',
      render: (row) => (
        <Typography sx={{ color: '#888' }}>
          {new Date(row.created_at).toLocaleDateString()}
        </Typography>
      ),
    },
  ];

  const withdrawalColumns = [
    {
      header: 'Agent',
      key: 'agent',
      render: (row) => (
        <Box>
          <Typography sx={{ color: '#fff' }}>{row.agent_name}</Typography>
          <Typography variant="caption" sx={{ color: '#888' }}>
            {row.agent_code}
          </Typography>
        </Box>
      ),
    },
    {
      header: 'Amount',
      key: 'amount',
      render: (row) => (
        <Typography sx={{ color: '#FF4757' }}>
          UGX {row.amount.toLocaleString()}
        </Typography>
      ),
    },
    {
      header: 'Bank',
      key: 'bank',
      render: (row) => (
        <Box>
          <Typography sx={{ color: '#aaa' }}>{row.bank_name}</Typography>
          <Typography variant="caption" sx={{ color: '#888' }}>
            {row.account_number}
          </Typography>
        </Box>
      ),
    },
    {
      header: 'Status',
      key: 'status',
      render: (row) => (
        <Chip
          label={row.status}
          size="small"
          color={row.status === 'approved' ? 'success' : row.status === 'pending' ? 'warning' : 'default'}
        />
      ),
    },
    {
      header: 'Date',
      key: 'created_at',
      render: (row) => (
        <Typography sx={{ color: '#888' }}>
          {new Date(row.created_at).toLocaleDateString()}
        </Typography>
      ),
    },
    {
      header: 'Actions',
      key: 'actions',
      render: (row) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {row.status === 'pending' && (
            <>
              <Tooltip title="Approve">
                <IconButton
                  size="small"
                  onClick={() => {
                    setSelectedWithdrawal(row);
                    setActionType('approve');
                    setOpenWithdrawalDialog(true);
                  }}
                >
                  <CheckCircle sx={{ fontSize: 20, color: '#4CAF50' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Reject">
                <IconButton
                  size="small"
                  onClick={() => {
                    setSelectedWithdrawal(row);
                    setActionType('reject');
                    setOpenWithdrawalDialog(true);
                  }}
                >
                  <Cancel sx={{ fontSize: 20, color: '#FF4757' }} />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Payments
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={loadData}
          sx={{ color: '#FF4757', borderColor: '#FF4757' }}
        >
          Refresh
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, bgcolor: '#1a1a2e', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="textSecondary" variant="body2">Total Revenue</Typography>
                <Typography variant="h5" sx={{ color: '#fff' }}>
                  UGX {(stats?.totalRevenue || 0).toLocaleString()}
                </Typography>
              </Box>
              <PaymentsIcon sx={{ fontSize: 40, color: '#FFD700' }} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, bgcolor: '#1a1a2e', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="textSecondary" variant="body2">This Month</Typography>
                <Typography variant="h5" sx={{ color: '#fff' }}>
                  UGX {(stats?.thisMonth || 0).toLocaleString()}
                </Typography>
              </Box>
              <PaymentsIcon sx={{ fontSize: 40, color: '#4CAF50' }} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, bgcolor: '#1a1a2e', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="textSecondary" variant="body2">Pending Withdrawals</Typography>
                <Typography variant="h5" sx={{ color: '#fff' }}>
                  {stats?.pendingWithdrawals || 0}
                </Typography>
              </Box>
              <PaymentsIcon sx={{ fontSize: 40, color: '#FF9800' }} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, bgcolor: '#1a1a2e', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="textSecondary" variant="body2">Total Transactions</Typography>
                <Typography variant="h5" sx={{ color: '#fff' }}>
                  {stats?.totalTransactions || 0}
                </Typography>
              </Box>
              <PaymentsIcon sx={{ fontSize: 40, color: '#2196F3' }} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
        Withdrawal Requests
      </Typography>
      <Table
        columns={withdrawalColumns}
        data={withdrawals}
        loading={loading}
        emptyMessage="No withdrawal requests"
      />

      <Typography variant="h6" sx={{ color: '#fff', my: 3 }}>
        Payment History
      </Typography>
      <Table
        columns={paymentColumns}
        data={payments}
        loading={loading}
        page={page}
        rowsPerPage={rowsPerPage}
        totalRows={total}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />

      <Dialog
        open={openWithdrawalDialog}
        onClose={() => setOpenWithdrawalDialog(false)}
        PaperProps={{
          sx: {
            bgcolor: '#1a1a2e',
            borderRadius: 2,
            minWidth: 400,
          },
        }}
      >
        <DialogTitle sx={{ color: '#fff' }}>
          {actionType === 'approve' ? 'Approve Withdrawal' : 'Reject Withdrawal'}
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#aaa', mb: 2 }}>
            {actionType === 'approve' 
              ? `Approve withdrawal of UGX ${selectedWithdrawal?.amount.toLocaleString()} for ${selectedWithdrawal?.agent_name}`
              : `Reject withdrawal of UGX ${selectedWithdrawal?.amount.toLocaleString()} for ${selectedWithdrawal?.agent_name}`
            }
          </Typography>
          {actionType === 'reject' && (
            <TextField
              fullWidth
              label="Reason for rejection"
              multiline
              rows={3}
              placeholder="Enter reason..."
              sx={{
                '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
                '& .MuiInputLabel-root': { color: '#888' },
              }}
            />
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenWithdrawalDialog(false)} sx={{ color: '#888' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleProcessWithdrawal}
            sx={{
              bgcolor: actionType === 'approve' ? '#4CAF50' : '#FF4757',
              '&:hover': { bgcolor: actionType === 'approve' ? '#2E7D32' : '#CC1A2C' },
            }}
          >
            {actionType === 'approve' ? 'Approve' : 'Reject'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Payments;