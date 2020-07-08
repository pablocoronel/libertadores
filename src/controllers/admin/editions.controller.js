const editionsController = {};
const Edition = require('../../models/Edition');
const Club = require('../../models/Club');
const Match = require('../../models/Match');
const { uploadImage } = require('../../helpers/uploadImage');

const countries = [
	'argentina',
	'bolivia',
	'brasil',
	'chile',
	'colombia',
	'ecuador',
	'méxico',
	'paraguay',
	'perú',
	'uruguay',
	'venezuela',
];

// CRUD
editionsController.listEditions = async (req, res) => {
	try {
		const editions = await Edition.find();

		res.render('admin/editions/list', { editions });
	} catch (error) {
		console.log(error);
	}
};

editionsController.createEditions = async (req, res) => {
	try {
		const clubs = await Club.find();
		const matches = await Match.find();

		res.render('admin/editions/create', {
			clubs,
			matches,
			countries,
		});
	} catch (error) {
		console.log(error);
	}
};

editionsController.storeEditions = async (req, res) => {
	try {
		const {
			year,
			champion,
			video,
			topScorerName,
			topScorerNationality,
			topScorerClub,
			topScorerCountryClub,
			topScorerGoals,
			final,
		} = req.body;

		// subida de imagenes
		const { squad, cover } = uploadImage(
			req,
			req.body.year,
			'/images/covers',
			'/images/squads'
		);

		const newEdition = new Edition({
			year,
			champion,
			video,
			topScorerName,
			topScorerNationality,
			topScorerClub,
			topScorerCountryClub,
			topScorerGoals,
			squad,
			cover,
			final,
		});

		await newEdition.save();

		req.flash('messageSuccess', 'Guardado');
		res.redirect('back');
	} catch (error) {
		console.log(error);
	}
};

editionsController.editEditions = async (req, res) => {
	try {
		const edition = await Edition.findById(req.params.id)
			.populate('champion')
			.populate('final')
			.orFail();

		const clubs = await Club.find();
		const matches = await Match.find();

		res.render('admin/editions/edit', {
			edition,
			clubs,
			matches,
			countries,
		});
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

editionsController.updateEditions = async (req, res) => {
	try {
		const {
			year,
			champion,
			video,
			topScorerName,
			topScorerNationality,
			topScorerClub,
			topScorerCountryClub,
			topScorerGoals,
			final,
		} = req.body;

		const defaultImages = await Edition.findById(
			req.params.id,
			'cover squad'
		);

		// * Tiene paths por defecto en caso de no subir ambas imagenes
		const {
			cover = defaultImages.cover,
			squad = defaultImages.squad,
		} = uploadImage(req, year, '/images/covers', '/images/squads');

		// * nuevo document
		const updatedEdition = {
			year,
			champion,
			video,
			topScorerName,
			topScorerNationality,
			topScorerClub,
			topScorerCountryClub,
			topScorerGoals,
			cover,
			squad,
			final,
		};

		await Edition.findByIdAndUpdate(req.params.id, updatedEdition, {
			runValidators: true,
		});

		req.flash('messageSuccess', 'Editado');
		res.redirect('back');
	} catch (error) {
		console.log(error);
	}
};

editionsController.destroyEditions = async (req, res) => {
	try {
		await Edition.findByIdAndDelete(req.params.id);

		req.flash('messageSuccess', 'Edición borrada');
		res.redirect('back');
	} catch (error) {
		console.log(error);
	}
};
module.exports = editionsController;
