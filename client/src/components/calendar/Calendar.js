import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import FullCalendar from '@fullcalendar/react'

//Plug-ins
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

import M from "materialize-css";


import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

import Sidenav from "../layout/sidenav/Sidenav";

import API from "../../utils/events";

class Calendar extends Component {

    state = {
        events: [
            { title: 'event 1', date: '2019-06-19' },
            { title: 'event 2', date: '2019-06-20', start: '2019-06-20T12:30:00', allDay: false, id: "1" },
            { title: 'event 3', date: '2019-06-20', start: '2019-06-20T15:30:00', allDay: false },
            { title: 'event 4', date: '2019-06-20', start: '2019-06-20T12:30:00', allDay: false },
            { title: 'event 5', date: '2019-06-20', start: '2019-06-20T15:30:00', allDay: false },
            { title: 'event 6', date: '2019-06-20', start: '2019-06-20T12:30:00', allDay: false },
            { title: 'event 7', date: '2019-06-20', start: '2019-06-20T15:30:00', allDay: false }
        ],
    }



    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    }



    getEvents = () => {
        API.getEvents()
            .then(res => {
                console.log(res)
                // this.setState({ events: res.data })
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

    componentDidMount() {
        this.getEvents();
    }

    

    handleDateClick = arg => {
        console.log(arg);
    
    };






    render() {

        const { user } = this.props.auth;
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.modal');
            var instances = M.Modal.init(elems);
         });


        return (
            <div className="calendar">
                <a className="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>
                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <h4>Modal Header</h4>
                        <p>A bunch of text</p>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
                    </div>
                </div>
                <Sidenav username={user.username} logout={this.onLogoutClick} />

                {/* <button onClick={this.addEvent}>To add Event</button>
                <DashButton />
                <br /> */}
                <div className="row">
                    <div className="col s4">

                    </div>
                    <div className="col s8">
                        <div className="container valign-wrapper" className="container valign-wrapper">
                            <FullCalendar

                                dateClick={this.handleDateClick}
                                customButtons={{
                                    myCustomButton: {
                                      text: 'custom!',
                                      click: function() {
                                        
                                      },
                                    },
                                  }}
                                header={{
                                    left: "prev,next today, myCustomButton",
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
    { logoutUser }
)(Calendar);