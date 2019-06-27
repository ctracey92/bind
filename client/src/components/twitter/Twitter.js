import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import Sidenav from "../layout/sidenav/Sidenav";

import API from "../../utils/twitter";

class Twitter extends Component {
    state = {

    };

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };


    authorizeTwitter = e => {
        e.preventDefault();
        
    }

    authorizeTwitter = e => {
        API.authorize()
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err))


    };

    render (){
            const { user } = this.props.auth;
            return (
                <div className="container valign-wrapper">
                    <Sidenav username={user.username} logout={this.onLogoutClick} />
                    <div className="container">
                        <h1>Twitter</h1>
                        <button onClick={this.authorizeTwitter}>Authorize Twitter</button>
                    </div >
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