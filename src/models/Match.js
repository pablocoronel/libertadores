const { model, Schema } = require('mongoose');

const MatchSchema = new Schema({
	year: {
		type: Number,
		required: true,
	},
	order: { type: Number, required: true },
	place: {
		type: String,
		required: true,
	},
	comment: { type: String },
	homeScore: {
		type: Number,
		required: true,
	},
	awayScore: {
		type: Number,
		required: true,
	},
	homeScorer: [{ type: String }],
	awayScorer: [{ type: String }],

	// Relaciones, ref es el nombre del modelo relacionado ([{type:..., ref:...}] para varios)
	homeClub: {
		type: Schema.Types.ObjectId,
		ref: 'Club',
		required: true,
	},
	awayClub: {
		type: Schema.Types.ObjectId,
		ref: 'Club',
		required: true,
	},
});

const matchModel = model('Match', MatchSchema);

module.exports = matchModel;
