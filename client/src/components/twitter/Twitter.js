import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Sidenav from "../layout/sidenav/Sidenav";
import API from "../../utils/socialAuth";
import twitterAPI from "../../utils/twitter"
import Notifications, { notify } from 'react-notify-toast'
import Modal from "react-responsive-modal";
import { throws } from "assert";
import Favorites from "./favorites";

class Twitter extends Component {
    state = {
        authorized: false,
        modalIsOpen: false,
        followerCount: "",
        following: "",
        image: "",
        profileID: "",
        profileUsername: "",
        token: "",
        tokenSecret: "",
        status: "",
        tweetLength: 140,
        tweetColor: "black",
        favorites: [],
    };

    openModal = () => {
        this.setState({ modalIsOpen: true })
    };

    closeModal = () => {
        this.setState({ modalIsOpen: false })
    };

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    authorizeTwitter = () => {
        const id = this.props.auth.user.id

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
                        favorites: [],
                    })
                }
            })
            .catch(err => console.log(err))


    };

    componentDidMount() {
        this.authorizeTwitter()
    };

    postToTwitter = (e) => {
        e.preventDefault();
        console.log(this.state.status.length, "LENGTH OF TWEET?")
        let token = this.state.token;
        let tokenSecret = this.state.tokenSecret;
        let status = this.state.status

        twitterAPI.postToTwitter(token, tokenSecret, status)
            .then(
                console.log("Success"),
                notify.show("Tweet Successful", "success", 10000)
            )
            .catch(err => {
                notify.show("Tweet Unsuccessful", "error")
                console.log(err)
            })
        this.setState({tweetColor: "black", tweetLength: 140, status: ""})
        this.closeModal();
    };

    handleStatusChange = e => {
        this.setState({ status: e.target.value })
        this.setState({tweetLength: 140-this.state.status.length})
        if(this.state.tweetLength <= -1){
            this.setState({tweetColor: "red"})
        }
        if (this.state.tweetLength >= 0){
            this.setState({tweetColor: "black"})
        }
    };

    getFavorites = (e) => {
        let token = this.state.token;
        let tokenSecret = this.state.tokenSecret;
        twitterAPI.getFavorites(token, tokenSecret)
            .then(res => {
                console.log(res.data);
                this.setState({ favorites: res.data })
            })
            .catch(err => console.log(err));
    };

    render() {
        const { user } = this.props.auth;
        let url = "http://127.0.0.1:3001/api/connect/twitter/" + user.id;

        let content = this.state.authorized ? (
            <div>
                <Modal open={this.state.modalIsOpen} onClose={this.closeModal}>
                    <div>
                        <form>
                            <div className="chip">
                                <img src={this.state.image} alt="Twitter Profile Pic" />
                                @{this.state.profileUsername}
                            </div>
                            <span>
                                <b>Tweet: </b>                           
                                <textarea id="textarea1" className="materialize-textarea" value={this.state.status} onChange={this.handleStatusChange} onKeyDown={this.handleStatusChange} onKeyUp={this.handleStatusChange}></textarea>
                            </span>
                            <br />
                            <button className=" btn-large hoverable grey darken-2" onClick={this.postToTwitter} style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem",
                            }}>Tweet It!</button>
                            Characters Left: <b style={{color: this.state.tweetColor}}>{this.state.tweetLength}</b>
                        </form>
                    </div>
                </Modal>
                <p>Authenticated {this.state.profileUsername}</p>
                <button onClick={this.getFavorites}>Get Favorites</button>
                <button onClick={this.openModal}>Tweet Something</button>
                <Notifications />
                <div className="favorites">
                            {this.state.favorites.map(item => (
                                <Favorites 
                                key={item.id}
                                id={item.id_str}
                                retweets={item.retweet_count}
                                text={item.text}
                                favorites={item.favorite_count}
                                user={item.user}
                                replyTo={item.in_reply_to_screen_name}
                                retweeted={item.retweeted}
                                />
                            ))}
                </div>
            </div>
        ) : (
                <a href={url}><button>Authorize Twitter</button></a>)

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