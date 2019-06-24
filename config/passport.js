const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const TwitterStrategy = require('passport-twitter');
const mongoose = require("mongoose");
const User = mongoose.model("users");
// const Account = mongoose.model("account");
const keys = require("./keys");
const twitterKeys = require("../twitterKeys")

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
            .then (user => {
                if (user) {
                    return done(null, user);
                }
                return done(null,false);
            })
            .catch(err => console.log(err));
        })
    );

    passport.use('twitter-authz',new TwitterStrategy({
        consumerKey: twitterKeys.TWITTER_CONSUMER_KEY,
        consumerSecret: twitterKeys.TWITTER_CONSUMER_SECRET,
        callbackURL: "http://127.0.0.1:3001/api/connect/twitter/callback"
    },
    (token,tokenSecret,profile,done) => {
        console.log("TOKEN: ",token)
        console.log("TOKEN SECRET: ", tokenSecret)
        console.log("PROFILE ID: ", profile.id)
        console.log("USERNAME: ", profile.username)
        console.log("FOLLOWER COUNT: ", profile._json.followers_count)
        console.log("FOLLOWING: ", profile._json.friends_count)
        console.log("IMAGE: ", profile._json.profile_image_url)
        console.log(profile)

        // localStorage.setItem('token',token);
        // console.log("PROFILE: ", profile)
        // Account.findOne({domain: 'twitter.com', uid: profile.id}, (err,account) => {
        //     if(err) {return done(err); }
        //     if(account) {return done(null,account); }

        //     var account = new Account();
        //     account.domain = 'twitter.com';
        //     account.uid = profile.id;
        //     var t = { kind: 'oauth', token: token, attributes: {tokenSecret: tokenSecret} };
        //     account.tokens.push(t);
        //     return done(null,account);
        // });
        return done(null)
    }
    ));
};