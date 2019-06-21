import React, {Component} from "react";
import {Link} from "react-router-dom";

class Footer extends Component{
    render(){
        return(
          //   <footer className="page-footer" style={{
          //     position: "fixed",
          //     left: 0,
          //     bottom: 0,
          //     width: "100%",

          //   }}>
          //   <div>
          //     <div className="container">
          //     © 2019 Copyright Bind App
          //     <Link className="grey-text text-lighten-4 right" to="/privacy">| Privacy Policy</Link> 
          //     <Link className="grey-text text-lighten-4 right" to="/terms">Terms of Service |</Link>
          //     </div>
          //   </div>
          // </footer>
          <div className="footer-fixed" style={{
            position: "fixed",
            left: 0,
            bottom: 0,
            width: "100%"
            
          }}>
                <nav className="z-depth-0 grey darken-4">
                    <div className="nav=wrapper white">
                        <Link
                          to="/"
                          style={{
                              fontFamily: "monospace"
                          }}
                          className="col s5 brand-logo center white-text">
                              BIND
                          </Link>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Footer;