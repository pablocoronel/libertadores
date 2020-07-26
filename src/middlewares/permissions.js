const ConnecRoles = require('connect-roles');
const Story = require('../models/Story');
const permissions = {};

const roles = new ConnecRoles({
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

// permisos con connect-roles
roles.use('access admin page', (req) => {
	if (req.user && req.user.role === 'admin') {
		return true;
	}
});

// con middleware
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
