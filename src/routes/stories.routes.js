const { Router } = require('express');
const router = Router();

// Funciones
const { renderStories } = require('../controllers/stories.controller');

// Rutas
router.get('/stories', renderStories);

module.exports = router;
