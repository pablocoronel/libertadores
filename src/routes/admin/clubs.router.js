const { Router } = require('express');
const router = Router();
const path = require('path');
const multer = require('multer'); // sirve para subir archivos desde form
// Configuracion de carpeta temporal
const upload = multer({
	dest: path.join(__dirname, '../../public/images/clubs'),
});
const user = require('../../middlewares/permissions').roles;

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
router.get('/admin/clubs', user.is('admin'), listClubs);
router.get('/admin/clubs/create', user.is('admin'), createClubs);
router.post(
	'/admin/clubs',
	[user.is('admin'), upload.single('shield'), validation.storeClub],
	storeClubs
);
router.get('/admin/clubs/:id/edit', user.is('admin'), editClubs);
router.put(
	'/admin/clubs/:id',
	[user.is('admin'), upload.single('shield'), validation.updateClub],
	updateClubs
);
router.delete('/admin/clubs/:id', user.is('admin'), destroyClubs);
module.exports = router;
