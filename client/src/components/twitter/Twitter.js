import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
require('dotenv').config();



class Twitter extends Component {
    state = {

    };

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    componentDidMount(){
        console.log(process.env)
        console.log("^Looooook")
    }

    authorizeTwitter = e => {
        e.preventDefault();
        
    }

    render (){
        return(
            <div className="container">
                <h1>Twitter</h1>
            </div>
       )
    }
}

Twitter.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Twitter);