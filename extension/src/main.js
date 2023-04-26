import { add_button_new, add_div_new, notification_new, clip_button_div_new } from './imports.js';
import { fetch_channel_points, fetch_rewards, send_claim_reward, update_points, clip_that } from './fetch.js'
var username_points = "none";
var user_id_points = "none";
var ytcr_broadcater_channel_id = "none";
var ytcr_image = localStorage.getItem('ytcr_image');
if (ytInitialData.continuationContents != undefined && ytInitialData.continuationContents.liveChatContinuation.viewerName != undefined && ytInitialData.continuationContents.liveChatContinuation.actionPanel.liveChatMessageInputRenderer.sendButton.buttonRenderer.serviceEndpoint.sendLiveChatMessageEndpoint.actions[0].addLiveChatTextMessageFromTemplateAction.template.liveChatTextMessageRenderer.authorExternalChannelId != undefined && parent.ytInitialData.contents != undefined && parent.ytInitialData.contents.twoColumnWatchNextResults != undefined) {
    username_points = ytInitialData.continuationContents.liveChatContinuation.viewerName
    localStorage.setItem('ytcr_viewerName', username_points);
    user_id_points = ytInitialData.continuationContents.liveChatContinuation.actionPanel.liveChatMessageInputRenderer.sendButton.buttonRenderer.serviceEndpoint.sendLiveChatMessageEndpoint.actions[0].addLiveChatTextMessageFromTemplateAction.template.liveChatTextMessageRenderer.authorExternalChannelId
    localStorage.setItem('ytcr_user_channel_id', user_id_points);
    if (!!parent.ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[1].videoSecondaryInfoRenderer.owner.videoOwnerRenderer.title.runs[0].navigationEndpoint.browseEndpoint.browseId) {
        ytcr_broadcater_channel_id = parent.ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[1].videoSecondaryInfoRenderer.owner.videoOwnerRenderer.title.runs[0].navigationEndpoint.browseEndpoint.browseId
        localStorage.setItem('ytcr_broadcater_channel_id', parent.ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[1].videoSecondaryInfoRenderer.owner.videoOwnerRenderer.title.runs[0].navigationEndpoint.browseEndpoint.browseId);
    }
    add_all()

} else {
    if (localStorage.getItem('ytcr_viewerName') != undefined && localStorage.getItem('ytcr_user_channel_id') != undefined && localStorage.getItem('ytcr_broadcater_channel_id') != undefined) {
        username_points = localStorage.getItem('ytcr_viewerName')
        user_id_points = localStorage.getItem('ytcr_user_channel_id')
        ytcr_broadcater_channel_id = localStorage.getItem('ytcr_broadcater_channel_id')
        add_all()
    }
}
var stop = false

function add_all() {
    if (!document.querySelector('#channel_points_button') && !document.querySelector('#channel_points_div')) {
        add_point_button()
        get_channel_points()
        get_channel_reawrds()
        events_listen()
        socket_test()
    }
}
document.querySelector(".style-scope yt-icon-button").addEventListener('click', () => {
    settings()
});

function settings() {
    if (ytcr_broadcater_channel_id !== "none") {
        if (ytInitialData.continuationContents.liveChatContinuation.actionPanel.liveChatMessageInputRenderer.sendButton.buttonRenderer.serviceEndpoint.sendLiveChatMessageEndpoint.actions[0].addLiveChatTextMessageFromTemplateAction.template.liveChatTextMessageRenderer.authorExternalChannelId != undefined) {
            if (user_id_points == ytcr_broadcater_channel_id) {
                let menu = document.querySelectorAll("tp-yt-paper-listbox")[1]
                let item_renderer = document.createElement("ytd-menu-navigation-item-renderer")
                item_renderer.id = "settings_yt_ext"
                menu.appendChild(item_renderer)
                let test = setInterval(() => {
                    if (document.querySelectorAll("tp-yt-paper-listbox")[1].children.length >= 5) {
                        document.querySelectorAll("yt-icon")[document.querySelectorAll("yt-icon").length - 1].id = "settings_yt_ext_icon"
                        document.querySelectorAll("yt-icon")[document.querySelectorAll("yt-icon").length - 1].innerHTML = `<img src='${ytcr_image}' style="width: 25px;border-radius: 50%;">`
                        document.querySelectorAll("yt-formatted-string")[document.querySelectorAll("yt-formatted-string").length - 1].innerHTML = "Settings YTCR"
                        document.querySelectorAll("yt-formatted-string")[document.querySelectorAll("yt-formatted-string").length - 1].id = "settings_yt_ext_text"
                        clearInterval(test);
                        document.getElementById("settings_yt_ext").onclick = () => {
                            window.open('https://ytcr.gezel.io', '_blank');
                        }
                    }
                }, 50);
            }
        }
    }
}

