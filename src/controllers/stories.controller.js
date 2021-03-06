const Story = require('../models/Story');
const { uploadImage } = require('../helpers/uploadImage');
const storiesController = {};

// Funciones
storiesController.renderStories = async (req, res) => {
	const stories = await Story.find().sort({ createAt: 'desc' });

	res.render('stories', { stories });
};

storiesController.storeStory = async (req, res) => {
	try {
		const { title, content } = req.body;
		const author = req.user._id;

		// Subir imagen de portada
		const randomCode = Math.random().toString(36).substr(2, 5);
		const cover = uploadImage(req, {
			cover: {
				name: 'cover-' + randomCode,
				folder: '/images/stories',
			},
		});

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
		let isCreator = false;

		if (req.isAuthenticated()) {
			const isAdmin = await req.userIs('admin');
			isCreator = story.author.equals(req.user._id) || isAdmin;
		}

		res.render('stories-show', { story, isCreator });
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

storiesController.updateStory = async (req, res) => {
	try {
		const { title, content } = req.body;

		// cover image
		const oldCover = await Story.findById(req.params.id, 'cover');
		const randomCode = Math.random().toString(36).substr(2, 5);

		const newCover = uploadImage(req, {
			cover: {
				name: 'cover-' + randomCode,
				folder: '/images/stories',
			},
		});

		let cover = newCover || oldCover.cover;

		// actualizar en bd
		await Story.findByIdAndUpdate(req.params.id, { title, content, cover });

		req.flash('messageSuccess', 'Historia editada');
		res.redirect('back');
	} catch (error) {
		console.log(error);
	}
};

storiesController.destroyStory = async (req, res) => {
	try {
		await Story.findByIdAndDelete(req.params.id);

		req.flash('messageSuccess', 'Historia eliminada');
		res.redirect('/stories');
	} catch (error) {
		console.log(error);
	}
};

module.exports = storiesController;
