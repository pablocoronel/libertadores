const { Schema, model } = require('mongoose');

const StorySchema = new Schema(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
		cover: { type: String, required: true },
		// Relacion
		author: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
	},
	{ timestamps: true }
);

const StoryModel = model('Story', StorySchema);

module.exports = StoryModel;
