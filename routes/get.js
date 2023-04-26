var express = require('express');
var app = express.Router();
var fs = require('fs');
var path = require('path');
const functions = require("../lib/functions");
const DataBase = require('../model/DataBase');
function CheckUser(user) {
    return {
        "discord_user_id": user.user?.discord_user_id,
        "email": user.user.email,
        "id": user.user.id,
        "profile_pic": user.user.profile_pic,
        "username": user.user.username,
        "account": user.account
    }
}
app.get("/", (req, res) => {
    res.render(path.resolve('./views/home.ejs'))
});

app.get("/dashboard", functions.LoggedIn, async (req, res) => {
    const user = await DataBase.findOne({ 'user.id': req.session.user.user.id }).exec();
    res.render(path.resolve('./views/ytcr/dashboard.ejs'), {
        user: CheckUser(user)
    })
});
app.get("/get/dashboard/data", functions.LoggedIn, async (req, res) => {
    const data = await DataBase.findOne({ 'user.id': req.session.user.user.id }).exec();
    data.user == {}
    res.send({ status: "success", data: data })
});

app.get('/dashboard/select/youtube', functions.LoggedIn, async (req, res) => {
    var youtube_ids_push = [];
    const data_data = await DataBase.findOne({ 'user.id': req.session.user.user.id }).exec();
    if (data_data) {
        data_data.discord.connections.forEach(function (data_youtube, index) {
            if (data_youtube.type == "youtube") {
                youtube_ids_push.push(data_youtube)
                console.log('youtube_ids_push: ', youtube_ids_push)
                console.log('data_data.discord.connections.length: ', data_data.discord.connections.length)
                console.log('index: ', index)
            }
            if (data_data.discord.connections.length == index + 1) {
                console.log('youtube_ids_push: ', youtube_ids_push)
                res.render(path.resolve('./views/ytcr/youtube_select.ejs'), {
                    current_channel_id: req.session.user.channel_id,
                    user: CheckUser(req.session.user),
                    youtube_ids: youtube_ids_push
                })
            }
        })
    }
});

app.get('/u/:slug', async (req, res) => {
    const UserData = await DataBase.findOne({ 'channel_link': req.params.slug }).exec();
    if (UserData) {
        res.render(path.resolve('./views/ytcr/channel.ejs'), {
            channel_name: UserData.user.username,
            users: UserData.users
        })
    }
});

module.exports = app;