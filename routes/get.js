var express = require("express");
var app = express.Router();
var fs = require("fs");
var path = require("path");
const functions = require("../lib/functions");
const DataBase = require("../model/DataBase");
app.get("/", (req, res) => {
    res.render(path.resolve("./views/home.ejs"));
});

app.get("/get-started", (req, res) => {
    res.render(path.resolve("./views/ytcr/ytcr-docs/help/get-started.ejs"));
});

app.get("/action-id", (req, res) => {
    res.render(path.resolve("./views/ytcr/ytcr-docs/help/actionid.ejs"));
});

app.get("/get/dashboard/data", functions.LoggedIn, async (req, res) => {
    const data = await DataBase.findOne({ "user.id": req.session.user.user.id }).exec();
    data.user == {};
    res.send({ status: "success", data: data });
});

app.get("/u/:slug", async (req, res) => {
    const UserData = await DataBase.findOne({ channel_link: req.params.slug }).exec();
    if (UserData) {
        res.render(path.resolve("./views/ytcr/channel.ejs"), {
            link: UserData.channel_link,
            channel_name: UserData.user.username,
            users: UserData.users
        });
    }
});
app.get("/api/u/points/:slug", async (req, res) => {
    const UserData = await DataBase.findOne({ channel_link: req.params.slug }).exec();
    if (UserData) {
        res.send({ status: "success", users: UserData.users });
    } else {
        res.send({ status: "fail" });
    }
});
module.exports = app;
