const { Router } = require('express');
const router = Router();
const path = require('path');
const multer = require('multer'); // sirve para subir archivos desde form
const upload = multer({ dest: path.join(__dirname, '../../public/images/clubs') });
const validator = require('../../middlewares/validator');

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
router.post(
	'/admin/clubs',
	[upload.single('shield'), validator.storeClub],
	storeClubs
);
router.get('/admin/clubs/:id/edit', editClubs);
router.put(
	'/admin/clubs/:id',
	[upload.single('shield'), validator.updateClub],
	updateClubs
);
router.delete('/admin/clubs/:id', destroyClubs);
module.exports = router;
