const path = require('path');
const fs = require('fs');

/**
 *
 * @param {Request} req - Request
 * @param  {Object} dataFile - Object con nombre/s de carpeta/s y archivo/s, {fieldName: {name: String, folder: String}, {...}}
 *
 * @return {Object} - Objeto (o String para single) con rutas relativas a las imagenes subidas (según orden de declarcion en el metodo fields de Multer), las claves del objeto devuelto son la propiedad name del metodo fields de Multer (en middleware pasado en el router)
 */
const uploadImage = (req, dataFile) => {
	if (req.file === undefined && req.files === undefined) {
		return null;
	}

	const file = req.file || req.files;
	const mimeOk = ['image/jpeg', 'image/png', 'image/gif'];

	//* Varias imagenes
	if (req.files !== undefined) {
		const uploadedFilePaths = {};
		const imagesField = Object.entries(file);

		imagesField.forEach((fileField) => {
			fileField[1].forEach((image) => {
				const tempPath = image.path;
				const mimetype = image.mimetype;
				const fieldname = image.fieldname;
				const folder = dataFile[image.fieldname].folder;
				const name = dataFile[image.fieldname].name;
				const originalname = image.originalname.split('.').pop();

				const fullName = fieldname.concat('-', name, '.', originalname);
				const newPath = path.join(folder, fullName);
				const finalPath = path.join(__dirname, '../public', newPath);

				// Subida de imagen
				if (mimeOk.includes(mimetype)) {
					fs.rename(tempPath, finalPath, (err) => {
						if (err) {
							throw err;
						}
					});

					uploadedFilePaths[fieldname] = newPath;
				} else {
					throw 'archivo no admitido';
				}
			});
		});

		return uploadedFilePaths;
	} else {
		//* Una sola imagen
		const tempPath = file.path;
		const folder = dataFile[file.fieldname].folder;
		const name = dataFile[file.fieldname].name;
		const originalname = file.originalname.split('.').pop();
		const mimetype = file.mimetype;

		const newPath = path.join(folder, name.concat('.', originalname));
		const finalPath = path.join(__dirname, '../public', newPath);

		// Subida de imagen
		if (mimeOk.includes(mimetype)) {
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
