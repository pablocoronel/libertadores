const Story = require('../models/Story');
const { uploadImage } = require('../helpers/uploadImage');
const storiesController = {};

// Funciones
storiesController.renderStories = async (req, res) => {
	const stories = await Story.find().sort({ createAt: 'desc' });

	res.render('stories', { stories });
};

storiesController.storeStories = async (req, res) => {
	try {
		const { title, content } = req.body;
		const author = req.user._id;

		// Subir imagen de portada
		const randomCode = Math.random().toString(36).substr(2, 5);
		const { cover } = uploadImage(req, randomCode, '/images/stories');

		// crear
		const story = new Story({ title, content, cover, author });

		await story.save();

		req.flash('messageSuccess', 'Historia creada correctamente');
		res.redirect('back');
	} catch (error) {
		console.log(error);
	}
};

storiesController.showStory = async (req, res) => {
	try {
		const story = await Story.findById(req.params.id).orFail();

		res.render('stories-show', { story });
	} catch (error) {
		console.log(error);

		if (
			error.name == 'DocumentNotFoundError' ||
			error.name == 'CastError'
		) {
			res.redirect('/stories');
		}
	}
};
module.exports = storiesController;
