const { Schema, model } = require('mongoose');

// Schema
const ClubSchema = new Schema(
	{
		name: { type: String, required: true },
		shield: { type: String, required: true },
		country: { type: String, required: true },
	},
	{ timestamps: true }
);

// Model
const clubModel = model('Club', ClubSchema);

module.exports = clubModel;
