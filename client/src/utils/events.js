import axios from "axios";

export default {
    getEvents: (user) => {
        return axios.get(`api/events/${user}`)
    },
    addEvent: (eventinfo) => {
        return axios.post("/api/events/post", eventinfo)
    },
};