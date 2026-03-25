require('dotenv').config();
const { createClient } = require('redis');

const client = createClient({
  username: 'default',
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT)
  }
});

client.on('error', (err) => console.error('Redis Client Error', err));
client.on('connect', () => console.log('Redis conectado!'));

// Conecta de forma assíncrona sem await no topo
client.connect().catch(console.error);

module.exports = client;