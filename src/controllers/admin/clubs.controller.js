const { uploadImage } = require('../../helpers/uploadImage');
const clubsController = {};
const Club = require('../../models/Club');

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

// Funciones
clubsController.listClubs = async (req, res) => {
	try {
		const clubs = await Club.find().sort({ name: 'asc' });

		res.render('admin/clubs/list', { clubs });
	} catch (error) {
		console.log(error);
	}
};

clubsController.createClubs = (req, res) => {
	res.render('admin/clubs/create', { countries });
};

clubsController.storeClubs = async (req, res) => {
	try {
		// Subir imagen
		const imagePath = uploadImage(req, {
			shield: {
				name: req.body.name,
				folder: '/images/clubs/',
			},
		});

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

	req.flash('messageSuccess', 'Club guardado');
	res.redirect('/admin/clubs/create');
};

clubsController.editClubs = async (req, res) => {
	try {
		const club = await Club.findById(req.params.id).orFail().lean();

		res.render('admin/clubs/edit', { club, countries });
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

clubsController.updateClubs = async (req, res) => {
	try {
		// Subir imagen
		const imagePath = uploadImage(req, {
			shield: {
				name: req.body.name,
				folder: '/images/clubs/',
			},
		});

		const updatedClub = {
			name: req.body.name,
			country: req.body.country,
		};

		if (imagePath !== null) {
			updatedClub.shield = imagePath;
		}

		const club = await Club.findByIdAndUpdate(req.params.id, updatedClub);

		req.flash('messageSuccess', 'Club editado');
		res.redirect('/admin/clubs/' + club._id + '/edit');
	} catch (e) {
		console.log(e);
	}
};

clubsController.destroyClubs = async (req, res) => {
	try {
		await Club.findByIdAndDelete(req.params.id);

		req.flash('messageSuccess', 'Club eliminado');
		res.redirect('/admin/clubs');
	} catch (e) {
		console.log(e);
	}
};

module.exports = clubsController;
