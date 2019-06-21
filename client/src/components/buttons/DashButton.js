import React, {Component} from "react";
import {Link} from "react-router-dom";

class DashButton extends Component{
    render(){
        return(
            <div>
                <Link to="/dashboard">
                    <button
                        style={{
                            width: "150px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem",
                        }}
                        className=" btn-large hoverable grey darken-2"
                    >
                    Dashboard
                    </button>                    
                </Link>
            </div>
        )
    }
}

export default DashButton;