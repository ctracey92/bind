import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import {Link} from "react-router-dom";

class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;

        return (
            <div style={{ height: "75vh" }} className="container valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">
                        <h4>
                            <b>Welcome,</b> {user.username.split(" ")[0]}
                        </h4>
                        <button
                            style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem",
                            }}
                            onClick={this.onLogoutClick}
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                            Logout
                        </button>
                    </div>
                </div>
                <div className="row">

                    <div className="col s12 m6">
                        <div className="card grey darken-3">
                            <div className="card-content white-text">
                                <span className="card-title">Action 1</span>
                                <p>View and Edit your clanedar here!</p>
                            </div>
                            <div className="card-action">
                                <Link to="/calendar">Calendar</Link>
                                <a href="#">This is a link</a>
                            </div>
                        </div>
                    </div>
                    <div className="col s12 m6">
                        <div className="card grey darken-3">
                            <div className="card-content white-text">
                                <span className="card-title">Action 2</span>
                                <p>I do something.</p>
                            </div>
                            <div className="card-action">
                                <a href="#">This is a link</a>
                                <a href="#">This is a link</a>
                            </div>
                        </div>
                    </div>
                    <div className="col s12 m6">
                        <div className="card grey darken-3">
                            <div className="card-content white-text">
                                <span className="card-title">Action 3</span>
                                <p>I do something</p>
                            </div>
                            <div className="card-action">
                                <a href="#">This is a link</a>
                                <a href="#">This is a link</a>
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
                                <a href="#">This is a link</a>
                                <a href="#">This is a link</a>
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