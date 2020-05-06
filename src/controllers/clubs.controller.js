const { uploadImage } = require('../helpers/uploadImage');
const clubsController = {};
const Club = require('../models/Club');

// Funciones
clubsController.listClubs = async (req, res) => {
	const clubs = await Club.find();

	res.render('models/clubs/list', { clubs });
};

clubsController.createClubs = (req, res) => {
	res.render('models/clubs/create');
};

clubsController.storeClubs = async (req, res) => {
	try {
		// Subir imagen
		const imagePath = uploadImage(req, '/images/clubs/');

		// Guardar en BD
		const club = new Club({
			name: req.body.name,
			shield: imagePath,
			country: req.body.country,
		});

		await club.save();
	} catch (e) {
		console.log(e);
	}

	res.redirect('/clubs/create');
};

clubsController.editClubs = async (req, res) => {
	try {
		const club = await Club.findById(req.params.id).lean();

		res.render('models/clubs/edit', { club });
	} catch (e) {
		console.log(e);
	}
};

clubsController.updateClubs = async (req, res) => {
	try {
		// Subir imagen
		const imagePath = uploadImage(req, '/images/clubs/');

		const newClub = {
			name: req.body.name,
			shield: imagePath,
			country: req.body.country,
		};

		const club = await Club.findByIdAndUpdate(req.params.id, newClub);

		res.redirect('/clubs/' + club._id + '/edit');
	} catch (e) {
		console.log(e);
	}
};

clubsController.destroyClubs = (req, res) => {
	res.send('saved');
};

module.exports = clubsController;
