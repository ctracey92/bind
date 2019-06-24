import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css";
// import "materialize-css/dist/css/materialize.min.css";

function Sidenav(props) {
    
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.sidenav');
            var instances = M.Sidenav.init(elems);
          })
    
    
    return (
        <div>
            <ul id="slide-out" className="sidenav">
                <li>
                    <div className="user-view">
                        {/* <div className="background">
          <img src="images/office.jpg">
        </div> */}
                        <img className="circle" src="https://pbs.twimg.com/profile_images/1090266878046494722/kMbMpIkS_400x400.jpg" />
                        <h4>
                            <b>Welcome,</b> {props.username}
                        </h4> 
                    </div>
                </li>
                <li><Link to="/dashboard"><i className="material-icons">home</i>Dashboard</Link></li>
                <li><Link to="/dashboard"><i className="material-icons">cloud</i>Second Link</Link></li>
                <li><div className="divider"></div></li>
                <li><a className="subheader">Subheader</a></li>
                <li>
                <button
                            style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem",
                            }}
                            onClick={props.logout}
                            className=" btn-large hoverable grey darken-2"
                        >
                            Logout
                </button>
                </li>
            </ul>
            <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
        </div>
    )
}

export default Sidenav;

