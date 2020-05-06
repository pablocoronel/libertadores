const { Router } = require('express');
const router = Router();

// Funciones
const { renderEditions } = require('../controllers/editions.controller');

// Rutas
router.get('/editions', renderEditions);

module.exports = router;
