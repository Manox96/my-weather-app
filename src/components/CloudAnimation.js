import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

const CloudAnimation = ({ weatherCondition }) => {
  // Déterminer si nous devons afficher des nuages en fonction de la condition météo
  const shouldShowClouds = weatherCondition && 
    (weatherCondition.includes('cloud') || 
     weatherCondition.includes('rain') || 
     weatherCondition.includes('drizzle') ||
     weatherCondition.includes('mist') ||
     weatherCondition.includes('fog'));

  if (!shouldShowClouds) return null;

  // Créer plusieurs nuages avec des tailles et positions différentes
  const clouds = [
    { 
      top: '10%', 
      width: '120px', 
      opacity: 0.7, 
      duration: 60,
      delay: 0
    },
    { 
      top: '20%', 
      width: '150px', 
      opacity: 0.5, 
      duration: 75,
      delay: 10
    },
    { 
      top: '15%', 
      width: '100px', 
      opacity: 0.6, 
      duration: 90,
      delay: 20
    },
    { 
      top: '25%', 
      width: '130px', 
      opacity: 0.4, 
      duration: 80,
      delay: 15
    }
  ];

  return (
    <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {clouds.map((cloud, index) => (
        <motion.div
          key={index}
          initial={{ x: '-100%' }}
          animate={{ x: '100vw' }}
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            delay: cloud.delay,
            ease: 'linear'
          }}
          style={{
            position: 'absolute',
            top: cloud.top,
            opacity: cloud.opacity,
          }}
        >
          <svg 
            width={cloud.width} 
            height={cloud.width * 0.6} 
            viewBox="0 0 200 120" 
            fill="white"
          >
            <path d="M47.5,95 C32.8,95 21,83.2 21,68.5 C21,53.8 32.8,42 47.5,42 C48.9,42 50.3,42.1 51.6,42.3 C57.9,28.1 72.3,18 89,18 C110.5,18 128,35.5 128,57 C128,58.2 127.9,59.4 127.8,60.6 C135.8,66.1 141,75.4 141,86 C141,102.6 127.6,116 111,116 L47.5,95 z"/>
          </svg>
        </motion.div>
      ))}
    </Box>
  );
};

export default CloudAnimation; 