var express = require("express");
var fetch = require("node-fetch");
var app = express.Router();
var DataBase = require("../model/DataBase");
const functions = require("../lib/functions");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
app.get("/creds/login", (req, res) => {
    res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${process.env.D_client_id}&redirect_uri=${process.env.D_redirect_url}/auth/discord/callback&response_type=code&scope=identify%20email%20connections%20guilds%20guilds.join%20guilds.members.read`);
});
var D_access_token = "";
app.get("/auth/discord/callback", async (req, res) => {
    fetch("https://discord.com/api/oauth2/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            client_id: process.env.D_client_id,
            client_secret: process.env.D_client_secret,
            grant_type: "authorization_code",
            code: req.query.code,
            scope: process.env.D_scopes,
            redirect_uri: process.env.D_redirect_url + "/auth/discord/callback"
        })
    })
        .then((response) => response.json())
        .then((data_token) => {
            // console.log("data_token: ", data_token);
            D_access_token = data_token.access_token;
            fetch("https://discord.com/api/users/@me", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${data_token.access_token}`
                }
            })
                .then((response) => response.json())
                .then(async function (data_user) {
                    const newDiscord = {
                        id: data_user.id,
                        access_token: D_access_token,
                        username: data_user.username?.toLowerCase()?.replaceAll(/[^\w\s]|\s/g, "_"),
                        discriminator: data_user.discriminator,
                        avatar: `https://cdn.discordapp.com/avatars/${data_user.id}/${data_user.avatar}.png`,
                        email: data_user.email
                    };
                    const data_data = await DataBase.findOne({ "user.discord_user_id": data_user.id }).exec();
                    if (data_data) {
                        data_data.discord = newDiscord;
                        data_data.user.profile_pic = newDiscord.avatar;
                        data_data.last_login = new Date();
                        fetch("https://discord.com/api/users/@me/connections", {
                            method: "GET",
                            headers: {
                                Authorization: `Bearer ${D_access_token}`
                            }
                        })
                            .then((response) => response.json())
                            .then(async function (data_connections) {
                                if (data_connections != null) {
                                    data_data.discord.connections = data_connections;
                                    let good = data_connections.find((x) => x.id === data_data.channel_id);
                                    // console.log("connection no: ", good);
                                    data_data.verified = false;
                                    data_data.ytcr_beta = await GetYTCRBetaRole(data_data.user, D_access_token);
                                    data_data
                                        .save()
                                        .then((savedDocument) => {
                                            req.session.user = data_data;
                                            res.redirect("/dashboard");
                                        })
                                        .catch((err) => {
                                            console.log("err: ", err);
                                        });
                                } else {
                                    data_data.ytcr_beta = await GetYTCRBetaRole(data_data.user, D_access_token);
                                    data_data
                                        .save()
                                        .then((savedDocument) => {
                                            req.session.user = data_data;
                                            res.redirect("/dashboard");
                                        })
                                        .catch((err) => {
                                            console.log("err: ", err);
                                        });
                                }
                            });
                    } else {
                        let new_user = {
                            user: {
                                id: uuidv4(),
                                username: data_user.username,
                                email: data_user.email,
                                discord_user_id: data_user.id,
                                profile_pic: newDiscord.avatar
                            },
                            channel_link: data_user.username.toLowerCase(),
                            last_login: new Date()
                        };
                        let newDataBase = new DataBase(new_user);
                        newDataBase.discord = newDiscord;
                        fetch("https://discord.com/api/users/@me/connections", {
                            method: "GET",
                            headers: {
                                Authorization: `Bearer ${D_access_token}`
                            }
                        })
                            .then((response) => response.json())
                            .then(async function (data_connections) {
                                if (data_connections != null) {
                                    newDataBase.discord.connections = data_connections;
                                    let good = data_connections.find((x) => x.id === newDataBase.channel_id);
                                    // console.log("connection no: ", good);
                                    newDataBase.verified = false;
                                    newDataBase.ytcr_beta = await GetYTCRBetaRole(newDataBase.user, D_access_token);
                                    console.log("newDataBase: ", newDataBase);
                                    newDataBase
                                        .save()
                                        .then((savedDocument) => {
                                            req.session.user = savedDocument;
                                            res.redirect("/dashboard/select/youtube");
                                        })
                                        .catch((err) => {
                                            console.log("err: ", err);
                                        });
                                } else {
                                    newDataBase.ytcr_beta = await GetYTCRBetaRole(data_data.user, D_access_token);
                                    newDataBase
                                        .save()
                                        .then((savedDocument) => {
                                            req.session.user = savedDocument;
                                            res.redirect("/dashboard/select/youtube");
                                        })
                                        .catch((err) => {
                                            console.log("err: ", err);
                                        });
                                }
                            });
                    }
                });
        });
});
app.get("/creds/logout", (req, res) => {
    res.clearCookie("user");
    req.session.destroy();
    res.redirect("/");
});

async function GetYTCRBetaRole(user, D_access_token) {
    role = false;
    if (!process.env.YTCR_ROLE) return false;
    await fetch(`https://discord.com/api/users/@me/guilds/${process.env.DISCORD_SERVER_ID}/member`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${D_access_token}`
        }
    })
        .then((response) => response.json())
        .then(async function (data) {
            found = data.roles.find((e) => e == process.env.DISCORD_SEVER_ROLE);
            if (found) {
                role = true;
            } else {
                role = false;
            }
        });
    return role;
}
module.exports = app;
