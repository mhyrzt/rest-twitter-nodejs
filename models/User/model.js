const { model } = require("mongoose");

const User = model("User", require("./schema.js"));

module.exports = User;
