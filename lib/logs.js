const functions = require("./functions");
const path = require("path");
var fs = require("fs");
function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}
function writeToLogFile(text, data) {
    time = new Date();
    let logData = "";
    if (data) {
        logData = { time, text, data };
    } else {
        logData = { time, text };
    }
    const currentDate = getCurrentDate();
    const filename = `./logs/console_${currentDate}.log`;
    fs.appendFile(filename, JSON.stringify(logData) + "\n", function (err) {
        if (err) {
            console.error("Error writing to log file:", err);
        }
    });
}
function removeOldestLogFile() {
    const logDirectory = "./logs";
    const maxLogAgeInDays = 30;
    fs.readdir(logDirectory, (err, files) => {
        if (err) {
            console.error("Error reading log directory:", err);
            return;
        }

        const logFiles = files
            .filter((file) => path.extname(file) === ".log")
            .map((file) => ({
                name: file,
                createdAt: fs.statSync(path.join(logDirectory, file)).birthtime
            }));

        if (logFiles.length === 0) {
            console.log("No log files found.");
            return;
        }

        const oldestLogFile = logFiles.reduce((oldest, current) => {
            if (current.createdAt < oldest.createdAt) {
                return current;
            }
            return oldest;
        });

        const oldestLogAgeInDays = Math.floor((Date.now() - oldestLogFile.createdAt) / (1000 * 60 * 60 * 24));

        if (oldestLogAgeInDays >= maxLogAgeInDays) {
            const oldestLogPath = path.join(logDirectory, oldestLogFile.name);
            fs.unlink(oldestLogPath, (err) => {
                if (err) {
                    console.error("Error removing oldest log file:", err);
                } else {
                    console.log("Oldest log file removed:", oldestLogFile.name);
                }
            });
        } else {
            console.log("No log files to remove. Oldest log file is still within the retention period.");
        }
    });
}
setInterval(removeOldestLogFile, 24 * 60 * 60 * 1000); // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
module.exports = { writeToLogFile, getCurrentDate };
