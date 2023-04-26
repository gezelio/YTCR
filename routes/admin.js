var express = require('express');
var app = express.Router();
var fs = require('fs');
var path = require('path');
const functions = require("../lib/functions");
const DataBase = require('../model/DataBase');
function CheckUser(user) {
    return {
        "discord_user_id": user.user.discord_user_id,
        "email": user.user.email,
        "id": user.user.id,
        "profile_pic": user.user.profile_pic,
        "username": user.user.username,
        "account": user.account
    }
}
function isAdmin(user) {
    if (user.account.type == "staff") return true | false
}
app.get('/dashboard/staff', functions.LoggedIn, async (req, res) => {
    const user = await DataBase.findOne({ 'user.id': req.session.user.user.id }).exec();
    if (isAdmin(user)) {
        res.render(path.resolve('./views/admin/panel.ejs'), {
            user: CheckUser(user)
        })
    } else {
        res.redirect("/dashboard")
    }
});
app.get('/get-admin/all', functions.LoggedIn, async (req, res) => {
    if (req.session.user.account.type == "staff") {
        const data = await DataBase.find({}).exec();
        res.send(data)
    } else {
        res.send({ "error": "true" })
    }
});

module.exports = app;