const { Router } = require('express');
const { forecast } = require('../controllers/weatherController');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
  message: { error: 'Muitas requisições. Tente novamente em 15 minutos.' },
});

const router = Router();

router.get('/weather/:city', limiter, forecast);

module.exports = router;