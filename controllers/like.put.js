const User = require("../models/User/methods.js");
const Tweet = require("../models/Tweet/methods.js");

function register({ app, auth }, path = "/like") {
	app.put(path, auth.validateToken, async function (req, res) {
		try {
			const { username } = req;
			const { tweet_id } = req.body;

			const user = await User.findByUserName(username);
			if (user === null) {
				return res.status(403);
			}

			const tweet = await Tweet.getById(tweet_id);
			if (tweet === null) {
				console.log("TWEET NULL");
				return res.status(404);
			}

			await User.like(user, tweet);
			return res.status(204).send({ username, tweet_id });
		} catch (err) {
			console.error(err);
			return res.status(400).send({ error: err });
		}
	});
}

module.exports = register;
