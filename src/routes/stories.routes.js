const { Router } = require('express');
const router = Router();

// Funciones
const {
	renderStories,
	storeStories,
} = require('../controllers/stories.controller');

// Rutas
router.get('/stories', renderStories);
router.post('/stories', storeStories);

module.exports = router;
