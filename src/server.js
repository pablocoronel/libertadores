const express = require('express');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const expressSession = require('express-session');
const connectFlash = require('connect-flash');

// Initials
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middlewares
app.use(morgan('dev')); // Log de la app
app.use(express.urlencoded({ extended: false })); // Req.body a JSON
app.use(methodOverride('_method')); // Importante: usarlo antes de otros middlewares que pidan el verbo
app.use(
	// Agrega al request req.session y mantiene en session
	expressSession({
		secret: process.env.SESSION_KEY_SECRET,
		resave: true,
		saveUninitialized: true,
	})
);
app.use(connectFlash()); // (necesita express-session) Agrega al request un metodo flash => req.flash()

// Global variables
app.use((req, res, next) => {
	// Aca se setea en RES de forma global a las variables guardadas en REQ flash
	res.locals.messageSuccess = req.flash('messageSuccess');
	res.locals.messageError = req.flash('messageError');
	res.locals.messageErrorFormModel = req.flash('messageErrorFormModel');

	next();
});

// Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/news.routes'));
app.use(require('./routes/editions.routes'));
app.use(require('./routes/stories.routes'));
app.use(require('./routes/admin/index.router'));
app.use(require('./routes/admin/clubs.router'));
app.use(require('./routes/admin/matches.router'));
app.use(require('./routes/admin/editions.routes'));
app.use(require('./routes/authentication.routes'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
