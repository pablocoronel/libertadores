/*
 * Funciones para manejar los mensajes de error CastError, al ser "" distinto de Schema.Types.ObjectId.
 * El resto de validaciones están en el Schema del model
 *
 * @param {Error} error - Error from Mongoose validation
 */
const matchErrorMessage = (error) => {
	if (error) {
		if (error.errors.year) {
			if (error.errors.year.name == 'CastError') {
				error.errors.year.message = 'El año debe ser un número';
			}
		}

		if (error.errors.homeClub) {
			if (error.errors.homeClub.name == 'CastError') {
				error.errors.homeClub.message =
					'Club local es un campo obligatorio';
			}
		}

		if (error.errors.awayClub) {
			if (error.errors.awayClub.name == 'CastError') {
				error.errors.awayClub.message =
					'Club visitante es un campo obligatorio';
			}
		}
	}
};

const editionErrorMessage = (error) => {
	if (error) {
		if (error.errors.year) {
			if (error.errors.year.name == 'CastError') {
				error.errors.year.message = 'El año debe ser un número';
			}
		}

		if (error.errors.champion) {
			if (error.errors.champion.name == 'CastError') {
				error.errors.champion.message =
					'Campeón es un campo obligatorio';
			}
		}
	}
};

module.exports = { matchErrorMessage, editionErrorMessage };
