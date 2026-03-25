const { getWeather } = require('../services/weatherService');

async function forecast(req, res) {
  const { city } = req.params;

  if (!city) {
    return res.status(400).json({ error: 'Cidade é obrigatória.' });
  }

  try {
    const result = await getWeather(city);
    return res.json(result);
  } catch (err) {
    if (err.response?.status === 400) {
      return res.status(400).json({ error: 'Cidade inválida ou não encontrada.' });
    }
    if (err.response?.status === 401) {
      return res.status(401).json({ error: 'Chave da API inválida.' });
    }
    console.error(err.message);
    return res.status(500).json({ error: 'Erro ao buscar previsão do tempo.' });
  }
}

module.exports = { forecast };