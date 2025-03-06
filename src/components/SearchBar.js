import React, { useState } from 'react';
import { Box, TextField, InputAdornment, IconButton, List, ListItem, ListItemText, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = ({ onCitySelect, onUseCurrentLocation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // Liste de villes suggérées (pourrait être remplacée par une API de géocodage)
  const suggestedCities = searchTerm.length > 1 
    ? ['Paris', 'New York', 'Tokyo', 'London', 'Sydney', 'Berlin', 'Moscow', 'Beijing', 'Rio de Janeiro', 'Cairo']
        .filter(city => city.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(0, 5)
    : [];
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onCitySelect(searchTerm);
      setSearchTerm('');
      setIsSearchFocused(false);
    }
  };
  
  const handleCityClick = (city) => {
    onCitySelect(city);
    setSearchTerm('');
    setIsSearchFocused(false);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', maxWidth: '500px', mb: 3 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleSearch}>
          <TextField
            fullWidth
            placeholder="Rechercher une ville..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'white' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    onClick={onUseCurrentLocation}
                    sx={{ color: 'white' }}
                    title="Utiliser ma position actuelle"
                  >
                    <LocationOnIcon />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                color: 'white',
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.7)',
                },
                '&::placeholder': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  opacity: 1,
                },
              }
            }}
          />
        </form>
        
        <AnimatePresence>
          {isSearchFocused && suggestedCities.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{ position: 'absolute', width: '100%', zIndex: 10 }}
            >
              <Paper 
                elevation={3}
                sx={{ 
                  mt: 0.5,
                  backdropFilter: 'blur(10px)',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  borderRadius: 2,
                  overflow: 'hidden'
                }}
              >
                <List sx={{ py: 0 }}>
                  {suggestedCities.map((city) => (
                    <ListItem 
                      key={city} 
                      button 
                      onClick={() => handleCityClick(city)}
                      sx={{ 
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)'
                        }
                      }}
                    >
                      <LocationOnIcon sx={{ mr: 1, fontSize: 20, opacity: 0.7 }} />
                      <ListItemText primary={city} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Box>
  );
};

export default SearchBar; 