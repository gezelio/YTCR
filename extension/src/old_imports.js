var ytcr_image = localStorage.getItem('ytcr_image');

const new_button = () => {
    let button = document.createElement("button");
    button.id = "channel_points_button";
    button.setAttribute("class", "yt-icon-button bg-blue-500 w-5 px-1");
    button.onclick = () => {

        let div = document.querySelector("#channel_points_div");
        let clip_div = document.querySelector("#channel_points_div_clip");
        let clip_div_button = document.querySelector("#channel_points_button_clip");

        if (div.style.display === "none") {
            div.style.display = "flex";
            if (clip_div) {
                clip_div.style.display = "flex";
                clip_div_button.style.display = "block";
            }
        }
        else {
            div.style.display = "none";
            if (clip_div) {
                clip_div.style.display = "none";
                clip_div_button.style.display = "none";
            }
        };
    };
    return button;
}
const new_div = () => {
    let div = document.createElement("div");
    div.id = "channel_points_div";
    div.setAttribute("class", "yt-uix-button-group");
    div.setAttribute("style", `
    display: none !important;
    border-radius: 5px;
    position: relative;
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    `
    );
    return div;
}
const clip_button_div = () => {
    let div = document.createElement("div");
    div.id = "channel_points_div_clip";
    div.setAttribute("class", "yt-uix-button-group");
    div.setAttribute("style", `
    border-radius: 5px;
    position: relative;
    height: auto;
    width: 12%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    `
    );
    return div;
}
const notification = (img, type) => {
    var message_notification = "none";
    if (type = "no_channel") {
        message_notification = "This channel does not have YTCR points yet.";
    }
    let notification = document.createElement("div");
    notification.setAttribute("class", "ytcr-notification");

    let notification_img = document.createElement("img");
    notification_img.setAttribute("class", "ytcr-alert-icon");
    notification_img.setAttribute("src", img);

    let notification_text_div = document.createElement("div");
    notification_text_div.setAttribute("class", "ytcr-alert-message-div");

    let notification_text = document.createElement("span");
    notification_text.setAttribute("class", "ytcr-alert-message");
    notification_text.innerHTML = message_notification;

    let notification_close = document.createElement("i");
    notification_close.setAttribute("class", "ytcr-alert-close");
    notification_close.setAttribute("role", "img");
    notification_close.setAttribute("aria-label", "Close");
    notification_close.onclick = () => {
        notification.style.top = "-100px";
    };

    notification_text_div.appendChild(notification_text);
    notification.appendChild(notification_img);
    notification.appendChild(notification_close);
    notification.appendChild(notification_text_div);
    document.body.prepend(notification);
}
export const add_button_new = new_button;
export const add_div_new = new_div;
export const notification_new = notification;
export const clip_button_div_new = clip_button_div;