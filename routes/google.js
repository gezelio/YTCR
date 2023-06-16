var express = require("express");
var app = express.Router();
var fs = require("fs");
const functions = require("../lib/functions");
var path = require("path");
require("dotenv").config();
const DataBase = require("../model/DataBase");
const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");
const auth = new google.auth.OAuth2(process.env.G_client_id, process.env.G_client_secret, process.env.D_redirect_url + "/google/callback");
const scopes = ["https://www.googleapis.com/auth/youtube.readonly", "https://www.googleapis.com/auth/youtube.force-ssl"];
app.get("/google", (req, res) => {
    res.sendFile(path.resolve("./views/obs_dock/google.html"));
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
        dataBase.google.token = JSON.parse(storedCredentials).token;
        dataBase.save();
        req.session.user = dataBase;
        res.render(path.resolve("./views/obs_dock/google_auth.ejs"), {
            channel_link: dataBase.channel_link
        });
        // try {
        //     auth.setCredentials(JSON.parse(storedCredentials).token);
        //     dataBase.google.token = JSON.parse(storedCredentials).token;
        //     dataBase.save();
        //     const youtube = google.youtube({
        //         version: "v3",
        //         auth: auth
        //     });
        //     const response = await youtube.liveBroadcasts.list({
        //         part: "snippet",
        //         filter: "mine", // Specify the filter parameter
        //         maxResults: 1,
        //         mine: true,
        //         channelId: JSON.parse(storedCredentials).channelId
        //     });
        //     const liveChatId = response.data.items[0].snippet.liveChatId;
        //     dataBase.google.liveChatId = liveChatId;
        //     req.session.user = dataBase;
        //     res.render(path.resolve("./views/obs_dock/google_auth.ejs"), {
        //         channel_link: dataBase.channel_link
        //     });
        // } catch (error) {
        //     console.error("Error retrieving liveChatId:", error);
        //     res.status(500).send("Error retrieving youtube data.");
        // }
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

async function refreshAccessToken(clientId, clientSecret, refreshToken) {
    const client = new OAuth2Client(clientId, clientSecret);

    // Set the refresh token on the OAuth2 client
    client.setCredentials({ refresh_token: refreshToken });

    try {
        // Request a new access token using the refresh token
        const tokens = await client.refreshAccessToken();

        // The refreshed access token
        const accessToken = tokens.credentials.access_token;
        console.log("tokens.credentials: ", tokens.credentials);
        console.log("Access token:", accessToken);
        const dataBase = await DataBase.findOne({ "user.id": process.env.Y_Uid }).exec();
        dataBase.google.token = tokens.credentials;
        dataBase.save();
        // Return the refreshed access token
        return accessToken;
    } catch (error) {
        console.error("Error refreshing access token:", error);
        throw error;
    }
}
const EXPIRATION_THRESHOLD_SECONDS = 2700; // 45 mins

async function refreshTokenIfNeeded() {
    try {
        const dataBase = await DataBase.findOne({ "user.id": process.env.Y_Uid }).exec();
        let Token = dataBase.google.token.access_token;
        let refreshToken = dataBase.google.token.refresh_token;
        // Load the refresh token's expiration date
        const client = new OAuth2Client(process.env.G_client_id, process.env.G_client_secret);
        const tokenInfo = await client.getTokenInfo(Token);
        // Check if the token is about to expire
        const expiryDate = new Date(tokenInfo.expiry_date);
        const currentDate = new Date();
        const remainingTimeSeconds = (expiryDate - currentDate) / 1000;
        if (remainingTimeSeconds <= EXPIRATION_THRESHOLD_SECONDS) {
            console.log("remainingTimeSeconds: ", remainingTimeSeconds);
            // Token is about to expire, refresh it
            await refreshAccessToken(process.env.G_client_id, process.env.G_client_secret, refreshToken);
            console.log("YTCR Google Token refreshed successfully");
        } else {
            console.log("YTCR Google Token is still valid");
        }
    } catch (error) {
        console.error("YTCR Google Error checking token expiration:", error);
    }
}
const refreshInterval = 30 * 60 * 1000; // 45 minutes
setInterval(refreshTokenIfNeeded, refreshInterval);
refreshTokenIfNeeded();
async function CheckLive() {
    const YTCR = await DataBase.find({}).exec();
    YTCR.forEach(function (data, index) {
        fetch(`https://www.youtube.com/channel/${data.channel_id}/live`)
            .then(function (response) {
                return response.text();
            })
            .then(async function (html) {
                if (html.includes("hqdefault_live.jpg")) {
                    LiveChatId(data);
                } else {
                    const dataBase = await DataBase.findOne({ channel_id: data.channel_id }).exec();
                    dataBase.google.liveChatId = "";
                    dataBase.save();
                }
            })
            .catch(function (err) {
                console.log("Something went wrong", err);
            });
    });
}
setInterval(CheckLive, 1 * 60 * 1000);
CheckLive();
async function LiveChatId(user) {
    const dataBase = await DataBase.findOne({ channel_id: user.channel_id }).exec();
    try {
        if (dataBase.google.token && Object.keys(dataBase.google.token).length === 0) return;
        if (dataBase.google.liveChatId) return;
        auth.setCredentials(dataBase.google.token);
        const youtube = google.youtube({
            version: "v3",
            auth: auth
        });
        const response = await youtube.liveBroadcasts.list({
            part: "snippet",
            filter: "mine", // Specify the filter parameter
            maxResults: 1,
            mine: true,
            channelId: user.channel_id
        });
        const dataBaseYTCR = await DataBase.findOne({ "user.id": process.env.Y_Uid }).exec();
        auth.setCredentials(dataBaseYTCR.google.token);
        const youtube1 = google.youtube({
            version: "v3",
            auth: auth
        });
        const liveChatId = response.data.items[0].snippet.liveChatId;
        await youtube1.liveChatMessages.insert({
            part: "snippet",
            resource: {
                snippet: {
                    liveChatId: liveChatId,
                    type: "textMessageEvent",
                    textMessageDetails: {
                        messageText: `Channel Rewards are now enabled and listening for redeems`
                    }
                }
            }
        });
        dataBase.google.liveChatId = liveChatId;
        dataBase.save();
    } catch (error) {
        console.error("Error retrieving liveChatId:", error);
    }
}
