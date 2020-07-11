const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

const authenticationController = {};

authenticationController.renderSignup = (req, res) => {
	res.render('signup');
};

authenticationController.signup = passport.authenticate('local-signup', {
	successRedirect: '/login',
	failureRedirect: '/signup',
	failureFlash: { type: 'messageError', message: 'Mal' },
	successFlash: { type: 'successMessage', message: 'Ok' },
});

authenticationController.renderLogin = (req, res) => {
	res.render('login');
};

authenticationController.login = (req, res) => {};

authenticationController.logout = (req, res) => {};

passport.use(
	'local-signup',
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true,
		},
		async (req, email, password, done) => {
			let user = await User.find({ email });
			// si ya existe el usurio...
			if (user) {
				return done(
					null,
					false,
					req.flash(
						'messageError',
						'El email ya se encuentra registrado'
					)
				);
			}

			// registrar nuevo usuario
			const newUser = new User({
				email,
				user: req.body.user,
				password: await bcrypt.hash(password),
			});

			await newUser.save();

			return done(null, newUser);
		}
	)
);

module.exports = authenticationController;
