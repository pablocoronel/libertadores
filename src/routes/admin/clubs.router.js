const { Router } = require('express');
const router = Router();
const path = require('path');
const multer = require('multer'); // sirve para subir archivos desde form
// Configuracion de carpeta temporal
const upload = multer({
	dest: path.join(__dirname, '../../public/images/clubs'),
});
const { permissions } = require('../../middlewares/permissions');

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
router.get('/admin/clubs', permissions.islogged, listClubs);
router.get('/admin/clubs/create', permissions.islogged, createClubs);
router.post(
	'/admin/clubs',
	[upload.single('shield'), validation.storeClub, permissions.islogged],
	storeClubs
);
router.get('/admin/clubs/:id/edit', permissions.islogged, editClubs);
router.put(
	'/admin/clubs/:id',
	[upload.single('shield'), validation.updateClub, permissions.islogged],
	updateClubs
);
router.delete('/admin/clubs/:id', permissions.islogged, destroyClubs);
module.exports = router;
