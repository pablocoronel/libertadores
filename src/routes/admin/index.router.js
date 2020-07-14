const { Router } = require('express');
const router = Router();
const permissions = require('../../middlewares/permissions');

// Funciones
const { renderIndex } = require('../../controllers/admin/index.controller');

// Rutas
router.get('/admin', permissions.islogged, renderIndex);

module.exports = router;
