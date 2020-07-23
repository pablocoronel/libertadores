const ConnectRoles = require('connect-roles');

// initial
const user = new ConnectRoles({
	failureHandler: function (req, res, action) {
		// optional function to customise code that runs when
		// user fails authorisation
		const accept = req.headers.accept || '';
		res.status(403);
		if (~accept.indexOf('html')) {
			res.render('access-denied', { action: action });
		} else {
			res.send("Access Denied - You don't have permission to: " + action);
		}
	},
});

module.exports = user;
