const { model, Schema } = require('mongoose');

const UserSchema = new Schema(
	{
		email: { type: String, required: true },
		user: { type: String, required: true },
		password: { type: String, required: true },
		role: { type: String, required: true },
	},
	{ timestamps: true }
);

const UserModel = model('User', UserSchema);

module.exports = UserModel;
