const log = (message) => {
    // console.log("Debug: \x1b[92mYTCR EXT \x1b[0m" + "- \x1b[96mData: \x1b[0m" + JSON.stringify(message, null, 2))
}
const perm = (message) => {
    console.log("DebugPerm: \x1b[92mYTCR EXT \x1b[0m" + "- \x1b[96mData: \x1b[0m" + JSON.stringify(message, null, 2))
}
export default { log, perm }