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
  Grid,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Visibility,
  Refresh,
  Upload,
  PlayArrow,
} from '@mui/icons-material';
import { useMovies } from '../hooks/useMovies';
import Table from '../components/common/Table';
import SearchBar from '../components/common/SearchBar';
import Modal from '../components/common/Modal';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

const Movies = () => {
  const {
    movies,
    categories,
    genres,
    loading,
    total,
    fetchMovies,
    createMovie,
    updateMovie,
    deleteMovie,
    toggleStatus,
  } = useMovies();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'english',
    genre: [],
    release_year: new Date().getFullYear(),
    duration: 0,
    file: null,
    poster: null,
  });

  const { getRootProps: getFileRootProps, getInputProps: getFileInputProps } = useDropzone({
    accept: 'video/*',
    onDrop: (files) => setFormData({ ...formData, file: files[0] }),
  });

  const { getRootProps: getPosterRootProps, getInputProps: getPosterInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (files) => setFormData({ ...formData, poster: files[0] }),
  });

  useEffect(() => {
    fetchMovies({
      page: page + 1,
      limit: rowsPerPage,
      search: searchQuery,
      category: categoryFilter,
    });
  }, [page, rowsPerPage, searchQuery, categoryFilter]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(0);
  };

  const handleAdd = () => {
    setSelectedMovie(null);
    setFormData({
      title: '',
      description: '',
      category: 'english',
      genre: [],
      release_year: new Date().getFullYear(),
      duration: 0,
      file: null,
      poster: null,
    });
    setOpenModal(true);
  };

  const handleEdit = (movie) => {
    setSelectedMovie(movie);
    setFormData({
      title: movie.title,
      description: movie.description,
      category: movie.category,
      genre: movie.genre || [],
      release_year: movie.release_year,
      duration: movie.duration,
      file: null,
      poster: null,
    });
    setOpenModal(true);
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== '') {
          data.append(key, formData[key]);
        }
      });

      if (selectedMovie) {
        await updateMovie(selectedMovie.id, data);
        toast.success('Movie updated successfully');
      } else {
        await createMovie(data);
        toast.success('Movie created successfully');
      }
      setOpenModal(false);
      fetchMovies({
        page: page + 1,
        limit: rowsPerPage,
        search: searchQuery,
        category: categoryFilter,
      });
    } catch (error) {
      toast.error(error.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await deleteMovie(id);
        toast.success('Movie deleted successfully');
        fetchMovies({
          page: page + 1,
          limit: rowsPerPage,
          search: searchQuery,
          category: categoryFilter,
        });
      } catch (error) {
        toast.error(error.message || 'Delete failed');
      }
    }
  };

  const columns = [
    {
      header: 'Title',
      key: 'title',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {row.poster_url && (
            <img
              src={row.poster_url}
              alt={row.title}
              style={{ width: 50, height: 70, objectFit: 'cover', borderRadius: 4 }}
            />
          )}
          <Typography sx={{ color: '#fff' }}>{row.title}</Typography>
        </Box>
      ),
    },
    {
      header: 'Category',
      key: 'category',
      render: (row) => (
        <Chip
          label={row.category}
          size="small"
          color="primary"
          sx={{ bgcolor: 'rgba(255,71,87,0.2)', color: '#FF4757' }}
        />
      ),
    },
    {
      header: 'Year',
      key: 'release_year',
      render: (row) => <Typography sx={{ color: '#aaa' }}>{row.release_year}</Typography>,
    },
    {
      header: 'Views',
      key: 'total_views',
      render: (row) => <Typography sx={{ color: '#aaa' }}>{row.total_views || 0}</Typography>,
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
          <Tooltip title="View">
            <IconButton size="small">
              <Visibility sx={{ fontSize: 20, color: '#2196F3' }} />
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
          Movies
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAdd}
          sx={{ bgcolor: '#FF4757', '&:hover': { bgcolor: '#CC1A2C' } }}
        >
          Add Movie
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <Box sx={{ flex: 1, minWidth: 200 }}>
          <SearchBar
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search movies..."
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
        data={movies}
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
        title={selectedMovie ? 'Edit Movie' : 'Add Movie'}
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
              {selectedMovie ? 'Update' : 'Create'}
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
          label="Description"
          multiline
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
          label="Duration (minutes)"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
          margin="normal"
          sx={{
            '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
            '& .MuiInputLabel-root': { color: '#888' },
          }}
        />

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#aaa' }}>Video File</Typography>
          <Box
            {...getFileRootProps()}
            sx={{
              border: '2px dashed #2a2a3e',
              borderRadius: 1,
              p: 2,
              textAlign: 'center',
              cursor: 'pointer',
              '&:hover': { borderColor: '#FF4757' },
            }}
          >
            <input {...getFileInputProps()} />
            {formData.file ? (
              <Typography sx={{ color: '#4CAF50' }}>{formData.file.name}</Typography>
            ) : (
              <Typography sx={{ color: '#888' }}>
                Drag & drop video file here, or click to select
              </Typography>
            )}
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#aaa' }}>Poster Image</Typography>
          <Box
            {...getPosterRootProps()}
            sx={{
              border: '2px dashed #2a2a3e',
              borderRadius: 1,
              p: 2,
              textAlign: 'center',
              cursor: 'pointer',
              '&:hover': { borderColor: '#FF4757' },
            }}
          >
            <input {...getPosterInputProps()} />
            {formData.poster ? (
              <Typography sx={{ color: '#4CAF50' }}>{formData.poster.name}</Typography>
            ) : (
              <Typography sx={{ color: '#888' }}>
                Drag & drop poster image here, or click to select
              </Typography>
            )}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Movies;