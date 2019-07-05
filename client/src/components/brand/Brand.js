import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Sidenav from "../layout/sidenav/Sidenav";

class Brand extends Component {
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
                    <h2>Brand:</h2>
                    <h5>
                        Thank you for choosing BIND to help you with your marketing and branding needs. Our goal is to help you grow and expand your business/influence exponentially, and in order to do so have put together some helpful steps to get you started!
                    </h5>
                    <h4>Steps to building your brand:</h4>
                    <ol>
                        <li><h6>Determine your brand's target audience. <a href="https://www.thebalancesmb.com/focus-and-identify-your-target-audience-2294844" target="_blank"  rel="noopener noreferrer">Some questions to help you get started.</a></h6> </li>
                        <li><h6>Establish a brand mission statement.<a href="https://www.dummies.com/business/marketing/branding/how-to-write-vision-and-mission-statements-for-your-brand/" target="_blank"  rel="noopener noreferrer">(Not a writer? This might help!)</a></h6></li>
                        <li><h6>Research brands within your industry niche. (Google is your best friend)</h6></li>
                        <li><h6>Create a brand logo and tagline. <a href="www.canva.com" target="_blank"  rel="noopener noreferrer">(No design team? We got you covered!)</a></h6></li>
                        <li><h6>Build a brand message. Find something that encompasses your brand.</h6></li>
                        <li><h6><u>Let your brand personality shine.</u>  A great example of this is <a href="https://twitter.com/Wendys" target="_blank">Wendy's</a> Twitter.</h6></li>
                        <li><h6>Integrate your brand into every aspect of your business.</h6></li>
                        <li><h6>Stay true to your brand building.</h6></li>
                        <li><h6><b>Consitency is key!</b> If you keep it up your brand will grow. (The calendar tool is great for this)</h6></li>
                    </ol>
                    <h5>
                        That's it! Remember Rome was not built in a day and neither will your brand, but keep with it and you <b>WILL</b> see it grow!
                    </h5>


                </div>
            </div>

        )
    }
}

Brand.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Brand);