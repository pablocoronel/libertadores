const Router = require('express').Router;
const router = Router();

// Funciones
const { renderNoticias } = require('../controllers/noticias.controller');

// Rutas
router.get('/noticias', renderNoticias);

module.exports = router;
