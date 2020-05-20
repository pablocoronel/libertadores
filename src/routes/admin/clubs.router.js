const { Router } = require('express');
const router = Router();
const path = require('path');
const multer = require('multer'); // sirve para subir archivos desde form
const upload = multer({ dest: path.join(__dirname, '../../public/images/clubs') });

// Validaciones
const validation = require('../../middlewares/validation');

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
	[upload.single('shield'), validation.storeClub],
	storeClubs
);
router.get('/admin/clubs/:id/edit', editClubs);
router.put(
	'/admin/clubs/:id',
	[upload.single('shield'), validation.updateClub],
	updateClubs
);
router.delete('/admin/clubs/:id', destroyClubs);
module.exports = router;
