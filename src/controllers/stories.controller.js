const storiesController = {};

// Funciones
storiesController.renderStories = (req, res) => {
	res.render('stories');
};

module.exports = storiesController;
