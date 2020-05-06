const express = require('express');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const connectFlash = require('connect-flash');
// const expressSession = require('express-session');

// Initials
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middlewares
app.use(express.urlencoded({ extended: false })); // Req.body a JSON
app.use(methodOverride('_method')); // Importante: usarlo antes de otros middlewares que pidan el verbo
app.use(morgan('dev')); // Log de la app
app.use(connectFlash()); // Agrega al request un metodo flash => req.flash()
// app.use(
// 	// Agrega al request req.session y mantiene en session
// 	expressSession({ secret: 'secret', resave: true, saveUninitialized: true })
// );

// Global variables
app.use((req, res, next) => {
	// Aca se acceden de forma global a las variables guardadas en flash

	next();
});

// Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/news.routes'));
app.use(require('./routes/editions.routes'));
app.use(require('./routes/stories.routes'));
app.use(require('./routes/admin/clubs.router'));
app.use(require('./routes/admin/editions.routes'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
