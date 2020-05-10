const matchesController = {};
const Match = require('../../models/Match');

// Funciones
matchesController.listMatches = async (req, res) => {
	try {
		const matches = await Match.find();

		res.render('models/matches/list', { matches });
	} catch (error) {
		console.log(error);
	}
};

module.exports = matchesController;
