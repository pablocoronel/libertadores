const editionsController = {};
const Edition = require('../models/Edition');

// Funciones
editionsController.listEditions = async (req, res) => {
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

editionsController.showEdition = async (req, res) => {
	try {
		const edition = await Edition.findById(req.params.id)
			.populate('champion')
			.populate({
				path: 'final',
				populate: [{ path: 'homeClub awayClub' }],
				options: { sort: { order: 1 } },
			})
			.orFail();

		res.render('edition', { edition });
	} catch (error) {
		console.log(error);

		if (
			error.name == 'DocumentNotFoundError' ||
			error.name == 'CastError'
		) {
			res.redirect('/editions');
		}
	}
};

module.exports = editionsController;
