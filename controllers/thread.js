const User = require("../models/User/methods.js");
const Tweet = require("../models/Tweet/methods.js");

function register({ app, auth }, path = "/tweets/:tweet_id") {
	async function handler(req, res) {
		const { tweet_id } = req.params;
		const thread = await Tweet.getThread(tweet_id);
		res.send({ tweet_id, thread });
	}

	app.get(path, handler);
}

module.exports = register;
