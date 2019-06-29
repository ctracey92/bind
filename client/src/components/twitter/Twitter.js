import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Sidenav from "../layout/sidenav/Sidenav";
import API from "../../utils/socialAuth";

class Twitter extends Component {
    state = {
        authorized: false,
        followerCount: "",
        following: "",
        image: "",
        profileID: "",
        profileUsername: "",
        token: "",
        tokenSecret: "",
    };

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };


    authorizeTwitter = e => {
        const id = this.props.auth.user.id
        console.log(id)
        API.authorized(id)
            .then(res => {
                const data = res.data.twitter;

                if (data.profileID) {
                    this.setState({
                        authorized: true,
                        followerCount: data.followerCount,
                        following: data.following,
                        image: data.image,
                        profileID: data.profileID,
                        profileUsername: data.profileUsername,
                        token: data.token,
                        tokenSecret: data.tokenSecret,
                    })                   
                }
            })
            .catch(err => console.log(err))


    };

    componentDidMount() {
        this.authorizeTwitter()
    }

    postToTwitter = (e) => {

    }

    render() {
        const { user } = this.props.auth;
        let url = "http://127.0.0.1:3001/api/connect/twitter/" + user.id;
        let postUrl = "http://127.0.0.1:3001/api/connect/twitter/post/";

        let content = this.state.authorized ? (<div><p>Authenticated <div>{this.state.profileUsername}</div></p><a href={postUrl}><button>Post!</button></a></div>) : (<a href={url}><button>Authorize Twitter</button></a>)

        return (
            <div className="container valign-wrapper">
                <Sidenav username={user.username} logout={this.onLogoutClick} />
                <div className="container">
                    <h1>Twitter</h1>
                    {content}
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