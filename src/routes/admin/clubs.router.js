const { Router } = require('express');
const router = Router();
const { upload } = require('../../helpers/uploadImage'); // sirve para subir archivos desde form

// Funciones
const {
	createClubs,
	destroyClubs,
	editClubs,
	listClubs,
	storeClubs,
	updateClubs,
} = require('../../controllers/admin/clubs.controller');

// Rutas
router.get('/admin/clubs', listClubs);
router.get('/admin/clubs/create', createClubs);
router.post('/admin/clubs', upload.single('shield'), storeClubs);
router.get('/admin/clubs/:id/edit', editClubs);
router.put('/admin/clubs/:id', upload.single('shield'), updateClubs);
router.delete('/admin/clubs/:id', destroyClubs);
module.exports = router;
