const User = require("../models/User/methods.js");

function register({ app, auth }, path = "/login") {
	async function handler(req, res) {
		const message = "User Not Found";
		try {
			const { username, password } = req.body;
			const user = await User.isValid(username, password);
			if (user === undefined) {
				return res.status(400).send({ message });
			}
			const token = auth.generateToken(username);
			return res.status(200).send({ token });
		} catch {
			return res.status(400).send({ message });
		}
	}
	app.post(path, handler);
}

module.exports = register;
