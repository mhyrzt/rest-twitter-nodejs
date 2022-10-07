const User = require("../models/User/methods.js");
const Tweet = require("../models/Tweet/methods.js");

function register({ app, auth }, path = "/feed") {
	app.post(path, auth.validateToken, async function (req, res) {
		try {
			const { username } = req;
			const user = await User.findByUserName(username);
			if (user === null) {
				return res.status(403).send({ message: "not authorized" });
			}
			const tweets = await Tweet.getAllUserTweetsCleaned(user);
			res.send({ tweets, username });
		} catch (err) {
			res.status(400).send({ err });
		}
	});
}

module.exports = register;
