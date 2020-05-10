const { model, Schema } = require('mongoose');

const MatchSchema = new Schema({
	place: { type: String, required: true },
	homeClub: { type: Number, required: true },
	awayClub: { type: Number, required: true },
	homeScore: { type: Number, required: true },
	awayScore: { type: Number, required: true },
	homeScorer: [{ type: String, required: true }],
	awayScorer: [{ type: String, required: true }],
});

const matchModel = model('Match', MatchSchema);

module.exports = matchModel;
