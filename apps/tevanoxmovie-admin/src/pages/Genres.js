import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Chip, IconButton, Tooltip, TextField,
  Select, MenuItem, FormControl, InputLabel, Dialog, DialogTitle,
  DialogContent, DialogActions, Grid,
} from '@mui/material';
import { Add, Edit, Delete, Refresh, Category as CategoryIcon } from '@mui/icons-material';
import { getGenres, createGenre, updateGenre, deleteGenre } from '../api/genres';
import Table from '../components/common/Table';
import { toast } from 'react-toastify';

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    type: 'movie',
    icon: '',
    color: '#FF4757',
    description: '',
    display_order: 0,
  });

  useEffect(() => { loadGenres(); }, []);

  const loadGenres = async () => {
    setLoading(true);
    try {
      const response = await getGenres();
      setGenres(response.data || []);
    } catch (error) { toast.error('Failed to load genres'); } finally { setLoading(false); }
  };

  const handleSubmit = async () => {
    try {
      if (selectedGenre) {
        await updateGenre(selectedGenre.id, formData);
        toast.success('Genre updated successfully');
      } else {
        await createGenre(formData);
        toast.success('Genre created successfully');
      }
      setOpenModal(false);
      loadGenres();
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this genre?')) {
      try {
        await deleteGenre(id);
        toast.success('Genre deleted successfully');
        loadGenres();
      } catch (error) {
        toast.error(error.response?.data?.detail || 'Delete failed');
      }
    }
  };

  const resetForm = () => {
    setSelectedGenre(null);
    setFormData({ name: '', slug: '', type: 'movie', icon: '', color: '#FF4757', description: '', display_order: 0 });
  };

  const columns = [
    { header: 'Genre', key: 'name', render: (row) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <CategoryIcon sx={{ color: row.color || '#888' }} />
        <Typography sx={{ color: '#fff' }}>{row.icon} {row.name}</Typography>
      </Box>
    )},
    { header: 'Type', key: 'type', render: (row) => (
      <Chip label={row.type} size="small" sx={{ bgcolor: 'rgba(255,71,87,0.2)', color: '#FF4757' }} />
    )},
    { header: 'Slug', key: 'slug', render: (row) => <Typography sx={{ color: '#aaa' }}>{row.slug}</Typography> },
    { header: 'Status', key: 'status', render: (row) => (
      <Chip label={row.is_active ? 'Active' : 'Inactive'} size="small" color={row.is_active ? 'success' : 'default'} />
    )},
    { header: 'Actions', key: 'actions', render: (row) => (
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <Tooltip title="Edit">
          <IconButton size="small" onClick={() => { setSelectedGenre(row); setFormData(row); setOpenModal(true); }}>
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
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Genres</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpenModal(true)} sx={{ bgcolor: '#FF4757' }}>
          Add Genre
        </Button>
      </Box>
      <Table columns={columns} data={genres} loading={loading} emptyMessage="No genres found" />
    </Box>
  );
};

export default Genres;