const passport = require('../helpers/authentication.passport'); // estrategias de passport

const authenticationController = {};

authenticationController.renderSignup = (req, res) => {
	res.render('signup');
};

authenticationController.signup = passport.authenticate('local-signup', {
	successRedirect: '/login',
	successFlash: true,
	failureRedirect: '/signup',
	failureFlash: true, // permite el flash en la funcion con la estrategia
	// successFlash: { type: 'authSuccess', message: 'Ok' }, // tambien se puede flashear aca el mensaje
});

authenticationController.renderLogin = (req, res) => {
	res.render('login');
};

authenticationController.login = passport.authenticate('local-login', {
	successRedirect: '/',
	successFlash: true,
	failureRedirect: '/login',
	failureFlash: true,
});

authenticationController.logout = (req, res) => {
	req.logout(); // borra la sesion (passport)
	res.redirect('/');
};

module.exports = authenticationController;
