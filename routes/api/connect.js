const router = require('express').Router();
const passport = require("passport");
const cors = require("cors")
const User = require("../../client/models/user")
let TwitterClient = require('twitter');
const twitterKeys = require("../../twitterKeys");

router.options('*', cors())

//Twitter Routes
router.get("/twitter/post/", (req, res) => {
    const userID = req.params.id;
    let token = ""
    let tokenSecret = ""

            let client = new TwitterClient({
                consumer_key: twitterKeys.TWITTER_CONSUMER_KEY,
                consumer_secret: twitterKeys.TWITTER_CONSUMER_SECRET,
                access_token_key: token,
                access_token_secret: tokenSecret,
            });
    // function get(userID) {
    //     User.findById(userID, (err, res) => {
    //         console.log(res)
    //         const data = res.twitter
    //         if (err) { console.log(err) }
    //         else {
    //             client.access_token_key = data.token
    //             client.access_token_secret = data.tokenSecret

    //         }

    //     })
    // }
        client.post('statuses/update', { status: 'I Love Twitter A lot' }, function (error, tweet, response) {
            if (error){
                console.log(error) 
                return res.sendStatus(500)};
            console.log(tweet);  // Tweet body.
            // console.log(response);  // Raw response object.
        })


})

let states = {}
router.get('/twitter/:id', (req, res, next) => {
    const params = req.params.id
    var reqID = params
    req.session.state = reqID;
    const authenticate = passport.authorize('twitter-authz', { failureRedirect: 'http://127.0.0.1:3000/dashboard' })
    authenticate(req, res, next)
}
);

router.get('/twitter/callback', passport.authorize('twitter-authz', { failureRedirect: 'http://127.0.0.1:3000/dashboard' })
);

//Instagram Routes
router.get('/instagram/:id', (req, res) => {
    const params = req.params.id
    const authenticate = passport.authorize('instagram-authz', { state: params, failureRedirect: 'http://127.0.0.1:3000/dashboard' })
    authenticate(req, res)
}
);

router.get('/instagram/callback', (req, res) => {
    console.log(req, "REQUEST")
    const authenticate = passport.authorize('instagram-authz', { state: params, failureRedirect: "http://127.0.0.1:3000/dashboard" })
    authenticate(req, res)
}
);

//Check for social media auth Route
router.get('/auth/:id', (req, res) => {
    User.findById(req.params.id, (err, data) => {
        if (!err) { res.json(data) }
        else { throw err }
    })
});

module.exports = router;