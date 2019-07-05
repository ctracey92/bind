import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

class Landing extends Component {
  
  componentDidMount(){
    //If logged in, redirects to dashboard
    if (this.props.auth.isAuthenticated){
        this.props.history.push("/dashboard");
    }
}

componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
        this.props.history.push("/dashboard"); //Send user to dash when they login
    }
    if (nextProps.errors){
        this.setState({
            errors: nextProps.errors,
        });
    }
}
    render() {
      return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align">
              <h4>
                <b>B.I.N.D.</b> | A social media managing app
              </h4>
              <p className="flow-text grey-text text-darken-1">
                Create an account <b>Brand</b>, <b>Influence</b>, <b>Network</b>, and <b>Dominate</b>.
              </p>
              <br />
              <div className="col s6">
                <Link
                  to="/register"
                  style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                  }}
                  className="btn-large hoverable grey darken-2"
                >
                  Register
                </Link>
              </div>
              <div className="col s6">
                <Link
                  to="/login"
                  style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                  }}
                  className="btn-large hoverable grey darken-2"
                >
                  Log In
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(
  mapStateToProps,
) (Landing);