const { Router } = require('express');
const router = Router();
const permissions = require('../../middlewares/permissions');
const roles = require('../../helpers/authorization');

// Funciones
const { renderIndex } = require('../../controllers/admin/index.controller');

// Rutas
router.get(
	'/admin',
	[roles.can('access admin page')],
	permissions.islogged,
	renderIndex
);

module.exports = router;
