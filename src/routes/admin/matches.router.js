const { Router } = require('express');
const router = Router();

// Funciones
const controller = require('../../controllers/admin/matches.controller');

// Rutas
router.get('/admin/matches', controller.listMatches);
router.get('/admin/matches/create', controller.createMatches);
router.post('/admin/matches', controller.storeMatches);

module.exports = router;
