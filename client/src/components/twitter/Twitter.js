import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Sidenav from "../layout/sidenav/Sidenav";
import API from "../../utils/socialAuth";
import twitterAPI from "../../utils/twitter"
import Notifications, { notify } from 'react-notify-toast'
import Modal from "react-responsive-modal";
import Favorites from "./favorites";
import cheerio from "cheerio";


class Twitter extends Component {
    state = {
        authorized: false,
        modalIsOpen: false,
        mentionsModal: false,
        favoritesModal: false,
        trendingModal: false,
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
        mentions: [],
        timeline: [],
        trending: [],
    };

    openModal = () => {
        this.setState({ modalIsOpen: true })
    };

    closeModal = () => {
        this.setState({ modalIsOpen: false })
    };

    openTrendingModal = () => {
        this.getTrending()
    };

    closeTrendingModal = () => {
        this.setState({ trendingModal: false })
    };

    openMentionsModal = () => {
        this.getMentions()
    };

    closeMentionsModal = () => {
        this.setState({ mentionsModal: false })
    };

    openFavoritesModal = () => {
        this.getFavorites()
    };

    closeFavoritesModal = () => {
        this.setState({ favoritesModal: false })
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
                        mentions: [],
                    })
                }

                this.getTimeline(data.token, data.tokenSecret)
            })
            .catch(err => console.log(err))


    };


    componentDidMount() {
        this.authorizeTwitter()
    };

    postToTwitter = (e) => {
        e.preventDefault();
        let token = this.state.token;
        let tokenSecret = this.state.tokenSecret;
        let status = this.state.status

        twitterAPI.postToTwitter(token, tokenSecret, status)
            .then(
                notify.show("Tweet Successful", "success", 5000)
            )
            .catch(err => {
                console.log(err)
            })
        this.setState({ tweetColor: "black", tweetLength: 140, status: "" })
        this.closeModal();
    };

    handleStatusChange = e => {
        this.setState({ status: e.target.value })
        this.setState({ tweetLength: 140 - this.state.status.length })
        if (this.state.tweetLength <= -1) {
            this.setState({ tweetColor: "red" })
        }
        if (this.state.tweetLength >= 0) {
            this.setState({ tweetColor: "black" })
        }
    };

    getFavorites = (e) => {
        let token = this.state.token;
        let tokenSecret = this.state.tokenSecret;
        twitterAPI.getFavorites(token, tokenSecret)
            .then(res => {
                this.setState({ favorites: res.data })
            })
            .catch(err => console.log(err));
        this.setState({ favoritesModal: true })
    };

    getMentions = (e) => {
        let token = this.state.token;
        let tokenSecret = this.state.tokenSecret;
        twitterAPI.getMentions(token, tokenSecret)
            .then(res => {
                this.setState({ mentions: res.data })
            })
            .catch(err => console.log(err));
        this.setState({ mentionsModal: true })
    };

    getTimeline = (token, tokenSecret) => {
        twitterAPI.getTimeline(token, tokenSecret)
            .then(res => {
                this.setState({ timeline: res.data })
            })
            .catch(err => console.log(err));
    };

    getTrending = () => {
        twitterAPI.getTrending()
            .then(res => {
                let results = [];
                let $ = cheerio.load(res.data);
                $(".post-list .media-body .post-title").each(function () {
                    results.push($(this).text())
                })
                this.setState({ trending: results, trendingModal: true })
            })
    }

    render() {
        const { user } = this.props.auth;
        let url = "http://www.bind-it-app.com/api/connect/twitter/" + user.id;

        let content = this.state.authorized ? (
            <div>
                <div className="row">
                    <img src={this.state.image} alt="Twitter Profile Pic" className="circle btn-floating btn-large" style={{ marginTop: "1rem", marginRight: "2.5px" }} />
                    <button onClick={this.getFavorites} className=" btn-large hoverable grey darken-2" style={{
                        marginRight: "2.5px",
                        marginLeft: "2.5px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem",
                    }}>Get Favorites</button>
                    <button onClick={this.openModal} className=" btn-large hoverable grey darken-2" style={{
                        marginRight: "2.5px",
                        marginLeft: "2.5px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem",
                    }}>Tweet Something</button>
                    <button onClick={this.openMentionsModal} className=" btn-large hoverable grey darken-2" style={{
                        marginRight: "2.5px",
                        marginLeft: "2.5px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem",
                    }}>Get Mentions</button>
                    <button onClick={this.openTrendingModal} className=" btn-large hoverable grey darken-2" style={{
                        marginRight: "2.5px",
                        marginLeft: "2.5px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem",
                    }}>What's Trending?</button>
                </div>
                <div className="row">
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
                                <button className=" btn hoverable grey darken-2" onClick={this.postToTwitter}>Tweet It!</button>
                                <div style={{ float: "right" }}> Characters Left: <b style={{ color: this.state.tweetColor }}>{this.state.tweetLength}</b> </div>
                            </form>
                        </div>
                    </Modal>
                    <Modal open={this.state.mentionsModal} onClose={this.closeMentionsModal}>
                        <h5>Mentions</h5>
                        {this.state.mentions.map(item => (
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
                    </Modal>
                    <Modal open={this.state.trendingModal} onClose={this.closeTrendingModal} style={{maxHeight: "500px", overflow: "auto"}}>
                        <h3>Currently Trending:</h3>
                        {this.state.trending.map(item => (
                            <li key = { item }><b>{item}</b></li>
                        ))}
                    </Modal>
                    <Modal open={this.state.favoritesModal} onClose={this.closeFavoritesModal}>
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
                    </Modal>
                    <p> <b>{this.state.profileUsername}</b>'s timeline:</p>
                    <Notifications />
                    <div className="timeline" style={{ maxHeight: "600px", overflow: "auto" }}>
                        {this.state.timeline.map(item => (
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
            </div>
        ) : (
                <div>
                    <h1>Twitter</h1>
                    <a href={url}><button className=" btn-large hoverable grey darken-2" style={{
                        marginRight: "2.5px",
                        marginLeft: "2.5px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem",
                    }}>Authorize Twitter</button></a>
                </div>
            )

        return (
            <div className="container valign-wrapper">
                <Sidenav username={user.username} logout={this.onLogoutClick} />
                <div style={{paddingLeft: "100px"}}>
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