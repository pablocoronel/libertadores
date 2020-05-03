const newsController = {};

// Funciones
newsController.renderNews = (req, res) => {
	res.render('news');
};

module.exports = newsController;
