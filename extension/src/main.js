import Imports from "./imports.js";
import Fetch from "./fetch.js";
import logging from "./log.js";
import log from "./log.js";
var username_points = "none";
var user_id_points = "none";
var ytcr_broadcater_channel_id = "none";
var coooldowns_active = new Map();
function secondsToMilliseconds(seconds) {
    return seconds * 1000;
}
var ytcr_image = localStorage.getItem("ytcr_image");
if (ytInitialData.continuationContents != undefined && ytInitialData.continuationContents.liveChatContinuation.viewerName != undefined && ytInitialData.continuationContents.liveChatContinuation.actionPanel.liveChatMessageInputRenderer.sendButton.buttonRenderer.serviceEndpoint.sendLiveChatMessageEndpoint.actions[0].addLiveChatTextMessageFromTemplateAction.template.liveChatTextMessageRenderer.authorExternalChannelId != undefined && parent.ytInitialData.contents != undefined && parent.ytInitialData.contents.twoColumnWatchNextResults != undefined) {
    username_points = ytInitialData.continuationContents.liveChatContinuation.viewerName;
    localStorage.setItem("ytcr_viewerName", username_points);
    user_id_points = ytInitialData.continuationContents.liveChatContinuation.actionPanel.liveChatMessageInputRenderer.sendButton.buttonRenderer.serviceEndpoint.sendLiveChatMessageEndpoint.actions[0].addLiveChatTextMessageFromTemplateAction.template.liveChatTextMessageRenderer.authorExternalChannelId;
    localStorage.setItem("ytcr_user_channel_id", user_id_points);
    if (!!parent.ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[1].videoSecondaryInfoRenderer.owner.videoOwnerRenderer.title.runs[0].navigationEndpoint.browseEndpoint.browseId) {
        ytcr_broadcater_channel_id = parent.ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[1].videoSecondaryInfoRenderer.owner.videoOwnerRenderer.title.runs[0].navigationEndpoint.browseEndpoint.browseId;
        localStorage.setItem("ytcr_broadcater_channel_id", parent.ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[1].videoSecondaryInfoRenderer.owner.videoOwnerRenderer.title.runs[0].navigationEndpoint.browseEndpoint.browseId);
    }
    add_all();
} else {
    if (localStorage.getItem("ytcr_viewerName") != undefined && localStorage.getItem("ytcr_user_channel_id") != undefined && localStorage.getItem("ytcr_broadcater_channel_id") != undefined) {
        username_points = localStorage.getItem("ytcr_viewerName");
        user_id_points = localStorage.getItem("ytcr_user_channel_id");
        ytcr_broadcater_channel_id = localStorage.getItem("ytcr_broadcater_channel_id");
        add_all();
    }
}
function add_all() {
    get_channel_points();
}
function ClickEvents() {
    document.getElementById("PointsButton").addEventListener("click", function () {
        logging.log("Points Button clicked!");
        document.getElementById("YTCRDropdown").classList.toggle("hidden");
    });
    document.getElementById("ClipButton").addEventListener("click", function () {
        logging.log("Clip Button clicked!");
        Fetch.Clip(ytcr_broadcater_channel_id, user_id_points, username_points);
    });
}
var channel_points;
async function get_channel_points() {
    if (localStorage.getItem("channel_points") != null) {
        channel_points = localStorage.getItem("channel_points");
    }
    if (ytcr_broadcater_channel_id !== "none" && username_points !== "none" && user_id_points !== "none") {
        Fetch.ChannelPoints(ytcr_broadcater_channel_id, channel_points, user_id_points, username_points).then(function (data) {
            if (data.status == "error") {
                stop = true;
                if (!document.getElementById("YTCRMain")) {
                    let elmnt_div = document.querySelector("yt-live-chat-renderer");
                    elmnt_div.appendChild(Imports.notification_new());
                }
                return;
            }
            if (!document.getElementById("YTCRMain")) {
                let elmnt_div = document.querySelector("yt-live-chat-renderer");
                localStorage.setItem("channel_points", data.data.channel_points);
                if (data.data.channel_points == "%") {
                    data.data.channel_points = `<i class="fa-solid fa-infinity"></i>`;
                }
                elmnt_div.appendChild(Imports.AddDiv(data.data.channel_points));
                ClickEvents();
                get_channel_reawrds();
                connect();
                document.getElementById("YTCRDropdown").classList.add("hidden");
            }
            document.getElementById("ClipButton").dataset.clip = data.data.clip_button;
            if (data.data.clip_button) {
                localStorage.setItem("clip_button_status", "true");
                document.getElementById("ClipButton").removeAttribute("disabled");
            } else {
                localStorage.setItem("clip_button_status", "false");
                document.getElementById("ClipButton").setAttribute("disabled", true);
            }
        });
    }
}
async function ytcr_prompt(reward_id, channel_id, user_id, username, points_to_redeem, reward_info, cooldown, color) {
    if (document.querySelector("#ytcr_prompt") == null) {
        document.getElementById("live-chat-message-input").style.display = "none";
        let prompt = document.createElement("div");
        prompt.id = "ytcr_prompt";
        let prompt_content = document.createElement("div");
        prompt_content.className = "p-2 rounded-xl flex flex-col text-center bg-accent";
        prompt_content.id = "ytcr_prompt_content";
        let prompt_content_header = document.createElement("div");
        prompt_content_header.className = "font-bold";
        prompt_content_header.id = "ytcr_prompt_content_header";
        prompt_content_header.innerText = reward_info.reward_name;
        prompt_content.appendChild(prompt_content_header);
        let prompt_content_body = document.createElement("div");
        prompt_content_body.id = "ytcr_prompt_content_body";
        prompt_content_body.className = "text-center flex flex-row gap-2";
        let prompt_content_button = document.createElement("button");
        prompt_content_button.className = "p-2 text-center rounded bg-[#485c39]";
        prompt_content_button.id = "ytcr_prompt_button";
        prompt_content_button.dataset.id = reward_id;
        prompt_content_button.innerHTML = `Redeem for ${points_to_redeem}`;
        let prompt_button_close = document.createElement("button");
        prompt_button_close.className = "ytcr_prompt_close";
        prompt_button_close.className = "p-2 text-center rounded bg-[#843e37]";
        prompt_button_close.innerHTML = `
    <span class="ytcr_prompt_span">Cancel</span>
    `;
        prompt_content_button.onclick = (event) => {
            var pressedButton = event.target;
            document.getElementById("live-chat-message-input").style.display = "block";
            document.getElementById("ytcr_prompt").remove();
            let id = pressedButton.dataset.id;
            document.getElementById(`YTCRbutton_${id}`).classList.add("disabled");
            document.getElementById(`YTCRbutton_${id}`).style.background = "#161616";
            document.getElementById(`YTCRbutton_${id}`).style.color = "white";
            coooldowns_active.set(id, true);
            setTimeout(function () {
                let element = document.getElementById(`YTCRbutton_${id}`);
                coooldowns_active.delete(id);
                element.style.background = element.dataset.bg;
                element.style.color = element.dataset.font;
                element.classList.remove("disabled");
            }, secondsToMilliseconds(cooldown));
            Fetch.ClaimRewards(reward_id, channel_id, user_id, username, points_to_redeem, reward_info, update_cr_points_callback);
            document.getElementById("YTCRDropdown").classList.toggle("hidden");
            get_channel_reawrds();
        };
        prompt_button_close.onclick = () => {
            document.getElementById("live-chat-message-input").style.display = "block";
            document.getElementById("ytcr_prompt").remove();
            document.getElementById("YTCRDropdown").classList.toggle("hidden");
        };
        prompt_content_body.appendChild(prompt_content_button);
        prompt_content_body.appendChild(prompt_button_close);
        prompt_content.appendChild(prompt_content_body);
        prompt.appendChild(prompt_content);
        document.getElementById("input-panel").prepend(prompt);
    }
}
async function ytcr_prompt_error(text) {
    if (document.querySelector("#ytcr_prompt") == null) {
        document.getElementById("live-chat-message-input").style.display = "none";
        let prompt = document.createElement("div");
        prompt.id = "ytcr_prompt";
        let prompt_content = document.createElement("div");
        prompt_content.className = "p-2 rounded-xl flex flex-col text-center bg-accent";
        prompt_content.id = "ytcr_prompt_content";
        let prompt_content_header = document.createElement("div");
        prompt_content_header.className = "font-bold";
        prompt_content_header.id = "ytcr_prompt_content_header";
        prompt_content_header.innerText = text;
        prompt_content.appendChild(prompt_content_header);
        let prompt_content_body = document.createElement("div");
        prompt_content_body.id = "ytcr_prompt_content_body";
        prompt_content_body.className = "text-center flex flex-row justify-center";
        let prompt_button_close = document.createElement("button");
        prompt_button_close.className = "ytcr_prompt_close";
        prompt_button_close.className = "p-2 text-center rounded bg-[#843e37]";
        prompt_button_close.innerHTML = `
    <span class="ytcr_prompt_span">Cancel</span>
    `;
        prompt_button_close.onclick = () => {
            document.getElementById("live-chat-message-input").style.display = "block";
            document.getElementById("ytcr_prompt").remove();
        };
        prompt_content_body.appendChild(prompt_button_close);
        prompt_content.appendChild(prompt_content_body);
        prompt.appendChild(prompt_content);
        document.getElementById("input-panel").prepend(prompt);
    }
}

