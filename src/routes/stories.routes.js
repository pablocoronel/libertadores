const { Router } = require('express');
const router = Router();
const multer = require('multer');
const path = require('path');
// Configuracion de carpeta temporal
const upload = multer({
	dest: path.join(__dirname, '../public/images/stories'),
});

const { permissions } = require('../middlewares/permissions');
const validations = require('../middlewares/validation');
// Funciones
const {
	renderStories,
	storeStory,
	showStory,
	updateStory,
	destroyStory,
} = require('../controllers/stories.controller');

// Rutas
router.get('/stories', renderStories);
router.post(
	'/stories',
	[permissions.islogged, upload.single('cover'), validations.storeStory],
	storeStory
);
router.get('/stories/:id', showStory);
router.put(
	'/stories/:id',
	[
		permissions.islogged,
		permissions.isCreatorOfStory,
		upload.single('cover'),
		validations.updateStory,
	],
	updateStory
);
router.delete(
	'/stories/:id',
	[permissions.islogged, permissions.isCreatorOfStory],
	destroyStory
);

module.exports = router;
