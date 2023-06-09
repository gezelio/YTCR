var express = require("express");
var app = express.Router();
var fs = require("fs");
var path = require("path");
const functions = require("../lib/functions");
const DataBase = require("../model/DataBase");
app.get("/", (req, res) => {
    res.render(path.resolve("./views/home.ejs"));
});
app.get("/beta-request", (req, res) => {
    res.redirect("https://forms.gle/uz25jr7qMNxfFDK3A");
});
app.get("/docs", (req, res) => {
    res.render(path.resolve("./views/docs/docs.ejs"));
});
app.get("/docs/*", (req, res) => {
    const file = req.params[0]; // Use req.params[0] to capture the complete file path
    console.log("file: ", file);
    res.render(path.resolve("./views/docs/docs_helper.ejs"), { file: file });
});
app.get("/get-started", (req, res) => {
    res.render(path.resolve("./views/ytcr/ytcr-docs/help/get-started.ejs"));
});

app.get("/action-id", (req, res) => {
    res.render(path.resolve("./views/ytcr/ytcr-docs/help/actionid.ejs"));
});
app.get("/commands", (req, res) => {
    res.render(path.resolve("./views/ytcr/ytcr-docs/help/chat-commands.ejs"));
});
app.get("/beta/get-started", (req, res) => {
    res.render(path.resolve("./views/ytcr/ytcr-docs/beta/get-started.ejs"));
});
app.get("/streamerbot/action-id", (req, res) => {
    res.render(path.resolve("./views/ytcr/ytcr-docs/beta/streamerbot.ejs"));
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
app.get("/obs/dock", functions.LoggedIn, async (req, res) => {
    const user = await DataBase.findOne({ "user.id": req.session.user.user.id }).exec();
    res.render(path.resolve("./views/obs_dock/rewards.ejs"), {
        user: functions.CheckUser(user)
    });
});
app.post("/get-obs/reward/data", async (req, res) => {
    const data = await DataBase.findOne({ channel_link: req.body.channel_link }).exec();
    res.send({ status: "success", rewards: data.rewards, user_rewards: data.user_rewards, users: data.users });
});
module.exports = app;
