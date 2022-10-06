const { Schema } = require("mongoose");

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		match: /.+\@.+\..+/,
		index: { unique: true },
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	name: {
		type: String,
	},
	biography: {
		type: String,
		default: "",
		maxlength: 150,
	},
	join: {
		type: Date,
		default: Date.now,
	},
	followers: [
		{
			type: Schema.ObjectId,
			ref: "User",
		},
	],
	followings: [
		{
			type: Schema.ObjectId,
			ref: "User",
		},
	],
});

module.exports = userSchema;
