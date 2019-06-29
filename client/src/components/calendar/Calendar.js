import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Select from 'react-select';

import FullCalendar from '@fullcalendar/react'

//Plug-ins
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

import Sidenav from "../layout/sidenav/Sidenav";

import API from "../../utils/events";

import Modal from "react-responsive-modal";
// import ReactDOM from 'react-dom';

//Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Calendar extends Component {
    state = {
        color: null,
        modalIsOpen: false,
        events: [],
        start: "",
        end: "",
        title: "",
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    }

    getEvents = () => {
        API.getEvents(this.props.auth.user.id)
            .then(res => {
                console.log(res)
                this.setState({ events: res.data })
            })
            .catch(err => console.log(err));
    };

    openModal = () => {
        this.setState({ modalIsOpen: true })
    };

    closeModal = () => {
        this.setState({ modalIsOpen: false })
    };

    handleStartChange = (date) => {
        this.setState({
            start: date
        });
    };

    handleEndChange = (date) => {
        this.setState({
            end: date
        });
    };

    handleTitleChange = (event) => {
        this.setState({ title: event.target.value });
    }
        ;

    handleChange = color => {
        this.setState({ color });
        console.log(`Option selected:`, color);
    };

    add = e => {
        let end = this.state.end ? this.state.end : this.state.start;
        if (end < this.state.start) {
            end = this.state.start
        };
        e.preventDefault();
        API.addEvent({
            title: this.state.title,
            start: this.state.start,
            end: end,
            backgroundColor: this.state.color.value,
            user: this.props.auth.user.id
        })
            .then(this.closeModal())
            .then(this.getEvents())
            .then(this.setState({ start: "", end: "", title: "" }))
            .catch(err => console.log(err));

    }





    componentDidMount() {
        this.getEvents();
    };
    render() {
        const { color } = this.state;
        const options = [
            { value: 'purple', label: 'Instagram Post' },
            { value: 'blue', label: 'Twitter Post' },
            { value: 'red', label: 'Sale' },
            { value: 'green', label: 'Email Blast' },

        ];
        const { user } = this.props.auth;
        return (
            <div className="calendar">
                <Modal
                    open={this.state.modalIsOpen}
                    onClose={this.closeModal}
                // style={customStyles}
                >   <form>
                        <b>Start Date: </b>
                        <DatePicker
                            selected={this.state.start}
                            onChange={this.handleStartChange}
                            showTimeSelect
                            dateFormat="Pp"

                        />
                        {/* <br /> */}
                        <b>End Date: </b>
                        <DatePicker
                            selected={this.state.end}
                            onChange={this.handleEndChange}
                            showTimeSelect
                            dateFormat="Pp"
                        />
                        <br />
                        <b>Select Event Type: </b>
                        <Select
                            value={color}
                            onChange={this.handleChange}
                            options={options}
                        />
                        <br />
                        <span>
                            <b>Event Title: </b>
                            <input type="text" value={this.state.title} onChange={this.handleTitleChange} style={{ maxWidth: "183.33px" }} />
                        </span>
                        <br />
                        <button className=" btn-large hoverable grey darken-2" onClick={this.add} style={{
                            width: "150px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem",
                        }}>Add Event</button>
                    </form>
                </Modal>
                <Sidenav username={user.username} logout={this.onLogoutClick} />



                <div className="row">
                    <div className="col s2">

                    </div>
                    <div className="col s8">
                        <div className="container valign-wrapper">
                            <FullCalendar

                                dateClick={this.handleDateClick}
                                customButtons={{
                                    myCustomButton: {
                                        text: 'Add Event',
                                        click: this.openModal
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