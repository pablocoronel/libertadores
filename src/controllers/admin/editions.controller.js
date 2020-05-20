const editionsController = {};
const Edition = require('../../models/Edition');
const Club = require('../../models/Club');
const { uploadImage } = require('../../helpers/uploadImage');

// CRUD
editionsController.listEditions = async (req, res) => {
	try {
		const editions = await Edition.find();

		res.render('models/editions/list', { editions });
	} catch (error) {
		console.log(error);
	}
};

editionsController.createEditions = async (req, res) => {
	try {
		const clubs = await Club.find();

		res.render('models/editions/create', { clubs });
	} catch (error) {
		console.log(error);
	}
};

editionsController.storeEditions = async (req, res) => {
	try {
		const { year, champion, topScorerName, topScorerGoals } = req.body;

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
			topScorerGoals,
			topScorerName,
			squad,
			cover,
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
			.orFail();

		const clubs = await Club.find();

		res.render('models/editions/edit', { edition, clubs });
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
		const { year, champion, topScorerName, topScorerGoals } = req.body;

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
			topScorerName,
			topScorerGoals,
			cover,
			squad,
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
