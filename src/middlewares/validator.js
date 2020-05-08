const { check, validationResult } = require('express-validator');
const { imageValidate } = require('../helpers/imageValidate');
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

module.exports = validator;
