const storiesController = {};

// Funciones
storiesController.renderStories = (req, res) => {
	res.render('stories');
};

storiesController.storeStories = (req, res) => {
	res.redirect('back');
};

module.exports = storiesController;
