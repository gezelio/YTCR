const UserConnections = {};
const groups = new Map();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ws = require('ws');
const cors = require('cors');
const app = express();
var server = require('http').Server(app);
const DataBase = require('./model/DataBase')
var cookieParser = require("cookie-parser");
const session = require('express-session');
var WebSocketServer = require("ws").Server;
var favicon = require('serve-favicon');
const { error } = require('console');
const port = 82
var wss = new WebSocketServer({ server });
app.set('view engine', 'ejs');
app.use(favicon(path.join(__dirname, 'favicon.ico')))
app.use(bodyParser.urlencoded({ extended: true }));
cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Origin', 'Accept', 'X-Access-Token', 'X-Refresh-Token'],
    exposedHeaders: ['X-Access-Token', 'X-Refresh-Token', 'cross-origin'],
    cross_origin: true
});
app.use(cors())
app.use(express.json());
const isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/creds/login');
    }
}
app.use(cookieParser());
app.use(
    session({
        key: "user",
        secret: "543545fdgfdsds5f4544^#&^$&#^$&#$BHDGSDHAJDHSJADGJ5435$#@#$%$%#%$#%%#%$%$#$%$%BHDGSDHAJDHSJADGJ",
        resave: false,
        secure: true,
        HttpOnly: false,
        saveUninitialized: false,
        cookie: { expires: new Date(253402300000000) } // Approximately Friday, 31 Dec 9999 23:59:59 GMT
    }),
);
app.use(async (req, res, next) => {
    if (req.cookies.user && !req.session.user) {
        res.clearCookie("user");
    }
    next();
});
//ANCHOR - Server
app.use('/', require('./routes/discord_auth'));
app.use('/', require('./routes/files'));
app.use('/', require('./routes/get'));
app.use('/', require('./routes/admin'));
app.use('/', require('./routes/post'));

app.get('/api/channel_points', async (req, res) => {
    if (req.query.channel_id !== undefined && req.query.channel_id !== null && req.query.channel_id !== '' && req.query.user_id !== undefined && req.query.user_id !== null && req.query.user_id !== '') {
        const data = await DataBase.findOne({ channel_id: req.query.channel_id }).exec();
        console.log('data: ', data);
        if (data === null) {
            res.send({
                status: "error",
                message: "user not found"
            })
        } else {
            let found = data.users.find((go) => go.user_id === req.query.user_id)
            // console.log('found: ', found);
            if (found !== undefined) {
                // if (data.verified === true) {
                if (req.query.channel_id == req.query.user_id) {
                    res.send({
                        status: 'success',
                        data: {
                            channel_points: "%",
                            channel_link: data.channel_link,
                            clip_button: data.ext.clip_button,
                            mystlink: undefined
                        }
                    })
                    return
                }
                res.send({
                    status: 'success',
                    data: {
                        channel_points: found.points,
                        channel_link: data.channel_link,
                        clip_button: data.ext.clip_button,
                        mystlink: undefined
                    }
                })
                // } else {
                //     res.send({
                //         status: "error",
                //         message: "Channel not found"
                //     })
                // }
            } else {
                let user_not_new = data.users.find((go) => go.user_id === req.query.user_id);
                console.log('user_not_new: ', user_not_new)
                if (user_not_new === undefined) {
                    if (req.query.channel_id == req.query.user_id) {
                        data.users.push({
                            user_id: req.query.user_id,
                            user: req.query.user,
                            points: "%"
                        })
                        data.save().then(savedDocument => {
                            console.log('savedDocument: ', JSON.parse(savedDocument.rewards, null, 4));
                            channel_rewards = []
                            id = 0
                            console.log("rewards updated", userId)
                        }).catch(err => {
                            // handle error
                        });
                        res.send({
                            status: 'success',
                            data: {
                                channel_points: "%",
                                clip_button: data.ext.clip_button
                            }
                        })
                        return
                    }
                    data.users.push({
                        user_id: req.query.user_id,
                        user: req.query.user,
                        points: 0
                    })
                    data.save().then(savedDocument => {
                        console.log('savedDocument: ', JSON.parse(savedDocument.rewards, null, 4));
                        channel_rewards = []
                        id = 0
                        console.log("rewards updated", userId)
                    }).catch(err => {
                        // handle error
                    });
                    res.send({
                        status: 'success',
                        data: {
                            channel_points: 0,
                            clip_button: data.ext.clip_button
                        }
                    })
                }
            }
        }
    } else {
        res.send({
            status: 'error',
            message: 'channel_id is required'
        })
    }
});

