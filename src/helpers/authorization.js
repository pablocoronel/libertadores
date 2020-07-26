const ConnecRoles = require('connect-roles');
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

// permisos
roles.use('access admin page', (req) => {
	if (req.user && req.user.role === 'admin') {
		return true;
	}
});

module.exports = roles;
