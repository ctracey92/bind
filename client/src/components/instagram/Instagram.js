import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Sidenav from "../layout/sidenav//Sidenav"

import API from "../../utils/socialAuth"

import axios from "axios";

class Instagram extends Component {

    state = {
        authorized: false,
        accessToken: "",
        bio: "",
        counts: {},
        displayName: "",
        image: "",
        is_business: false,
        profileID: "",
        username: "",
        website: "",

    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    authorize = () => {
        const id = this.props.auth.user.id
        console.log(id)
        API.authorized(id)
            .then(res => {
                const data = res.data.instagram
                console.log(res.data.instagram)
                this.setState({
                    authorized: true,
                    accessToken: data.accessToken,
                    bio: data.bio,
                    counts: data.counts,
                    displayName: data.displayName,
                    image: data.image,
                    is_business: data.is_business,
                    profileID: data.profileID,
                    username: data.username,
                    website: data.website
                })
            })
            .catch(err => console.log(err));
    }

    getMedia = () => {
        axios.get("https://api.instagram.com/v1/self/?access_token=14802730947.7f4a13e.43206e90887b46f88b2ca021df602839").then((err, res) => {
            if (err) console.log(err)
            console.log(res)
        })
    }

    componentDidMount() {
        this.authorize()
    }

    render() {
        const { user } = this.props.auth;
        let url = "http://127.0.0.1:3001/api/connect/instagram/" + user.id;
        return (
            <div className="container valign-wrapper">
                <Sidenav username={user.username} logout={this.onLogoutClick} />
                <div className="container">
                    <h1>Instagram</h1>
                    <a href={url}><button>Authorize IG</button></a>
                    <a href="https://api.instagram.com/v1/self/?access_token=14802730947.7f4a13e.43206e90887b46f88b2ca021df602839"><button>Try this button</button></a>


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
