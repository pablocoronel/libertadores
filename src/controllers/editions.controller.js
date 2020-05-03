const editionsController = {};

// WEB
editionsController.renderEditions = (req, res) => {
	res.render('editions');
};

// CRUD
editionsController.createEditions = (req, res) => {
	res.render('models/editions/create');
};

editionsController.storeEditions = (req, res) => {
	console.log('guardar edicion');
};

module.exports = editionsController;
