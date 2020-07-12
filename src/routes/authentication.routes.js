const { Router } = require('express');
const router = Router();
const validations = require('../middlewares/validation');

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
router.post('/signup/save', validations.signup, signup);
router.get('/login', renderLogin);
router.post('/login/save', validations.login, login);
router.post('/logout', logout);

module.exports = router;
