const { Router } = require('express');
const router = Router();
const multer = require('multer');
const path = require('path');
// Configuracion de carpeta temporal
const upload = multer({
	dest: path.join(__dirname, '../public/images/stories'),
});
const user = require('../middlewares/permissions').roles;
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
	[user.is('logged'), upload.single('cover'), validations.storeStory],
	storeStory
);
router.get('/stories/:id', showStory);
router.put(
	'/stories/:id',
	[
		user.is('logged'),
		user.can('edit and delete story'),
		upload.single('cover'),
		validations.updateStory,
	],
	updateStory
);
router.delete(
	'/stories/:id',
	[user.is('logged'), user.can('edit and delete story')],
	destroyStory
);

module.exports = router;
