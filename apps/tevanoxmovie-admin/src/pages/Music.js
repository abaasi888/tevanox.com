import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  IconButton,
  Tooltip,
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
  Visibility,
  PlayArrow,
} from '@mui/icons-material';
import { useMusic } from '../hooks/useMusic';
import Table from '../components/common/Table';
import SearchBar from '../components/common/SearchBar';
import Modal from '../components/common/Modal';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

const Music = () => {
  const {
    music,
    categories,
    genres,
    loading,
    total,
    fetchMusic,
    createMusic,
    updateMusic,
    deleteMusic,
    toggleStatus,
  } = useMusic();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    category: 'ugandan',
    genre: [],
    release_year: new Date().getFullYear(),
    duration: 0,
    audio_file: null,
    cover_art: null,
  });

  const { getRootProps: getAudioRootProps, getInputProps: getAudioInputProps } = useDropzone({
    accept: 'audio/*',
    onDrop: (files) => setFormData({ ...formData, audio_file: files[0] }),
  });

  const { getRootProps: getCoverRootProps, getInputProps: getCoverInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (files) => setFormData({ ...formData, cover_art: files[0] }),
  });

  useEffect(() => {
    fetchMusic({
      page: page + 1,
      limit: rowsPerPage,
      search: searchQuery,
      category: categoryFilter,
    });
  }, [page, rowsPerPage, searchQuery, categoryFilter]);

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== '') {
          data.append(key, formData[key]);
        }
      });

      if (selectedMusic) {
        await updateMusic(selectedMusic.id, data);
        toast.success('Music updated successfully');
      } else {
        await createMusic(data);
        toast.success('Music created successfully');
      }
      setOpenModal(false);
      fetchMusic({
        page: page + 1,
        limit: rowsPerPage,
        search: searchQuery,
        category: categoryFilter,
      });
    } catch (error) {
      toast.error(error.message || 'Operation failed');
    }
  };

  const columns = [
    {
      header: 'Title',
      key: 'title',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {row.cover_art && (
            <img
              src={row.cover_art}
              alt={row.title}
              style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
            />
          )}
          <Box>
            <Typography sx={{ color: '#fff' }}>{row.title}</Typography>
            <Typography variant="caption" sx={{ color: '#888' }}>{row.artist}</Typography>
          </Box>
        </Box>
      ),
    },
    {
      header: 'Artist',
      key: 'artist',
      render: (row) => <Typography sx={{ color: '#aaa' }}>{row.artist}</Typography>,
    },
    {
      header: 'Category',
      key: 'category',
      render: (row) => (
        <Chip
          label={row.category}
          size="small"
          sx={{ bgcolor: 'rgba(255,71,87,0.2)', color: '#FF4757' }}
        />
      ),
    },
    {
      header: 'Plays',
      key: 'total_plays',
      render: (row) => <Typography sx={{ color: '#aaa' }}>{row.total_plays || 0}</Typography>,
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
          <Tooltip title="Play">
            <IconButton size="small">
              <PlayArrow sx={{ fontSize: 20, color: '#4CAF50' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => handleEdit(row)}>
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
          Music
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenModal(true)}
          sx={{ bgcolor: '#FF4757', '&:hover': { bgcolor: '#CC1A2C' } }}
        >
          Add Music
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <Box sx={{ flex: 1, minWidth: 200 }}>
          <SearchBar
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search music..."
          />
        </Box>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel sx={{ color: '#888' }}>Category</InputLabel>
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            sx={{
              color: '#fff',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#2a2a3e' },
            }}
          >
            <MenuItem value="">All</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>{cat.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Table
        columns={columns}
        data={music}
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
        title={selectedMusic ? 'Edit Music' : 'Add Music'}
        maxWidth="md"
        actions={
          <>
            <Button onClick={() => setOpenModal(false)} sx={{ color: '#888' }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ bgcolor: '#FF4757', '&:hover': { bgcolor: '#CC1A2C' } }}
            >
              {selectedMusic ? 'Update' : 'Create'}
            </Button>
          </>
        }
      >
        <TextField
          fullWidth
          label="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          margin="normal"
          sx={{
            '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
            '& .MuiInputLabel-root': { color: '#888' },
          }}
        />
        <TextField
          fullWidth
          label="Artist"
          value={formData.artist}
          onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
          margin="normal"
          sx={{
            '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
            '& .MuiInputLabel-root': { color: '#888' },
          }}
        />
        <TextField
          fullWidth
          label="Album"
          value={formData.album}
          onChange={(e) => setFormData({ ...formData, album: e.target.value })}
          margin="normal"
          sx={{
            '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
            '& .MuiInputLabel-root': { color: '#888' },
          }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel sx={{ color: '#888' }}>Category</InputLabel>
          <Select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            sx={{ color: '#fff', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#2a2a3e' } }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>{cat.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Genre (comma separated)"
          value={formData.genre.join(', ')}
          onChange={(e) => setFormData({ ...formData, genre: e.target.value.split(',').map(g => g.trim()) })}
          margin="normal"
          sx={{
            '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
            '& .MuiInputLabel-root': { color: '#888' },
          }}
        />
        <TextField
          fullWidth
          type="number"
          label="Release Year"
          value={formData.release_year}
          onChange={(e) => setFormData({ ...formData, release_year: parseInt(e.target.value) })}
          margin="normal"
          sx={{
            '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
            '& .MuiInputLabel-root': { color: '#888' },
          }}
        />
        <TextField
          fullWidth
          type="number"
          label="Duration (seconds)"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
          margin="normal"
          sx={{
            '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
            '& .MuiInputLabel-root': { color: '#888' },
          }}
        />

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#aaa' }}>Audio File</Typography>
          <Box
            {...getAudioRootProps()}
            sx={{
              border: '2px dashed #2a2a3e',
              borderRadius: 1,
              p: 2,
              textAlign: 'center',
              cursor: 'pointer',
              '&:hover': { borderColor: '#FF4757' },
            }}
          >
            <input {...getAudioInputProps()} />
            {formData.audio_file ? (
              <Typography sx={{ color: '#4CAF50' }}>{formData.audio_file.name}</Typography>
            ) : (
              <Typography sx={{ color: '#888' }}>
                Drag & drop audio file here, or click to select
              </Typography>
            )}
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#aaa' }}>Cover Art</Typography>
          <Box
            {...getCoverRootProps()}
            sx={{
              border: '2px dashed #2a2a3e',
              borderRadius: 1,
              p: 2,
              textAlign: 'center',
              cursor: 'pointer',
              '&:hover': { borderColor: '#FF4757' },
            }}
          >
            <input {...getCoverInputProps()} />
            {formData.cover_art ? (
              <Typography sx={{ color: '#4CAF50' }}>{formData.cover_art.name}</Typography>
            ) : (
              <Typography sx={{ color: '#888' }}>
                Drag & drop cover image here, or click to select
              </Typography>
            )}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Music;