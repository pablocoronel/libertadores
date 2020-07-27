const ConnecRoles = require('connect-roles');
const Story = require('../models/Story');
const permissions = {};

const roles = new ConnecRoles({
	async: true,
	failureHandler: function (req, res, action) {
		// optional function to customise code that runs when
		// user fails authorisation
		var accept = req.headers.accept || '';
		res.status(403);
		if (~accept.indexOf('html')) {
			res.redirect('/');
		} else {
			res.send("Access Denied - You don't have permission to: " + action);
		}
	},
});

//? roles
roles.use('admin', async (req) => {
	if (req.user && req.user.role === 'admin') {
		return true;
	}
});

roles.use('logged', async (req) => {
	if (req.isAuthenticated()) {
		return true;
	}
});

// * permisos
roles.use('edit and delete story', async (req) => {
	try {
		const story = await Story.findById(req.params.id, 'author')
			.populate('author')
			.lean()
			.orFail();

		if (story.author && req.user) {
			// Usar equals() de mongoose para comparar ObjectId
			if (story.author._id.equals(req.user._id)) {
				return true;
			}
		}
	} catch (error) {
		console.log(error);
	}
});

permissions.islogged = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect('/');
	}
};

permissions.isCreatorOfStory = async (req, res, next) => {
	try {
		const story = await Story.findById(req.params.id, 'author')
			.populate('author')
			.lean();
		const author = story.author._id;
		const userLogged = req.user._id;

		// Usar equals() de mongoose para comparar ObjectId
		if (author.equals(userLogged)) {
			return next();
		} else {
			res.redirect('back');
		}
	} catch (error) {
		console.log(error);
	}
};

module.exports = { permissions, roles };
