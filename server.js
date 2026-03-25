require('dotenv').config();
const app = require('./src/app');
const redis = require('./src/config/redis');

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);

  // Teste de conexão Redis
  try {
    await redis.set('teste', 'funcionou!');
    const valor = await redis.get('teste');
    console.log(`Redis OK → valor: ${valor}`); // Redis OK → valor: funcionou!
  } catch (err) {
    console.error('Erro no Redis:', err.message);
  }
});