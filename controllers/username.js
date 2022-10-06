const Users = require("../models/User/methods.js");
const Tweets = require("../models/Tweet/methods.js");

function register({ app, auth }, path = "/user/:username") {
	async function handler(req, res) {
		try {
			const { username } = req.params;
			const user = await Users.findByUserName(username);
			const tweets = await Tweets.getUserTweetsCleaned(user);
			res.send({ tweets });
		} catch (err) {
			res.status(404).send({ message: "user not found" });
		}
	}

	app.get(path, handler);
}

module.exports = register;
