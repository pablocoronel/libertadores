const { model, Schema, Types } = require('mongoose');

// Schema
const EditionSchema = new Schema({
	year: { type: Number, required: [true, 'Año es un campo obligatorio'] },
	cover: {
		type: String,
		required: [true, 'Portada es un campo obligatorio'],
	},
	squad: {
		type: String,
		required: [true, 'Plantel es un campo obligatorio'],
	},
	topScorerName: {
		type: String,
		required: [true, 'Goleador nombre es un campo obligatorio'],
	},
	topScorerGoals: {
		type: Number,
		required: [true, 'Goles es un campo obligatorio'],
	},

	// Relacion
	champion: {
		type: Types.ObjectId,
		ref: 'Club',
		required: [true, 'Campeón es un campo obligatorio'],
	},
});

// Model
const editionModel = model('Edition', EditionSchema);

module.exports = editionModel;
