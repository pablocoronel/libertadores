const permissions = {};

permissions.islogged = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect('/');
	}
};

module.exports = permissions;
