import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Sidenav from "../layout/sidenav//Sidenav"
import API from "../../utils/socialAuth"
import axios from "axios";
import Modal from "react-responsive-modal";

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
        status: "",
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    openModal = () => {
        this.setState({ modalIsOpen: true })
    };

    closeModal = () => {
        this.setState({ modalIsOpen: false })
    };

    handleStatusChange = e => {
        this.setState({ status: e.target.value })
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
                    website: data.website,
                    display: "hidden",
                    status: "",
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
        console.log(this.state.counts)
    }

    postToInstagram = (e) => {
        e.preventDefault();
        this.setState({status: ""})
        this.closeModal();
    };

    render() {
        const { user } = this.props.auth;
        let url = "http://127.0.0.1:3001/api/connect/instagram/" + user.id;
        let content = this.state.authorized ? (
            <div>
                <div className="col s12 m6">
                    <div className="card">
                        <div className="card-image">
                            <img className="circle" src={this.state.image} />
                            <span className="card-title"><b>@{this.state.username}</b></span>
                            <button className="btn-floating halfway-fab waves-effect waves-light red" onClick={this.openModal}><i className="material-icons">add</i></button>
                        </div>
                        <div className="card-content">
                            <p>Bio: {this.state.bio}</p>
                            <p>Website: {this.state.website}</p>
                            <p>Followers: {this.state.counts.followed_by} | Following: {this.state.counts.follows} | Posts: {this.state.counts.media}</p>
                        </div>
                    </div>
                </div>
                <div className="col s12 m6">
                    <div>
                        <b>Under Construction: </b>
                        <p>Thank you for your patience while we remodel our IG section to comply with IG's new polcies and procedures. When we return our IG section will <b>ONLY</b> be available for use with <u>IG Creator or Business accounts</u>. We apologize for any inconveince this may cause our users.</p>
                        <br />
                        <p>
                            Please click the button to check out some of our upcoming features!
                        </p>
                    </div>
                </div>
                <Modal open={this.state.modalIsOpen} onClose={this.closeModal}>
                    Please upload one or more pictures and a caption:
                    <form >
                        <div class="file-field input-field">
                            <input type="file" multiple />
                            <div class="file-path-wrapper">
                                <input class="file-path validate" type="text" placeholder="Upload one or more files" />
                            </div>
                        </div>
                        <textarea id="textarea1" className="materialize-textarea" value={this.state.status} onChange={this.handleStatusChange}  style={{width: "600px"}}></textarea>
                        <br />
                        <button className=" btn-large hoverable grey darken-2" onClick={this.postToInstagram} style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem",
                            }}>Post It!</button>
                    </form>

                </Modal>
            </div>
        ) : (<a href={url}><button>Authorize IG</button></a>);
        return (
            <div className="container valign-wrapper">
                <Sidenav username={user.username} logout={this.onLogoutClick} />
                <div className="container">
                    <div className="row">
                        <h1>Instagram</h1>
                    </div>
                    <div className="row">
                        {content}
                    </div>
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
