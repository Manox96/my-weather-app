import React, { useState } from 'react';
import { Box, Typography, Grid, Tabs, Tab } from '@mui/material';
import { motion } from 'framer-motion';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

const WeatherForecast = ({ data }) => {
  const [activeTab, setActiveTab] = useState(0);
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const getWeatherIcon = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const getDayName = (dateStr) => {
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const date = new Date(dateStr);
    return days[date.getDay()];
  };

  // Grouper les prévisions par jour
  const groupedForecast = data.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  // Prendre les 3 premiers jours pour les prévisions quotidiennes
  const dailyForecast = Object.entries(groupedForecast).slice(0, 3).map(([date, items]) => {
    // Prendre la prévision de midi comme représentative de la journée
    const dayForecast = items.find(item => {
      const hour = new Date(item.dt * 1000).getHours();
      return hour >= 12 && hour <= 14;
    }) || items[0];
    
    return {
      date: new Date(date),
      forecast: dayForecast
    };
  });

  // Prendre les prévisions pour aujourd'hui pour les prévisions horaires
  const hourlyForecast = Object.values(groupedForecast)[0]?.slice(0, 5) || [];

  const timeOfDay = (timestamp) => {
    const hour = new Date(timestamp * 1000).getHours();
    if (hour >= 5 && hour < 12) return 'Morning';
    if (hour >= 12 && hour < 17) return 'Afternoon';
    if (hour >= 17 && hour < 21) return 'Evening';
    return 'Night';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Box 
        sx={{ 
          mt: 3,
          borderRadius: 2,
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          color: 'white',
          overflow: 'hidden'
        }}
      >
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: 'white',
            },
            '& .MuiTab-root': {
              color: 'rgba(255, 255, 255, 0.7)',
              '&.Mui-selected': {
                color: 'white',
              },
              textTransform: 'none',
              fontWeight: 'medium',
            },
          }}
        >
          <Tab label="Aujourd'hui" />
          <Tab label="Prévisions horaires" />
          <Tab label="Prévisions quotidiennes" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {activeTab === 0 && (
            <Grid container spacing={4}>
              {[0, 1, 2].map((index) => {
                const period = index === 0 ? 'Morning' : index === 1 ? 'Afternoon' : 'Evening';
                const temp = index === 0 ? 24 : index === 1 ? 26 : 18;
                
                return (
                  <Grid item xs={4} key={index}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                      <Box sx={{ 
                        textAlign: 'center',
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <WbSunnyIcon sx={{ fontSize: 40, mb: 1 }} />
                        <Typography variant="subtitle1" sx={{ mb: 1 }}>
                          {period}
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                          {temp}°<Typography component="span" variant="body2">C</Typography>
                        </Typography>
                      </Box>
                    </motion.div>
                  </Grid>
                );
              })}
            </Grid>
          )}

          {activeTab === 1 && (
            <Grid container spacing={2}>
              {hourlyForecast.map((item, index) => (
                <Grid item xs={2.4} key={index}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                  >
                    <Box sx={{ 
                      textAlign: 'center',
                      p: 1
                    }}>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        {new Date(item.dt * 1000).getHours()}:00
                      </Typography>
                      <Box
                        component={motion.div}
                        animate={{ y: [0, -3, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        sx={{ my: 1 }}
                      >
                        <img 
                          src={getWeatherIcon(item.weather[0].icon)}
                          alt={item.weather[0].description}
                          style={{ width: '40px', height: '40px' }}
                        />
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {Math.round(item.main.temp)}°C
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}

          {activeTab === 2 && (
            <Grid container spacing={2}>
              {dailyForecast.map((day, index) => (
                <Grid item xs={4} key={index}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <Box sx={{ 
                      textAlign: 'center',
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: 'rgba(0, 0, 0, 0.1)'
                    }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {getDayName(day.date)}
                      </Typography>
                      <Box
                        component={motion.div}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        sx={{ my: 2 }}
                      >
                        <img 
                          src={getWeatherIcon(day.forecast.weather[0].icon)}
                          alt={day.forecast.weather[0].description}
                          style={{ width: '50px', height: '50px' }}
                        />
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 'medium' }}>
                        {Math.round(day.forecast.main.temp)}°C
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        textTransform: 'capitalize',
                        opacity: 0.8
                      }}>
                        {day.forecast.weather[0].description}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </motion.div>
  );
};

export default WeatherForecast; 