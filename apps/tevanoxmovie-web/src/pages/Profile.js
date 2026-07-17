import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Box,
  Typography,
  Paper,
  Avatar,
  Grid,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Person,
  Email,
  Subscription,
  History,
  Favorite,
  Download,
  Settings,
  Logout,
  Edit,
} from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import { logout } from '../store/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { logoutUser, updateProfile } = useAuth();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editData, setEditData] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (user) {
      setEditData({
        ...editData,
        username: user.username || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
    logoutUser();
  };

  const handleUpdateProfile = async () => {
    await updateProfile(editData);
    setOpenEditDialog(false);
  };

  const menuItems = [
    { icon: <Subscription />, label: 'My Subscription', onClick: () => {} },
    { icon: <History />, label: 'Watch History', onClick: () => {} },
    { icon: <Favorite />, label: 'Favorites', onClick: () => {} },
    { icon: <Download />, label: 'Downloads', onClick: () => {} },
    { icon: <Settings />, label: 'Settings', onClick: () => {} },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ bgcolor: '#1a1a2e', borderRadius: 2, overflow: 'hidden' }}>
        {/* Header */}
        <Box
          sx={{
            p: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            bgcolor: '#1a1a2e',
            borderBottom: '1px solid #2a2a3e',
          }}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: '#FF4757',
              fontSize: 32,
            }}
          >
            {user?.username?.charAt(0).toUpperCase() || 'U'}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {user?.username || 'User'}
            </Typography>
            <Typography variant="body2" sx={{ color: '#888' }}>
              {user?.email}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 1 }}>
              <Box
                sx={{
                  px: 2,
                  py: 0.5,
                  borderRadius: 1,
                  bgcolor: user?.is_active ? 'rgba(76,175,80,0.2)' : 'rgba(255,71,87,0.2)',
                  color: user?.is_active ? '#4CAF50' : '#FF4757',
                  fontSize: 12,
                }}
              >
                {user?.is_active ? 'Active' : 'Inactive'}
              </Box>
              {user?.referral_code && (
                <Box
                  sx={{
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                    bgcolor: 'rgba(255,215,0,0.2)',
                    color: '#FFD700',
                    fontSize: 12,
                  }}
                >
                  Code: {user.referral_code}
                </Box>
              )}
            </Box>
          </Box>
          <Button
            variant="outlined"
            startIcon={<Edit />}
            onClick={() => setOpenEditDialog(true)}
            sx={{ color: '#FF4757', borderColor: '#FF4757' }}
          >
            Edit Profile
          </Button>
        </Box>

        {/* Stats */}
        <Grid container sx={{ p: 3, gap: 2 }}>
          <Grid item xs={12} sm={3}>
            <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#1a1a2e', borderRadius: 1 }}>
              <Typography variant="h4" sx={{ color: '#FF4757' }}>
                0
              </Typography>
              <Typography variant="body2" sx={{ color: '#888' }}>
                Watch History
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#1a1a2e', borderRadius: 1 }}>
              <Typography variant="h4" sx={{ color: '#FF4757' }}>
                0
              </Typography>
              <Typography variant="body2" sx={{ color: '#888' }}>
                Favorites
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#1a1a2e', borderRadius: 1 }}>
              <Typography variant="h4" sx={{ color: '#FF4757' }}>
                0
              </Typography>
              <Typography variant="body2" sx={{ color: '#888' }}>
                Downloads
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#1a1a2e', borderRadius: 1 }}>
              <Typography variant="h4" sx={{ color: '#FF4757' }}>
                {user?.is_active ? 'Active' : 'None'}
              </Typography>
              <Typography variant="body2" sx={{ color: '#888' }}>
                Subscription
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Menu */}
        <List sx={{ p: 0 }}>
          {menuItems.map((item, index) => (
            <ListItem
              key={index}
              button
              onClick={item.onClick}
              sx={{
                borderBottom: index < menuItems.length - 1 ? '1px solid #2a2a3e' : 'none',
                '&:hover': { bgcolor: 'rgba(255,71,87,0.05)' },
              }}
            >
              <ListItemIcon sx={{ color: '#888' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} sx={{ color: '#fff' }} />
            </ListItem>
          ))}
          <ListItem
            button
            onClick={handleLogout}
            sx={{
              borderTop: '1px solid #2a2a3e',
              '&:hover': { bgcolor: 'rgba(255,71,87,0.05)' },
            }}
          >
            <ListItemIcon sx={{ color: '#FF4757' }}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ color: '#FF4757' }} />
          </ListItem>
        </List>
      </Paper>

      {/* Edit Profile Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        PaperProps={{
          sx: {
            bgcolor: '#1a1a2e',
            color: '#fff',
            borderRadius: 2,
            minWidth: 400,
          },
        }}
      >
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Username"
            value={editData.username}
            onChange={(e) => setEditData({ ...editData, username: e.target.value })}
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                '& fieldset': { borderColor: '#2a2a3e' },
              },
              '& .MuiInputLabel-root': { color: '#888' },
            }}
          />
          <TextField
            fullWidth
            label="Email"
            value={editData.email}
            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                '& fieldset': { borderColor: '#2a2a3e' },
              },
              '& .MuiInputLabel-root': { color: '#888' },
            }}
          />
          <Divider sx={{ my: 2, borderColor: '#2a2a3e' }} />
          <TextField
            fullWidth
            label="Current Password"
            type="password"
            value={editData.currentPassword}
            onChange={(e) => setEditData({ ...editData, currentPassword: e.target.value })}
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                '& fieldset': { borderColor: '#2a2a3e' },
              },
              '& .MuiInputLabel-root': { color: '#888' },
            }}
          />
          <TextField
            fullWidth
            label="New Password"
            type="password"
            value={editData.newPassword}
            onChange={(e) => setEditData({ ...editData, newPassword: e.target.value })}
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                '& fieldset': { borderColor: '#2a2a3e' },
              },
              '& .MuiInputLabel-root': { color: '#888' },
            }}
          />
          <TextField
            fullWidth
            label="Confirm New Password"
            type="password"
            value={editData.confirmPassword}
            onChange={(e) => setEditData({ ...editData, confirmPassword: e.target.value })}
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                '& fieldset': { borderColor: '#2a2a3e' },
              },
              '& .MuiInputLabel-root': { color: '#888' },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenEditDialog(false)} sx={{ color: '#888' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleUpdateProfile}
            sx={{ bgcolor: '#FF4757', '&:hover': { bgcolor: '#CC1A2C' } }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;