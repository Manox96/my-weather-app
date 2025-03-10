import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, IconButton, useMediaQuery } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SettingsIcon from '@mui/icons-material/Settings';
import CurrentWeather from './components/CurrentWeather';
import WeatherForecast from './components/WeatherForecast';
import WeatherDetails from './components/WeatherDetails';
import TimeDisplay from './components/TimeDisplay';
import BackgroundImage from './components/BackgroundImage';
import CloudAnimation from './components/CloudAnimation';
import SearchBar from './components/SearchBar';
import LoadingIndicator from './components/LoadingIndicator';
import { getWeatherByCoords, getForecastByCoords, getWeatherByCity } from './services/weatherApi';

function App() {
  const [darkMode, setDarkMode] = useState(true); // Mode sombre par défaut
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const fetchWeatherByLocation = async (position) => {
    try {
      setLoading(true);
      setError(null);
      const { latitude, longitude } = position.coords;
      const weatherData = await getWeatherByCoords(latitude, longitude);
      const forecastData = await getForecastByCoords(latitude, longitude);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError("Impossible de récupérer les données météo");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCity = async (city) => {
    try {
      setLoading(true);
      setError(null);
      const weatherData = await getWeatherByCity(city);
      // Utiliser les coordonnées de la ville pour obtenir les prévisions
      const forecastData = await getForecastByCoords(
        weatherData.coord.lat,
        weatherData.coord.lon
      );
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError(`Impossible de trouver la météo pour "${city}"`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        fetchWeatherByLocation,
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setError("Veuillez autoriser l'accès à votre position dans les paramètres de votre navigateur pour utiliser cette fonctionnalité.");
              break;
            case error.POSITION_UNAVAILABLE:
              setError("Les informations de position ne sont pas disponibles.");
              break;
            case error.TIMEOUT:
              setError("La demande de position a expiré.");
              break;
            default:
              setError("Une erreur inconnue s'est produite lors de la géolocalisation.");
          }
          // Set default location (Rabat) as fallback
          fetchWeatherByCity("Rabat");
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      setError("La géolocalisation n'est pas supportée par votre navigateur");
      // Set default location (Rabat) as fallback
      fetchWeatherByCity("Rabat");
    }
  };

  useEffect(() => {
    handleUseCurrentLocation();
  }, []);

  // Obtenir l'icône météo actuelle pour l'arrière-plan
  const currentWeatherIcon = weather?.weather?.[0]?.icon;
  const weatherCondition = weather?.weather?.[0]?.description;

  // Définir un arrière-plan par défaut pour l'état de chargement
  const defaultBackgroundIcon = '01d'; // Ciel clair par défaut

  return (
    <Box sx={{ 
      minHeight: '100vh',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Arrière-plan dynamique - utiliser un arrière-plan par défaut pendant le chargement */}
      <BackgroundImage weatherIcon={weather ? currentWeatherIcon : defaultBackgroundIcon} />
      
      {/* Animation de nuages */}
      {weather && <CloudAnimation weatherCondition={weatherCondition} />}
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
        {/* Search Bar */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <SearchBar 
            onCitySelect={fetchWeatherByCity}
            onUseCurrentLocation={handleUseCurrentLocation}
          />
        </Box>
       
        {error ? (
          <Box sx={{ 
            textAlign: 'center', 
            color: 'white', 
            mt: 4,
            p: 3,
            borderRadius: 2,
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          }}>
            {error}
          </Box>
        ) : loading ? (
          <LoadingIndicator />
        ) : (
          <>
            {weather && forecast && (
              <Grid container spacing={3}>
                {/* Affichage de l'heure et de la date */}
                <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
                  {/* Météo actuelle */}
                  <CurrentWeather data={weather} />
                  
                  {/* Détails météo */}
                  <WeatherDetails data={weather} />
                  
                  {/* Prévisions */}
                  <WeatherForecast data={forecast} />
                </Grid>
                
                <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 } }}>
                  <TimeDisplay />
                </Grid>
              </Grid>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}

export default App;
