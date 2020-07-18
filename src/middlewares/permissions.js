const permissions = {};
const Story = require('../models/Story');

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

module.exports = permissions;
