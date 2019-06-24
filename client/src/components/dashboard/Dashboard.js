import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";

import Sidenav from "../layout/sidenav/Sidenav";

class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;

        return (
            <div>
                <Sidenav username={user.username} logout={this.onLogoutClick} />
                <div style={{ height: "75vh" }} className="container valign-wrapper">
                    <div className="row">

                        <div className="col s12 m6">
                            <div className="card grey darken-3">
                                <div className="card-content white-text">
                                    <span className="card-title">Calendar</span>
                                    <p>Manage your Calendar here!</p>
                                </div>
                                <div className="card-action">
                                    <Link to="/calendar">Calendar</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col s12 m6">
                            <div className="card grey darken-3">
                                <div className="card-content white-text">
                                    <span className="card-title">Twitter</span>
                                    <p>Manage your IG here!</p>
                                </div>
                                <div className="card-action">
                                    <Link to="/twitter">Twitter</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col s12 m6">
                            <div className="card grey darken-3">
                                <div className="card-content white-text">
                                    <span className="card-title">Instagram </span>
                                    <p>Manage your IG here!</p>
                                </div>
                                <div className="card-action">
                                    <Link to="/instagram">Instagram</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col s12 m6">
                            <div className="card grey darken-3">
                                <div className="card-content white-text">
                                    <span className="card-title">Action 4</span>
                                    <p>I do something</p>
                                </div>
                                <div className="card-action">
                                    {/* <a href="#">This is a link</a>
                                    <a href="#">This is a link</a> */}
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);