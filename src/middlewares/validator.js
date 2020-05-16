const { check, validationResult } = require('express-validator');

//? Validaciones con express-validator (no mongoose Schema)
const validator = {};

validator.storeClub = [
	check('name').isLength({ min: 1 }).withMessage('Nombre: Campo obligatorio'),
	check('country')
		.isLength({ min: 1 })
		.withMessage('País: Campo obligatorio'),
	(req, res, next) => {
		const errors = validationResult(req);

		// Files
		imageValidate(req, errors, true);

		// Si hay errores
		if (!errors.isEmpty()) {
			req.flash('messageError', errors.array());
			// res.redirect('/admin/clubs/create');
			res.redirect('back');
		} else {
			next();
		}
	},
];

validator.updateClub = [
	check('name').isLength({ min: 1 }).withMessage('Nombre: Campo obligatorio'),
	check('country')
		.isLength({ min: 1 })
		.withMessage('País: Campo obligatorio'),
	(req, res, next) => {
		const errors = validationResult(req);

		// Files
		imageValidate(req, errors, false);

		// Si hay errores
		if (!errors.isEmpty()) {
			req.flash('messageError', errors.array());
			// res.redirect('/admin/clubs/create');
			res.redirect('back');
		} else {
			next();
		}
	},
];

/**
 *? Validacion de la imagen recibida
 * @param {Request} req - request
 * @param {Result<ValidationError>} errors - variable de errores de express-validator
 * @param {Boolean} required - indica si el archivo es obligatorio
 */
const imageValidate = (req, errors, required) => {
	const mimeOk = ['image/jpeg', 'image/png'];

	if (req.file === undefined && required) {
		errors.errors.push({
			value: '',
			msg: 'Imagen: Campo obligatorio',
		});
	}

	if (req.file !== undefined) {
		if (!mimeOk.includes(req.file.mimetype)) {
			errors.errors.push({
				value: '',
				msg: 'Imagen: No es un archivo válido',
			});
		}
	}
};
module.exports = validator;
