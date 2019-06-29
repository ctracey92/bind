import axios from "axios";
const cors = require("cors");



// router.options('*', cors())

// let corsOptions = {
//     origin: ["http://127.0.0.1:3000/twitter","http://127.0.0.1:3000"],
//     optionsSuccessStatus: 200
// }


export default {
    authorize: () => {
        return axios.get("http://127.0.0.1:3001/api/connect/twitter/")
    }
}