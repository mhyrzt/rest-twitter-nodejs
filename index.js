const fs = require("fs");
const path = require("path");
const cors = require("cors");
const Auth = require("./auth.js");
const dotenv = require("dotenv");
const express = require("express");
const initModels = require("./models/index.js");

console.clear();

dotenv.config({ path: path.join(__dirname, ".env") });
const { ACCESS_TOKEN, PORT } = process.env;
const app = express();
const auth = new Auth(ACCESS_TOKEN);
initModels();

app.use(cors());
app.use(express.json());

fs.readdirSync("controllers")
	.map((x) => `./controllers/${x}`)
	.forEach((module) => {
		try {
			require(module)({ app, auth });
			console.log(`✔️ ${module}`);
		} catch (err) {
			console.log("-".repeat(128));
			console.log(`x ${module}`);
			console.log(err);
			console.log("-".repeat(128));
		}
	});


app.listen(PORT, () => {
	console.log(`LISTENING ON https://127.0.0.1:${PORT}`);
});
