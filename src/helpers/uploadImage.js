const path = require('path');
const fs = require('fs');

const uploadImage = (req, baseNameImage, ...folderImage) => {
	if (req.file === undefined && req.files === undefined) {
		return null;
	}

	const file = req.file || req.files;
	const mimeOk = ['image/jpeg', 'image/png'];

	//* Varias imagenes
	if (req.files !== undefined) {
		const uploadedFilePaths = {};
		const imagesField = Object.entries(file);

		imagesField.forEach((fileField, indexFileField) => {
			const indexField = fileField[0];

			fileField[1].forEach((image) => {
				const tempPath = image.path;
				const newPath = path.join(
					folderImage[indexFileField],
					indexField.concat(
						'-',
						baseNameImage,
						'.',
						image.originalname.split('.').pop()
					)
				);
				const finalPath = path.join(__dirname, '../public', newPath);

				// Subida de imagen
				if (mimeOk.includes(image.mimetype)) {
					fs.rename(tempPath, finalPath, (err) => {
						if (err) {
							throw err;
						}
					});

					uploadedFilePaths[indexField] = newPath;
				} else {
					throw 'archivo no admitido';
				}
			});
		});

		return uploadedFilePaths;
	} else {
		//* Una sola imagen
		const tempPath = file.path;
		const newPath = path.join(
			folderImage[0],
			baseNameImage.concat('.', file.originalname.split('.').pop())
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
	}
};

module.exports = { uploadImage };
