import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";

class Calendar extends Component{

    state = {
        events: [],
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    }
    render(){
        const {user} = this.props.auth;

        return(
            <div>
                <h4>Stuff</h4>
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
        )
    }
}

Calendar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {logoutUser}
)(Calendar);