const { Router } = require('express');
const router = Router();
const { upload } = require('../helpers/uploadImage'); // sirve para subir archivos desde form

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
router.get('/clubs', listClubs);
router.get('/clubs/create', createClubs);
router.post('/clubs', upload.single('shield'), storeClubs);
router.get('/clubs/:id/edit', editClubs);
router.put('/clubs/:id', upload.single('shield'), updateClubs);

module.exports = router;
