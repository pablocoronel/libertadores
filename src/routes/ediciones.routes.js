const { Router } = require('express');
const router = Router();

// Funciones
const {
	renderEdiciones,
    renderEdicionesCrear,
    createEdiciones
} = require('../controllers/ediciones.controller');

// Rutas
router.get('/ediciones', renderEdiciones);
router.get('/ediciones/crear', renderEdicionesCrear);
router.post('/ediciones/crear', createEdiciones)

module.exports = router;
