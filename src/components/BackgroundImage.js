import React from 'react';
import { Box } from '@mui/material';

const getBackgroundImage = (weatherCode, isDay) => {
  // Codes météo: https://openweathermap.org/weather-conditions
  const timeOfDay = isDay ? 'day' : 'night';
  
  // Images pour différentes conditions météo
  const backgrounds = {
    // Ciel clair (01d, 01n)
    '01': {
      day: 'https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5',
      night: 'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e'
    },
    // Quelques nuages (02d, 02n)
    '02': {
      day: 'https://images.unsplash.com/photo-1501630834273-4b5604d2ee31',
      night: 'https://images.unsplash.com/photo-1534447677768-be436bb09401'
    },
    // Nuageux (03d, 03n, 04d, 04n)
    '03': {
      day: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda',
      night: 'https://images.unsplash.com/photo-1505533321630-975218a5f66f'
    },
    '04': {
      day: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda',
      night: 'https://images.unsplash.com/photo-1505533321630-975218a5f66f'
    },
    // Pluie (09d, 09n, 10d, 10n)
    '09': {
      day: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721',
      night: 'https://images.unsplash.com/photo-1501999635878-71cb5379c2d8'
    },
    '10': {
      day: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721',
      night: 'https://images.unsplash.com/photo-1501999635878-71cb5379c2d8'
    },
    // Orage (11d, 11n)
    '11': {
      day: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28',
      night: 'https://images.unsplash.com/photo-1472145246862-b24cf25c4a36'
    },
    // Neige (13d, 13n)
    '13': {
      day: 'https://images.unsplash.com/photo-1483664852095-d6cc6870702d',
      night: 'https://images.unsplash.com/photo-1478265409131-1f65c88f965c'
    },
    // Brouillard (50d, 50n)
    '50': {
      day: 'https://images.unsplash.com/photo-1487621167305-5d248087c724',
      night: 'https://images.unsplash.com/photo-1482686115713-0fbcaced6e28'
    },
    // Par défaut - coucher de soleil comme dans l'image de référence
    default: {
      day: 'https://images.unsplash.com/photo-1514912885225-5c9ec8507d68',
      night: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e'
    }
  };

  // Extraire le code de base (sans d/n)
  const baseCode = weatherCode ? weatherCode.substring(0, 2) : 'default';
  
  // Obtenir l'URL de l'image
  const backgroundUrl = backgrounds[baseCode] 
    ? backgrounds[baseCode][timeOfDay] 
    : backgrounds.default[timeOfDay];
  
  return `${backgroundUrl}?auto=format&fit=crop&w=1920&q=80`;
};

const BackgroundImage = ({ weatherIcon }) => {
  // Déterminer s'il fait jour ou nuit en fonction de l'icône météo
  // Les icônes se terminent par 'd' pour le jour et 'n' pour la nuit
  const isDay = weatherIcon ? weatherIcon.endsWith('d') : true;
  
  // Obtenir le code météo à partir de l'icône
  const weatherCode = weatherIcon ? weatherIcon.substring(0, 2) : null;
  
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${getBackgroundImage(weatherCode, isDay)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'opacity 1.5s ease-in-out',
          zIndex: 0
        }
      }}
    />
  );
};

export default BackgroundImage; 