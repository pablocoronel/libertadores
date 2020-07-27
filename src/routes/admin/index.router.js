const { Router } = require('express');
const router = Router();
const user = require('../../middlewares/permissions').roles;

// Funciones
const { renderIndex } = require('../../controllers/admin/index.controller');

// Rutas
router.get('/admin', user.is('admin'), renderIndex);

module.exports = router;
