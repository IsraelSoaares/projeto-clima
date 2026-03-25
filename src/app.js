require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());

app.use(cors());

// Serve o frontend
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', require('./routes/weatherRoutes'));

module.exports = app;
