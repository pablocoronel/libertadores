const { Router } = require('express');
const router = Router();
const user = require('../../middlewares/permissions').roles;

// Validaciones
const validation = require('../../middlewares/validation');

// Funciones
const controller = require('../../controllers/admin/matches.controller');

// Rutas
router.get('/admin/matches', user.is('admin'), controller.listMatches);
router.get('/admin/matches/create', user.is('admin'), controller.createMatches);
router.post(
	'/admin/matches',
	[user.is('admin'), validation.storeMatch],
	controller.storeMatches
);
router.get('/admin/matches/:id/edit', user.is('admin'), controller.editMatches);
router.put(
	'/admin/matches/:id',
	[user.is('admin'), validation.updateMatch],
	controller.updateMatches
);
router.delete(
	'/admin/matches/:id',
	user.is('admin'),
	controller.destroyMatches
);

module.exports = router;
