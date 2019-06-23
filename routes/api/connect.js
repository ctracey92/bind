const router = require('express').Router();
const passport = require("passport");
const Account = require("../../client/models/account")

router.get('/twitter',
    passport.authorize('twitter-authz', {failureRedirect: '/dashboard'}));

router.get('/twitter/callback', passport.authorize('twitter-authz',{failureRedirect:'http://127.0.0.1:3000/dashboard'}),
    (req,res) => {
        console.log("USER: ", req.user)
        console.log("Account: ", req.user)
    }
)


module.exports = router;