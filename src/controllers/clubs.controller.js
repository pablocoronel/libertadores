const path = require('path');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: path.join(__dirname, '../public/images/clubs') });

const clubsController = {};
const Club = require('../models/Club');

// Funciones
clubsController.listClubs = (req, res) => {
	res.render('models/clubs/list');
};

clubsController.createClubs = (req, res) => {
	res.render('models/clubs/create');
};

clubsController.storeClubs = async (req, res) => {
	const body = req.body;
	const file = req.file;
	const mimeOk = ['image/jpeg', 'image/png'];

	// Image
	const tempPath = file.path;
	const newPath = path.join(
		'images/clubs/',
		body.name.concat('.', file.originalname.split('.').pop())
	);
	const finalPath = path.join(__dirname, '../public', newPath);

	try {
		// Subida de imagen
		if (mimeOk.includes(file.mimetype)) {
			fs.rename(tempPath, finalPath, (err) => {
				if (err) {
					throw err;
				}
			});
		} else {
			throw 'archivo no admitido';
		}

		// Guardar en BD
		const club = new Club({
			name: body.name,
			shield: newPath,
			country: body.country,
		});

		await club.save();
	} catch (e) {
		console.log(e);
	}

	res.redirect('/clubs/create');
};

clubsController.editClubs = (req, res) => {
	res.render('/models/clubs/edit');
};

clubsController.updateClubs = (req, res) => {
	res.send('saved');
};

clubsController.destroyClubs = (req, res) => {
	res.send('saved');
};

module.exports = { ...clubsController, upload };
