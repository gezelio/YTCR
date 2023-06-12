var express = require("express");
var app = express.Router();
var fs = require("fs");
var path = require("path");
const functions = require("../lib/functions");
const DataBase = require("../model/DataBase");

app.get("/", functions.LoggedIn, async (req, res) => {
    const user = await DataBase.findOne({ "user.id": req.session.user.user.id }).exec();
    res.render(path.resolve("./views/ytcr/dashboard.ejs"), {
        user: functions.CheckUser(user)
    });
});
app.get("/settings", functions.LoggedIn, async (req, res) => {
    const user = await DataBase.findOne({ "user.id": req.session.user.user.id }).exec();
    res.render(path.resolve("./views/ytcr/settings.ejs"), {
        user: functions.CheckUser(user)
    });
});
app.get("/privacy", functions.LoggedIn, async (req, res) => {
    const user = await DataBase.findOne({ "user.id": req.session.user.user.id }).exec();
    res.render(path.resolve("./views/ytcr/privacy.ejs"), {
        user: functions.CheckUser(user)
    });
});
app.get("/rewards", functions.LoggedIn, async (req, res) => {
    const user = await DataBase.findOne({ "user.id": req.session.user.user.id }).exec();
    res.render(path.resolve("./views/ytcr/rewards.ejs"), {
        user: functions.CheckUser(user)
    });
});
app.get("/additional", functions.LoggedIn, async (req, res) => {
    const user = await DataBase.findOne({ "user.id": req.session.user.user.id }).exec();
    res.render(path.resolve("./views/ytcr/additional.ejs"), {
        user: functions.CheckUser(user)
    });
});
app.get("/select/youtube", functions.LoggedIn, async (req, res) => {
    var youtube_ids_push = [];
    const data_data = await DataBase.findOne({ "user.id": req.session.user.user.id }).exec();
    if (data_data) {
        data_data.discord.connections.forEach(function (data_youtube, index) {
            if (data_youtube.type == "youtube") {
                youtube_ids_push.push(data_youtube);
            }
            if (data_data.discord.connections.length == index + 1) {
                res.render(path.resolve("./views/ytcr/youtube_select.ejs"), {
                    current_channel_id: req.session.user.channel_id,
                    user: functions.CheckUser(req.session.user),
                    youtube_ids: youtube_ids_push
                });
            }
        });
    }
});
module.exports = app;
