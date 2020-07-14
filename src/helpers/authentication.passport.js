const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

//? Estrategias
try {
	// * Registro
	passport.use(
		'local-signup',
		new LocalStrategy(
			{
				usernameField: 'email', // nombre del campo recibido
				passwordField: 'password', // nombre del campo recibido
				passReqToCallback: true, // permite pasar el request al callback
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

	// * Login
	passport.use(
		'local-login',
		new LocalStrategy(
			{
				passReqToCallback: true, // permite pasar el request al callback
				usernameField: 'email', // nombre del campo recibido
				passwordField: 'password', // nombre del campo recibido
			},
			async (req, email, password, done) => {
				// revisar si existe la combinacion user con pass
				let user = await User.findOne({ email: email });

				let passwordValid =
					user && bcrypt.compareSync(password, user.password);

				if (passwordValid) {
					return done(
						null,
						user,
						req.flash('authSuccess', 'Logueado correctamente')
					);
				}

				return done(
					null,
					false,
					req.flash('authError', 'Usuario o contraseña incorrecta')
				);
			}
		)
	);
} catch (error) {
	console.log(error);
}

// ? Serializar y deserializar
passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user);
	});
});

module.exports = passport;
