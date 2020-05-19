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

	// Relacion
	champion: {
		type: Schema.Types.ObjectId,
		ref: 'Club',
		required: true,
	},
});

// Model
const editionModel = model('Edition', EditionSchema);

module.exports = editionModel;
