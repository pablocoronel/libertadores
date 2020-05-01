const { Router } = require('express');
const router = Router();

// Funciones
const { renderHistorias } = require('../controllers/historias.controller');

// Rutas
router.get('/historias', renderHistorias);

module.exports = router;
