import React from "react";
import { Link } from "react-router-dom";


function Sidenav(props) {
    return (
        <div>
            <ul id="slide-out" className="sidenav sidenav-fixed">
                <li>
                    <div className="user-view">
                        {/* <div className="background">
          <img src="images/office.jpg">
        </div> */}
                        <img className="square" alt="bind-logo" src="https://pbs.twimg.com/media/D92A4_fVAAApfGL.jpg" style={{ width: "200px", height: "200px" }} />
                        <h4>
                            <b>Welcome,</b> {props.username}
                        </h4>
                    </div>
                </li>
                <li ><Link to="/dashboard" className=".sidenav-close"><i className="fas fa-home icon fa-3x"></i>Dashboard</Link></li>
                <li className=".sidenav-close"><Link to="/twitter"><i className="fab fa-twitter-square icon fa-3x"></i>Twitter</Link></li>
                <li><Link to="/instagram"><i className="fab fa-instagram icon fa-3x"></i>Instagram</Link></li>
                <li><Link to="/calendar"><i className="far fa-calendar-alt icon fa-3x"></i>Calendar</Link></li>
                <li><div className="divider"></div></li>
                <li>
                    <button
                        style={{
                            marginLeft: "28px",
                            width: "150px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem",
                        }}
                        onClick={props.logout}
                        className=" btn-large hoverable grey darken-2 .sidenav-close"
                    >
                        Logout
                </button>
                </li>
            </ul>
            <Link to="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></Link>
        </div>
    )
}

export default Sidenav;

