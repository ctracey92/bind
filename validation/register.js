const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = validateRegisterInput = (data) => {
    let errors = {};

    //Convert all ermpty fields into an empty string so that the validator will run

    data.username = !isEmpty(data.username) ? data.username : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    //Name Checks 
    if (Validator.isEmpty(data.username)){
        errors.name = "Please enter a username";
    }

    //Email Checks
    if (Validator.isEmpty(data.email)){
        errors.email = "Please enter an email";
    } 
    else if (!Validator.isEmail(data.email)){
        errors.email = "Email entered is invalid";
    }

    //Password checks
    if (Validator.isEmpty(data.password)){
        errors.password = "Please enter a password";
    }
    if (Validator.isEmpty(data.password2)){
        errors.password = "Please confirm the password"
    }
    if (!Validator.isLength(data.password, {min: 6, max: 30})){
        errors.password = "Password must be between 6 and 30 characters";
    }
    if (!Validator.equals(data.password, data.password2)){
        errors.password2 = "Passwords do not match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};