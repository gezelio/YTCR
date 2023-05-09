const logging = (message) => {
    console.log("Debug: \x1b[92mYTCR \x1b[0m" + "- \x1b[96mData: \x1b[0m" + JSON.stringify(message, null, 2))
}
const loggingPerm = (message) => {
    console.log("DebugPerm: \x1b[92mYTCR \x1b[0m" + "- \x1b[96mData: \x1b[0m" + JSON.stringify(message, null, 2))
}