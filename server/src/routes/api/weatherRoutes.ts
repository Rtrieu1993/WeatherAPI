import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  const { city } = req.body; 
  if (!city) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
  // TODO: GET weather data from city name
  const weatherData = await WeatherService.getWeatherForCity(city);
  
  // TODO: save city to search history
  await HistoryService.addCity(city);
  res.json({ weatherData });
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Failed to fetch weather data' });
}
});

// TODO: GET search history
router.get('/history', async (req, res) => {
  try {
    const cities = await HistoryService.getCities();
    res.json({ cities });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve search history' });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: 'City ID is required' });
  }

  try {
    await HistoryService.removeCity(id);
    res.status(200).json({ message: 'City removed from history' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to remove city from history' });
  }
});

export default router;
