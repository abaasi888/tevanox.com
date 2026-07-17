import React from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Skeleton,
} from '@mui/material';

const Table = ({
  columns,
  data,
  loading = false,
  pagination = true,
  page = 0,
  rowsPerPage = 10,
  totalRows = 0,
  onPageChange,
  onRowsPerPageChange,
  emptyMessage = 'No data available',
}) => {
  if (loading) {
    return (
      <TableContainer component={Paper} sx={{ bgcolor: '#1a1a2e' }}>
        <MuiTable>
          <TableHead>
            <TableRow>
              {columns.map((col, index) => (
                <TableCell key={index} sx={{ color: '#888', borderBottom: '1px solid #2a2a3e' }}>
                  {col.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                {columns.map((col, colIndex) => (
                  <TableCell key={colIndex} sx={{ borderBottom: '1px solid #2a2a3e' }}>
                    <Skeleton variant="text" width="80%" height={20} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    );
  }

  if (!data || data.length === 0) {
    return (
      <TableContainer component={Paper} sx={{ bgcolor: '#1a1a2e' }}>
        <MuiTable>
          <TableHead>
            <TableRow>
              {columns.map((col, index) => (
                <TableCell key={index} sx={{ color: '#888', borderBottom: '1px solid #2a2a3e' }}>
                  {col.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={columns.length} align="center" sx={{ py: 4, color: '#888' }}>
                {emptyMessage}
              </TableCell>
            </TableRow>
          </TableBody>
        </MuiTable>
      </TableContainer>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ bgcolor: '#1a1a2e' }}>
      <MuiTable>
        <TableHead>
          <TableRow>
            {columns.map((col, index) => (
              <TableCell
                key={index}
                sx={{
                  color: '#888',
                  fontWeight: 600,
                  borderBottom: '1px solid #2a2a3e',
                  ...col.sx,
                }}
              >
                {col.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex} hover sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' } }}>
              {columns.map((col, colIndex) => (
                <TableCell
                  key={colIndex}
                  sx={{
                    color: '#fff',
                    borderBottom: '1px solid #2a2a3e',
                    ...col.cellSx,
                  }}
                >
                  {col.render ? col.render(row) : row[col.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
      {pagination && (
        <TablePagination
          component="div"
          count={totalRows || data.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25, 50]}
          sx={{
            color: '#888',
            borderTop: '1px solid #2a2a3e',
            '& .MuiSelect-icon': { color: '#888' },
            '& .MuiTablePagination-select': { color: '#fff' },
          }}
        />
      )}
    </TableContainer>
  );
};

export default Table;