app.post('/api/claim_rewards', async (req, res) => {
    if (req.query.channel_id !== undefined && req.query.channel_id) {
        if (req.body.points_to_redeem !== undefined && req.body.points_to_redeem !== null && req.body.points_to_redeem !== '' && req.body.user_id !== undefined && req.body.user_id !== null && req.body.user_id !== '') {
            const data = await DataBase.findOne({ channel_id: req.query.channel_id }).exec();
            if (data != null) {
                let user_found_update = data.users.find((go) => go.user_id === req.body.user_id);
                if (user_found_update !== undefined) {
                    console.log('user_found_update: ', user_found_update)
                    if (user_found_update.points == "%") {
                        res.send({
                            status: 'success',
                            data: {
                                channel_points: "%"
                            }
                        })
                        UserConnections[req.query.channel_id]?.send(JSON.stringify({
                            type: 'rewards',
                            channel_id: req.query.channel_id,
                            username: req.body.username,
                            reward_name: req.body.reward_info.reward_name,
                            reward_action_id: req.body.reward_info.reward_action_id,
                            reward_action_userInput: req.body.reward_info.reward_action_userInput,
                            reward_action_message: req.body.reward_info.reward_action_message,
                            reward_action_clip: false
                        }))
                        console.log(
                            {
                                type: 'rewards',
                                channel_id: req.query.channel_id,
                                username: req.body.username,
                                user_id: req.body.user_id,
                                reward_name: req.body.reward_info.reward_name,
                                reward_action_id: req.body.reward_info.reward_action_id,
                                reward_action_userInput: req.body.reward_info.reward_action_userInput,
                                reward_action_message: req.body.reward_info.reward_action_message,
                                reward_action_clip: false
                            })
                        return
                    }
                    if (user_found_update.points >= req.body.points_to_redeem) {
                        new_points = user_found_update.points - req.body.points_to_redeem
                        user_update = {
                            user_id: req.body.user_id,
                            user: req.body.username,
                            points: new_points
                        }
                        data.users.splice(data.users.indexOf(user_found_update), 1, user_update)
                        data.save().then(savedDocument => {
                        }).catch(err => {
                            // handle error
                        });
                        res.send({
                            status: 'success',
                            data: { channel_points: new_points }
                        })
                        UserConnections[req.query.channel_id]?.send(JSON.stringify({
                            type: 'rewards',
                            channel_id: req.query.channel_id,
                            username: req.body.username,
                            user_id: req.body.user_id,
                            reward_name: req.body.reward_info.reward_name,
                            reward_action_id: req.body.reward_info.reward_action_id,
                            reward_action_userInput: req.body.reward_info.reward_action_userInput,
                            reward_action_message: req.body.reward_info.reward_action_message,
                            reward_action_clip: false
                        }))
                        console.log(
                            {
                                type: 'rewards',
                                channel_id: req.query.channel_id,
                                username: req.body.username,
                                reward_name: req.body.reward_info.reward_name,
                                reward_action_id: req.body.reward_info.reward_action_id,
                                reward_action_userInput: req.body.reward_info.reward_action_userInput,
                                reward_action_message: req.body.reward_info.reward_action_message,
                                reward_action_clip: false
                            })
                        return
                    }
                }
            }
        }
    }
});

app.post("/api/update_points", async (req, res) => {
    if (req.query.channel_id !== undefined && req.query.channel_id) {
        if (req.body.user_id !== undefined && req.body.user_id !== null && req.body.user_id !== '') {
            const data = await DataBase.findOne({ channel_id: req.query.channel_id }).exec();
            if (data != null) {
                let user_found_update = data.users.find((go) => go.user_id === req.body.user_id);
                if (user_found_update !== undefined) {
                    let new_interal = data.channel_options
                    if (user_found_update.points === "%") {
                        res.send({
                            status: 'success',
                            points: "%"
                        })
                        return
                    }
                    new_points = parseInt(user_found_update.points) + parseInt(new_interal.channel_amount)
                    user_update = {
                        user_id: req.body.user_id,
                        user: req.body.username,
                        points: new_points
                    }
                    data.users.splice(data.users.indexOf(user_found_update), 1, user_update)
                    data.save().then(savedDocument => {
                        console.log("data saved")
                        res.send({
                            status: 'success',
                            points: new_points
                        })
                    }).catch(err => {
                        console.log("err", err)
                        res.send({
                            status: 'error',
                            points: null
                        })
                    });
                }
            }
        }
    } else {
        res.send({
            status: 'success',
            points: null
        })
    }
});

