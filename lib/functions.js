const logs = require("./logs");
function debugLine(message) {
    let e = new Error();
    let frame = e.stack.split("\n")[2]; // change to 3 for grandparent func
    let lineNumber = frame.split(":").reverse()[1];
    let functionName = frame.split(" ")[5];
    return functionName + ":" + lineNumber + " " + message;
}

async function LoggedInPost(req, res, next) {
    if (req.session?.user) {
        next();
    } else {
        log(require("url").pathToFileURL(__filename).toString(), "not logged in", true);
        logs.writeToLogFile("User not logged in");
        if (req.accepts("html")) {
            res.redirect("/");
            return;
        }
        // respond with json
        if (req.accepts("json")) {
            res.send({ error: "error" });
            return;
        }
        res.send("error");
    }
}

async function log(location, title, data) {
    console.log("\x1b[92mlocation: \x1b[0m" + location.split("/")[location.split("/").length - 2] + "/" + location.split("/")[location.split("/").length - 1] + " - \x1b[94mTitle: \x1b[0m" + title + " - \x1b[96mData: \x1b[0m" + JSON.stringify(data, null, 2));
}

async function error(location, title, data) {
    console.error("Error: \x1b[92mlocation: \x1b[0m" + location.split("/")[location.split("/").length - 2] + "/" + location.split("/")[location.split("/").length - 1] + " - \x1b[94mTitle: \x1b[0m" + title + " - \x1b[96mData: \x1b[0m" + JSON.stringify(data, null, 2));
}

async function debug(location, title, data) {
    let frame = location.stack.split("at")[1]; // change to 3 for grandparent func
    frame = frame.slice(0, frame.lastIndexOf(":"));
    console.log("Debug: \x1b[92mlocation: \x1b[0m" + frame + " - \x1b[94mTitle: \x1b[0m" + title + " - \x1b[96mData: \x1b[0m" + JSON.stringify(data, null, 2));
}

async function LoggedIn(req, res, next) {
    if (req.session?.user) {
        next();
    } else {
        log(require("url").pathToFileURL(__filename).toString(), "not logged in", true);
        logs.writeToLogFile("User not logged in");
        if (req.accepts("html")) {
            res.redirect("/");
            return;
        }
        // respond with json
        if (req.accepts("json")) {
            res.send({ error: "error" });
            return;
        }
        res.send("error");
    }
}
function CheckUser(user) {
    return {
        discord_user_id: user.user?.discord_user_id,
        email: user.user.email,
        id: user.user.id,
        profile_pic: user.user.profile_pic,
        username: user.user.username,
        account: user.account,
        channel_link: user.channel_link,
        ytcr_beta: user.ytcr_beta
    };
}
module.exports = { LoggedInPost, log, error, debug, LoggedIn, CheckUser };