function add_point_button() {
    if (!document.querySelector('#channel_points_button')) {
        if (ytcr_broadcater_channel_id !== "none") {
            let button = add_button_new();
            let elmnt = document.querySelector('#picker-buttons');
            let elmnt_div = document.querySelector('yt-live-chat-renderer');
            let div_new_new = document.createElement("div");
            div_new_new.setAttribute('style', `
            display: flex; flex-direction: row;
            flex - wrap: nowrap;
            align - content: center;
            justify - content: center;
            align - items: center;
            `)
            elmnt.appendChild(button);
            let div = add_div_new();
            let div_new = clip_button_div_new();
            let button_clip = document.createElement("button");
            button_clip.style = `
                            display: none;
                            align-content: center;
                            align-items: center;
                            background: var(--yt-live-chat-action-panel-background-color,var(--yt-deprecated-opalescence-soft-grey-opacity-lighten-1));
                            border-radius: 13%;
                            text-align: center; 
                            margin: 5px;
                            `
            button_clip.id = "channel_points_button_clip";
            button_clip.innerHTML = `
            <span style="
            width: 100%;
            color: var(--yt-spec-text-primary);
            "
            >
            Clip
            </span>
            `
            button_clip.onclick = () => {
                clip_that(ytcr_broadcater_channel_id, user_id_points, username_points)
                document.getElementById('channel_points_button_clip').setAttribute("style", `
                align-content: center;
                align-items: center;
                background: var(--yt-spec-static-grey);
                border-radius: 13%;
                text-align: center; 
                margin: 5px;
                `)
                setTimeout(() => {
                    document.getElementById('channel_points_button_clip').style.background = "var(--yt-live-chat-action-panel-background-color,var(--yt-deprecated-opalescence-soft-grey-opacity-lighten-1))"
                }, 500);
            }
            div_new.appendChild(button_clip);
            div_new_new.appendChild(div);
            if (localStorage.getItem('clip_button_status') == "true") {
                div_new_new.appendChild(div_new);
            } else {
            }
            elmnt_div.appendChild(div_new_new);
        }
    }
}
var channel_points;
var update_interval = false
async function get_channel_points() {
    if (localStorage.getItem('channel_points') != null) {
        channel_points = localStorage.getItem('channel_points')
    }
    if (ytcr_broadcater_channel_id !== "none" && username_points !== "none" && user_id_points !== "none") {
        fetch_channel_points(ytcr_broadcater_channel_id, channel_points, user_id_points, username_points).then(function (data) {
            if (data.status == "error") {
                stop = true
                if (!document.querySelector("#channel_points_button") == null) {
                    document.querySelector('#channel_points_button').remove()
                }
                if (!document.querySelector("#channel_points_div_clip") == null) {
                    document.querySelector('#channel_points_div_clip').remove()
                }
                if (!document.querySelector("#channel_points_div") == null) {
                    document.querySelector('#channel_points_div').remove()
                }
                notification_new(ytcr_image, "no_channel");
                if (localStorage.getItem('ytcr-notification') != "no_channel_off") {
                    setTimeout(() => {
                        document.querySelector('.ytcr-notification').style.top = "0px"
                        localStorage.setItem('ytcr-notification', "no_channel_off")
                    }, 500);
                }
                return
            }
            if (data.data.clip_button) {
                localStorage.setItem('clip_button_status', "true")
            } else {
                localStorage.setItem('clip_button_status', "false")
            }
            localStorage.setItem('channel_points', data.data.channel_points);
            let button_img = document.createElement("img");
            button_img.src = ytcr_image;
            button_img.style = `width: 20px; position: relative;`;
            let button_text = document.createElement("span");
            button_text.innerText = data.data.channel_points;
            button_text.id = "ytcr_points_text";
            button_text.style = `font-size: 12px; position: relative; top: -5px; left: 1px; margin-right: 5px;`;
            document.querySelector('#channel_points_button').appendChild(button_text);
            document.querySelector('#channel_points_button').prepend(button_img);
        });
    }
}
function update_cr_points_callback(data) {
    if (data.status == "success") {
        localStorage.setItem('channel_points', data.data.channel_points);
        document.querySelector('#ytcr_points_text').innerText = data.data.channel_points;
        document.querySelectorAll('.reward_div').forEach(element => {
            let element_points = element.getAttribute('data-points')
            reward_point_check(element_points, element)
        })

    }
}
async function ytcr_prompt(element) {
    if (document.querySelector('#ytcr_prompt') == null) {
        document.getElementById("live-chat-message-input").style.display = "none";
        let prompt = document.createElement("div");
        prompt.id = "ytcr_prompt";
        let prompt_content = document.createElement("div");
        prompt_content.id = "ytcr_prompt_content";
        let prompt_content_header = document.createElement("div");
        prompt_content_header.id = "ytcr_prompt_content_header";
        prompt_content_header.innerText = element.reward_prompt;
        prompt_content.appendChild(prompt_content_header);
        let prompt_content_body = document.createElement("div");
        prompt_content_body.id = "ytcr_prompt_content_body";
        let prompt_content_input = document.createElement("input");
        prompt_content_input.type = "text";
        prompt_content_input.id = "ytcr_prompt_input";
        prompt_content_input.setAttribute("placeholder", "Enter Your message here");
        prompt_content_body.appendChild(prompt_content_input);
        let prompt_content_button = document.createElement("button");
        prompt_content_button.id = "ytcr_prompt_button";
        prompt_content_button.innerHTML = `
    <svg viewBox="0 0 24 24"
    preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon"
    style="pointer-events: none; display: block; width: 100%; height: 100%;">
    <g class="style-scope yt-icon">
        <path style="fill: var(--yt-live-chat-primary-text-color);"
            d="M4.01,4.62l14.12,7.07l-3.06-0.66L4,8.64L4.01,4.62 M18.13,12.32L4.01,19.38L4,15.36l11.07-2.39L18.13,12.32 M3.01,3L3,9.44 L14.86,12L3,14.56L3.01,21L21,12L3.01,3L3.01,3z"
            class="style-scope yt-icon">
            </path>
    </g>
</svg>
    `
        let prompt_button_close = document.createElement('button');
        prompt_button_close.className = "ytcr_prompt_close";
        prompt_button_close.innerHTML = `
    <span class="ytcr_prompt_span">Cancel</span>
    `;
        prompt_content_button.appendChild(prompt_button_close);
        prompt_content_button.onclick = () => {
            let input = document.getElementById("ytcr_prompt_input").value;
            if (input === "") {
                document.getElementById("live-chat-message-input").style.display = "block";
                document.getElementById("ytcr_prompt").remove();
            } else {
                document.getElementById("live-chat-message-input").style.display = "block";
                document.getElementById("ytcr_prompt").remove();
                timeout(element.reward_name)
                send_claim_reward(element.reward_id, ytcr_broadcater_channel_id, user_id_points, username_points, element.reward_points, { reward_name: element.reward_name, reward_description: element.reward_description, reward_action_id: element.reward_action_id, reward_action_userInput: element.reward_action_userInput, reward_action_message: input }, update_cr_points_callback)
            }
        }
        prompt_content_body.appendChild(prompt_content_button);
        prompt_content.appendChild(prompt_content_body);
        prompt.appendChild(prompt_content);
        document.getElementById('input-panel').prepend(prompt);
    }
}

