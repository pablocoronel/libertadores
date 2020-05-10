const matchesController = {};
const Match = require('../../models/Match');
const Club = require('../../models/Club');

// Funciones
matchesController.listMatches = async (req, res) => {
	try {
		const matches = await Match.find();

		res.render('models/matches/list', { matches });
	} catch (error) {
		console.log(error);
	}
};

matchesController.createMatches = async (req, res) => {
	try {
		const clubs = await Club.find();

		res.render('models/matches/create', { clubs });
	} catch (error) {
		console.log(error);
	}
};

matchesController.storeMatches = async (req, res) => {
	try {
		const homeScorer = req.body.homeScorer.split(',');
		const awayScorer = req.body.awayScorer.split(',');

		const {
			year,
			order,
			place,
			homeClub,
			homeScore,
			awayClub,
			awayScore,
		} = req.body;

		const match = new Match({
			year,
			order,
			place,
			homeClub,
			homeScore,
			homeScorer,
			awayClub,
			awayScore,
			awayScorer,
		});

		await match.save();
		req.flash('messageSuccess', 'Guardado');
		res.redirect('back');
	} catch (error) {
		console.log(error);
	}
};

module.exports = matchesController;