function update_cr_points_callback(data) {
    if (data.status == "success") {
        localStorage.setItem("channel_points", data.data.channel_points);
        if (data.data.channel_points == "%") {
            data.data.channel_points = `<i class="fa-solid fa-infinity"></i>`;
        }
        document.querySelector("#button-points").innerHTML = data.data.channel_points;
        if (data.data.per_stream_done) {
            setTimeout(() => {
                get_channel_reawrds();
            }, 200);
        }
    }
}
var YTCR_Folders = [];
var YTCR_FoldersChecked = [];
async function get_channel_reawrds() {
    YTCR_Folders = [];
    YTCR_FoldersChecked = [];
    document.getElementById("YTCRDropdown").innerHTML = "";
    if (ytcr_broadcater_channel_id !== "none" && username_points !== "none" && user_id_points !== "none") {
        Fetch.Rewards(ytcr_broadcater_channel_id).then(function (data) {
            data.data.channel_rewards.sort(function (a, b) {
                return a.reward_points - b.reward_points;
            });
            data.data.channel_rewards.forEach((element) => {
                if (!element.active) return;
                if (element.reward_folder) {
                    if (YTCR_Folders.find((e) => e == element.reward_folder)) return;
                    YTCR_Folders.push(element.reward_folder);
                    document.getElementById("YTCRDropdown").innerHTML += `
                    <btn id="YTCRbuttonFolder_${element.reward_folder}" data-folder="${element.reward_folder}" class="p-4 rounded-lg border-2 flex flex-col items-center justify-center bg-accent text-white aspect-w-2 aspect-h-2 cursor-pointer">
                        <i class="fa-solid fa-folder text-4xl"></i>
                        <div id="cost" class="font-bold bg-off_white text-background p-2 text-sm rounded-md shadow-md mt-auto">${element.reward_folder}</div>
                    </btn>
                    `;
                    return;
                }
                let found = coooldowns_active.get(element.reward_id);
                if (found) {
                    document.getElementById("YTCRDropdown").innerHTML += `
                    <btn id="YTCRbutton_${element.reward_id}" data-points="${element.reward_points}" data-bg="${element?.reward_color?.background || "#c9574e"}" data-font="${element?.reward_color?.font || "white"}" data-id="${element.reward_id}" data-name="${element.reward_name}" style="background:#161616; color:white" class="p-4 rounded-lg border-2 flex flex-col items-center justify-center aspect-w-2 aspect-h-2 cursor-pointer disabled">
                        <div id="name" class="font-bold mb-4">${element.reward_name}</div>
                        <div id="cost" class="font-bold bg-background text-white p-2 text-sm rounded-md shadow-md mt-auto">${element.reward_points}</div>
                    </btn>
                    `;
                } else {
                    document.getElementById("YTCRDropdown").innerHTML += `
                    <btn id="YTCRbutton_${element.reward_id}" data-points="${element.reward_points}" data-bg="${element?.reward_color?.background || "#c9574e"}" data-font="${element?.reward_color?.font || "white"}" data-id="${element.reward_id}" data-name="${element.reward_name}" style="background:${element?.reward_color?.background || "#c9574e"}; color:${element?.reward_color?.font || "white"}" class="p-4 rounded-lg border-2 flex flex-col items-center justify-center aspect-w-2 aspect-h-2 cursor-pointer">
                        <div id="name" class="font-bold mb-4">${element.reward_name}</div>
                        <div id="cost" class="font-bold bg-background text-white p-2 text-sm rounded-md shadow-md mt-auto">${element.reward_points}</div>
                    </btn>
                    `;
                }
            });
            data.data.channel_rewards.forEach((element) => {
                if (element.reward_folder) return;
                if (!element.active) return;
                document.getElementById("YTCRbutton_" + element.reward_id).addEventListener("click", function () {
                    logging.log("Button clicked!");
                    send_claim_reward_popup(element.reward_id, ytcr_broadcater_channel_id, user_id_points, username_points, element.reward_points, { reward_name: element.reward_name, reward_description: element.reward_description, reward_action_id: element.reward_action_id, reward_action_userInput: element.reward_action_userInput, reward_action_message: "test" }, element?.reward_cooldown, element?.reward_color?.background || "#c9574e", update_cr_points_callback);
                });
                PointCheck(element);
            });
            data.data.channel_rewards.forEach((element) => {
                if (!element.reward_folder) return;
                if (!element.active) return;
                if (YTCR_FoldersChecked.find((e) => e == element.reward_folder)) return;
                YTCR_FoldersChecked.push(element.reward_folder);
                document.getElementById("YTCRbuttonFolder_" + element.reward_folder).addEventListener("click", function () {
                    document.getElementById("YTCRDropdown").innerHTML = "";
                    document.getElementById("YTCRDropdown").innerHTML += `
                    <btn id="YTCRFolder_back" class="p-4 rounded-lg border-2 flex flex-col items-center justify-center bg-accent text-white aspect-w-2 aspect-h-2 cursor-pointer">
                        <i class="fa-solid fa-arrow-left text-4xl"></i>
                    </btn>
                    `;
                    data.data.channel_rewards.forEach((element1) => {
                        if (!element1.active) return;
                        if (element1.reward_folder == this.dataset.folder) {
                            let found = coooldowns_active.get(element1.reward_id);
                            if (found) {
                                document.getElementById("YTCRDropdown").innerHTML += `
                                <btn id="YTCRbutton_${element1.reward_id}" data-points="${element1.reward_points}" data-bg="${element1?.reward_color?.background || "#c9574e"}" data-font="${element1?.reward_color?.font || "white"}" data-id="${element1.reward_id}" data-name="${element1.reward_name}" style="background:#161616; color:white" class="p-4 rounded-lg border-2 flex flex-col items-center justify-center aspect-w-2 aspect-h-2 cursor-pointer disabled">
                                    <div id="name" class="font-bold mb-4">${element1.reward_name}</div>
                                    <div id="cost" class="font-bold bg-background text-white p-2 text-sm rounded-md shadow-md mt-auto">${element1.reward_points}</div>
                                </btn>
                                `;
                            } else {
                                document.getElementById("YTCRDropdown").innerHTML += `
                            <btn id="YTCRbutton_${element1.reward_id}" data-points="${element1.reward_points}" data-bg="${element1?.reward_color?.background || "#c9574e"}" data-font="${element1?.reward_color?.font || "white"}" data-id="${element1.reward_action_id}" data-name="${element1.reward_name}" style="background:${element1?.reward_color?.background || "#c9574e"};color:${element1?.reward_color?.font || "white"}" class="p-4 rounded-lg border-2 flex flex-col items-center justify-center aspect-w-2 aspect-h-2 cursor-pointer">
                                <div id="name" class="font-bold mb-4">${element1.reward_name}</div>
                                <div id="cost" class="font-bold bg-background text-white p-2 text-sm rounded-md shadow-md mt-auto">${element1.reward_points}</div>
                            </btn>
                            `;
                            }
                            setTimeout(() => {
                                document.getElementById("YTCRbutton_" + element1.reward_id).addEventListener("click", function () {
                                    logging.log("Button clicked!");
                                    send_claim_reward_popup(element1.reward_id, ytcr_broadcater_channel_id, user_id_points, username_points, element1.reward_points, { reward_name: element1.reward_name, reward_description: element1.reward_description, reward_action_id: element1.reward_action_id, reward_action_userInput: element1.reward_action_userInput, reward_action_message: "test" }, element1?.reward_cooldown, element1?.reward_color?.background || "#c9574e", update_cr_points_callback);
                                });
                            }, 500);
                        }
                    });
                    document.getElementById("YTCRFolder_back").addEventListener("click", function () {
                        get_channel_reawrds();
                    });
                });
            });
        });
    }
}
function update_points_callback(data) {
    if (data.status == "success") {
        localStorage.setItem("channel_points", data.points);
        if (data.points == "%") {
            data.points = `<i class="fa-solid fa-infinity"></i>`;
        }
        document.querySelector("#button-points").innerHTML = data.points;
    }
}
function PointCheck(element) {
    // logging.log('element: ', element);
    // if (parseInt(element.reward_points) <= localStorage.getItem('channel_points') || localStorage.getItem('channel_points') == "%") {
    //     document.getElementById("YTCRbutton_" + element.reward_action_id).removeAttribute("disabled")
    // } else {
    //     document.getElementById("YTCRbutton_" + element.reward_action_id).setAttribute("disabled", true)
    // }
}
async function update_channel_points() {
    if (ytcr_broadcater_channel_id !== "none" && username_points !== "none" && user_id_points !== "none") {
        Fetch.UpdatePoints(ytcr_broadcater_channel_id, user_id_points, username_points, channel_points, update_points_callback);
    }
}
function send_claim_reward_popup(reward_id, channel_id, user_id, username, points_to_redeem, reward_info, cooldown, color) {
    if (points_to_redeem <= localStorage.getItem("channel_points") || localStorage.getItem("channel_points") == "%") {
        if (document.getElementById(`YTCRbutton_${reward_id}`).classList.contains("disabled")) {
            ytcr_prompt_error("Reward is on cooldown");
            return;
        }
        ytcr_prompt(reward_id, channel_id, user_id, username, points_to_redeem, reward_info, cooldown, color);
        document.getElementById("YTCRDropdown").classList.toggle("hidden");
        // document.getElementsByClassName('ytcr_prompt')[0].remove()
        // Fetch.ClaimRewards(reward_id, channel_id, user_id, username, points_to_redeem, reward_info, update_cr_points_callback)
    } else {
        ytcr_prompt_error("Not enough points");
        document.getElementById("YTCRDropdown").classList.toggle("hidden");
    }
}
function connect() {
    // var ws = new WebSocket("wss://ytcr.gezel.io/ws?group=ext");
    var ws = new WebSocket("ws://localhost:82/ws?group=ext");

    ws.onopen = function () {
        logging.perm("Socket is connected to YTCR");
        setTimeout(() => {
            document.getElementById("PointsButton").classList.remove("pointer-events-none");
            document.getElementById("button-points").classList.remove("hidden");
            document.getElementById("button-loading").classList.add("hidden");
        }, 2000);
    };
    ws.onmessage = function (e) {
        var data = JSON.parse(e.data);
        logging.log({ WS: "Message", data });
        if (data.type == "points_update") {
            if (localStorage.getItem("channel_points") != "%") {
                update_channel_points();
            }
        }
        if (data.type == "refresh rewards") {
            if (data.channel_id == ytcr_broadcater_channel_id) {
                get_channel_reawrds();
                logging.log("refresh rewards");
            }
            return;
        }
        if (data.type == "refresh user points") {
            if (data.user_id == user_id_points) {
                localStorage.setItem("channel_points", data.points);
                document.querySelector("#button-points").innerText = data.points;
                get_channel_reawrds();
            }
            return;
        }
        if (data.type == "refresh clip stuff") {
            logging.log("refresh clip stuff");
            if (data.channel_id == ytcr_broadcater_channel_id) {
                logging.log("refresh clip stuff1");
                get_channel_points();
            }
            return;
        }
    };
    ws.onclose = function (e) {
        logging.perm("Socket is closed. Reconnect will be attempted in 1 second.", e.reason);
        setTimeout(function () {
            connect();
        }, 1000);
    };
    ws.onerror = function (err) {
        console.error("Socket encountered error: ", err.message, "Closing socket");
        ws.close();
    };
}
