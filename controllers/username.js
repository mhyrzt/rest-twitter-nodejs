const Users = require("../models/User/methods.js");
const Tweets = require("../models/Tweet/methods.js");

function register({ app }, path = "/user/:username") {
	app.get(path, async function (req, res) {
		try {
			const { username } = req.params;
			const user = await Users.findByUserName(username);
			if (user === null) {
				return res.status(404).send({ message: "user not found" });
			}
			const tweets = await Tweets.getUserTweetsCleaned(user);
			return res.send({ tweets });
		} catch (err) {
			return res.status(404).send({ message: "user not found" });
		}
	});
}

module.exports = register;
