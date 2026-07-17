import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  IconButton,
  Tooltip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Paper,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Refresh,
  TrendingUp,
  Star,
} from '@mui/icons-material';
import { getRanks, createRank, updateRank, deleteRank } from '../api/agentRanks';
import Table from '../components/common/Table';
import { toast } from 'react-toastify';

const AgentRanks = () => {
  const [ranks, setRanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRank, setSelectedRank] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    level: 1,
    min_referrals: 0,
    max_referrals: 0,
    commission_rate: 0.25,
    level_2_rate: 0.10,
    level_3_rate: 0.05,
    override_rate: 0,
    one_time_bonus: 0,
    monthly_bonus: 0,
    rank_color: '#CD7F32',
    rank_icon: '🥉',
    description: '',
  });

  useEffect(() => {
    loadRanks();
  }, []);

  const loadRanks = async () => {
    setLoading(true);
    try {
      const response = await getRanks();
      setRanks(response.data || []);
    } catch (error) {
      toast.error('Failed to load ranks');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (selectedRank) {
        await updateRank(selectedRank.id, formData);
        toast.success('Rank updated successfully');
      } else {
        await createRank(formData);
        toast.success('Rank created successfully');
      }
      setOpenModal(false);
      loadRanks();
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this rank?')) {
      try {
        await deleteRank(id);
        toast.success('Rank deleted successfully');
        loadRanks();
      } catch (error) {
        toast.error(error.response?.data?.detail || 'Delete failed');
      }
    }
  };

  const resetForm = () => {
    setSelectedRank(null);
    setFormData({
      name: '',
      level: 1,
      min_referrals: 0,
      max_referrals: 0,
      commission_rate: 0.25,
      level_2_rate: 0.10,
      level_3_rate: 0.05,
      override_rate: 0,
      one_time_bonus: 0,
      monthly_bonus: 0,
      rank_color: '#CD7F32',
      rank_icon: '🥉',
      description: '',
    });
  };

  const getRankEmoji = (level) => {
    const emojis = {
      1: '🥉',
      2: '🥈',
      3: '🥇',
      4: '💎',
      5: '💎',
      6: '💎',
      7: '👑',
    };
    return emojis[level] || '⭐';
  };

  const columns = [
    {
      header: 'Rank',
      key: 'name',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontSize: 24 }}>{row.rank_icon || getRankEmoji(row.level)}</Typography>
          <Box>
            <Typography sx={{ color: '#fff', fontWeight: 'bold' }}>
              {row.name}
            </Typography>
            <Typography variant="caption" sx={{ color: '#888' }}>
              Level {row.level}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      header: 'Referrals',
      key: 'min_referrals',
      render: (row) => (
        <Typography sx={{ color: '#aaa' }}>
          {row.min_referrals} - {row.max_referrals === Infinity ? '∞' : row.max_referrals}
        </Typography>
      ),
    },
    {
      header: 'Commission',
      key: 'commission_rate',
      render: (row) => (
        <Typography sx={{ color: '#4CAF50' }}>
          {(row.commission_rate * 100).toFixed(0)}%
        </Typography>
      ),
    },
    {
      header: 'Override',
      key: 'override_rate',
      render: (row) => (
        <Typography sx={{ color: '#FF9800' }}>
          {(row.override_rate * 100).toFixed(0)}%
        </Typography>
      ),
    },
    {
      header: 'Bonuses',
      key: 'bonuses',
      render: (row) => (
        <Box>
          <Typography variant="caption" sx={{ color: '#4CAF50', display: 'block' }}>
            One-Time: UGX {row.one_time_bonus.toLocaleString()}
          </Typography>
          <Typography variant="caption" sx={{ color: '#2196F3', display: 'block' }}>
            Monthly: UGX {row.monthly_bonus.toLocaleString()}
          </Typography>
        </Box>
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
            <IconButton
              size="small"
              onClick={() => {
                setSelectedRank(row);
                setFormData(row);
                setOpenModal(true);
              }}
            >
              <Edit sx={{ fontSize: 20, color: '#FF9800' }} />
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
          🏆 Agent Ranks
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenModal(true)}
          sx={{ bgcolor: '#9C27B0', '&:hover': { bgcolor: '#6A1B9A' } }}
        >
          Add Rank
        </Button>
      </Box>

      <Table
        columns={columns}
        data={ranks}
        loading={loading}
        emptyMessage="No ranks found"
      />

      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: '#1a1a2e',
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle sx={{ color: '#fff' }}>
          {selectedRank ? 'Edit Rank' : 'Add Rank'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Rank Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                margin="normal"
                sx={{
                  '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
                  '& .MuiInputLabel-root': { color: '#888' },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Level"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                margin="normal"
                sx={{
                  '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
                  '& .MuiInputLabel-root': { color: '#888' },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Min Referrals"
                value={formData.min_referrals}
                onChange={(e) => setFormData({ ...formData, min_referrals: parseInt(e.target.value) })}
                margin="normal"
                sx={{
                  '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
                  '& .MuiInputLabel-root': { color: '#888' },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Max Referrals"
                value={formData.max_referrals}
                onChange={(e) => setFormData({ ...formData, max_referrals: parseInt(e.target.value) })}
                margin="normal"
                sx={{
                  '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
                  '& .MuiInputLabel-root': { color: '#888' },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Commission Rate (%)"
                value={formData.commission_rate * 100}
                onChange={(e) => setFormData({ ...formData, commission_rate: parseFloat(e.target.value) / 100 })}
                margin="normal"
                sx={{
                  '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
                  '& .MuiInputLabel-root': { color: '#888' },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Override Rate (%)"
                value={formData.override_rate * 100}
                onChange={(e) => setFormData({ ...formData, override_rate: parseFloat(e.target.value) / 100 })}
                margin="normal"
                sx={{
                  '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
                  '& .MuiInputLabel-root': { color: '#888' },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="One-Time Bonus (UGX)"
                value={formData.one_time_bonus}
                onChange={(e) => setFormData({ ...formData, one_time_bonus: parseFloat(e.target.value) })}
                margin="normal"
                sx={{
                  '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
                  '& .MuiInputLabel-root': { color: '#888' },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Monthly Bonus (UGX)"
                value={formData.monthly_bonus}
                onChange={(e) => setFormData({ ...formData, monthly_bonus: parseFloat(e.target.value) })}
                margin="normal"
                sx={{
                  '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
                  '& .MuiInputLabel-root': { color: '#888' },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Rank Color"
                type="color"
                value={formData.rank_color}
                onChange={(e) => setFormData({ ...formData, rank_color: e.target.value })}
                margin="normal"
                sx={{
                  '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
                  '& .MuiInputLabel-root': { color: '#888' },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Rank Icon (Emoji)"
                value={formData.rank_icon}
                onChange={(e) => setFormData({ ...formData, rank_icon: e.target.value })}
                margin="normal"
                sx={{
                  '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
                  '& .MuiInputLabel-root': { color: '#888' },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                margin="normal"
                sx={{
                  '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
                  '& .MuiInputLabel-root': { color: '#888' },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.is_active !== false}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': { color: '#4CAF50' },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#4CAF50' },
                    }}
                  />
                }
                label="Active"
                sx={{ color: '#fff' }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenModal(false)} sx={{ color: '#888' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ bgcolor: '#9C27B0', '&:hover': { bgcolor: '#6A1B9A' } }}
          >
            {selectedRank ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AgentRanks;