const Tweet = require("../models/Tweet/methods.js");

function register({ app }, path = "/api/tweets/:tweet_id") {
	app.get(path, async function (req, res) {
		const { tweet_id } = req.params;
		const thread = await Tweet.getThread(tweet_id);
		res.send({ tweet_id, thread });
	});
}

module.exports = register;
