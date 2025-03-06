import axios from 'axios';

const API_KEY = 'a26483fc17effc5a6277fe1c2949c65c';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherByCoords = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getForecastByCoords = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getWeatherByCity = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`);
    return response.data;
  } catch (error) {
    throw error;
  }
}; 