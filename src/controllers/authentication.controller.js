const authenticationController = {};

authenticationController.renderSignup = (req, res) => {
	res.render('signup');
};

authenticationController.signup = (req, res) => {};

authenticationController.renderLogin = (req, res) => {
	res.render('login');
};

authenticationController.login = (req, res) => {};

authenticationController.logout = (req, res) => {};

module.exports = authenticationController;
