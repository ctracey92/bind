const router = require("express").Router();
const users = require("./users");
const events = require("./events");
const connect = require("./connect");
const twitter = require("./twitter");

//Routes
router.use("/users", users);

router.use("/events",events);

router.use("/connect",connect);

router.use("/twitter", twitter)

module.exports = router;