const { model, Schema } = require('mongoose');

const MatchSchema = new Schema({
	year: { type: Number, required: true },
	order: { type: Number, required: true },
	place: { type: String, required: true },
	homeClub: { type: String, required: true },
	homeScore: { type: Number, required: true },
	homeScorer: [{ type: String, required: true }],
	awayClub: { type: String, required: true },
	awayScore: { type: Number, required: true },
	awayScorer: [{ type: String, required: true }],
});

const matchModel = model('Match', MatchSchema);

module.exports = matchModel;
