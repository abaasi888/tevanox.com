import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  Button,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Refresh, Payments, TrendingUp, People } from '@mui/icons-material';
import { useAgents } from '../hooks/useAgents';
import Table from '../components/common/Table';
import StatsCard from '../components/dashboard/StatsCards';
import { toast } from 'react-toastify';

const AgentCommission = () => {
  const {
    agents,
    loading,
    fetchAgents,
    processPayout,
    getCommissionStats,
  } = useAgents();

  const [stats, setStats] = useState(null);
  const [commissions, setCommissions] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [openPayoutDialog, setOpenPayoutDialog] = useState(false);
  const [payoutData, setPayoutData] = useState({
    amount: 0,
    agent_id: '',
    period: 'monthly',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsData, commissionsData] = await Promise.all([
        getCommissionStats(),
        // get all commissions
      ]);
      setStats(statsData);
      setCommissions(commissionsData || []);
    } catch (error) {
      console.error('Error loading commission data:', error);
    }
  };

  const handleProcessPayout = async () => {
    try {
      await processPayout(selectedAgent.id, payoutData);
      toast.success('Payout processed successfully');
      setOpenPayoutDialog(false);
      loadData();
    } catch (error) {
      toast.error(error.message || 'Failed to process payout');
    }
  };

  const columns = [
    {
      header: 'Agent',
      key: 'agent',
      render: (row) => (
        <Box>
          <Typography sx={{ color: '#fff' }}>{row.agent_name}</Typography>
          <Typography variant="caption" sx={{ color: '#888' }}>
            Code: {row.agent_code}
          </Typography>
        </Box>
      ),
    },
    {
      header: 'Period',
      key: 'period',
      render: (row) => <Typography sx={{ color: '#aaa' }}>{row.period}</Typography>,
    },
    {
      header: 'Commission',
      key: 'commission',
      render: (row) => (
        <Typography sx={{ color: '#4CAF50' }}>
          UGX {row.commission.toLocaleString()}
        </Typography>
      ),
    },
    {
      header: 'Bonus',
      key: 'bonus',
      render: (row) => (
        <Typography sx={{ color: '#FF9800' }}>
          UGX {(row.bonus || 0).toLocaleString()}
        </Typography>
      ),
    },
    {
      header: 'Status',
      key: 'status',
      render: (row) => (
        <Chip
          label={row.status}
          size="small"
          color={row.status === 'paid' ? 'success' : 'warning'}
        />
      ),
    },
    {
      header: 'Actions',
      key: 'actions',
      render: (row) => (
        <Tooltip title="Process Payout">
          <IconButton
            size="small"
            onClick={() => {
              setSelectedAgent(row);
              setPayoutData({ ...payoutData, agent_id: row.id });
              setOpenPayoutDialog(true);
            }}
            disabled={row.status === 'paid'}
          >
            <Payments sx={{ fontSize: 20, color: row.status === 'paid' ? '#4CAF50' : '#FF9800' }} />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Agent Commissions
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={loadData}
          sx={{ color: '#9C27B0', borderColor: '#9C27B0' }}
        >
          Refresh
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, bgcolor: '#1a1a2e', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="textSecondary" variant="body2">Total Commissions</Typography>
                <Typography variant="h5" sx={{ color: '#fff' }}>
                  UGX {(stats?.total || 0).toLocaleString()}
                </Typography>
              </Box>
              <TrendingUp sx={{ fontSize: 40, color: '#FF4757' }} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, bgcolor: '#1a1a2e', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="textSecondary" variant="body2">Pending Payouts</Typography>
                <Typography variant="h5" sx={{ color: '#fff' }}>
                  UGX {(stats?.pending || 0).toLocaleString()}
                </Typography>
              </Box>
              <Payments sx={{ fontSize: 40, color: '#FF9800' }} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, bgcolor: '#1a1a2e', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="textSecondary" variant="body2">Paid This Month</Typography>
                <Typography variant="h5" sx={{ color: '#fff' }}>
                  UGX {(stats?.paidThisMonth || 0).toLocaleString()}
                </Typography>
              </Box>
              <CheckCircle sx={{ fontSize: 40, color: '#4CAF50' }} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, bgcolor: '#1a1a2e', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="textSecondary" variant="body2">Active Agents</Typography>
                <Typography variant="h5" sx={{ color: '#fff' }}>
                  {stats?.activeAgents || 0}
                </Typography>
              </Box>
              <People sx={{ fontSize: 40, color: '#2196F3' }} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Table
        columns={columns}
        data={commissions}
        loading={loading}
        emptyMessage="No commission records found"
      />

      <Dialog
        open={openPayoutDialog}
        onClose={() => setOpenPayoutDialog(false)}
        PaperProps={{
          sx: {
            bgcolor: '#1a1a2e',
            borderRadius: 2,
            minWidth: 400,
          },
        }}
      >
        <DialogTitle sx={{ color: '#fff' }}>Process Payout</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#aaa', mb: 2 }}>
            Process payout for {selectedAgent?.agent_name}
          </Typography>
          <TextField
            fullWidth
            label="Amount (UGX)"
            type="number"
            value={payoutData.amount}
            onChange={(e) => setPayoutData({ ...payoutData, amount: parseFloat(e.target.value) })}
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
              '& .MuiInputLabel-root': { color: '#888' },
            }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel sx={{ color: '#888' }}>Period</InputLabel>
            <Select
              value={payoutData.period}
              onChange={(e) => setPayoutData({ ...payoutData, period: e.target.value })}
              sx={{ color: '#fff', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#2a2a3e' } }}
            >
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="quarterly">Quarterly</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenPayoutDialog(false)} sx={{ color: '#888' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleProcessPayout}
            sx={{ bgcolor: '#9C27B0', '&:hover': { bgcolor: '#6A1B9A' } }}
          >
            Process Payout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AgentCommission;