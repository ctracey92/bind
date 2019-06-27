import axios from "axios";

export default {
    authorize: () => {
        return axios.get("http://127.0.0.1:3001/api/connect/twitter/")
    }
}