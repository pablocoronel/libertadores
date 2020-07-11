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
	failureFlash: true,
	successFlash: { type: 'successMessage', message: 'Ok' }, // pisa el flash de la funcion
});

authenticationController.renderLogin = (req, res) => {
	res.render('login');
};

authenticationController.login = (req, res) => {};

authenticationController.logout = (req, res) => {};

try {
	passport.use(
		'local-signup',
		new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
				passReqToCallback: true,
			},
			async (req, email, password, done) => {
				let user = await User.findOne({ email: email });
				// si ya existe el usurio...
				if (user) {
					return done(
						null,
						false,
						req.flash(
							'authError',
							'El email ya se encuentra registrado'
						)
					);
				}

				// registrar nuevo usuario
				const newUser = new User({
					email,
					user: req.body.user,
					password: await bcrypt.hash(password, 10),
				});

				await newUser.save();

				return done(
					null,
					newUser,
					req.flash('authSuccess', 'Registrado correctamente')
				);
			}
		)
	);
} catch (error) {
	console.log(error);
}

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user);
	});
});

module.exports = authenticationController;