app.post("/api/clip_that", async (req, res) => {
    if (req.query.channel_id !== undefined && req.query.channel_id) {
        const data = await DataBase.findOne({ channel_id: req.query.channel_id }).exec();
        if (data != null) {
            if (data !== null) {
                res.send({
                    status: 'success',
                    data: {
                        success: true
                    }
                })
                UserConnections[req.query.channel_id]?.send(JSON.stringify({
                    type: 'rewards',
                    channel_id: req.query.channel_id,
                    user_id: req.body.user_id,
                    username: req.body.username,
                    reward_id: "0",
                    reward_name: "YTCR_clip",
                    reward_description: "YTCR_clip",
                    reward_points: "0",
                    reward_action_id: "0",
                    reward_action_userInput: false,
                    reward_action_message: "test",
                    reward_action_clip: true
                }))
                console.log('YTCR_clip')
                return
            }
        }
    }
});
app.post('/post/update/UserPoints', async (req, res) => {
    console.log(req.body)
    const data = await DataBase.findOne({ 'user.id': req.session.user.user.id }).exec();
    if (data) {
        data.users.find(x => x.user_id == req.body.data.user_id).points = req.body.data.points
        console.log('data.users: ', data.users);
        if (groups.get("ext")) {
            for (const otherClient of groups.get("ext")) {
                if (otherClient !== ws) {
                    otherClient.send(JSON.stringify({
                        type: 'refresh user points',
                        channel_id: data.channel_id,
                        user_id: req.body.data.user_id,
                        points: req.body.data.points
                    }));
                }
            }
        }
        DataBase.findOneAndUpdate({ 'user.id': req.session.user.user.id }, data).exec().then(savedDocument => {
            console.log('savedDocument: ', savedDocument.users);
            req.session.user = savedDocument;
            res.send({ status: 'success' })
        }).catch(err => {
            console.log('err: ', err)
            res.send({ status: 'failed' })
        });
    } else {
        res.send({ status: 'failed' })
    }
})

app.get('/api/rewards', async (req, res) => {
    if (req.query.channel_id !== undefined && req.query.channel_id) {
        const data = await DataBase.findOne({ channel_id: req.query.channel_id }).exec();
        if (data != null) {
            if (data.rewards !== undefined) {
                res.send({
                    status: 'success',
                    data: {
                        channel_rewards: JSON.parse(data.rewards)
                    }
                })
            }
        }
    } else {
        res.send({
            status: 'error',
            message: 'channel_id is required'
        })
    }
});

app.use(function (req, res, next) {
    res.status(404);
    // respond with html page
    if (req.accepts('html')) {
        res.render(path.resolve('./views/404.ejs'))
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
    }
    // default to plain-text. send()
    res.type('txt').send('Not found');
});
var channel_rewards = []
var id = 0

