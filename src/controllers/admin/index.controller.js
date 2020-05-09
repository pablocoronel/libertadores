const indexController = {};

indexController.renderIndex = (req, res) => {
	res.render('models/index/index');
};

module.exports = indexController;
