const { Router } = require('express');
const router = Router();
const path = require('path');
const multer = require('multer');
// Configuracion de carpeta temporal
const upload = multer({
	dest: path.join(__dirname, '../../public/images/covers'),
});
const user = require('../../middlewares/permissions').roles;

// Validaciones
const validation = require('../../middlewares/validation');

// Funciones
const {
	listEditions,
	createEditions,
	storeEditions,
	editEditions,
	updateEditions,
	destroyEditions,
} = require('../../controllers/admin/editions.controller');

// Rutas
router.get('/admin/editions', user.is('admin'), listEditions);
router.get('/admin/editions/create', user.is('admin'), createEditions);
router.post(
	'/admin/editions',
	[
		user.is('admin'),
		upload.fields([{ name: 'cover' }, { name: 'squad' }]),
		validation.storeEdition,
	],
	storeEditions
);
router.get('/admin/editions/:id/edit', user.is('admin'), editEditions);
router.put(
	'/admin/editions/:id',
	[
		user.is('admin'),
		upload.fields([{ name: 'cover' }, { name: 'squad' }]),
		validation.updateEdition,
	],
	updateEditions
);
router.delete('/admin/editions/:id', user.is('admin'), destroyEditions);

module.exports = router;
