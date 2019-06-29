import axios from "axios";

export default {
    authorized: (user) => {
        return axios.get(`api/connect/auth/${user}`)
    }
}