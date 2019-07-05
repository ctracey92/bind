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
                <div className="container" style={{ paddingLeft: "100px" }}>
                    <div className="row">

                        <div className="col" style={{ width: "475px" }}>
                            <div className="card grey darken-3">
                                <div className="card-content white-text">

                                    <div className="card-image">
                                        <Link to ="calendar"><img src="https://pbs.twimg.com/media/D-pa4QCWsAEBK17.jpg" alt="calendar" style={{height: "225px", width: "400px"}} /></Link>
                                    </div>
                                </div>
                                <div className="card-action">
                               <u> <Link to="/calendar" style={{color: "white"}}>Calendar</Link> </u>
                                </div>
                            </div>
                        </div>
                        <div className="col" style={{ width: "475px" }}>
                            <div className="card grey darken-3">
                                <div className="card-content white-text">

                                    <div className="card-image">
                                        <Link to="/instagram"><img src="https://pbs.twimg.com/media/D-peu3WXsAEssP9.jpg" alt="instagram" style={{height: "225px", width: "400px"}} /></Link>
                                    </div>
                                </div>
                                <div className="card-action">
                                <u><Link to="/instagram" style={{color: "white"}}>Instagram</Link></u>
                                </div>
                            </div>
                        </div>
                        <div className="col" style={{ width: "475px" }}>
                            <div className="card grey darken-3">
                                <div className="card-content white-text">

                                    <div className="card-image">
                                        <Link to="/twitter"><img src="https://pbs.twimg.com/media/D-pex3HXYAAlx-q.jpg" style={{height: "225px", width: "400px"}} alt="twitter" /></Link>
                                    </div>
                                </div>
                                <div className="card-action">
                                    <u><Link to="/twitter" style={{color: "white"}}>Twitter</Link></u>
                                </div>
                            </div>
                        </div>
                        <div className="col" style={{ width: "475px" }}>
                            <div className="card grey darken-3">
                                <div className="card-content white-text">

                                    <div className="card-image">
                                        <Link to="calendar"><img src="https://pbs.twimg.com/media/D-pewfvWkAEFilt.jpg" style={{height: "225px", width: "400px"}} alt="brand"/></Link>
                                    </div>
                                </div>
                                <div className="card-action">
                                <u><Link to="/brand" style={{color: "white"}}>Brand Yourself (steps for getting started)</Link></u>
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