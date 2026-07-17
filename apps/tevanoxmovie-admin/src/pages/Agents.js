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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Block,
  CheckCircle,
  Refresh,
  TrendingUp,
  Payments,
} from '@mui/icons-material';
import { useAgents } from '../hooks/useAgents';
import Table from '../components/common/Table';
import SearchBar from '../components/common/SearchBar';
import Modal from '../components/common/Modal';
import { toast } from 'react-toastify';

const Agents = () => {
  const {
    agents,
    loading,
    total,
    tiers,
    fetchAgents,
    createAgent,
    updateAgent,
    deleteAgent,
    toggleStatus,
  } = useAgents();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    full_name: '',
    phone: '',
  });

  useEffect(() => {
    fetchAgents({
      page: page + 1,
      limit: rowsPerPage,
      search: searchQuery,
    });
  }, [page, rowsPerPage, searchQuery]);

  const handleSubmit = async () => {
    try {
      if (selectedAgent) {
        await updateAgent(selectedAgent.id, formData);
        toast.success('Agent updated successfully');
      } else {
        await createAgent(formData);
        toast.success('Agent created successfully');
      }
      setOpenModal(false);
      fetchAgents({
        page: page + 1,
        limit: rowsPerPage,
        search: searchQuery,
      });
    } catch (error) {
      toast.error(error.message || 'Operation failed');
    }
  };

  const columns = [
    {
      header: 'Agent',
      key: 'name',
      render: (row) => (
        <Box>
          <Typography sx={{ color: '#fff' }}>{row.full_name}</Typography>
          <Typography variant="caption" sx={{ color: '#888' }}>
            {row.username}
          </Typography>
        </Box>
      ),
    },
    {
      header: 'Code',
      key: 'agent_code',
      render: (row) => (
        <Chip label={row.agent_code} size="small" sx={{ bgcolor: 'rgba(156,39,176,0.2)', color: '#9C27B0' }} />
      ),
    },
    {
      header: 'Tier',
      key: 'tier',
      render: (row) => (
        <Chip
          label={`Tier ${row.tier || 1}`}
          size="small"
          color={row.tier === 4 ? 'success' : 'default'}
        />
      ),
    },
    {
      header: 'Referrals',
      key: 'total_referrals',
      render: (row) => <Typography sx={{ color: '#aaa' }}>{row.total_referrals || 0}</Typography>,
    },
    {
      header: 'Earnings',
      key: 'total_earnings',
      render: (row) => (
        <Typography sx={{ color: '#4CAF50' }}>
          UGX {(row.total_earnings || 0).toLocaleString()}
        </Typography>
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
            <IconButton size="small" onClick={() => handleEdit(row)}>
              <Edit sx={{ fontSize: 20, color: '#FF9800' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Toggle Status">
            <IconButton size="small" onClick={() => handleToggleStatus(row.id)}>
              {row.is_active ? (
                <Block sx={{ fontSize: 20, color: '#FF9800' }} />
              ) : (
                <CheckCircle sx={{ fontSize: 20, color: '#4CAF50' }} />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" onClick={() => handleDelete(row.id)}>
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
          Agents
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenModal(true)}
          sx={{ bgcolor: '#9C27B0', '&:hover': { bgcolor: '#6A1B9A' } }}
        >
          Add Agent
        </Button>
      </Box>

      <Box sx={{ mb: 3, maxWidth: 400 }}>
        <SearchBar
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search agents..."
        />
      </Box>

      <Table
        columns={columns}
        data={agents}
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
        title={selectedAgent ? 'Edit Agent' : 'Add Agent'}
        actions={
          <>
            <Button onClick={() => setOpenModal(false)} sx={{ color: '#888' }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ bgcolor: '#9C27B0', '&:hover': { bgcolor: '#6A1B9A' } }}
            >
              {selectedAgent ? 'Update' : 'Create'}
            </Button>
          </>
        }
      >
        <TextField
          fullWidth
          label="Full Name"
          value={formData.full_name}
          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
          margin="normal"
          sx={{
            '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
            '& .MuiInputLabel-root': { color: '#888' },
          }}
        />
        <TextField
          fullWidth
          label="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          margin="normal"
          sx={{
            '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
            '& .MuiInputLabel-root': { color: '#888' },
          }}
        />
        <TextField
          fullWidth
          label="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          margin="normal"
          sx={{
            '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
            '& .MuiInputLabel-root': { color: '#888' },
          }}
        />
        <TextField
          fullWidth
          label="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          margin="normal"
          sx={{
            '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
            '& .MuiInputLabel-root': { color: '#888' },
          }}
        />
        {!selectedAgent && (
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
              '& .MuiInputLabel-root': { color: '#888' },
            }}
          />
        )}
      </Modal>
    </Box>
  );
};

export default Agents;