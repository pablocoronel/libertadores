const { check, validationResult } = require('express-validator');

//? Validaciones con express-validator (no mongoose Schema)
const validation = {};

// Club
validation.storeClub = [
	check('name').isLength({ min: 1 }).withMessage('Nombre: Campo obligatorio'),
	check('shield').custom((value, { req }) => {
		const mimeOk = ['image/jpeg', 'image/png', 'image/gif'];

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
		.isAlpha('es-ES')
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

validation.updateClub = [
	check('name').isLength({ min: 1 }).withMessage('Nombre: Campo obligatorio'),
	check('shield').custom((value, { req }) => {
		const mimeOk = ['image/jpeg', 'image/png', 'image/gif'];

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
		.isAlpha('es-ES')
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
validation.storeMatch = [
	check('year')
		.isLength({ min: 1 })
		.withMessage('Año es un campo obligatorio')
		.bail()
		.isInt()
		.withMessage('Año debe ser un número'),
	check('order')
		.isLength({ min: 1 })
		.withMessage('Orden es un campo obligatorio')
		.bail()
		.isInt()
		.withMessage('Orden debe ser un número'),
	check('place')
		.isLength({ min: 1 })
		.withMessage('Estadio y Fecha es un campo obligatorio')
		.bail()
		.not()
		.isNumeric()
		.withMessage('Estadio y Fecha debe ser un texto'),
	check('homeClub')
		.isLength({ min: 1 })
		.withMessage('Club local es un campo obligatorio'),
	check('homeScore')
		.isLength({ min: 1 })
		.withMessage('Marcador local es un campo obligatorio')
		.bail()
		.isInt()
		.withMessage('Marcador local debe ser un número'),
	check('homeScorer')
		.isLength({ min: 1 })
		.withMessage('Goleadores local es un campo obligatorio'),
	check('awayClub')
		.isLength({ min: 1 })
		.withMessage('Club visitante es un campo obligatorio'),
	check('awayScore')
		.isLength({ min: 1 })
		.withMessage('Marcador visitante es un campo obligatorio')
		.bail()
		.isInt()
		.withMessage('Marcador visitante debe ser un número'),
	check('awayScorer')
		.isLength({ min: 1 })
		.withMessage('Goleadores visitante es un campo obligatorio'),
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

validation.updateMatch = [
	check('year')
		.isLength({ min: 1 })
		.withMessage('Año es un campo obligatorio')
		.bail()
		.isInt()
		.withMessage('Año debe ser un número'),
	check('order')
		.isLength({ min: 1 })
		.withMessage('Orden es un campo obligatorio')
		.bail()
		.isInt()
		.withMessage('Orden debe ser un número'),
	check('place')
		.isLength({ min: 1 })
		.withMessage('Estadio y Fecha es un campo obligatorio')
		.bail()
		.not()
		.isNumeric()
		.withMessage('Estadio y Fecha debe ser un texto'),
	check('homeClub')
		.isLength({ min: 1 })
		.withMessage('Club local es un campo obligatorio'),
	check('homeScore')
		.isLength({ min: 1 })
		.withMessage('Marcador local es un campo obligatorio')
		.bail()
		.isInt()
		.withMessage('Marcador local debe ser un número'),
	check('homeScorer')
		.isLength({ min: 1 })
		.withMessage('Goleadores local es un campo obligatorio'),
	check('awayClub')
		.isLength({ min: 1 })
		.withMessage('Club visitante es un campo obligatorio'),
	check('awayScore')
		.isLength({ min: 1 })
		.withMessage('Marcador visitante es un campo obligatorio')
		.bail()
		.isInt()
		.withMessage('Marcador visitante debe ser un número'),
	check('awayScorer')
		.isLength({ min: 1 })
		.withMessage('Goleadores visitante es un campo obligatorio'),
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

// Edition
validation.storeEdition = [
	check('year')
		.isLength({ min: 1 })
		.withMessage('Año es un campo obligatorio')
		.bail() // detiene la validacion si hubo error
		.isInt()
		.withMessage('Año debe ser un número'),
	check('champion')
		.isLength({ min: 1 })
		.withMessage('Campeón es un campo obligatorio'),
	check('final')
		.isLength({ min: 1 })
		.withMessage('Final/es es un campo obligatorio'),
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

validation.updateEdition = [
	check('year')
		.isLength({ min: 1 })
		.withMessage('Año es un campo obligatorio')
		.bail() // detiene la validacion si hubo error
		.isInt()
		.withMessage('Año debe ser un número'),
	check('champion')
		.isLength({ min: 1 })
		.withMessage('Campeón es un campo obligatorio'),
	check('final')
		.isLength({ min: 1 })
		.withMessage('Final/es es un campo obligatorio'),
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

module.exports = validation;
