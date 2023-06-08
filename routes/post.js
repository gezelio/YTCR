var express = require("express");
var app = express.Router();
var fs = require("fs");
var path = require("path");
const functions = require("../lib/functions");
const DataBase = require("../model/DataBase");
const fetch = require("node-fetch");

app.post("/post/dashboard/select/youtube", functions.LoggedInPost, async (req, res) => {
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
app.post("/post/update/ChannelAmount", functions.LoggedInPost, async (req, res) => {
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
app.post("/post/update/DeleteUser", functions.LoggedInPost, async (req, res) => {
    const data = await DataBase.findOne({ "user.id": req.session.user.user.id }).exec();
    if (data) {
        data.deleteOne({ "user.id": req.session.user.user.id });
        res.send({ status: "wipe" });
    } else {
        res.send({ status: "failed" });
    }
});
app.post("/post/update/WipeUsers", functions.LoggedInPost, async (req, res) => {
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
app.post("/youtube/post", (req, res) => {
    if (req.body?.channel_id) {
        fetch(`https://www.youtube.com/channel/${req.body.channel_id}/live`)
            .then(function (response) {
                return response.text();
            })
            .then(function (html) {
                if (html.includes("hqdefault_live.jpg")) {
                    res.send({
                        status: "live"
                    });
                } else {
                    res.send({
                        status: "not live"
                    });
                }
            })
            .catch(function (err) {
                console.log("Something went wrong", err);
            });
    } else {
        res.send({
            status: "not live"
        });
    }
});
module.exports = app;
