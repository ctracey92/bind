const router = require("express").Router();
const users = require("./users")
const events = require("./events")
const connect = require("./connect")

//Routes
router.use("/users", users);

router.use("/events",events);

router.use("/connect",connect);

module.exports = router;