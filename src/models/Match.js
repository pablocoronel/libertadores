const { model, Schema } = require('mongoose');

const MatchSchema = new Schema({
	year: { type: Number, required: [true, 'Año es un campo obligatorio'] },
	order: { type: Number, required: [true, 'Orden es un campo obligatorio'] },
	place: {
		type: String,
		required: [true, 'Estadio y Fecha es un campo obligatorio'],
	},
	homeScore: {
		type: Number,
		required: [true, 'Marcador local es un campo obligatorio'],
	},
	awayScore: {
		type: Number,
		required: [true, 'Marcador visitante es un campo obligatorio'],
	},
	homeScorer: [
		{
			type: String,
			required: [true, 'Goleadores local es un campo obligatorio'],
		},
	],
	awayScorer: [
		{
			type: String,
			required: [true, 'Goleadores visitante es un campo obligatorio'],
		},
	],

	// Relaciones, ref es el nombre del modelo relacionado ([array] para varios)
	homeClub: {
		type: Schema.Types.ObjectId,
		ref: 'Club',
		required: [true, 'Club local es un campo obligatorio'],
	},
	awayClub: {
		type: Schema.Types.ObjectId,
		ref: 'Club',
		required: [true, 'Club visitante es un campo obligatorio'],
	},
});

const matchModel = model('Match', MatchSchema);

module.exports = matchModel;
