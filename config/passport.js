const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const TwitterStrategy = require('passport-twitter');
const InstagramStrategy = require("passport-instagram");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("./keys");


const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;

const INSTAGRAM_CLIENT_ID = process.env.INSTAGRAM_CLIENT_ID;
const INSTAGRAM_CLIENT_SECRET = process.env.INSTAGRAM_CLIENT_SECRET;



const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

mongoose.set('useFindAndModify', false);

module.exports = passport => {
    //Local Strategy for registering users, and sign-in
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );

    //Twitter Authorization strategy
    passport.use('twitter-authz', new TwitterStrategy({
        consumerKey: TWITTER_CONSUMER_KEY,
        consumerSecret: TWITTER_CONSUMER_SECRET,
        callbackURL: "http://www.bind-it-app.com/api/connect/twitter/callback",
        passReqToCallback: true,
    },
        (req, token, tokenSecret, profile, done) => {
            let sessionId = req.sessionID;
            let userID = "sessionStore.sessions." + sessionId;
            let localUser = userID.split('.').reduce((o, i) => o[i], req)
            let sessionObj = JSON.parse(localUser)

            let twitterProfile = {
                token: token,
                tokenSecret: tokenSecret,
                profileID: profile.id,
                profileUsername: profile.username,
                followerCount: profile._json.followers_count,
                following: profile._json.friends_count,
                image: profile._json.profile_image_url,
            }

            User.findByIdAndUpdate(sessionObj.state,  {twitter: twitterProfile}, (err,res) => {
                if(err) console.log(err)
                console.log(res)
            } )


            return done(null)
        }
    ));


    passport.use("instagram-authz", new InstagramStrategy({
        clientID: INSTAGRAM_CLIENT_ID,
        clientSecret: INSTAGRAM_CLIENT_SECRET,
        callbackURL: "http://www.bind-it-app.com/api/connect/instagram/callback",
        passReqToCallback: true,

    },
        function (req, accessToken, refreshToken, profile, done) {

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

            User.findByIdAndUpdate(req.query.state, { instagram: igProfile }, (err, res) => {
                if (err) console.log(err)
            })




            return done(null)
        })
    );

};