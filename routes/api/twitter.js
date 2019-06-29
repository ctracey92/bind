const router = require('express').Router();
const cors = require("cors")

const TwitterClient = require('twitter');
const twitterKeys = require("../../twitterKeys");

router.options('*', cors())

router.post("/post", (req, res) => {
    let token = req.body.token;
    let tokenSecret = req.body.tokenSecret;
    let status = req.body.status;

    let client = new TwitterClient({
        consumer_key: twitterKeys.TWITTER_CONSUMER_KEY,
        consumer_secret: twitterKeys.TWITTER_CONSUMER_SECRET,
        access_token_key: token,
        access_token_secret: tokenSecret,
    });

    client.post('statuses/update', { status: status }, function (error, tweet, response) {
        if (error) {
            console.log(error)
            return res.sendStatus(500)
        };
        console.log(tweet);  // Tweet body.
        // console.log(response);  // Raw response object.
    })


})

router.post("/favorites", (req, res) => {
    let token = req.body.token;
    let tokenSecret = req.body.tokenSecret;

    let client = new TwitterClient({
        consumer_key: twitterKeys.TWITTER_CONSUMER_KEY,
        consumer_secret: twitterKeys.TWITTER_CONSUMER_SECRET,
        access_token_key: token,
        access_token_secret: tokenSecret,
    });

    client.get('favorites/list', function (error, tweets, response) {
        if (error) {
            console.log(error)
            return res.sendStatus(500)
        };
        console.log("what will this return")
        res.send(tweets)  // The favorites.
        // console.log(response);  // Raw response object.
    });


})


module.exports = router;