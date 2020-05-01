const { Router } = require('express');
const router = Router();

// Funciones
const { renderEdiciones } = require('../controllers/ediciones.controller');

// Rutas
router.get('/ediciones', renderEdiciones);

module.exports = router;
