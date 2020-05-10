const editionsController = {};

// CRUD
editionsController.createEditions = (req, res) => {
	res.render('models/editions/create');
};

editionsController.storeEditions = (req, res) => {
	console.log('guardar edicion');
};

module.exports = editionsController;
