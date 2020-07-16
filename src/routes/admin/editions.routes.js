const { Router } = require('express');
const router = Router();
const path = require('path');
const multer = require('multer');
// Configuracion de carpeta temporal
const upload = multer({
	dest: path.join(__dirname, '../../public/images/covers'),
});
const permissions = require('../../middlewares/permissions');

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
router.get('/admin/editions', permissions.islogged, listEditions);
router.get('/admin/editions/create', permissions.islogged, createEditions);
router.post(
	'/admin/editions',
	[
		upload.fields([{ name: 'cover' }, { name: 'squad' }]),
		validation.storeEdition,
		permissions.islogged,
	],
	storeEditions
);
router.get('/admin/editions/:id/edit', permissions.islogged, editEditions);
router.put(
	'/admin/editions/:id',
	[
		upload.fields([{ name: 'cover' }, { name: 'squad' }]),
		validation.updateEdition,
		permissions.islogged,
	],
	updateEditions
);
router.delete('/admin/editions/:id', permissions.islogged, destroyEditions);

module.exports = router;
