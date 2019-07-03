import axios from "axios";

export default {
    authorize: () => {
        return axios.get("http://127.0.0.1:3001/api/connect/instagram" )
    },
    getHashtags: () => {
        return axios.get("/api/connect/scrape/instagram")
    }
}