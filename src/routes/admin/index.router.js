const { Router } = require('express');
const router = Router();
const { roles, permissions } = require('../../middlewares/permissions');

// Funciones
const { renderIndex } = require('../../controllers/admin/index.controller');

// Rutas
router.get(
	'/admin',
	[permissions.islogged, roles.can('access admin page')],
	renderIndex
);

module.exports = router;
