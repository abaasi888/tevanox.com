import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Collapse,
  Avatar,
} from '@mui/material';
import {
  Dashboard,
  People,
  Movie,
  MusicNote,
  LiveTv,
  AttachMoney,
  Payments,
  BarChart,
  Settings,
  ExpandLess,
  ExpandMore,
  PersonAdd,
  AccountTree,
  Category as CategoryIcon,
  LibraryMusic,
  Mic,
} from '@mui/icons-material';

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({
    content: true,
    users: false,
    finance: false,
    contentManagement: false,
  });

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <Dashboard />,
      path: '/dashboard',
    },
    {
      id: 'content',
      label: 'Content',
      icon: <Movie />,
      children: [
        { id: 'movies', label: 'Movies', icon: <Movie />, path: '/movies' },
        { id: 'music', label: 'Music', icon: <MusicNote />, path: '/music' },
        { id: 'series', label: 'Series', icon: <LiveTv />, path: '/series' },
      ],
    },
    {
      id: 'contentManagement',
      label: 'Content Management',
      icon: <CategoryIcon />,
      children: [
        { id: 'categories', label: 'Categories', icon: <CategoryIcon />, path: '/categories' },
        { id: 'genres', label: 'Genres', icon: <CategoryIcon />, path: '/genres' },
        { id: 'vjs', label: 'VJs', icon: <Mic />, path: '/vjs' },
        { id: 'musicians', label: 'Musicians', icon: <LibraryMusic />, path: '/musicians' },
      ],
    },
    {
      id: 'users',
      label: 'Users & Agents',
      icon: <People />,
      children: [
        { id: 'all-users', label: 'All Users', icon: <People />, path: '/users' },
        { id: 'agents', label: 'Agents', icon: <PersonAdd />, path: '/agents' },
        { id: 'agent-tree', label: 'Agent Tree', icon: <AccountTree />, path: '/agent-tree' },
        { id: 'commissions', label: 'Commissions', icon: <AttachMoney />, path: '/agent-commission' },
      ],
    },
    {
      id: 'finance',
      label: 'Finance',
      icon: <AttachMoney />,
      children: [
        { id: 'subscriptions', label: 'Subscriptions', icon: <Payments />, path: '/subscriptions' },
        { id: 'payments', label: 'Payments', icon: <AttachMoney />, path: '/payments' },
      ],
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <BarChart />,
      path: '/analytics',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings />,
      path: '/settings',
    },
  ];

  const handleMenuToggle = (menuId) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          bgcolor: '#1a1a2e',
          borderRight: '1px solid #2a2a3e',
        },
      }}
    >
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: '#FF4757' }}>TM</Avatar>
        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>
          Admin
        </Typography>
      </Box>

      <Divider sx={{ borderColor: '#2a2a3e' }} />

      <Box sx={{ flex: 1, overflowY: 'auto', py: 2 }}>
        {menuItems.map((item) => {
          if (item.children) {
            return (
              <React.Fragment key={item.id}>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => handleMenuToggle(item.id)}>
                    <ListItemIcon sx={{ color: '#888' }}>{item.icon}</ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      sx={{
                        '& .MuiListItemText-primary': {
                          color: '#fff',
                          fontWeight: 500,
                        },
                      }}
                    />
                    {openMenus[item.id] ? <ExpandLess sx={{ color: '#888' }} /> : <ExpandMore sx={{ color: '#888' }} />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={openMenus[item.id]} timeout="auto" unmountOnExit>
                  <List disablePadding>
                    {item.children.map((child) => (
                      <ListItem key={child.id} disablePadding>
                        <ListItemButton
                          sx={{
                            pl: 4,
                            bgcolor: isActive(child.path) ? 'rgba(255,71,87,0.1)' : 'transparent',
                            borderLeft: isActive(child.path) ? '3px solid #FF4757' : '3px solid transparent',
                          }}
                          onClick={() => navigate(child.path)}
                        >
                          <ListItemIcon sx={{ color: isActive(child.path) ? '#FF4757' : '#666' }}>
                            {child.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={child.label}
                            sx={{
                              '& .MuiListItemText-primary': {
                                color: isActive(child.path) ? '#FF4757' : '#aaa',
                                fontSize: 14,
                              },
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            );
          }

          return (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                sx={{
                  bgcolor: isActive(item.path) ? 'rgba(255,71,87,0.1)' : 'transparent',
                  borderLeft: isActive(item.path) ? '3px solid #FF4757' : '3px solid transparent',
                }}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon sx={{ color: isActive(item.path) ? '#FF4757' : '#888' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    '& .MuiListItemText-primary': {
                      color: isActive(item.path) ? '#FF4757' : '#fff',
                      fontWeight: isActive(item.path) ? 600 : 500,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </Box>

      <Divider sx={{ borderColor: '#2a2a3e' }} />

      <Box sx={{ p: 2 }}>
        <Typography variant="caption" sx={{ color: '#666', textAlign: 'center', display: 'block' }}>
          TevanoxMovie Admin v1.0.0
        </Typography>
        <Typography variant="caption" sx={{ color: '#444', textAlign: 'center', display: 'block', mt: 0.5 }}>
          © {new Date().getFullYear()} Tevanox
        </Typography>
      </Box>
    </Drawer>
  );
};

export default Sidebar;