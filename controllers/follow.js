const User = require("../models/User/methods.js");

function register({ app, auth }, path = "/follow") {
	async function handler(req, res) {
		try {
			const user = await User.findByUserName(req.username);
			const fllw = await User.findByUserName(req.body.username);
			if (user === undefined || fllw === undefined) {
				return res.status(404).send({ message: "User Not Found!" });
			}
			if (user.equals(fllw)) {
				return res.status(400).send({
					message: "cannot follow your self :|",
				});
			}
			fllw.followers.push(user);
			user.followings.push(fllw);
			await user.save();
			await fllw.save();
			return res.status(204).send({
				message: `Followed ${req.body.username}`,
			});
		} catch (err) {
			return res.status(400).send({ error: err });
		}
	}

	app.put(path, auth.validateToken, handler);
}

module.exports = register;
