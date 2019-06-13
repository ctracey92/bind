import React from "react";
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";


function App() {
    return(
        <Router>
            <div>
                <Route exact path="/" component={Login} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/dashboard" component={Dashboard} />
            </div>
        </Router>
    )
}

export default App;