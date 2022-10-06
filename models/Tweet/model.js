const { model } = require("mongoose");

const Tweet = model("Tweet", require("./schema.js"));

module.exports = Tweet;
