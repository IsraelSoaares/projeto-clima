const axios = require('axios');
const redis = require('../config/redis');

const CACHE_TTL = 60 * 60 * 12; // 12 horas em segundos

async function getWeather(city) {
  // 1. Verifica cache
  const cached = await redis.get(city);
  if (cached) {
    console.log(`Cache HIT: ${city}`);
    return { source: 'cache', data: JSON.parse(cached) };
  }

  // 2. Chama a API externa
  console.log(`Cache MISS: ${city} — buscando na API...`);
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}`;

  const response = await axios.get(url, {
    params: {
      key: process.env.API_KEY,
      unitGroup: 'metric',
      lang: 'pt',
      contentType: 'json',
    },
  });

  const data = response.data;

  // 3. Salva no Redis com TTL de 12h
  await redis.set(city, JSON.stringify(data), { EX: CACHE_TTL });

  return { source: 'api', data };
}

module.exports = { getWeather };