// require('./config/env.config'); // Carga las variables en .env desde un archivo de configuracion
if (process.env.NODE_ENV === 'development') {
	require('dotenv').config(); // carga el .env
}
const app = require('./server'); // importa el server.js

require('./database'); // importa la configuracion de la BD

// Inicia el server y escucha en el puerto indicado
app.listen(app.get('port'), () => {
	console.log('libertadores app en puerto:', app.get('port'));
});
