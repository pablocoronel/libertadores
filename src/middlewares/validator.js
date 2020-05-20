const { check, validationResult } = require('express-validator');

//? Validaciones con express-validator (no mongoose Schema)
const validator = {};

// Club
validator.storeClub = [
	check('name').isLength({ min: 1 }).withMessage('Nombre: Campo obligatorio'),
	check('shield').custom((value, { req }) => {
		const mimeOk = ['image/jpeg', 'image/png'];

		if (req.file === undefined) {
			throw new Error('Escudo: Campo obligatorio papu');
		} else if (!mimeOk.includes(req.file.mimetype)) {
			throw new Error('Escudo: No es una imagen valida');
		}

		return true;
	}),
	check('country')
		.isLength({ min: 1 })
		.withMessage('País: Campo obligatorio')
		.bail()
		.isAlpha()
		.withMessage('País: Debe ser un texto'),
	(req, res, next) => {
		const errors = validationResult(req);

		// Si hay errores
		if (!errors.isEmpty()) {
			req.flash('messageError', errors.array());
			res.redirect('back');
		} else {
			next();
		}
	},
];

validator.updateClub = [
	check('name').isLength({ min: 1 }).withMessage('Nombre: Campo obligatorio'),
	check('shield').custom((value, { req }) => {
		const mimeOk = ['image/jpeg', 'image/png'];

		if (req.file !== undefined) {
			if (!mimeOk.includes(req.file.mimetype)) {
				throw new Error('Escudo: No es una imagen valida');
			}
		}

		return true;
	}),
	check('country')
		.isLength({ min: 1 })
		.withMessage('País: Campo obligatorio')
		.bail()
		.isAlpha()
		.withMessage('País: Debe ser un texto'),
	(req, res, next) => {
		const errors = validationResult(req);

		// Si hay errores
		if (!errors.isEmpty()) {
			req.flash('messageError', errors.array());
			res.redirect('back');
		} else {
			next();
		}
	},
];

// Match

// Edition
validator.storeEdition = [
	check('year')
		.isLength({ min: 1 })
		.withMessage('Año es un campo obligatorio')
		.bail() // detiene la validacion si hubo error
		.isInt()
		.withMessage('Año debe ser un número'),
	check('champion')
		.isLength({ min: 1 })
		.withMessage('Campeón es un campo obligatorio'),
	check('cover').custom((value, { req }) => {
		const mimeOk = ['image/jpeg', 'image/png'];

		if (req.files.cover === undefined) {
			throw new Error('Portada es un campo obligatorio');
		} else if (!mimeOk.includes(req.files.cover[0].mimetype)) {
			throw new Error('Portada no es un archivo válido');
		} else {
			return true;
		}
	}),
	check('squad').custom((value, { req }) => {
		const mimeOk = ['image/jpeg', 'image/png'];

		if (req.files.squad === undefined) {
			throw new Error('Plantel es un campo obligatorio');
		} else if (!mimeOk.includes(req.files.squad[0].mimetype)) {
			throw new Error('Plantel no es un archivo válido');
		} else {
			return true;
		}
	}),
	check('topScorerName')
		.isLength({ min: 1 })
		.withMessage('Goleador nombre es un campo obligatorio'),
	check('topScorerGoals')
		.isLength({ min: 1 })
		.withMessage('Goles es un campo obligatorio')
		.bail()
		.isInt()
		.withMessage('Goles debe ser un número'),
	(req, res, next) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			req.flash('messageError', errors.array());
			res.redirect('back');
		} else {
			next();
		}
	},
];

validator.updateEdition = [
	check('year')
		.isLength({ min: 1 })
		.withMessage('Año es un campo obligatorio')
		.bail() // detiene la validacion si hubo error
		.isInt()
		.withMessage('Año debe ser un número'),
	check('champion')
		.isLength({ min: 1 })
		.withMessage('Campeón es un campo obligatorio'),
	check('cover').custom((value, { req }) => {
		const mimeOk = ['image/jpeg', 'image/png'];

		if (req.files.cover !== undefined) {
			if (!mimeOk.includes(req.files.cover[0].mimetype)) {
				throw new Error('Portada no es un archivo válido');
			}
		}

		return true;
	}),
	check('squad').custom((value, { req }) => {
		const mimeOk = ['image/jpeg', 'image/png'];

		if (req.files.squad !== undefined) {
			if (!mimeOk.includes(req.files.squad[0].mimetype)) {
				throw new Error('Plantel no es un archivo válido');
			}
		}

		return true;
	}),
	check('topScorerName')
		.isLength({ min: 1 })
		.withMessage('Goleador nombre es un campo obligatorio'),
	check('topScorerGoals')
		.isLength({ min: 1 })
		.withMessage('Goles es un campo obligatorio')
		.bail()
		.isInt()
		.withMessage('Goles debe ser un número'),
	(req, res, next) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			req.flash('messageError', errors.array());
			res.redirect('back');
		} else {
			next();
		}
	},
];

module.exports = validator;
