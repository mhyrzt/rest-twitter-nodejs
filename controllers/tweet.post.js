const User = require("../models/User/methods.js");
const Tweet = require("../models/Tweet/methods.js");

function register({ app, auth }, path = "/tweet") {
	app.post(path, auth.validateToken, async function (req, res) {
		try {
			const { body, tags, reply } = req.body;
			const { username } = req;
			const user = await User.findByUserName(username);
			if (user === null) {
				return res.status(400).send({
					message: "Invalid User Data",
				});
			}
			const tweet = await Tweet.create(user, body, tags, reply);
			return res.status(201).send({ tweet });
		} catch (err) {
			return res.status(400).send({
				err,
			});
		}
	});
}

module.exports = register;
