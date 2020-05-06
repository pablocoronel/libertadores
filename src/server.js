const express = require('express');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');

// Initials
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middlewares
app.use(morgan('dev')); // Log de la app
app.use(express.urlencoded({ extended: false })); // Req.body a JSON
app.use(methodOverride('_method'));

// Global variables

// Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/editions.routes'));
app.use(require('./routes/news.routes'));
app.use(require('./routes/stories.routes'));
app.use(require('./routes/clubs.router'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
