const User = require("../models/User/methods.js");

function register({ app, auth }, path = "/follow") {
	app.put(path, auth.validateToken, async function (req, res) {
		try {
			const user = await User.findByUserName(req.username);
			const fllw = await User.findByUserName(req.body.username);
			if (user === null || fllw === null) {
				return res.status(404).send({ message: "User Not Found!" });
			}
			if (user.equals(fllw)) {
				return res.status(400).send({
					message: "cannot follow your self :|",
				});
			}

			User.follow(user, fllw);
			return res.status(204).send({
				message: `Followed ${req.body.username}`,
			});
		} catch (err) {
			return res.status(400).send({ error: err });
		}
	});
}

module.exports = register;
