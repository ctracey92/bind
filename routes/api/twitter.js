const router = require('express').Router();
const cors = require("cors")

const TwitterClient = require('twitter');

const TWITTER_CONSUMER_KEY = "DXA0gDYBG5mbFnRvFDN9GF0Xw";
const TWITTER_CONSUMER_SECRET = "AQ03g7uYv2NUhCsqarwZ3atAbfkSIc0O0tcOELAhWIj7JzhMX3";
 

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

    client.get("favorites/list", function (error, tweets, response) {
        if (error) {
            console.log(error)
            return res.sendStatus(500)
        };
        console.log("what will this return")
        res.send(tweets)  // The favorites.
        // console.log(response);  // Raw response object.
    });


})

router.post("/mentions", (req, res) => {
    let token = req.body.token;
    let tokenSecret = req.body.tokenSecret;

    let client = new TwitterClient({
        consumer_key: TWITTER_CONSUMER_KEY,
        consumer_secret: TWITTER_CONSUMER_SECRET,
        access_token_key: token,
        access_token_secret: tokenSecret,
    });

    client.get("statuses/mentions_timeline", function (error, tweets, response) {
        if (error) {
            console.log(error)
            return res.sendStatus(500)
        };
        res.send(tweets)  // The favorites.
        // console.log(response);  // Raw response object.
    });


})


module.exports = router;