import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirIcon from '@mui/icons-material/Air';
import CompressIcon from '@mui/icons-material/Compress';
import VisibilityIcon from '@mui/icons-material/Visibility';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThermostatIcon from '@mui/icons-material/Thermostat';

const WeatherDetails = ({ data }) => {
  const detailItems = [
    {
      icon: <WaterDropIcon />,
      label: 'Humidité',
      value: `${data.main.humidity}%`,
    },
    {
      icon: <CompressIcon />,
      label: 'Pression',
      value: `${data.main.pressure} mb`,
    },
    {
      icon: <VisibilityIcon />,
      label: 'Visibilité',
      value: data.visibility ? `${(data.visibility / 1000).toFixed(1)} km` : 'N/A',
    },
    {
      icon: <AirIcon />,
      label: 'Vent',
      value: `${Math.round(data.wind.speed * 3.6)} km/h`,
    },
    {
      icon: <WbSunnyIcon />,
      label: 'Indice UV',
      value: '0 de 10',
    },
    {
      icon: <ThermostatIcon />,
      label: 'Point de rosée',
      value: '16°',
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Box 
        sx={{ 
          mt: 3,
          p: 3,
          borderRadius: 2,
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          color: 'white',
          textShadow: '0 1px 2px rgba(0,0,0,0.3)'
        }}
      >
        <Grid container spacing={3}>
          {detailItems.map((item, index) => (
            <Grid item xs={6} sm={4} key={index}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ 
                    mr: 1, 
                    opacity: 0.7,
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    {item.icon}
                  </Box>
                  <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    {item.label}
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                  {item.value}
                </Typography>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </motion.div>
  );
};

export default WeatherDetails; 