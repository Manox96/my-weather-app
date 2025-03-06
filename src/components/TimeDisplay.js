import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { motion } from 'framer-motion';

const TimeDisplay = () => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be displayed as 12
    
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
  };
  
  const formatDate = (date) => {
    const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  };
  
  // Créer un tableau de fuseaux horaires pour l'affichage
  const timeZones = [
    { code: 'EST', name: 'EST' },
    { code: 'GMT', name: 'GMT' },
    { code: 'IST', name: 'IST' },
    { code: 'MST', name: 'MST' },
    { code: 'JST', name: 'JST' }
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ 
        textAlign: 'right',
        color: 'white',
        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
      }}>
        <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
          {formatTime(time)}
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 1, opacity: 0.9 }}>
          {formatDate(time)}
        </Typography>
        
        <Stack 
          direction="row" 
          spacing={1} 
          sx={{ 
            justifyContent: 'flex-end',
            mt: 1,
            opacity: 0.7,
            fontSize: '0.75rem'
          }}
        >
          {timeZones.map((zone, index) => (
            <Typography 
              key={zone.code} 
              variant="caption" 
              component="span"
              sx={{ 
                textTransform: 'uppercase',
                fontWeight: index === 0 ? 'bold' : 'normal'
              }}
            >
              {zone.code}
            </Typography>
          ))}
          <Typography variant="caption" component="span" sx={{ ml: 1 }}>
            →
          </Typography>
        </Stack>
      </Box>
    </motion.div>
  );
};

export default TimeDisplay; 