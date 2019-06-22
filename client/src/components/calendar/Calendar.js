import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";

import FullCalendar from '@fullcalendar/react'

//Plug-ins
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick


import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';



// import "./style.css";

import DashButton from "../buttons/DashButton"

import API from "../../utils/events";

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



    getEvents = () => {
        API.getEvents()
        .then(res=>{
            console.log(res)
            this.setState({events: res.data})
        })
        .catch(err => console.log(err));
    };

    addEvent = e => {
        e.preventDefault();
        API.addEvent({
            title: "stringTest",
            date: "2019-06-21"
        })
        .then(this.getEvents)
        .catch(err => console.log(err));
    };

componentDidMount(){
    this.getEvents();
}

// handleDateClick = (arg) => { // bind with an arrow function
//     alert(arg.dateStr)
//   }

handleDateClick = arg => {
    // let instance = M.Modal.getInstance(elem);
    // instance.open();
    console.log(arg);
  };


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
                            className=" btn-large hoverable grey darken-2"
                        >
                            Logout
                </button>
                <button onClick={this.addEvent}>To add Event</button>
                <DashButton />
                <br />
                <div className="container">
                <FullCalendar 
                dateClick={this.handleDateClick}
                header={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
                  }}
                className="calendar"
                defaultView="dayGridMonth" 
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
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