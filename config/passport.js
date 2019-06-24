const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const TwitterStrategy = require('passport-twitter');
const InstagramStrategy = require("passport-instagram");
const mongoose = require("mongoose");
const User = mongoose.model("users");
// const Account = mongoose.model("account");
const keys = require("./keys");
const twitterKeys = require("../twitterKeys");
const instagramKeys = require("../instagramKeys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    //Local Strategy for registering users, and sign-in
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

    //Twitter Authorization strategy
    passport.use('twitter-authz',new TwitterStrategy({
        consumerKey: twitterKeys.TWITTER_CONSUMER_KEY,
        consumerSecret: twitterKeys.TWITTER_CONSUMER_SECRET,
        callbackURL: "http://127.0.0.1:3001/api/connect/twitter/callback"
    },
    (token,tokenSecret,profile,done) => {
        let twitterProfile = {
            token: token,
            tokenSecret: tokenSecret,
            profileID: profile.id,
            profileUsername: profile.username,
            followerCount: profile._json.followers_count,
            following: profile._json.friends_count,
            image: profile._json.profile_image_url,
        }

        console.log(twitterProfile)

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

    passport.use("instagram-authz", new InstagramStrategy({
        clientID: instagramKeys.INSTAGRAM_CLIENT_ID,
        clientSecret: instagramKeys.INSTAGRAM_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:3001/api/connect/instagram/callback",
    },
    function(accessToken, refreshToken, profile, done) {

        let igProfile = {
            accessToken: accessToken,
            profileID: profile.id,
            username: profile.username,
            displayName: profile.displayName,
            image: profile._json.data.profile_picture,
            bio: profile._json.data.bio,
            website: profile._json.data.website,
            is_business: profile._json.data.is_business,
            counts: profile._json.data.counts,
        }
      console.log("IG Profile: ", igProfile)
      return done(null)
      })
    );

};