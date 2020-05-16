const editionsController = {};
const Edition = require('../../models/Edition');
const Club = require('../../models/Club');
const { uploadImage } = require('../../helpers/uploadImage');
const { editionErrorMessage } = require('../../helpers/messageForCastError');

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
			'images/covers',
			'images/squads'
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

		editionErrorMessage(error);
		req.flash('messageErrorFormModel', Object.values(error.errors));
		res.redirect('back');
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
