import React, {Component} from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {setCurrentUser, logoutUser} from "./actions/authActions";

import {Provider} from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Calendar from "./components/calendar/Calendar";
import Privacy from "./components/privacy/Privacy";
import Terms from "./components/terms/Terms";
import Twitter from "./components/twitter/Twitter";
import Instagram from "./components/instagram/Instagram";
import Brand from "./components/brand/Brand";

//Check for token to keep user logged in...
if(localStorage.jwToken){
    //Set auth token header auth
    const token = localStorage.jwToken;
    setAuthToken(token);
    //Decode and get info
    const decoded = jwt_decode(token);
    //Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    //check for expired token
    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime){
        //Logout user
        store.dispatch(logoutUser());

        //Redirect
        window.location.href = "./login";
    }
}


class App extends Component {
    render(){
        return(
         <Provider store={store}>
            <Router>
                <div className="App">
                    <Navbar />
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/privacy" component={Privacy} />
                    <Route exact path="/terms" component={Terms} />
                    <Switch>
                        <PrivateRoute exact path="/dashboard" component={Dashboard} />
                        <PrivateRoute exact path="/calendar" component={Calendar} />
                        <PrivateRoute exact path="/twitter" component={Twitter} />
                        <PrivateRoute exact path="/instagram" component={Instagram} />
                        <PrivateRoute exact path="/brand" component={Brand}/>
                    </Switch>
                    {/* <Footer />  Needs some work before implementation*/}
                </div>                
            </Router>             
         </Provider>
        ); 
    }
}

export default App;