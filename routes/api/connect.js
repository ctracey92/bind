const router = require('express').Router();
const passport = require("passport");
const cors = require("cors")

router.options('*', cors())



//Twitter Routes
let states = {}
router.get('/twitter/:id', (req, res, next) => {
    const params = req.params.id
    var reqID =  params
    req.session.state = reqID;
    const authenticate = passport.authorize('twitter-authz', { failureRedirect: 'http://127.0.0.1:3000/dashboard' })
    authenticate(req, res, next)
}
);

router.get('/twitter/callback',passport.authorize('twitter-authz', { failureRedirect: 'http://127.0.0.1:3000/dashboard' })
);

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

module.exports = router;