async function get_channel_reawrds() {
    if (ytcr_broadcater_channel_id !== "none" && username_points !== "none" && user_id_points !== "none") {
        fetch_rewards(ytcr_broadcater_channel_id).then(function (data) {
            let doc = document.getElementById("channel_points_div")
            data.data.channel_rewards.sort(function (a, b) {
                return a.reward_points - b.reward_points;
            });
            data.data.channel_rewards.forEach(element => {
                if (element.reward_action_userInput) {
                    let div = document.createElement('button');
                    div.className = "reward_div";
                    div.style = `
                    display: flex;
                    flex-direction: column;
                    flex-wrap: wrap;
                    align-content: center;
                    align-items: center;
                    background: var(--yt-live-chat-action-panel-background-color,var(--yt-deprecated-opalescence-soft-grey-opacity-lighten-1));
                    border-radius: 13%;
                    text-align: center; 
                    margin: 5px;
                    `
                    div.id = element.reward_id;
                    div.classList.add(element.reward_name.replace(/\s/g, ''));
                    reward_point_check(element.reward_points, div)
                    div.setAttribute('data-points', element.reward_points);
                    div.setAttribute('data-name', element.reward_name);
                    div.onclick = () => {
                        if (document.getElementsByClassName('ytcr_prompt').length != 0) {
                            document.getElementsByClassName('ytcr_prompt')[0].remove()
                        }
                        send_claim_reward_popup_user_input(element)
                        document.getElementById(element.reward_id).setAttribute("style", `
                        display: flex;
                        flex-direction: column;
                        flex-wrap: wrap;
                        align-content: center;
                        align-items: center;
                        background: var(--yt-spec-static-grey);
                        border-radius: 13%;
                        text-align: center; 
                        margin: 5px;
                        `)
                        setTimeout(() => {
                            document.getElementById(element.reward_id).style.background = "var(--yt-live-chat-action-panel-background-color,var(--yt-deprecated-opalescence-soft-grey-opacity-lighten-1))"
                        }, 500);
                    }
                    div.innerHTML = `<span class="reward_span">${element.reward_name}</span><span class="reward_span">${element.reward_points}</span>`;
                    return doc.appendChild(div);
                }
                let div = document.createElement('button');
                div.className = "reward_div";
                div.style = `
                display: flex;
                flex-direction: column;
                flex-wrap: wrap;
                align-content: center;
                align-items: center;
                background: var(--yt-live-chat-action-panel-background-color,var(--yt-deprecated-opalescence-soft-grey-opacity-lighten-1));
                border-radius: 13%;
                text-align: center; 
                margin: 5px;
                `
                div.id = element.reward_id;
                div.classList.add(element.reward_name.replace(/\s/g, ''));
                reward_point_check(element.reward_points, div)
                div.setAttribute('data-points', element.reward_points);
                div.setAttribute('data-name', element.reward_name);
                div.onclick = () => {
                    if (document.getElementsByClassName('ytcr_prompt').length != 0) {
                        document.getElementsByClassName('ytcr_prompt')[0].remove()
                    }
                    send_claim_reward_popup(element.reward_id, ytcr_broadcater_channel_id, user_id_points, username_points, element.reward_points, { reward_name: element.reward_name, reward_description: element.reward_description, reward_action_id: element.reward_action_id, reward_action_userInput: element.reward_action_userInput, reward_action_message: "test" }, update_cr_points_callback)
                    document.getElementById(element.reward_id).setAttribute("style", `
                    display: flex;
                    flex-direction: column;
                    flex-wrap: wrap;
                    align-content: center;
                    align-items: center;
                    background: var(--yt-spec-static-grey);
                    border-radius: 13%;
                    text-align: center; 
                    margin: 5px;
                    `)
                    setTimeout(() => {
                        document.getElementById(element.reward_id).style.background = "var(--yt-live-chat-action-panel-background-color,var(--yt-deprecated-opalescence-soft-grey-opacity-lighten-1))"
                    }, 500);
                }
                div.innerHTML = `<span class="reward_span">${element.reward_name}</span><span class="reward_span">${element.reward_points}</span>`;
                doc.appendChild(div);
            });
        });
    }
}
function update_points_callback(data) {
    if (data.status == "success") {
        localStorage.setItem('channel_points', data.points);
        document.querySelector('#ytcr_points_text').innerText = data.points;
        document.querySelectorAll('.reward_div').forEach(element => {
            let element_points = element.getAttribute('data-points')
            reward_point_check(element_points, element)
        })
    }
}
var timout_rewards = [];
async function update_channel_points() {
    if (ytcr_broadcater_channel_id !== "none" && username_points !== "none" && user_id_points !== "none") {
        update_points(ytcr_broadcater_channel_id, user_id_points, username_points, channel_points, update_points_callback)
        update_interval = false;
    }
}
function reward_point_check(reward_points, element) {
    if (timout_rewards.find(g => g == element.getAttribute('data-name').replace(/\s/g, ''))) {
        return;
    }
    if (parseInt(reward_points) <= localStorage.getItem('channel_points') || localStorage.getItem('channel_points') == "%") {
        element.disabled = false;
        element.style.cursor = "pointer";
        element.style.opacity = 1;
    } else {
        element.disabled = true;
        element.style.cursor = "not-allowed";
        element.style.opacity = 0.5
    }
}
function timeout(data) {
    data = data.replace(/\s/g, '')
    let element = document.getElementsByClassName(data)[0]
    element.disabled = true
    element.style.opacity = 0.5
    timout_rewards.push(data)
    setTimeout(() => {
        timout_rewards.splice(timout_rewards.indexOf(data), 1)
        reward_point_check(element.getAttribute('data-points'), element)
    }, 5000);

}
function send_claim_reward_popup_user_input(reward) {
    if (document.getElementsByClassName('ytcr_prompt').length == 0) {
        let prompt = document.createElement('div');
        prompt.className = "ytcr_prompt";
        let prompt_content = document.createElement('div');
        prompt_content.className = "ytcr_prompt_content";
        let button_div = document.createElement('div');
        button_div.className = "ytcr_prompt_button_div";
        let prompt_button = document.createElement('button');
        prompt_button.className = "ytcr_prompt_button";
        prompt_button.id = reward.reward_action_userInput
        prompt_button.innerHTML = `
        <span class="ytcr_prompt_span">Claim</span>
        <span class="ytcr_prompt_span">${reward.reward_name}</span>
        `;
        prompt_button.onclick = () => {
            ytcr_prompt(reward)
            document.getElementsByClassName('ytcr_prompt')[0].remove()
        }
        let prompt_button_close = document.createElement('button');
        prompt_button_close.className = "ytcr_prompt_close";
        prompt_button_close.id = reward.reward_action_userInput
        prompt_button_close.innerHTML = `
        <span class="ytcr_prompt_span">Cancel</span>
        `;
        prompt_button_close.onclick = () => {
            document.getElementsByClassName('ytcr_prompt')[0].remove()
        }
        button_div.appendChild(prompt_button);
        button_div.appendChild(prompt_button_close);
        prompt_content.appendChild(button_div);
        prompt.appendChild(prompt_content);
        document.getElementById('input-panel').appendChild(prompt);
    }
}
function send_claim_reward_popup(reward_id, channel_id, user_id, username, points_to_redeem, reward_info) {
    if (document.getElementsByClassName('ytcr_prompt').length == 0) {
        let prompt = document.createElement('div');
        prompt.className = "ytcr_prompt";
        let prompt_content = document.createElement('div');
        prompt_content.className = "ytcr_prompt_content";
        let button_div = document.createElement('div');
        button_div.className = "ytcr_prompt_button_div";
        let prompt_button = document.createElement('button');
        prompt_button.className = "ytcr_prompt_button";
        prompt_button.id = reward_info.reward_action_userInput
        prompt_button.innerHTML = `
        <span class="ytcr_prompt_span">Claim</span>
        <span class="ytcr_prompt_span">${reward_info.reward_name}</span>
        `;
        prompt_button.onclick = () => {
            send_claim_reward(reward_id, channel_id, user_id, username, points_to_redeem, reward_info, update_cr_points_callback)
            document.getElementsByClassName('ytcr_prompt')[0].remove()
            timeout(reward_info.reward_name)
        }
        let prompt_button_close = document.createElement('button');
        prompt_button_close.className = "ytcr_prompt_close";
        prompt_button_close.id = reward_info.reward_action_userInput
        prompt_button_close.innerHTML = `
        <span class="ytcr_prompt_span">Cancel</span>
        `;
        prompt_button_close.onclick = () => {
            document.getElementsByClassName('ytcr_prompt')[0].remove()
        }
        button_div.appendChild(prompt_button);
        button_div.appendChild(prompt_button_close);
        prompt_content.appendChild(button_div);
        prompt.appendChild(prompt_content);
        document.getElementById('input-panel').appendChild(prompt);
    }
}

