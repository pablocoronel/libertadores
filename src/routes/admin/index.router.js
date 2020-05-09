const { Router } = require('express');
const router = Router();

// Funciones
const { renderIndex } = require('../../controllers/admin/index.controller');

// Rutas
router.get('/admin', renderIndex);

module.exports = router;
