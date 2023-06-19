var express = require("express");
var app = express.Router();
var fs = require("fs");
const functions = require("../lib/functions");
var path = require("path");
app.get("/assets/images/:file", (req, res) => {
    res.sendFile(path.resolve("./assets/images/" + req.params.file));
});
app.get("/assets/styles/:file", (req, res) => {
    res.sendFile(path.resolve("./assets/styles/" + req.params.file));
});
app.get("/assets/js/:file", (req, res) => {
    res.sendFile(path.resolve("./assets/js/" + req.params.file));
});
app.get("/assets/md/:file", (req, res) => {
    res.sendFile(path.resolve("./assets/md/" + req.params.file.replace("!", "/")));
});
app.get("/assets/md/doc/:file", (req, res) => {
    res.sendFile(path.resolve("./assets/md/doc/" + req.params.file));
});
app.get("/error/404", (req, res) => {
    res.render(path.resolve("./views/404.ejs"));
});
module.exports = app;
