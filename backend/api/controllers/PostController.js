/* global config */
/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


var Twit = require('twit');

module.exports = {
	tweet: function (req, res) {

		User.findOne(req.userId, function (err, user) {
			var T = new Twit({
				consumer_key: config.TWITTER_KEY,
				consumer_secret: config.TWITTER_SECRET,
				access_token: user.twitterToken,
				access_token_secret: user.twitterSecret
			});


			T.post('statuses/update', {
				status: 'hello world!'
			}, function (err, data, response) {
				if (!err) {
					console.log(err);
				}
			});
		});
	}
};

