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
                        <img className="square" src="https://pbs.twimg.com/media/D92A4_fVAAApfGL.jpg" style={{width: "200px",height:"200px"}} />
                        <h4>
                            <b>Welcome,</b> {props.username}
                        </h4> 
                    </div>
                </li>
                <li><Link to="/dashboard"><i className="fas fa-home icon fa-3x"></i>Dashboard</Link></li>
                <li><Link to="/twitter"><i className="fab fa-twitter-square icon fa-3x"></i>Twitter</Link></li>
                <li><Link to="/instagram"><i className="fab fa-instagram icon fa-3x"></i>Instagram</Link></li>
                <li><Link to="/calendar"><i className="far fa-calendar-alt icon fa-3x"></i>Calendar</Link></li>
                <li><div className="divider"></div></li>
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

