const { Router } = require('express');
const router = Router();

// Funciones
const {
	login,
	logout,
	signup,
	renderLogin,
	renderSignup,
} = require('../controllers/authentication.controller');

// rutas
router.get('/signup', renderSignup);
router.post('/signup/save', signup);
router.get('/login', renderLogin);
router.post('/login/save', login);
router.post('/logout', logout);

module.exports = router;
