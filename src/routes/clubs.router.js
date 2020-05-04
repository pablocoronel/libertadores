const { Router } = require('express');
const router = Router();

// Funciones
const {
	createClubs,
	destroyClubs,
	editClubs,
	listClubs,
	storeClubs,
	updateClubs,
} = require('../controllers/clubs.controller');

// Rutas
router.get('/clubs', createClubs);

module.exports = router;
