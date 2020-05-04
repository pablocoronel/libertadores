const express = require('express');
const path = require('path');

// Initials
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middlewares

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
