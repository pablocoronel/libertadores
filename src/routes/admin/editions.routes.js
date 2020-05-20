const { Router } = require('express');
const router = Router();
const path = require('path');
const multer = require('multer');
const upload = multer({
	dest: path.join(__dirname, '../../public/images/covers'),
});

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
router.get('/admin/editions', listEditions);
router.get('/admin/editions/create', createEditions);
router.post(
	'/admin/editions',
	[
		upload.fields([{ name: 'cover' }, { name: 'squad' }]),
		validation.storeEdition,
	],
	storeEditions
);
router.get('/admin/editions/:id/edit', editEditions);
router.put(
	'/admin/editions/:id',
	[
		upload.fields([{ name: 'cover' }, { name: 'squad' }]),
		validation.updateEdition,
	],
	updateEditions
);
router.delete('/admin/editions/:id', destroyEditions);

module.exports = router;