function events_listen() {
    let top_chat_live_chat = document.getElementsByClassName('yt-simple-endpoint style-scope yt-dropdown-menu')
    for (let i = 0; i < top_chat_live_chat.length; i++) {
        top_chat_live_chat[i].onclick = () => {
            document.querySelector('#channel_points_button').remove()
            if (document.querySelector("#channel_points_div_clip")) {
                document.querySelector('#channel_points_div_clip').remove()
            }
            document.querySelector('#channel_points_div').remove()
            setTimeout(() => {
                add_all()
            }, 1000)
        }
    }
}

let observer = new MutationObserver(callback)
observer.observe(document.querySelector('#chat-messages'), { classList: true, attributes: true })
function callback(mutationsList, observer) {
    for (let mutation of mutationsList) {
        if (mutation.target.classList.contains('iron-selected')) {
            add_point_button()
            get_channel_points()
            get_channel_reawrds()
            events_listen()
        } else {
            document.querySelector('#channel_points_button').remove()
            document.querySelector('#channel_points_div_clip').remove()
            document.querySelector('#channel_points_div').remove()
        }
    }
}
var socket
function socket_test() {
    if (!socket) {
        socket = new WebSocket('ws://localhost:82/ws?group=ext');
        console.log('Socket is connected to YTCR');
    }
}
socket.onmessage = function (event) {
    let data = JSON.parse(event.data)
    if (data.type == "points_update") {
        if (localStorage.getItem("channel_points") != "%") {
            update_channel_points()
        }
    }
    if (data.type == "refresh rewards") {
        if (data.channel_id == ytcr_broadcater_channel_id) {
            if (document.querySelectorAll('.reward_div') !== null) {
                const rewards = document.querySelectorAll('.reward_div');
                rewards.forEach(function (element, index) {
                    element.remove()
                    if (index == rewards.length - 1) {
                        get_channel_reawrds()
                    }
                });
            } else {
                get_channel_reawrds()
            }
        }
        return;
    }
    if (data.type == "refresh user points") {
        if (data.user_id == user_id_points) {
            localStorage.setItem('channel_points', data.points);
            document.querySelector('#ytcr_points_text').innerText = data.points;
            if (document.querySelectorAll('.reward_div') !== null) {
                const rewards = document.querySelectorAll('.reward_div');
                rewards.forEach(function (element, index) {
                    element.remove()
                    if (index == rewards.length - 1) {
                        get_channel_reawrds()
                    }
                });
            } else {
                get_channel_reawrds()
            }
        }
        return;
    }
}
socket.onclose = function (e) {
    console.log('Socket is closed. Reconnect will be attempted in 5 seconds.', e.reason);
    setTimeout(function () {
        // socket = new WebSocket('ws://localhost:82/ws?group=ext');
        socket = '';
        socket_test()
    }, 5000);
};
socket.onerror = function (err) {
    console.error('Socket encountered error: ', err.message, 'Closing socket');
    socket.close();
};