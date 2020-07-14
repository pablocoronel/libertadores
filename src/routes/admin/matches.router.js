const { Router } = require('express');
const router = Router();
const permissions = require('../../middlewares/permissions');

// Validaciones
const validation = require('../../middlewares/validation');

// Funciones
const controller = require('../../controllers/admin/matches.controller');

// Rutas
router.get('/admin/matches', permissions.islogged, controller.listMatches);
router.get(
	'/admin/matches/create',
	permissions.islogged,
	controller.createMatches
);
router.post(
	'/admin/matches',
	[validation.storeMatch, permissions.islogged],
	controller.storeMatches
);
router.get(
	'/admin/matches/:id/edit',
	permissions.islogged,
	controller.editMatches
);
router.put(
	'/admin/matches/:id',
	[validation.updateMatch, permissions.islogged],
	controller.updateMatches
);
router.delete(
	'/admin/matches/:id',
	permissions.islogged,
	controller.destroyMatches
);

module.exports = router;
