const Story = require('../models/Story');
const storiesController = {};

// Funciones
storiesController.renderStories = (req, res) => {
	res.render('stories');
};

storiesController.storeStories = async (req, res) => {
	try {
		const { title, content } = req.body;
		const author = req.user._id;

		const story = new Story({ title, content, author });

		await story.save();

		req.flash('messageSuccess', 'Historia creada correctamente');
		res.redirect('back');
	} catch (error) {
		console.log(error);
	}
};

module.exports = storiesController;
