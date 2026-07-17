import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Chip, IconButton, Tooltip, TextField,
  Select, MenuItem, FormControl, InputLabel, Dialog, DialogTitle,
  DialogContent, DialogActions, Grid,
} from '@mui/material';
import { Add, Edit, Delete, Refresh } from '@mui/icons-material';
import { getVJs, createVJ, updateVJ, deleteVJ } from '../api/vjs';
import Table from '../components/common/Table';
import { toast } from 'react-toastify';

const VJs = () => {
  const [vjs, setVjs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedVJ, setSelectedVJ] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    language: 'luganda',
    description: '',
  });

  useEffect(() => { loadVJs(); }, []);

  const loadVJs = async () => {
    setLoading(true);
    try {
      const response = await getVJs();
      setVjs(response.data || []);
    } catch (error) { toast.error('Failed to load VJs'); } finally { setLoading(false); }
  };

  const handleSubmit = async () => {
    try {
      if (selectedVJ) {
        await updateVJ(selectedVJ.id, formData);
        toast.success('VJ updated successfully');
      } else {
        await createVJ(formData);
        toast.success('VJ created successfully');
      }
      setOpenModal(false);
      loadVJs();
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this VJ?')) {
      try {
        await deleteVJ(id);
        toast.success('VJ deleted successfully');
        loadVJs();
      } catch (error) {
        toast.error(error.response?.data?.detail || 'Delete failed');
      }
    }
  };

  const resetForm = () => {
    setSelectedVJ(null);
    setFormData({ name: '', code: '', language: 'luganda', description: '' });
  };

  const columns = [
    { header: 'VJ Name', key: 'name', render: (row) => <Typography sx={{ color: '#fff' }}>{row.name}</Typography> },
    { header: 'Code', key: 'code', render: (row) => (
      <Chip label={row.code} size="small" sx={{ bgcolor: 'rgba(156,39,176,0.2)', color: '#9C27B0' }} />
    )},
    { header: 'Language', key: 'language', render: (row) => (
      <Chip label={row.language} size="small" sx={{ bgcolor: 'rgba(255,71,87,0.2)', color: '#FF4757' }} />
    )},
    { header: 'Status', key: 'status', render: (row) => (
      <Chip label={row.is_active ? 'Active' : 'Inactive'} size="small" color={row.is_active ? 'success' : 'default'} />
    )},
    { header: 'Actions', key: 'actions', render: (row) => (
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <Tooltip title="Edit">
          <IconButton size="small" onClick={() => { setSelectedVJ(row); setFormData(row); setOpenModal(true); }}>
            <Edit sx={{ fontSize: 20, color: '#FF9800' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton size="small" onClick={() => handleDelete(row.id)}>
            <Delete sx={{ fontSize: 20, color: '#FF4757' }} />
          </IconButton>
        </Tooltip>
      </Box>
    )},
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>VJs</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpenModal(true)} sx={{ bgcolor: '#9C27B0' }}>
          Add VJ
        </Button>
      </Box>
      <Table columns={columns} data={vjs} loading={loading} emptyMessage="No VJs found" />
    </Box>
  );
};

export default VJs;