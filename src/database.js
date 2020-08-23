const mongoose = require('mongoose');

// Datos de conexion
const { MONGODB_PROTOCOL, MONGODB_DATABASE, MONGODB_HOST } = process.env;

// Url conexion
const MONGODB_URI = `${MONGODB_PROTOCOL}://${MONGODB_HOST}/${MONGODB_DATABASE}`;

// Conexion
mongoose
	.connect(MONGODB_URI, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
	})
	.then((db) => console.log('Connected to database: ' + db.connection.name))
	.catch((err) => console.log(err));
