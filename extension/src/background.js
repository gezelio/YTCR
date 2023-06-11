"use strict";
const filter = {
    url: [
        {
            urlMatches: "https://www.youtube.com/*"
        }
    ]
};
chrome.webNavigation.onCompleted.addListener(() => {
    async function getCurrentTab() {
        return new Promise((resolve, reject) => {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                resolve(tabs[0]);
            });
        });
    }
    getCurrentTab().then((tabs) => {
        chrome.webNavigation.getAllFrames({ tabId: tabs.id }, (result) => {
            result.forEach((element) => {
                const frameIds = [element.frameId];
                if (element.url.includes("live_chat")) {
                    chrome.scripting.executeScript(
                        {
                            target: { tabId: tabs.id, frameIds: frameIds },
                            files: ["contentScript.js"]
                        },
                        () => {}
                    );
                }
                if (element.url.includes("youtube.com")) {
                    chrome.scripting.executeScript(
                        {
                            target: { tabId: tabs.id, frameIds: frameIds },
                            files: ["youtube.js"]
                        },
                        () => {}
                    );
                }
            });
        });
    });
}, filter);
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "get_ext_id") {
        sendResponse({
            data: chrome.runtime.id
        });
    }
});

chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason == "update") {
        chrome.tabs.create({ url: "https://releases.ytcr.gezel.io/docs/releases/v2.0.1/" });
    }
});
