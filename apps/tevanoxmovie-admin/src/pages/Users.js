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
  Search,
} from '@mui/icons-material';
import { useUsers } from '../hooks/useUsers';
import Table from '../components/common/Table';
import SearchBar from '../components/common/SearchBar';
import Modal from '../components/common/Modal';
import { toast } from 'react-toastify';

const Users = () => {
  const {
    users,
    loading,
    total,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    toggleStatus,
  } = useUsers();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
  });

  useEffect(() => {
    fetchUsers({
      page: page + 1,
      limit: rowsPerPage,
      search: searchQuery,
    });
  }, [page, rowsPerPage, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(0);
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setFormData({
      username: '',
      email: '',
      password: '',
      role: 'user',
    });
    setOpenModal(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      password: '',
      role: user.is_admin ? 'admin' : 'user',
    });
    setOpenModal(true);
  };

  const handleSubmit = async () => {
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, formData);
        toast.success('User updated successfully');
      } else {
        await createUser(formData);
        toast.success('User created successfully');
      }
      setOpenModal(false);
      fetchUsers({
        page: page + 1,
        limit: rowsPerPage,
        search: searchQuery,
      });
    } catch (error) {
      toast.error(error.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        toast.success('User deleted successfully');
        fetchUsers({
          page: page + 1,
          limit: rowsPerPage,
          search: searchQuery,
        });
      } catch (error) {
        toast.error(error.message || 'Delete failed');
      }
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await toggleStatus(id);
      toast.success('User status updated');
      fetchUsers({
        page: page + 1,
        limit: rowsPerPage,
        search: searchQuery,
      });
    } catch (error) {
      toast.error(error.message || 'Status update failed');
    }
  };

  const columns = [
    {
      header: 'Username',
      key: 'username',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ color: '#fff' }}>{row.username}</Typography>
          {row.is_admin && (
            <Chip label="Admin" size="small" color="primary" />
          )}
        </Box>
      ),
    },
    {
      header: 'Email',
      key: 'email',
      render: (row) => <Typography sx={{ color: '#aaa' }}>{row.email}</Typography>,
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
      header: 'Joined',
      key: 'created_at',
      render: (row) => (
        <Typography sx={{ color: '#888' }}>
          {new Date(row.created_at).toLocaleDateString()}
        </Typography>
      ),
    },
    {
      header: 'Actions',
      key: 'actions',
      render: (row) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => handleEdit(row)}>
              <Edit sx={{ fontSize: 20, color: '#2196F3' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title={row.is_active ? 'Block' : 'Activate'}>
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
          Users
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAdd}
            sx={{ bgcolor: '#FF4757', '&:hover': { bgcolor: '#CC1A2C' } }}
          >
            Add User
          </Button>
        </Box>
      </Box>

      <Box sx={{ mb: 3, maxWidth: 400 }}>
        <SearchBar
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search users..."
        />
      </Box>

      <Table
        columns={columns}
        data={users}
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
        title={selectedUser ? 'Edit User' : 'Add User'}
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
              {selectedUser ? 'Update' : 'Create'}
            </Button>
          </>
        }
      >
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
        <FormControl fullWidth margin="normal">
          <InputLabel sx={{ color: '#888' }}>Role</InputLabel>
          <Select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            sx={{ color: '#fff', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#2a2a3e' } }}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>
      </Modal>
    </Box>
  );
};

export default Users;