import logging from "./log.js";
const ChannelPoints = async (channel_id, points, user_id_points, username) => {
    const response = await fetch(`https://ytcr.gezel.io/api/channel_points/?channel_id=${channel_id}&user_id=${user_id_points}&user=${username}`);
    if (response.status !== 200) {
        console.log("Looks like there was a problem. Status Code: " + response.status);
        return;
    }
    const data = await response.json();
    if (data.data == undefined) {
        window.parent.postMessage({ type: "ytcr_channel_link", data: "none" });
        data.status == "error";
        return data;
    }
    window.parent.postMessage({ type: "ytcr_channel_link", data: data.data.channel_link, mystlink: data.data.mystlink });
    return data;
};
const Rewards = async (channel_id) => {
    const response = await fetch(`https://ytcr.gezel.io/api/rewards/?channel_id=${channel_id}`);
    if (response.status !== 200) {
        console.log("Looks like there was a problem. Status Code: " + response.status);
        return;
    }
    const data = await response.json();
    return data;
};
const ClaimRewards = async (reward_id, channel_id, user_id, username, points_to_redeem, reward_info, callback) => {
    fetch(`https://ytcr.gezel.io/api/claim_rewards/?channel_id=${channel_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            reward_id: reward_id,
            reward_info: reward_info,
            channel_id: channel_id,
            user_id: user_id,
            username: username,
            points_to_redeem: points_to_redeem
        })
    })
        .then(async function (response) {
            if (response.status !== 200) {
                console.log("Looks like there was a problem. Status Code: " + response.status);
                return;
            }
            const data = await response.json();
            callback(data);
        })
        .catch((error) => {
            logging.perm(error);
        });
};
const Clip = async (channel_id, user_id, username) => {
    fetch(`https://ytcr.gezel.io/api/clip_that/?channel_id=${channel_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            channel_id: channel_id,
            user_id: user_id,
            username: username
        })
    })
        .then(async function (response) {
            if (response.status !== 200) {
                console.log("Looks like there was a problem. Status Code: " + response.status);
                return;
            }
        })
        .catch((error) => {
            logging.perm(error);
        });
};
const UpdatePoints = async (channel_id, user_id, username, points, callback) => {
    fetch(`https://ytcr.gezel.io/api/update_points/?channel_id=${channel_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            channel_id: channel_id,
            user_id: user_id,
            username: username,
            update_points: points
        })
    })
        .then(async function (response) {
            if (response.status !== 200) {
                console.log("Looks like there was a problem. Status Code: " + response.status);
                return;
            }
            const data = await response.json();
            callback(data);
        })
        .catch((error) => {
            logging.perm(error);
        });
};
export default { ChannelPoints, Rewards, ClaimRewards, Clip, UpdatePoints };
