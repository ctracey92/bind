const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = validateRegisterInput(data){
    let errors = {};

    //Convert all ermpty fields into an empty string so that the validator will run

    data.username = !isEmpty(data.username) ? data.username : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

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

    return {
        errors,
        isValid: isEmpty(errors)
    };
};