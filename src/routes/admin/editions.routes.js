const { Router } = require('express');
const router = Router();

// Funciones
const {
	renderEditions,
	createEditions,
	storeEditions,
} = require('../../controllers/admin/editions.controller');

// Rutas
router.get('/admin/editions/create', createEditions);
router.post('/admin/editions', storeEditions);

module.exports = router;
