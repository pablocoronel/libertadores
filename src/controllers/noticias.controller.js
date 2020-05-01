const noticiasController = {};

// Funciones
noticiasController.renderNoticias = (req, res) => {
	res.render('noticias');
};

module.exports = noticiasController;
