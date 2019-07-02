import axios from "axios"

export default {
    postToTwitter: (token, tokenSecret, status) => {
       return axios.post("/api/twitter/post", {
            token: token,
            tokenSecret: tokenSecret,
            status: status,
        })
    },
    getFavorites: (token, tokenSecret) => {
       return axios.post("/api/twitter/favorites", {
            token: token,
            tokenSecret: tokenSecret,
        })
    },
    getMentions: (token, tokenSecret) => {
        return axios.post("/api/twitter/mentions", {
             token: token,
             tokenSecret: tokenSecret,
         })
     },
}