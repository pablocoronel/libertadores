const { Router } = require('express');
const router = Router();

// Funciones
const {
	renderEditions,
	createEditions,
	storeEditions,
} = require('../controllers/editions.controller');

// Rutas
router.get('/editions', renderEditions);
router.get('/editions/create', createEditions);
router.post('/editions/create', storeEditions);

module.exports = router;
