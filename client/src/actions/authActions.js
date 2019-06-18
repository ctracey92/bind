import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING,
} from "./types";


//Register User
export const registerUser = (userData, history) => dispatch => {
    axios.post("/api/users/register",userData)
    .then(res => history.push("login")) //Redirect on success to login
    .catch (err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    })
    ); 
};

//Login - get token
export const loginUser = userData => dispatch => {
    axios.post("/api/users/login",userData)
    .then(res => {
        //Saving to local storage...

    //Set token to storage
        const {token} = res.data;
        localStorage.setItem("jwtToken",token);
        //Set token to Auth header
        setAuthToken(token);
        //Decode to get data
        const decoded = jwt_decode(token);
        //Set current user
        dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
        })
    );
};

//Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
    };
};

//User Loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

//Log user out
export const logoutUser = ()  => dispatch => {
    //Remove token from storage
    localStorage.removeItem("jwtToken");
    //Remove auth header for future requests
    setAuthToken(false);
    //Set current user to emptu object, which makes isAuthenticated to false
    dispatch(setCurrentUser({}));
};
