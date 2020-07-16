const path = require('path');
const fs = require('fs');

/**
 *
 * @param {Request} req - Request
 * @param {String} baseNameImage - Nombre personalizado para la imagen
 * @param  {String[]} folderImage - Array de carpetas (según orden de declaracion en el metodo fields de Multer)
 *
 * @return {Object} - Objeto con rutas relativas a las imagenes subidas (según orden de declarcion en el metodo fields de Multer), las claves del objeto devuelto son la propiedad name del metodo fields de Multer (en middleware pasado en el router)
 */
const uploadImage = (req, baseNameImage, ...folderImage) => {
	if (req.file === undefined && req.files === undefined) {
		return null;
	}

	const file = req.file || req.files;
	const mimeOk = ['image/jpeg', 'image/png', 'image/gif'];

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
