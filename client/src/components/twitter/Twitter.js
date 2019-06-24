import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import Sidenav from "../layout/sidenav/Sidenav";

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

    render (){
            const { user } = this.props.auth;
            return (
                <div>
                    <Sidenav username={user.username} logout={this.onLogoutClick} />
                    <div className="container">
                        <h1>Twitter</h1>
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