var express = require("express");
var app = express.Router();
var fs = require("fs");
var path = require("path");
const functions = require("../lib/functions");
const DataBase = require("../model/DataBase");
function isAdmin(user) {
    if (user.account.type == "staff") return true | false;
}
app.get("/dashboard/staff", functions.LoggedIn, async (req, res) => {
    const user = await DataBase.findOne({ "user.id": req.session.user.user.id }).exec();
    if (isAdmin(user)) {
        res.render(path.resolve("./views/admin/panel.ejs"), {
            user: functions.CheckUser(user)
        });
    } else {
        res.redirect("/dashboard");
    }
});
app.get("/dashboard/staff/rewards_and_users/:slug", functions.LoggedIn, async (req, res) => {
    const user = await DataBase.findOne({ "user.id": req.session.user.user.id }).exec();
    if (isAdmin(user)) {
        res.render(path.resolve("./views/admin/rewards_and_users.ejs"), {
            user: functions.CheckUser(user),
            slug: req.params.slug
        });
    } else {
        res.redirect("/dashboard");
    }
});
app.get("/get-admin/all", functions.LoggedIn, async (req, res) => {
    if (req.session.user.account.type == "staff") {
        const data = await DataBase.find({}).exec();
        res.send(data);
    } else {
        res.send({ error: "true" });
    }
});
app.post("/get-admin/reward/data", functions.LoggedIn, async (req, res) => {
    if (req.session.user.account.type == "staff") {
        const data = await DataBase.findOne({ "user.id": req.body.uid }).exec();
        data.user == {};
        res.send({ status: "success", data: data });
    } else {
        res.send({ error: "true" });
    }
});
module.exports = app;
