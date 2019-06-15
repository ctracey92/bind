const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//Here is where they want us to require the config/keys but I declined to make it;

//Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//Load User model
const User = require("../../client/models/user");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register",(req,res) => {
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
            });

            //Hasing the password before we save
                bcrypt.genSalt(10, (err,salt) => {
                    bcrypt.hash(newUser.password, salt, (err,has )=> {
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