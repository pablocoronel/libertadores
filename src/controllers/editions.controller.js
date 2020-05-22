const editionsController = {};
const Edition = require('../models/Edition');

// Funciones
editionsController.renderEditions = async (req, res) => {
	try {
		const allEditions = await Edition.find().sort({ year: 'asc' });
		const matrixEditions = [];

		allEditions.map((edition, index) => {
			if (index % 5 == 0) {
				matrixEditions.push(allEditions.slice(index, index + 5));
			}
		});

		res.render('editions', { editions: matrixEditions });
	} catch (error) {
		console.log(error);
	}
};

module.exports = editionsController;
