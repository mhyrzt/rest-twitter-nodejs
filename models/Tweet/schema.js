const { Schema } = require("mongoose");

const tweetSchema = new Schema({
	body: {
		type: String,
		trim: true,
		required: true,
		maxlength: 300,
	},
	user: {
		type: Schema.ObjectId,
		ref: "User",
	},
	reply: {
		type: Schema.ObjectId,
		ref: "Tweet",
		default: null,
	},
	comments: [
		{
			type: Schema.ObjectId,
			ref: "Tweet",
		},
	],
	favorites: [
		{
			type: Schema.ObjectId,
			ref: "User",
		},
	],
	favcount: {
		type: Number,
		default: 0,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	tags: {
		type: [String],
		set: (tags) => tags.map((t) => t.toLowerCase()),
	},
});

module.exports = tweetSchema;
