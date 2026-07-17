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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Visibility,
  PlayArrow,
  AddBox,
  Remove,
} from '@mui/icons-material';
import { useSeries } from '../hooks/useSeries';
import Table from '../components/common/Table';
import SearchBar from '../components/common/SearchBar';
import Modal from '../components/common/Modal';
import { toast } from 'react-toastify';

const Series = () => {
  const {
    series,
    loading,
    total,
    fetchSeries,
    createSeries,
    updateSeries,
    deleteSeries,
    toggleStatus,
    episodes,
    fetchEpisodes,
    createEpisode,
    deleteEpisode,
  } = useSeries();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [openEpisodeModal, setOpenEpisodeModal] = useState(false);
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'english',
    genre: [],
    release_year: new Date().getFullYear(),
    seasons: 1,
    episodes_count: 0,
  });
  const [episodeData, setEpisodeData] = useState({
    title: '',
    season: 1,
    episode_number: 1,
    duration: 0,
    video_file: null,
  });

  useEffect(() => {
    fetchSeries({
      page: page + 1,
      limit: rowsPerPage,
      search: searchQuery,
    });
  }, [page, rowsPerPage, searchQuery]);

  const handleAddEpisode = (seriesId) => {
    setSelectedSeries(seriesId);
    setEpisodeData({
      title: '',
      season: 1,
      episode_number: 1,
      duration: 0,
      video_file: null,
    });
    setOpenEpisodeModal(true);
  };

  const handleSubmit = async () => {
    try {
      if (selectedSeries) {
        await updateSeries(selectedSeries.id, formData);
        toast.success('Series updated successfully');
      } else {
        await createSeries(formData);
        toast.success('Series created successfully');
      }
      setOpenModal(false);
      fetchSeries({
        page: page + 1,
        limit: rowsPerPage,
        search: searchQuery,
      });
    } catch (error) {
      toast.error(error.message || 'Operation failed');
    }
  };

  const handleSubmitEpisode = async () => {
    try {
      await createEpisode(selectedSeries, episodeData);
      toast.success('Episode added successfully');
      setOpenEpisodeModal(false);
      fetchEpisodes(selectedSeries);
    } catch (error) {
      toast.error(error.message || 'Failed to add episode');
    }
  };

  const columns = [
    {
      header: 'Title',
      key: 'title',
      render: (row) => (
        <Typography sx={{ color: '#fff' }}>{row.title}</Typography>
      ),
    },
    {
      header: 'Seasons',
      key: 'seasons',
      render: (row) => <Typography sx={{ color: '#aaa' }}>{row.seasons}</Typography>,
    },
    {
      header: 'Episodes',
      key: 'episodes',
      render: (row) => <Typography sx={{ color: '#aaa' }}>{row.episodes || 0}</Typography>,
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
          <Tooltip title="Add Episode">
            <IconButton size="small" onClick={() => handleAddEpisode(row.id)}>
              <AddBox sx={{ fontSize: 20, color: '#4CAF50' }} />
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
          Series
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenModal(true)}
          sx={{ bgcolor: '#FF4757', '&:hover': { bgcolor: '#CC1A2C' } }}
        >
          Add Series
        </Button>
      </Box>

      <Box sx={{ mb: 3, maxWidth: 400 }}>
        <SearchBar
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search series..."
        />
      </Box>

      <Table
        columns={columns}
        data={series}
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
        title={selectedSeries ? 'Edit Series' : 'Add Series'}
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
              {selectedSeries ? 'Update' : 'Create'}
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
            <MenuItem value="ugandan">Ugandan</MenuItem>
            <MenuItem value="english">English</MenuItem>
            <MenuItem value="luganda_translated">Luganda Translated</MenuItem>
            <MenuItem value="swahili_translated">Swahili Translated</MenuItem>
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
          label="Seasons"
          value={formData.seasons}
          onChange={(e) => setFormData({ ...formData, seasons: parseInt(e.target.value) })}
          margin="normal"
          sx={{
            '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
            '& .MuiInputLabel-root': { color: '#888' },
          }}
        />
      </Modal>

      <Modal
        open={openEpisodeModal}
        onClose={() => setOpenEpisodeModal(false)}
        title="Add Episode"
        maxWidth="sm"
        actions={
          <>
            <Button onClick={() => setOpenEpisodeModal(false)} sx={{ color: '#888' }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmitEpisode}
              sx={{ bgcolor: '#FF4757', '&:hover': { bgcolor: '#CC1A2C' } }}
            >
              Add Episode
            </Button>
          </>
        }
      >
        <TextField
          fullWidth
          label="Episode Title"
          value={episodeData.title}
          onChange={(e) => setEpisodeData({ ...episodeData, title: e.target.value })}
          margin="normal"
          sx={{
            '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
            '& .MuiInputLabel-root': { color: '#888' },
          }}
        />
        <TextField
          fullWidth
          type="number"
          label="Season"
          value={episodeData.season}
          onChange={(e) => setEpisodeData({ ...episodeData, season: parseInt(e.target.value) })}
          margin="normal"
          sx={{
            '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#2a2a3e' } },
            '& .MuiInputLabel-root': { color: '#888' },
          }}
        />
        <TextField
          fullWidth
          type="number"
          label="Episode Number"
          value={episodeData.episode_number}
          onChange={(e) => setEpisodeData({ ...episodeData, episode_number: parseInt(e.target.value) })}
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
          value={episodeData.duration}
          onChange={(e) => setEpisodeData({ ...episodeData, duration: parseInt(e.target.value) })}
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

export default Series;