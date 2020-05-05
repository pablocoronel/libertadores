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
	upload,
} = require('../controllers/clubs.controller');

// Rutas
router.get('/clubs/create', createClubs);
router.post('/clubs', upload.single('shield'), storeClubs);

module.exports = router;