//ANCHOR - WebSocket
wss.on('connection', function connection(ws, req) {
    console.log('req.url: ', req.url);
    const url = new URL(req.url, `http://${req.headers.host}`);
    const groupName = url.searchParams.get('group');
    if (req.url == "/ws" || req.url == "/ws/" || req.url == "/ws?group=ext" || req.url == "/ws?group=stats") {
        if (groupName) {
            let clients = groups.get(groupName);
            if (!clients) {
                clients = new Set();
                groups.set(groupName, clients);
            }
            console.log(`New YTCR ${groupName} connection`)
            clients.add(ws);
        }
        ws.on('message', async function incoming(message) {
            try {
                message = JSON.parse(message);
                // handle the parsed message
            } catch (error) {
                console.error('Failed to parse message:', error.message);
                // handle the error
            }
            console.log('message: ', message);
            if (message.connect) {
                UserConnections[message.user] = ws;
                ws.send(`Welcome, user ${message.user}`);
                console.log(`Welcome, user ${message.user}`);
            }
            if (message.send) {
                const userId = Object.keys(UserConnections).find(key => UserConnections[key] === ws);
                console.log('userId: ', userId);
                console.log("send")
                UserConnections[message.userid]?.send(JSON.stringify({
                    type: 'rewards',
                    channel_id: "UCOtNQeyJHiTzfeRTR20-eBg",
                    username: "testestsetst",
                    reward_name: "test",
                    reward_action_id: "dea3eb18-f267-46f8-94d1-55456a68e289",
                    reward_action_userInput: true,
                    reward_action_message: "teststst",
                    reward_action_clip: false
                }))
            }
            if (message.data) {
                const userId = Object.keys(UserConnections).find(key => UserConnections[key] === ws);
                if (userId) {
                    console.log(`userId:${userId} Data:${message.data}`)
                    const data = await DataBase.findOne({ channel_id: userId }).exec();
                    if (data) {
                        json_rewards = JSON.parse(message.data)
                        if (json_rewards !== undefined) {
                            json_rewards.forEach(async (reward, index) => {
                                setTimeout(() => {
                                    if (data.ext !== undefined && data.ext.user_input == true) {
                                        if (reward.actionId !== null && reward.group == "YTCR") {
                                            console.log("user", data.user.username)
                                            console.log("input is true: ", reward.name)
                                            console.log("________________________________________")
                                            channel_rewards.push({
                                                reward_id: id,
                                                reward_name: reward.name,
                                                reward_prompt: reward.prompt,
                                                reward_points: reward.cost,
                                                reward_action_id: reward.actionId,
                                                reward_action_userInput: reward.userInput
                                            })
                                            id++
                                        }
                                    } else {
                                        if (reward.userInput == false || reward.userInput == "false") {
                                            if (reward.actionId !== null && reward.group == "YTCR") {
                                                console.log("user", data.user.username)
                                                console.log("input is false: ", reward.name)
                                                console.log("________________________________________")
                                                channel_rewards.push({
                                                    reward_id: id,
                                                    reward_name: reward.name,
                                                    reward_prompt: reward.prompt,
                                                    reward_points: reward.cost,
                                                    reward_action_id: reward.actionId,
                                                    reward_action_userInput: reward.userInput
                                                })
                                                id++
                                            }
                                        }
                                    }
                                    if (index == json_rewards.length - 1) {
                                        data.rewards = JSON.stringify(channel_rewards)
                                        data.save().then(savedDocument => {
                                            console.log('savedDocument: ', JSON.parse(savedDocument.rewards, null, 4));
                                            channel_rewards = []
                                            id = 0
                                            console.log("rewards updated", userId)
                                            console.log(message.v)
                                            if (message.v != "2.0.0") {
                                                console.log("found")
                                                UserConnections[userId]?.send(JSON.stringify({
                                                    type: 'rewards',
                                                    channel_id: userId,
                                                    reward_id: "0",
                                                    reward_name: "0dsdsdsdsdsdsdsdsd_DSDADSADASDASDSD",
                                                    reward_action_id: "0",
                                                    reward_action_userInput: false,
                                                    reward_action_message: "",
                                                    reward_action_clip: false,
                                                }))
                                            }
                                            setTimeout(() => {
                                                let clients = groups.get("ext");
                                                if (clients) {
                                                    for (const otherClient of clients) {
                                                        if (otherClient !== ws) {
                                                            otherClient.send(JSON.stringify({
                                                                type: 'refresh rewards',
                                                                channel_id: data.channel_id
                                                            }));
                                                        }
                                                    }
                                                }
                                            }, 2000)
                                        }).catch(err => {
                                            // handle error
                                        });
                                    }
                                }, index * 200)
                            })
                        }
                    } else {
                        console.log("No User", userId)
                    }
                    // UserConnections[userId].send("testestset")
                }
            }
        });
        ws.on('close', function () {
            // Remove the connection object when the user disconnects
            const userId = Object.keys(UserConnections).find(key => UserConnections[key] === ws);
            if (userId) {
                delete UserConnections[userId];
                console.log(`User ${userId} disconnected.`);
            }
            if (groupName) {
                let clients = groups.get(groupName);
                console.log(`left YTCR ${groupName} connection`)
                clients.delete(ws);
                if (clients.size === 0) {
                    groups.delete(groupName);
                }
            }
        });
    } else {
        console.log("wrong path")
        ws.send(JSON.stringify({ "error": "Wrong path" }))
        ws.close()
    }
});
setInterval(() => {
    wss.clients.forEach(function each(client) {
        client.send(JSON.stringify({
            type: 'Heartbeat'
        }))
    });
    console.log('groups.get("ext")?.size: ', groups.get("ext")?.size);
    if (groups.get("stats")) {
        for (const otherClient of groups.get("stats")) {
            if (otherClient !== ws) {
                otherClient.send(JSON.stringify({
                    type: 'stats',
                    ext: groups.get("ext")?.size
                }));
            }
        }
    }
}, 20000)
setInterval(() => {
    let clients = groups.get("ext");
    if (clients) {
        let index = 0;
        for (const client of clients) {
            setTimeout(() => {
                client.send(JSON.stringify({
                    type: 'points_update'
                }));
                console.log('points_update')
            }, index * 2000);
            index++;
        }
    }
    // }, 60000)
}, 300000)
wss.on("error", function (error) {
    console.log("error: ", error)
});
wss.on("close", function (error) {
    console.log("close: ", error)
});
wss.on('listening', () => {
    console.log(`wss listening on ${port}`)
});
server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});