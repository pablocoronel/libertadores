const passport = require('../helpers/authentication.passport'); // estrategias de passport

const authenticationController = {};

authenticationController.renderSignup = (req, res) => {
	res.render('signup');
};

authenticationController.signup = passport.authenticate('local-signup', {
	successRedirect: '/login',
	failureRedirect: '/signup',
	failureFlash: true,
	successFlash: { type: 'successMessage', message: 'Ok' }, // pisa el flash de la funcion
});

authenticationController.renderLogin = (req, res) => {
	res.render('login');
};

authenticationController.login = (req, res) => {};

authenticationController.logout = (req, res) => {};

module.exports = authenticationController;
