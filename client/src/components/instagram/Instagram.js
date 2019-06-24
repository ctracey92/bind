import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Sidenav from "../layout/sidenav//Sidenav"

class Instagram extends Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;
        return (
            <div>
                <Sidenav username={user.username} logout={this.onLogoutClick} />
                <div className="container">
                    <h1>Instagram</h1>
                </div >
            </div>
       )
    }
}

Instagram.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Instagram);
