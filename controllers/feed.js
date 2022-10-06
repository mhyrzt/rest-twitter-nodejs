const User = require("../models/User/methods.js");
const Tweet = require("../models/Tweet/methods.js");

function register({ app, auth }, path = "/feed") {
	async function handler(req, res) {
		try {
			const { username } = req;
			const user = await User.findByUserName(username);
			const tweets = await Tweet.getAllUserTweetsCleaned(user);
			res.send({ tweets });
		} catch (err) {
			console.log(err);
			res.status(400).send({ err });
		}
	}

	app.post(path, auth.validateToken, handler);
}

module.exports = register;
