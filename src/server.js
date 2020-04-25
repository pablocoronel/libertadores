const express = require('express');
const path = require('path');

// Initials
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

// Middlewares

// Global variables

// Routes

// Static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
