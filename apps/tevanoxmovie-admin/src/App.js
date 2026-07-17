import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import theme from './styles/theme';
import Layout from './components/common/Layout';
import PrivateRoute from './components/common/PrivateRoute';

// Pages
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Movies from './pages/Movies';
import Music from './pages/Music';
import Series from './pages/Series';
import Agents from './pages/Agents';
import AgentCommission from './pages/AgentCommission';
import AgentTree from './pages/AgentTree';
import Subscriptions from './pages/Subscriptions';
import Payments from './pages/Payments';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

// NEW - Content Management Pages
import Categories from './pages/Categories';
import Genres from './pages/Genres';
import VJs from './pages/VJs';
import Musicians from './pages/Musicians';

import './styles/globals.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route index element={<Navigate to="/dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              
              {/* Users & Agents */}
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<Users />} />
              <Route path="agents" element={<Agents />} />
              <Route path="agents/:id" element={<Agents />} />
              <Route path="agent-commission" element={<AgentCommission />} />
              <Route path="agent-tree" element={<AgentTree />} />
              
              {/* Content Management */}
              <Route path="movies" element={<Movies />} />
              <Route path="movies/:id" element={<Movies />} />
              <Route path="music" element={<Music />} />
              <Route path="music/:id" element={<Music />} />
              <Route path="series" element={<Series />} />
              <Route path="series/:id" element={<Series />} />
              
              {/* NEW - Dynamic Content Management */}
              <Route path="categories" element={<Categories />} />
              <Route path="genres" element={<Genres />} />
              <Route path="vjs" element={<VJs />} />
              <Route path="musicians" element={<Musicians />} />
              
              {/* Finance */}
              <Route path="subscriptions" element={<Subscriptions />} />
              <Route path="payments" element={<Payments />} />
              
              {/* Analytics & Settings */}
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;