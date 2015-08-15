var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');

var Info = mongoose.model('/data', {message: String});

router.post("/data", function (req, res, next) {
    var info = new Info({message: req.body.message, flag: false});
    info.save(function (err) {
        if (err) console.log('There was an error when posting ', err);
        res.send("yes");
    });
});

router.get("/data", function (req, res, next) {
    return Info.find({}).exec(function (err, info) {
        if (err) throw new Error(err);
        res.send(JSON.stringify(info));
    });
});




router.get("/*", function (req, res, next) {
    var file = req.params[0] || '/assets/views/index.html';
    res.sendFile(path.join(__dirname, "../public/", file));
});

module.exports = router;