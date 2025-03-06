import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';

const CurrentWeather = ({ data }) => {
  const getWeatherIcon = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box 
        sx={{ 
          color: 'white',
          textShadow: '0 2px 4px rgba(0,0,0,0.5)',
          p: 3,
          borderRadius: 2,
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          maxWidth: '500px'
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Typography 
                variant="h1" 
                component="div" 
                sx={{ 
                  fontWeight: 'bold',
                  fontSize: { xs: '4rem', sm: '6rem' },
                  lineHeight: 1
                }}
              >
                {Math.round(data.main.temp)}°
              </Typography>
              <Box sx={{ ml: 1, mb: 1 }}>
                <Typography variant="h6" component="div" sx={{ lineHeight: 1 }}>
                  C
                </Typography>
                <Typography variant="h6" component="div" sx={{ lineHeight: 1, opacity: 0.7 }}>
                  F
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              component={motion.div}
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              sx={{ mr: 1 }}
            >
              <img 
                src={getWeatherIcon(data.weather[0].icon)}
                alt={data.weather[0].description}
                style={{ width: '40px', height: '40px' }}
              />
            </Box>
            <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
              {data.weather[0].description}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography 
              variant="h4" 
              component="div" 
              sx={{ 
                fontWeight: 'bold',
                mt: 2
              }}
            >
              {data.name}
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
              {data.sys.country}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
};

export default CurrentWeather; 