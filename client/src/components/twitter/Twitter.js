import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import Sidenav from "../layout/sidenav/Sidenav";
import TwiterLogin from "react-twitter-auth";

import API from "../../utils/twitter";

class Twitter extends Component {
    state = {
        isAuthenticated: false,
        user: null,
        token: '',

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

    //------------------------------------------------
    // onSuccess = (response) => {
    //     const token = response.headers.get('x-auth-token');
    //     response.json().then(user => {
    //         if(token){
    //             this.setState({isAuthenticated: true, user: user, token: token})
    //         }
    //     });
    // };

    onFailed = err => console.log(err);

    render (){
            const { user } = this.props.auth;
            let url = "http://127.0.0.1:3001/api/connect/twitter/" + user.id;
            // let content = this.state.isAuthenticated ? (<div><p>Authenticated <div>{this.state.user}</div></p></div>) : (<TwitterLogin loginUrl="http://localhost:3001/api/connect/twitter"
            // onFailure={this.onFailed} onSuccess={this.onSuccess}
            // requestTokenUrl="http://localhost:3001/api/connect/twitter/reverse"/>)
            return (
                <div className="container valign-wrapper">
                    <Sidenav username={user.username} logout={this.onLogoutClick} />
                    <div className="container">
                        <h1>Twitter</h1>
                        <a href={url}><button>Authorize Twitter</button></a>
                    </div >
                    {/* {content} */}
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