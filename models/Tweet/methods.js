const Tweet = require("./model.js");
const UserMethods = require("../User/methods.js");
const { default: mongoose } = require("mongoose");

async function create(user, body, tags, reply) {
	const replyTo = reply !== undefined ? await getById(reply) : reply;
	const tweet = new Tweet({
		user,
		body,
		tags,
		reply: replyTo,
	});
	await tweet.save();
	if (replyTo !== undefined) {
		replyTo.comments.push(tweet);
		replyTo.save();
	}
	return tweet;
}

async function getUserTweets(user) {
	try {
		return await Tweet.find({ user }).exec();
	} catch {
		throw new Error({ status: 404, message: "User/Tweet NotFound" });
	}
}

async function getUserFollowingTweets({ followings }) {
	return await Tweet.find().where("user").in(followings).exec();
}

async function getAllUserTweets(user) {
	return [
		...(await getUserTweets(user)),
		...(await getUserFollowingTweets(user)),
	];
}

async function cleanTweet(tweet) {
	const { _doc: clean } = tweet;
	clean.id = tweet._id.toJSON();
	clean.user = await UserMethods.cleanForTweets(tweet.user);
	delete clean._id;
	delete clean.__v;
	return clean;
}

async function cleanTweets(tweets) {
	return Promise.all([...tweets].map(cleanTweet));
}

async function getUserFollowingTweetsCleaned(user) {
	return await cleanTweets(await getUserFollowingTweets(user));
}

async function getUserTweetsCleaned(user) {
	return await cleanTweets(await getUserTweets(user));
}

async function getAllUserTweetsCleaned(user) {
	return await cleanTweets(await getAllUserTweets(user));
}

async function getById(id) {
	return await Tweet.findById(id).exec();
}

async function getComments(tweet) {
	return Promise.all(tweet.comments.map(getById));
}

async function getThread(id) {
	const tweet = await getById(id);
	const thread = [tweet, ...(await getComments(tweet))];
	if (tweet.reply !== null) {
		thread.push(await getById(tweet.reply));
	}
	return await cleanTweets(thread);
}

module.exports = {
	create,
	getById,
	getThread,
	cleanTweets,
	getComments,
	getUserTweets,
	getAllUserTweets,
	getUserTweetsCleaned,
	getUserFollowingTweets,
	getAllUserTweetsCleaned,
	getUserFollowingTweetsCleaned,
};
