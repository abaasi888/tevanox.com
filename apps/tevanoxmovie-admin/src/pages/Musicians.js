import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Chip, IconButton, Tooltip, TextField,
  Select, MenuItem, FormControl, InputLabel, Dialog, DialogTitle,
  DialogContent, DialogActions, Grid, Avatar,
} from '@mui/material';
import { Add, Edit, Delete, Refresh, MusicNote } from '@mui/icons-material';
import { getMusicians, createMusician, updateMusician, deleteMusician } from '../api/musicians';
import { getGenres } from '../api/genres';
import Table from '../components/common/Table';
import { toast } from 'react-toastify';

const Musicians = () => {
  const [musicians, setMusicians] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMusician, setSelectedMusician] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    real_name: '',
    country: '',
    genre_ids: [],
    description: '',
  });

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [musiciansRes, genresRes] = await Promise.all([
        getMusicians(),
        getGenres({ type: 'music' })
      ]);
      setMusicians(musiciansRes.data || []);
      setGenres(genresRes.data || []);
    } catch (error) { toast.error('Failed to load data'); } finally { setLoading(false); }
  };

  const handleSubmit = async () => {
    try {
      if (selectedMusician) {
        await updateMusician(selectedMusician.id, formData);
        toast.success('Musician updated successfully');
      } else {
        await createMusician(formData);
        toast.success('Musician created successfully');
      }
      setOpenModal(false);
      loadData();
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this musician?')) {
      try {
        await deleteMusician(id);
        toast.success('Musician deleted successfully');
        loadData();
      } catch (error) {
        toast.error(error.response?.data?.detail || 'Delete failed');
      }
    }
  };

  const resetForm = () => {
    setSelectedMusician(null);
    setFormData({ name: '', real_name: '', country: '', genre_ids: [], description: '' });
  };

  const columns = [
    { header: 'Musician', key: 'name', render: (row) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: '#4CAF50' }}>{row.name?.charAt(0) || 'M'}</Avatar>
        <Box>
          <Typography sx={{ color: '#fff' }}>{row.name}</Typography>
          <Typography variant="caption" sx={{ color: '#888' }}>{row.real_name || ''}</Typography>
        </Box>
      </Box>
    )},
    { header: 'Country', key: 'country', render: (row) => (
      <Typography sx={{ color: '#aaa' }}>{row.country || '—'}</Typography>
    )},
    { header: 'Genres', key: 'genres', render: (row) => (
      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
        {row.genre_ids?.slice(0, 3).map((g, i) => (
          <Chip key={i} label={g} size="small" variant="outlined" sx={{ color: '#aaa', borderColor: '#2a2a3e' }} />
        ))}
        {row.genre_ids?.length > 3 && <Chip label={`+${row.genre_ids.length - 3}`} size="small" />}
      </Box>
    )},
    { header: 'Status', key: 'status', render: (row) => (
      <Chip label={row.is_active ? 'Active' : 'Inactive'} size="small" color={row.is_active ? 'success' : 'default'} />
    )},
    { header: 'Actions', key: 'actions', render: (row) => (
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <Tooltip title="Edit">
          <IconButton size="small" onClick={() => { setSelectedMusician(row); setFormData(row); setOpenModal(true); }}>
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
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Musicians</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpenModal(true)} sx={{ bgcolor: '#4CAF50' }}>
          Add Musician
        </Button>
      </Box>
      <Table columns={columns} data={musicians} loading={loading} emptyMessage="No musicians found" />
    </Box>
  );
};

export default Musicians;