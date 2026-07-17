import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';

const SearchBar = ({
  value = '',
  onChange,
  onSearch,
  placeholder = 'Search...',
  fullWidth = true,
  size = 'medium',
  ...props
}) => {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (e) => {
    setLocalValue(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  const handleClear = () => {
    setLocalValue('');
    if (onChange) onChange('');
    if (onSearch) onSearch('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(localValue);
    }
  };

  return (
    <TextField
      value={localValue}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      placeholder={placeholder}
      fullWidth={fullWidth}
      size={size}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: '#888' }} />
          </InputAdornment>
        ),
        endAdornment: localValue && (
          <InputAdornment position="end">
            <IconButton size="small" onClick={handleClear} sx={{ color: '#888' }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
        sx: {
          color: '#fff',
          bgcolor: '#2a2a3e',
          borderRadius: 1,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#2a2a3e',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FF4757',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FF4757',
          },
        },
      }}
      {...props}
    />
  );
};

export default SearchBar;