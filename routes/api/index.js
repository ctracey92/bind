const router = require("express").Router();
const users = require("./users")
const events = require("./events")

//Routes
router.use("/users", users);

router.use("/events",events);

module.exports = router;