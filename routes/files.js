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
app.get("/assets/md/*", (req, res) => {
    const file = req.params[0];
    res.sendFile(path.resolve("./assets/md/" + file));
});
app.get("/assets/docs/*", (req, res) => {
    const file = req.params[0];
    res.sendFile(path.resolve("./assets/docs/" + file));
});
app.get("/assets/md.json", (req, res) => {
    res.sendFile(path.resolve("./data/markdown-docs.json"));
});
app.get("/error/404", (req, res) => {
    res.render(path.resolve("./views/404.ejs"));
});
module.exports = app;
