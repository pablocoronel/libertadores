const { Schema, model } = require('mongoose');

const StorySchema = new Schema(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
		// Relacion
		author: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
	},
	{ timestamps: true }
);

const StoryModel = model('Story', StorySchema);

module.exports = StoryModel;
