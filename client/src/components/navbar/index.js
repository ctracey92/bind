import React from "react";
import { NavLink } from 'react-router-dom'



function Navbar(){
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink to="/" className="navbar-brand">React Books</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
          <NavLink to="/search" className="nav-item nav-link">Search</NavLink>
          <NavLink to="/saved" className="nav-item nav-link">Saved</NavLink>
          </div>
        </div>
      </nav>  
    )
}

export default Navbar;