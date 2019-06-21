import axios from "axios";

export default {
    getEvents: () => {
        return axios.get("api/events")
    },
    addEvent: (eventinfo) => {
        return axios.post("/api/events/post", eventinfo)
    },
};