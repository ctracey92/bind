const router = require('express').Router();
const passport = require("passport");
const Account = require("../../client/models/account")

//Twitter Routes
router.get('/twitter',
    passport.authorize('twitter-authz', { failureRedirect: 'http://127.0.0.1:3000/dashboard' }));

router.get('/twitter/callback', passport.authorize('twitter-authz', { failureRedirect: 'http://127.0.0.1:3000/dashboard' }),
    (req, res) => {
        console.log("here is some stuff")
        console.log("USER: ", req.user)
        console.log("Account: ", req.user)
    }
);

router.get('/instagram',
    passport.authorize('instagram-authz', { failureRedirect: 'http://127.0.0.1:3000/dashboard' }));
router.get('/instagram/callback', passport.authorize('instagram-authz', { failureRedirect: "http://127.0.0.1:3000/dashboard" }),
    (req, res) => {
        console.log(req)
        console.log(res)
    }
);

module.exports = router;