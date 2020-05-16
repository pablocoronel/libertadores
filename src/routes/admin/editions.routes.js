const { Router } = require('express');
const router = Router();
const path = require('path');
const multer = require('multer');
const upload = multer({
	dest: path.join(__dirname, '../../public/images/covers'),
});

// Funciones
const {
	listEditions,
	createEditions,
	storeEditions,
} = require('../../controllers/admin/editions.controller');

// Rutas
router.get('/admin/editions', listEditions);
router.get('/admin/editions/create', createEditions);
router.post(
	'/admin/editions',
	[upload.fields([{ name: 'cover' }, { name: 'squad' }])],
	storeEditions
);

module.exports = router;
