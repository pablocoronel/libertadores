const path = require('path');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: path.join(__dirname, '../public/images/clubs') });

const uploadImage = (req, imageFolder) => {
	if (req.file === undefined) {
		return null;
	}

	const body = req.body;
	const file = req.file;
	const mimeOk = ['image/jpeg', 'image/png'];

	// Image
	const tempPath = file.path;
	const newPath = path.join(
		imageFolder,
		body.name.concat('.', file.originalname.split('.').pop())
	);
	const finalPath = path.join(__dirname, '../public', newPath);

	// Subida de imagen
	if (mimeOk.includes(file.mimetype)) {
		fs.rename(tempPath, finalPath, (err) => {
			if (err) {
				throw err;
			}
		});

		return newPath;
	} else {
		throw 'archivo no admitido';
	}
};

module.exports = { upload, uploadImage };
