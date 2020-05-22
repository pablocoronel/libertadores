const { model, Schema } = require('mongoose');

// Schema
const EditionSchema = new Schema({
	year: { type: Number, required: true },
	cover: {
		type: String,
		required: true,
	},
	squad: {
		type: String,
		required: true,
	},
	topScorerName: {
		type: String,
		required: true,
	},
	topScorerGoals: {
		type: Number,
		required: true,
	},

	// Relaciones
	champion: {
		type: Schema.Types.ObjectId,
		ref: 'Club',
		required: true,
	},

	// Relaciones, ref es el nombre del modelo relacionado ([{type:..., ref:...}] para varios)
	final: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Match',
			required: true,
		},
	],
});

// Model
const editionModel = model('Edition', EditionSchema);

module.exports = editionModel;
