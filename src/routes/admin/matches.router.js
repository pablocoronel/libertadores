const { Router } = require('express');
const router = Router();

// Funciones
const controller = require('../../controllers/admin/matchs.controller');

// Rutas
router.get('/admin/matches', controller.listMatches);

module.exports = router;
