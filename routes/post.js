var express = require("express");
var app = express.Router();
var fs = require("fs");
var path = require("path");
const functions = require("../lib/functions");
const DataBase = require("../model/DataBase");
app.post("/post/dashboard/select/youtube", async (req, res) => {
    const data = await DataBase.findOne({ "user.id": req.session.user.user.id }).exec();
    if (data) {
        data.channel_id = req.body.youtube_id;
        data.verified = true;
        data.save()
            .then((savedDocument) => {
                req.session.user = data;
                res.send({ status: "success" });
            })
            .catch((err) => {
                console.log("err: ", err);
                res.send({ status: "failed" });
            });
    } else {
        res.send({ status: "failed" });
    }
});
app.post("/post/update/ChannelAmount", async (req, res) => {
    const data = await DataBase.findOne({ "user.id": req.session.user.user.id }).exec();
    if (data) {
        data.channel_options.channel_amount = req.body.data;
        data.save()
            .then((savedDocument) => {
                req.session.user = data;
                res.send({ status: "success" });
            })
            .catch((err) => {
                console.log("err: ", err);
                res.send({ status: "failed" });
            });
    } else {
        res.send({ status: "failed" });
    }
});
app.post("/post/update/DeleteUser", async (req, res) => {
    const data = await DataBase.findOne({ "user.id": req.session.user.user.id }).exec();
    if (data) {
        data.deleteOne({ "user.id": req.session.user.user.id });
        res.send({ status: "wipe" });
    } else {
        res.send({ status: "failed" });
    }
});
app.post("/post/update/WipeUsers", async (req, res) => {
    const data = await DataBase.findOne({ "user.id": req.session.user.user.id }).exec();
    if (data) {
        data.users = [];
        data.save()
            .then((savedDocument) => {
                req.session.user = data;
                res.send({ status: "success" });
            })
            .catch((err) => {
                console.log("err: ", err);
                res.send({ status: "failed" });
            });
    } else {
        res.send({ status: "failed" });
    }
});
module.exports = app;
