const router = require('express').Router();
const passport = require("passport");
const cors = require("cors");
const User = require("../../client/models/user");
const axios = require("axios");



router.options('*', cors());

//Twitter Routes
let states = {}
router.get('/twitter/:id', (req, res, next) => {
    const params = req.params.id
    var reqID = params
    req.session.state = reqID;
    const authenticate = passport.authorize('twitter-authz', { failureRedirect: 'http://www.bind-it-app.com/dashboard' })
    authenticate(req, res, next)
}
);

router.get('/twitter/callback', passport.authorize('twitter-authz', { failureRedirect: 'http://www.bind-it-app.com/dashboard' })
);

//Instagram Routes
router.get('/instagram/:id', (req, res) => {
    const params = req.params.id
    const authenticate = passport.authorize('instagram-authz', { state: params, failureRedirect: 'http://www.bind-it-app.com/dashboard' })
    authenticate(req, res)
}
);

router.get('/instagram/callback', (req, res) => {
    console.log(req, "REQUEST")
    const authenticate = passport.authorize('instagram-authz', { state: params, failureRedirect: "http://www.bind-it-app.com/dashboard" })
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


router.get("/scrape/instagram", (req,res) => {   
    axios.get("https://top-hashtags.com/instagram/").then(results => {       
        res.send(results.data)
    })
})

module.exports = router;