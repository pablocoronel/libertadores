const { Router } = require('express');

// Router para cargar las rutas
const router = Router();

// Funciones en el controller
const { renderIndex } = require('./../controllers/index.controller');

// Rutas
router.get('/', renderIndex);

module.exports = router;
