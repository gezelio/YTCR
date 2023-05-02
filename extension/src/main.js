import Imports from './imports.js';
import Fetch from './fetch.js'
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

function add_all() {
    get_channel_points()
}
function ClickEvents() {
    document.getElementById("PointsButton").addEventListener('click', function () {
        console.log('Points Button clicked!');
        document.getElementById("YTCRDropdown").classList.toggle("hidden")
    });
    document.getElementById("ClipButton").addEventListener('click', function () {
        console.log('Clip Button clicked!');
        Fetch.Clip(ytcr_broadcater_channel_id, user_id_points, username_points)
    });
}
var channel_points;
async function get_channel_points() {
    if (localStorage.getItem('channel_points') != null) {
        channel_points = localStorage.getItem('channel_points')
    }
    if (ytcr_broadcater_channel_id !== "none" && username_points !== "none" && user_id_points !== "none") {
        Fetch.ChannelPoints(ytcr_broadcater_channel_id, channel_points, user_id_points, username_points).then(function (data) {
            if (data.status == "error") {
                stop = true
                Imports.notification_new(ytcr_image, "no_channel");
                if (localStorage.getItem('ytcr-notification') != "no_channel_off") {
                    setTimeout(() => {
                        document.querySelector('.ytcr-notification').style.top = "0px"
                        localStorage.setItem('ytcr-notification', "no_channel_off")
                    }, 500);
                }
                return
            }
            if (!document.getElementById("YTCRMain")) {
                let elmnt_div = document.querySelector('yt-live-chat-renderer');
                elmnt_div.appendChild(Imports.AddDiv(data.data.channel_points))
                ClickEvents()
                get_channel_reawrds()
                connect();
                document.getElementById("YTCRDropdown").classList.add("hidden")
            }
            document.getElementById("ClipButton").dataset.clip = data.data.clip_button
            if (data.data.clip_button) {
                localStorage.setItem('clip_button_status', "true")
                document.getElementById("ClipButton").removeAttribute("disabled")
            } else {
                localStorage.setItem('clip_button_status', "false")
                document.getElementById("ClipButton").setAttribute("disabled", true)
            }
            localStorage.setItem('channel_points', data.data.channel_points);
        });
    }
}
function update_cr_points_callback(data) {
    if (data.status == "success") {
        localStorage.setItem('channel_points', data.data.channel_points);
        document.querySelector('#ytcr_points_text').innerText = data.data.channel_points;
    }
}
async function get_channel_reawrds() {
    document.getElementById("YTCRDropdown").innerHTML = ""
    if (ytcr_broadcater_channel_id !== "none" && username_points !== "none" && user_id_points !== "none") {
        Fetch.Rewards(ytcr_broadcater_channel_id).then(function (data) {
            data.data.channel_rewards.sort(function (a, b) {
                return a.reward_points - b.reward_points;
            });
            data.data.channel_rewards.forEach(element => {
                document.getElementById("YTCRDropdown").innerHTML += `
                <button id="YTCRbutton_${element.reward_action_id}" data-points="${element.reward_points}" data-id="${element.reward_action_id}" data-name="${element.reward_name}" class="disabled:bg-black disabled:pointer-events-none px-1 py-3 bg-[#24292e] text-white font-bold text-[10px] rounded-lg border border-white cursor-pointer disabled:pointer-events-none" style="text-align: -webkit-center; ">${element.reward_name}
                    <p class="mt-3 bg-[#1f2428] w-1/3 p-1 rounded-lg">${element.reward_points}</p>
                </button>
                `
            });
            data.data.channel_rewards.forEach(element => {
                document.getElementById("YTCRbutton_" + element.reward_action_id).addEventListener('click', function () {
                    console.log('Button clicked!');
                    send_claim_reward_popup(element.reward_id, ytcr_broadcater_channel_id, user_id_points, username_points, element.reward_points, { reward_name: element.reward_name, reward_description: element.reward_description, reward_action_id: element.reward_action_id, reward_action_userInput: element.reward_action_userInput, reward_action_message: "test" }, update_cr_points_callback)
                });
                PointCheck(element);
            });
        });
    }
}
function update_points_callback(data) {
    if (data.status == "success") {
        localStorage.setItem('channel_points', data.points);
        document.querySelector('#ytcr_points_text').innerText = data.points;
    }
}
function PointCheck(element) {
    // console.log('element: ', element);
    // if (parseInt(element.reward_points) <= localStorage.getItem('channel_points') || localStorage.getItem('channel_points') == "%") {
    //     document.getElementById("YTCRbutton_" + element.reward_action_id).removeAttribute("disabled")
    // } else {
    //     document.getElementById("YTCRbutton_" + element.reward_action_id).setAttribute("disabled", true)
    // }
}
async function update_channel_points() {
    if (ytcr_broadcater_channel_id !== "none" && username_points !== "none" && user_id_points !== "none") {
        Fetch.UpdatePoints(ytcr_broadcater_channel_id, user_id_points, username_points, channel_points, update_points_callback)
    }
}
function send_claim_reward_popup(reward_id, channel_id, user_id, username, points_to_redeem, reward_info) {
    Fetch.ClaimRewards(reward_id, channel_id, user_id, username, points_to_redeem, reward_info, update_cr_points_callback)
}
function connect() {
    var ws = new WebSocket('ws://localhost:82/ws?group=ext');
    ws.onopen = function () {
        console.log('Socket is connected to YTCR');
    };
    ws.onmessage = function (e) {
        var data = JSON.parse(e.data);
        if (data.type == "points_update") {
            if (localStorage.getItem("channel_points") != "%") {
                update_channel_points()
            }
        }
        if (data.type == "refresh rewards") {
            if (data.channel_id == ytcr_broadcater_channel_id) {
                get_channel_reawrds();
                get_channel_points();
                console.log("refresh rewards")
            }
            return;
        }
        if (data.type == "refresh user points") {
            if (data.user_id == user_id_points) {
                localStorage.setItem('channel_points', data.points);
                document.querySelector('#ytcr_points_text').innerText = data.points;
                get_channel_reawrds();
            }
            return;
        }
    };
    ws.onclose = function (e) {
        console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
        setTimeout(function () {
            connect();
        }, 1000);
    };
    ws.onerror = function (err) {
        console.error('Socket encountered error: ', err.message, 'Closing socket');
        ws.close();
    };
}