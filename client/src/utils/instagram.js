import axios from "axios";

export default {
    authorize: () => {
        return axios.get("/api/connect/instagram" )
    },
    getHashtags: () => {
        return axios.get("/api/connect/scrape/instagram")
    }
}