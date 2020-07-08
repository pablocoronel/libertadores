const matchesController = {};
const Match = require('../../models/Match');
const Club = require('../../models/Club');

// Funciones
matchesController.listMatches = async (req, res) => {
	try {
		const matches = await Match.find();

		res.render('admin/matches/list', { matches });
	} catch (error) {
		console.log(error);
	}
};

matchesController.createMatches = async (req, res) => {
	try {
		const clubs = await Club.find();

		res.render('admin/matches/create', { clubs });
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
			comment,
			homeClub,
			homeScore,
			awayClub,
			awayScore,
		} = req.body;

		const match = new Match({
			year,
			order,
			place,
			comment,
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

matchesController.editMatches = async (req, res) => {
	try {
		const match = await Match.findById(req.params.id)
			.populate('homeClub')
			.populate('awayClub')
			.orFail();

		const clubs = await Club.find();

		res.render('admin/matches/edit', { match, clubs });
	} catch (error) {
		console.log(error);

		if (error.name === 'CastError') {
			res.redirect('/admin');
		}

		if (error.name === 'DocumentNotFoundError') {
			res.redirect('/admin');
		}
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
			comment,
			homeClub,
			homeScore,
			awayClub,
			awayScore,
		} = req.body;

		const updatedMatch = {
			year,
			place,
			order,
			comment,
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
		console.log(error);
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
