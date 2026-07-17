import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Refresh,
  Search,
  AccountTree,
  Person,
  ExpandMore,
  ExpandLess,
} from '@mui/icons-material';
import { useAgents } from '../hooks/useAgents';
import Loading from '../components/common/Loading';

const AgentTree = () => {
  const { getAgentTree, loading } = useAgents();
  const [treeData, setTreeData] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTree, setFilteredTree] = useState(null);

  useEffect(() => {
    loadTree();
  }, []);

  const loadTree = async () => {
    try {
      const data = await getAgentTree();
      setTreeData(data);
      setFilteredTree(data);
      // Expand root by default
      if (data) {
        setExpandedNodes({ [data.id]: true });
      }
    } catch (error) {
      console.error('Error loading agent tree:', error);
    }
  };

  const toggleNode = (nodeId) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredTree(treeData);
      return;
    }

    const filterTree = (node) => {
      const matches = node.name?.toLowerCase().includes(query.toLowerCase()) ||
                     node.code?.toLowerCase().includes(query.toLowerCase());
      
      if (node.children) {
        const filteredChildren = node.children.map(filterTree).filter(Boolean);
        if (matches || filteredChildren.length > 0) {
          return { ...node, children: filteredChildren };
        }
        return null;
      }
      
      return matches ? node : null;
    };

    if (treeData) {
      const filtered = filterTree(treeData);
      setFilteredTree(filtered);
      // Expand all nodes in filtered view
      if (filtered) {
        const expandAll = (node) => {
          setExpandedNodes((prev) => ({ ...prev, [node.id]: true }));
          if (node.children) {
            node.children.forEach(expandAll);
          }
        };
        expandAll(filtered);
      }
    }
  };

  const renderTree = (node, level = 0) => {
    if (!node) return null;

    const isExpanded = expandedNodes[node.id] || false;
    const hasChildren = node.children && node.children.length > 0;

    return (
      <Box key={node.id} sx={{ ml: level * 2 }}>
        <Paper
          sx={{
            p: 2,
            mb: 1,
            bgcolor: level === 0 ? 'rgba(156,39,176,0.1)' : '#1a1a2e',
            borderLeft: `4px solid ${level === 0 ? '#9C27B0' : level === 1 ? '#2196F3' : '#4CAF50'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {hasChildren && (
              <IconButton size="small" onClick={() => toggleNode(node.id)}>
                {isExpanded ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            )}
            <Person sx={{ color: '#9C27B0' }} />
            <Box>
              <Typography sx={{ color: '#fff', fontWeight: 500 }}>
                {node.name}
              </Typography>
              <Typography variant="caption" sx={{ color: '#888' }}>
                {node.code} • {node.type} • {node.referrals || 0} referrals
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Chip
              label={`Tier ${node.tier || 1}`}
              size="small"
              sx={{ bgcolor: 'rgba(156,39,176,0.2)', color: '#9C27B0' }}
            />
            <Typography variant="caption" sx={{ color: '#4CAF50' }}>
              UGX {(node.earnings || 0).toLocaleString()}
            </Typography>
          </Box>
        </Paper>
        {hasChildren && isExpanded && (
          <Box sx={{ ml: 2 }}>
            {node.children.map((child) => renderTree(child, level + 1))}
          </Box>
        )}
      </Box>
    );
  };

  if (loading) {
    return <Loading message="Loading agent tree..." />;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Agent Tree
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            placeholder="Search agents..."
            size="small"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#888' }} />
                </InputAdornment>
              ),
              sx: {
                color: '#fff',
                bgcolor: '#2a2a3e',
                borderRadius: 1,
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#2a2a3e' },
              },
            }}
          />
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={loadTree}
            sx={{ color: '#9C27B0', borderColor: '#9C27B0' }}
          >
            Refresh
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 3, bgcolor: '#1a1a2e', borderRadius: 2 }}>
        {filteredTree ? (
          <Box>
            <Box sx={{ mb: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip
                icon={<AccountTree />}
                label={`Total Agents: ${treeData?.totalAgents || 0}`}
                sx={{ bgcolor: 'rgba(156,39,176,0.2)', color: '#9C27B0' }}
              />
              <Chip
                label={`Total Referrals: ${treeData?.totalReferrals || 0}`}
                sx={{ bgcolor: 'rgba(255,71,87,0.2)', color: '#FF4757' }}
              />
              <Chip
                label={`Active Agents: ${treeData?.activeAgents || 0}`}
                sx={{ bgcolor: 'rgba(76,175,80,0.2)', color: '#4CAF50' }}
              />
            </Box>
            {renderTree(filteredTree)}
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="textSecondary">No agents found</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default AgentTree;