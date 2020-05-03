const { Router } = require('express');
const router = Router();

// Funciones
const {
	renderEditions,
	renderEditionsCreate,
	createEditions,
} = require('../controllers/editions.controller');

// Rutas
router.get('/editions', renderEditions);
router.get('/editions/create', renderEditionsCreate);
router.post('/editions/create', createEditions);

module.exports = router;
