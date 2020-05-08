const mimeOk = ['image/jpeg', 'image/png'];

//* Funciona con express-validator
/**
 *
 * @param {Request} req - request
 * @param {Result<ValidationError>} errors - variable de errores de express-validator
 * @param {Boolean} required - indica si el archivo es obligatorio
 */
const imageValidate = (req, errors, required) => {
	if (req.file === undefined && required) {
		errors.errors.push({
			value: '',
			msg: 'Imagen: Campo obligatorio',
			param: 'shield',
			location: 'file',
		});
	}

	if (req.file !== undefined) {
		if (!mimeOk.includes(req.file.mimetype)) {
			errors.errors.push({
				value: '',
				msg: 'Imagen: No es un archivo válido',
				param: 'shield',
				location: 'file',
			});
		}
	}
};

module.exports = { imageValidate };
