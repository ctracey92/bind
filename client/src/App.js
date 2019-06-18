import React, {Component} from "react";
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";


class App extends Component {
    state = {
        loggedIn: false,

    }

    render(){
        return(
            <div>
                <Navbar />
                <Landing />                
            </div>
        ) 
    }

}

export default App;