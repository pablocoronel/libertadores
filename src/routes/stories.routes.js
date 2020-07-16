const { Router } = require('express');
const router = Router();
const permissions = require('../middlewares/permissions');
// Funciones
const {
	renderStories,
	storeStories,
} = require('../controllers/stories.controller');

// Rutas
router.get('/stories', renderStories);
router.post('/stories', permissions.islogged, storeStories);

module.exports = router;
