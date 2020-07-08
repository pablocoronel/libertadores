const indexController = {};

indexController.renderIndex = (req, res) => {
	res.render('admin/index/index');
};

module.exports = indexController;
