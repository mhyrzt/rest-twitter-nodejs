const User = require("./model.js");

async function findByUserName(username) {
	return await User.findOne({ username }).exec();
}

async function isValid(username, password) {
	return await User.findOne({ username, password }).exec();
}

async function create(username, email, password) {
	const user = new User({ username, email, password, name: username });
	await user.save();
	return user;
}

async function findById(id) {
	return await User.findById(id).exec();
}

async function cleanForTweets(tweetUser) {
	const id = tweetUser._id.toJSON();
	const { _doc: data } = { ...(await findById(tweetUser)) };

	delete data.password;
	delete data.followings;
	delete data.followers;
	delete data.__v;
	delete data._id;
	delete data.__join;
	delete data.email;
	delete data.join;

	return { ...data, id };
}

async function like(user, tweet) {
	tweet.favorites.addToSet(user);
	tweet.favcount = tweet.favorites.length;
	await tweet.save();
	return tweet;
}

async function follow(user, fllw) {
	fllw.followers.addToSet(user);
	user.followings.addToSet(fllw);
	await user.save();
	await fllw.save();
}

module.exports = {
	like,
	create,
	follow,
	isValid,
	findById,
	findByUserName,
	cleanForTweets,
};
