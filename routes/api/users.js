const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys")
//Here is where they want us to require the config/keys but I declined to make it;

//Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//Load User model
const User = require("../../client/models/user");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register",(req, res) => {
    //Form Validation
    const { errors, isValid } = validateRegisterInput(req.body);

    //Check validation
    if (!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email}).then(user => {
        if(user){
            return res.status(400).json({email: "Email is already in use"});
        }
        else {
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                twitter: {"holder": "holder"},
                instagram: {"holder": "holder"},
            });

            //Hasing the password before we save
                bcrypt.genSalt(10, (err,salt) => {
                    bcrypt.hash(newUser.password, salt, (err,hash )=> {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
        }
    });
});

// @route POST api/users/login
// @desc Login user and return JWT 
// @ access Public
router.post("/login", (req, res) => {

    //Form Validation
    const { errors, isValid } = validateLoginInput(req.body);

    //Check Validation
    if (!isValid){
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    //Find user by email
    User.findOne({email}).then(user => {
        //Check to see if they exist
        if(!user) {
            return res.status(404).json({emailnotfound: "Email is not found"});
        }

        //Check password
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    //User matched
                    //Create JWT Payload
                    const payload = {
                        id: user.id,
                        username: user.username,
                    };
                
        //Sign Token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
                } else {
                    return res
                    .status(400)
                    .json({passwordincorrect: "Password incorrect"});
                }
            });
    });
});

module.exports = router;