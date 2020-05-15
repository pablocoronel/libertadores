const matchesController = {};
const Match = require('../../models/Match');
const Club = require('../../models/Club');
const { matchValidation } = require('../../helpers/messagesValidation');

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
		matchValidation(error);

		console.log(error);

		req.flash('messageErrorFormModel', Object.values(error.errors));
		res.redirect('back');
	}
};

matchesController.editMatches = async (req, res) => {
	try {
		const match = await Match.findById(req.params.id)
			.populate('homeClub')
			.populate('awayClub');

		const clubs = await Club.find();

		res.render('models/matches/edit', { match, clubs });
	} catch (error) {
		console.log(error);
	}
};

matchesController.updateMatches = async (req, res, next) => {
	try {
		const homeScorer = req.body.homeScorer.split(',');
		const awayScorer = req.body.awayScorer.split(',');
		const {
			year,
			place,
			order,
			homeClub,
			homeScore,
			awayClub,
			awayScore,
		} = req.body;

		const updatedMatch = {
			year,
			place,
			order,
			homeClub,
			homeScore,
			homeScorer,
			awayClub,
			awayScore,
			awayScorer,
		};

		await Match.findByIdAndUpdate(req.params.id, updatedMatch, {
			runValidators: true,
		});

		req.flash('messageSuccess', 'Guardado');
		res.redirect('back');
	} catch (error) {
		matchValidation(error);

		console.log(error);

		req.flash('messageErrorFormModel', Object.values(error.errors));
		res.redirect('back');
	}
};

matchesController.destroyMatches = async (req, res) => {
	try {
		await Match.findByIdAndDelete(req.params.id);

		req.flash('messageSuccess', 'Borrado');
		res.redirect('back');
	} catch (error) {
		console.log(error);
	}
};

module.exports = matchesController;
