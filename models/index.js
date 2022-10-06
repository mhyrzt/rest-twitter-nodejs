const mongoose = require("mongoose");

function initMongo() {
	mongoose.connect("mongodb://localhost:27017/test", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	return ["Tweet", "User"]
		.map((model) => ({
			[model]: require(`./${model}/model.js`),
		}))
		.reduce((p, c) => ({ ...p, ...c }), {});
}

module.exports = initMongo;
