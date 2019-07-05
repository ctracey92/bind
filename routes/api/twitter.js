const router = require('express').Router();
const cors = require("cors")
const axios = require("axios");
const TwitterClient = require('twitter');


const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;

 

router.options('*', cors())

router.post("/post", (req, res) => {
    let token = req.body.token;
    let tokenSecret = req.body.tokenSecret;
    let status = req.body.status;

    let client = new TwitterClient({
        consumer_key: TWITTER_CONSUMER_KEY,
        consumer_secret: TWITTER_CONSUMER_SECRET,
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
        consumer_key: TWITTER_CONSUMER_KEY,
        consumer_secret: TWITTER_CONSUMER_SECRET,
        access_token_key: token,
        access_token_secret: tokenSecret,
    });

    client.get("favorites/list",{count: 50}, function (error, tweets, response) {
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

router.post("/timeline", (req, res) => {
    let token = req.body.token;
    let tokenSecret = req.body.tokenSecret;

    let client = new TwitterClient({
        consumer_key: TWITTER_CONSUMER_KEY,
        consumer_secret: TWITTER_CONSUMER_SECRET,
        access_token_key: token,
        access_token_secret: tokenSecret,
    });

    client.get("statuses/home_timeline", {count: 200}, function (error, tweets, response) {
        if (error) {
            console.log(error)
            return res.sendStatus(500)
        };
        res.send(tweets)  // The favorites.
        // console.log(response);  // Raw response object.
    });


})

router.get("/scrape/", (req,res) => {   
    axios.get("https://www.tweet247.net/united%20states").then(results => {       
        res.send(results.data)
    })
})


module.exports = router;