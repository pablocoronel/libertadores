const editionsController = {};

// WEB
editionsController.renderEditions = (req, res) => {
	res.render('editions');
};

// CRUD
editionsController.renderEditionsCreate = (req, res) => {
	res.render('models/editions/create');
};

editionsController.createEditions = (req, res) => {
	console.log('guardar edicion');
};

module.exports = editionsController;
