const { Router } = require('express');
const router = Router();

// Funciones
const {
	listEditions,
	showEdition,
} = require('../controllers/editions.controller');

// Rutas
router.get('/editions', listEditions);
router.get('/editions/:id', showEdition);

module.exports = router;
