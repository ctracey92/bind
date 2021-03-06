const express = require("express");
const router = express.Router();
const cors = require("cors")
const Event = require("../../client/models/event");
router.options('*', cors())

router.get("/:user",(req,res) => {
    Event.find({user: req.params.user},(err,data) => {
        if(!err){res.json(data)}
        else{throw err}
    })
});

router.post("/post",(req,res) => {
    Event.create(req.body)
    .catch((err) => res.json(err))
});

module.exports = router;