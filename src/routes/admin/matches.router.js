const { Router } = require('express');
const router = Router();

// Validaciones
const validation = require('../../middlewares/validation');

// Funciones
const controller = require('../../controllers/admin/matches.controller');

// Rutas
router.get('/admin/matches', controller.listMatches);
router.get('/admin/matches/create', controller.createMatches);
router.post('/admin/matches', [validation.storeMatch], controller.storeMatches);
router.get('/admin/matches/:id/edit', controller.editMatches);
router.put(
	'/admin/matches/:id',
	[validation.updateMatch],
	controller.updateMatches
);
router.delete('/admin/matches/:id', controller.destroyMatches);

module.exports = router;
