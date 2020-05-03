const Router = require('express').Router;
const router = Router();

// Funciones
const { renderNews } = require('../controllers/news.controller');

// Rutas
router.get('/news', renderNews);

module.exports = router;
