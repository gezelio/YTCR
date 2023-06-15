var express = require("express");
var app = express.Router();
var fs = require("fs");
const functions = require("../lib/functions");
var path = require("path");
require("dotenv").config();
const DataBase = require("../model/DataBase");
const { google } = require("googleapis");
const auth = new google.auth.OAuth2(process.env.G_client_id, process.env.G_client_secret, process.env.D_redirect_url + "/google/callback");
const scopes = ["https://www.googleapis.com/auth/youtube.readonly", "https://www.googleapis.com/auth/youtube.force-ssl"];
app.get("/google", (req, res) => {
    res.sendFile(path.resolve("./views/google.html"));
});
app.get("/google/auth", (req, res) => {
    const authUrl = auth.generateAuthUrl({
        access_type: "offline",
        scope: scopes
    });
    res.redirect(authUrl);
});
app.get("/google/callback", async (req, res) => {
    const code = req.query.code;
    auth.getToken(code, async (err, token) => {
        if (err) {
            console.error("Error retrieving access token:", err);
            res.status(500).send("Error retrieving access token.");
            return;
        }
        auth.setCredentials(token);
        const youtube = google.youtube({
            version: "v3",
            auth: auth
        });
        const response = await youtube.channels.list({
            part: "snippet",
            mine: true
        });
        const channel = response.data.items[0];
        const channelId = channel.id;
        const storedCredentials = JSON.stringify({ token, channelId });
        const dataBase = await DataBase.findOne({ channel_id: channel.id }).exec();
        try {
            auth.setCredentials(JSON.parse(storedCredentials).token);
            dataBase.google.token = JSON.parse(storedCredentials).token;
            const youtube = google.youtube({
                version: "v3",
                auth: auth
            });
            const response = await youtube.liveBroadcasts.list({
                part: "snippet",
                filter: "mine", // Specify the filter parameter
                maxResults: 1,
                mine: true,
                channelId: JSON.parse(storedCredentials).channelId
            });
            const liveChatId = response.data.items[0].snippet.liveChatId;
            res.sendFile(path.resolve("./views/google_auth.html"));
            dataBase.google.liveChatId = liveChatId;
        } catch (error) {
            console.error("Error retrieving liveChatId:", error);
            res.status(500).send("Error retrieving youtube data.");
        }
        dataBase.save();
    });
});
// app.get("/google/sendmessage/:slug", async (req, res) => {
//     try {
//         const dataBase = await DataBase.findOne({ channel_id: req.params.slug }).exec();
//         // const storedCredentials = fs.readFileSync("credentials.json");
//         auth.setCredentials(dataBase.google.token);
//         const youtube = google.youtube({
//             version: "v3",
//             auth: auth
//         });
//         const response = await youtube.liveChatMessages.insert({
//             part: "snippet",
//             resource: {
//                 snippet: {
//                     liveChatId: dataBase.google.liveChatId,
//                     type: "textMessageEvent",
//                     textMessageDetails: {
//                         messageText: "Hello, YouTube!"
//                     }
//                 }
//             }
//         });
//         res.send("Message sent successfully!");
//     } catch (error) {
//         console.error("Error sending message:", error);
//         res.status(500).send("Error sending message.");
//     }
// });
module.exports = app;
