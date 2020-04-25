const indexController = {}; // Objeto que almacena las funciones

// Funciones
indexController.renderIndex = (req, res) => {
	res.render('index');
};

module.exports = indexController;
