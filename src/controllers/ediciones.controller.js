const edicionesController = {};

// WEB
edicionesController.renderEdiciones = (req, res) => {
	res.render('ediciones');
};

// CRUD
edicionesController.renderEdicionesCrear = (req, res) => {
	res.render('models/ediciones/create');
};

edicionesController.createEdiciones = (req, res) => {
	console.log('guardar edicion');
};

module.exports = edicionesController;
