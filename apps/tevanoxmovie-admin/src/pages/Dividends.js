import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Add, Visibility, CheckCircle, Cancel } from '@mui/icons-material';

const Dividends = () => {
  const [dividends, setDividends] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [totalPool, setTotalPool] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDividends();
  }, []);

  const fetchDividends = async () => {
    setLoading(true);
    // API call will go here
    setLoading(false);
  };

  const handleDeclareDividend = async () => {
    // API call will go here
    setOpenDialog(false);
    fetchDividends();
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" sx={{ color: '#fff' }}>
          💰 Dividends
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
          sx={{ bgcolor: '#FF4757' }}
        >
          Declare Dividend
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ bgcolor: '#1a1a2e' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#aaa' }}>Shareholder</TableCell>
              <TableCell sx={{ color: '#aaa' }}>Amount</TableCell>
              <TableCell sx={{ color: '#aaa' }}>Per Share</TableCell>
              <TableCell sx={{ color: '#aaa' }}>Status</TableCell>
              <TableCell sx={{ color: '#aaa' }}>Date</TableCell>
              <TableCell sx={{ color: '#aaa' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: 'center', color: '#aaa' }}>
                  Loading...
                </TableCell>
              </TableRow>
            ) : dividends.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: 'center', color: '#aaa' }}>
                  No dividends declared
                </TableCell>
              </TableRow>
            ) : (
              dividends.map((d) => (
                <TableRow key={d.id}>
                  <TableCell sx={{ color: '#fff' }}>{d.shareholder_name}</TableCell>
                  <TableCell sx={{ color: '#4CAF50' }}>
                    UGX {d.amount?.toLocaleString() || 0}
                  </TableCell>
                  <TableCell sx={{ color: '#fff' }}>
                    UGX {d.dividend_per_share?.toLocaleString() || 0}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={d.status}
                      color={d.status === 'paid' ? 'success' : 'warning'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell sx={{ color: '#fff' }}>
                    {new Date(d.declaration_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Process Payment">
                      <IconButton size="small" sx={{ color: '#4CAF50' }}>
                        <CheckCircle />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Cancel">
                      <IconButton size="small" sx={{ color: '#ff4444' }}>
                        <Cancel />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Declare Dividend Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        PaperProps={{ sx: { bgcolor: '#1a1a2e', color: '#fff' } }}
      >
        <DialogTitle>Declare Dividend</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Total Dividend Pool (UGX)"
            type="number"
            fullWidth
            value={totalPool}
            onChange={(e) => setTotalPool(e.target.value)}
            sx={{ mb: 2 }}
            InputLabelProps={{ sx: { color: '#aaa' } }}
            InputProps={{ sx: { color: '#fff' } }}
          />
          <TextField
            margin="dense"
            label="Notes"
            multiline
            rows={3}
            fullWidth
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            InputLabelProps={{ sx: { color: '#aaa' } }}
            InputProps={{ sx: { color: '#fff' } }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} sx={{ color: '#aaa' }}>
            Cancel
          </Button>
          <Button onClick={handleDeclareDividend} variant="contained" sx={{ bgcolor: '#FF4757' }}>
            Declare
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dividends;
