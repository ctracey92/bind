import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import bootstrapPlugin from '@fullcalendar/bootstrap';

class Calendar extends Component{

    state = {
        events: [
            { title: 'event 1', date: '2019-06-19' },
            { title: 'event 2', date: '2019-06-20', start  : '2019-06-20T12:30:00',allDay : false },
            { title: 'event 3', date: '2019-06-20', start  : '2019-06-20T15:30:00',allDay : false },
            { title: 'event 4', date: '2019-06-20', start  : '2019-06-20T12:30:00',allDay : false },
            { title: 'event 5', date: '2019-06-20', start  : '2019-06-20T15:30:00',allDay : false },
            { title: 'event 6', date: '2019-06-20', start  : '2019-06-20T12:30:00',allDay : false },
            { title: 'event 7', date: '2019-06-20', start  : '2019-06-20T15:30:00',allDay : false }
          ],
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    }
    render(){
        const {user} = this.props.auth;

        return(
            <div>
                <h4>Stuff</h4>
                <button
                            style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem",
                            }}
                            onClick={this.onLogoutClick}
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                            Logout
                </button>
                <br />
                <div style={{maxWidth: "800px", maxHeight:"325px"}}>
                <FullCalendar 
                style={{contentHeight: "auto"}}
                defaultView="dayGridMonth" 
                plugins={[ dayGridPlugin,bootstrapPlugin ]}
                events={this.state.events}
                
                 />
                </div>
            </div>
        )
    }
}


Calendar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {logoutUser}
)(Calendar);