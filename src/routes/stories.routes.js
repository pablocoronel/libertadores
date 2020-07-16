const { Router } = require('express');
const router = Router();
const multer = require('multer');
const path = require('path');
// Configuracion de carpeta temporal
const upload = multer({
	dest: path.join(__dirname, '../public/images/stories'),
});

const permissions = require('../middlewares/permissions');
// Funciones
const {
	renderStories,
	storeStories,
	showStory,
} = require('../controllers/stories.controller');

// Rutas
router.get('/stories', renderStories);
router.post(
	'/stories',
	[permissions.islogged, upload.fields([{ name: 'cover' }])],
	storeStories
);
router.get('/stories/:id', showStory);

module.exports = router;
