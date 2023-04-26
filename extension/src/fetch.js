const fetch_channel_points = async (channel_id, points, user_id_points, username) => {
    const response = await fetch(`http://localhost:82/api/channel_points/?channel_id=${channel_id}&user_id=${user_id_points}&user=${username}`)
    if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
            response.status);
        return;
    }
    const data = await response.json()

    if (data.data == undefined) {
        window.parent.postMessage({ "type": "ytcr_channel_link", "data": "none" });
        data.status == "error"
        return data
    }
    window.parent.postMessage({ "type": "ytcr_channel_link", "data": data.data.channel_link, "mystlink": data.data.mystlink });
    console.log('data.data: ', data.data);
    return data
}
const fetch_rewards = async (channel_id) => {
    const response = await fetch(`http://localhost:82/api/rewards/?channel_id=${channel_id}`)
    if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
            response.status);
        return;
    }
    const data = await response.json()
    return data
}
const send_claim_reward = async (reward_id, channel_id, user_id, username, points_to_redeem, reward_info, callback) => {
    fetch(`http://localhost:82/api/claim_rewards/?channel_id=${channel_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            reward_id: reward_id,
            reward_info: reward_info,
            channel_id: channel_id,
            user_id: user_id,
            username: username,
            points_to_redeem: points_to_redeem,
        })
    })
        .then(async function (response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }
            const data = await response.json()
            callback(data)
        })
        .catch(error => {
        });
}
const clip_that = async (channel_id, user_id, username) => {
    console.log("clip that")
    fetch(`http://localhost:82/api/clip_that/?channel_id=${channel_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            channel_id: channel_id,
            user_id: user_id,
            username: username,
        })
    })
        .then(async function (response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }
        })
        .catch(error => {

        });
}
const update_points = async (channel_id, user_id, username, points, callback) => {
    fetch(`http://localhost:82/api/update_points/?channel_id=${channel_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }
            const data = await response.json()
            callback(data)
        })
        .catch(error => {

        });
}
export {
    fetch_channel_points,
    fetch_rewards,
    send_claim_reward,
    update_points,
    clip_that
}