import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
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
import {
  Add,
  Edit,
  Delete,
  Refresh,
  Cancel,
  CheckCircle,
} from '@mui/icons-material';
import { useSubscriptions } from '../hooks/useSubscriptions';
import Table from '../components/common/Table';
import SearchBar from '../components/common/SearchBar';
import Modal from '../components/common/Modal';
import { toast } from 'react-toastify';

const Subscriptions = () => {
  const {
    subscriptions,
    plans,
    loading,
    total,
    fetchSubscriptions,
    fetchPlans,
    createPlan,
    updatePlan,
    deletePlan,
    cancelSubscription,
  } = useSubscriptions();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    duration: 30,
    features: [],
    is_active: true,
  });

  useEffect(() => {
    fetchSubscriptions({
      page: page + 1,
      limit: rowsPerPage,
      search: searchQuery,
    });
    fetchPlans();
  }, [page, rowsPerPage, searchQuery]);

  const handleSubmitPlan = async () => {
    try {
      if (selectedPlan) {
        await updatePlan(selectedPlan.id, formData);
        toast.success('Plan updated successfully');
      } else {
        await createPlan(formData);
        toast.success('Plan created successfully');
      }
      setOpenModal(false);
      fetchPlans();
    } catch (error) {
      toast.error(error.message || 'Operation failed');
    }
  };

  const handleCancelSubscription = async (id) => {
    if (window.confirm('Are you sure you want to cancel this subscription?')) {
      try {
        await cancelSubscription(id);
        toast.success('Subscription cancelled');
        fetchSubscriptions({
          page: page + 1,
          limit: rowsPerPage,
          search: searchQuery,
        });
      } catch (error) {
        toast.error(error.message || 'Cancel failed');
      }
    }
  };

  const subscriptionColumns = [
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
      header: 'Plan',
      key: 'plan',
      render: (row) => (
        <Chip
          label={row.plan}
          size="small"
          sx={{ bgcolor: 'rgba(255,71,87,0.2)', color: '#FF4757' }}
        />
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
      header: 'Status',
      key: 'status',
      render: (row) => (
        <Chip
          label={row.is_active ? 'Active' : 'Cancelled'}
          size="small"
          color={row.is_active ? 'success' : 'default'}
        />
      ),
    },
    {
      header: 'Expires',
      key: 'end_date',
      render: (row) => (
        <Typography sx={{ color: '#888' }}>
          {new Date(row.end_date).toLocaleDateString()}
        </Typography>
      ),
    },
    {
      header: 'Actions',
      key: 'actions',
      render: (row) => (
        <Tooltip title="Cancel Subscription">
          <IconButton
            size="small"
            onClick={() => handleCancelSubscription(row.id)}
            disabled={!row.is_active}
          >
            <Cancel sx={{ fontSize: 20, color: row.is_active ? '#FF4757' : '#666' }} />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  const planColumns = [
    {
      header: 'Name',
      key: 'name',
      render: (row) => <Typography sx={{ color: '#fff' }}>{row.name}</Typography>,
    },
    {
      header: 'Price',
      key: 'price',
      render: (row) => (
        <Typography sx={{ color: '#4CAF50' }}>
          UGX {row.price.toLocaleString()}
        </Typography>
      ),
    },
    {
      header: 'Duration',
      key: 'duration',
      render: (row) => (
        <Typography sx={{ color: '#aaa' }}>{row.duration} days</Typography>
      ),
    },
    {
      header: 'Status',
      key: 'status',
      render: (row) => (
        <Chip
          label={row.is_active ? 'Active' : 'Inactive'}
          size="small"
          color={row.is_active ? 'success' : 'default'}
        />
      ),
    },
    {
      header: 'Actions',
      key: 'actions',
      render: (row) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => handleEditPlan(row)}>
              <Edit sx={{ fontSize: 20, color: '#FF9800' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" onClick={() => handleDeletePlan(row.id)}>
              <Delete sx={{ fontSize: 20, color: '#FF4757' }} />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Subscriptions
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenModal(true)}
          sx={{ bgcolor: '#FF4757', '&:hover': { bgcolor: '#CC1A2C' } }}
        >
          Add Plan
        </Button>
      </Box>

      <Box sx={{ mb: 3, maxWidth: 400 }}>
        <SearchBar
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search subscriptions..."
        />
      </Box>

      <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
        Subscription Plans
      </Typography>
      <Table
        columns={planColumns}
        data={plans}
        loading={loading}
        emptyMessage="No plans found"
      />

      <Typography variant="h6" sx={{ color: '#fff', my: 3 }}>
        Active Subscriptions
      </Typography>
      <Table
        columns={subscriptionColumns}
        data={subscriptions}
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

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={selectedPlan ? 'Edit Plan' : 'Add Plan'}
        actions={
          <>
            <Button onClick={() => setOpenModal(false)} sx={{ color: '#888' }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmitPlan}
              sx={{ bgcolor: '#FF4757', '&:hover': { bgcolor: '#CC1A2C' } }}
            >
              {selectedPlan ? 'Update' : 'Create'}
            </Button>
          </>
        }
      >
        <TextField
          fullWidth
          label="Plan Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          margin="normal"
          sx={{
            '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
            '& .MuiInputLabel-root': { color: '#888' },
          }}
        />
        <TextField
          fullWidth
          type="number"
          label="Price (UGX)"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
          margin="normal"
          sx={{
            '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
            '& .MuiInputLabel-root': { color: '#888' },
          }}
        />
        <TextField
          fullWidth
          type="number"
          label="Duration (days)"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
          margin="normal"
          sx={{
            '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
            '& .MuiInputLabel-root': { color: '#888' },
          }}
        />
        <TextField
          fullWidth
          label="Features (comma separated)"
          value={formData.features.join(', ')}
          onChange={(e) => setFormData({ ...formData, features: e.target.value.split(',').map(f => f.trim()) })}
          margin="normal"
          sx={{
            '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
            '& .MuiInputLabel-root': { color: '#888' },
          }}
        />
      </Modal>
    </Box>
  );
};

export default Subscriptions;