var ytcr_image = localStorage.getItem('ytcr_image');
const notification_new = (img, type) => {
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

const AddDiv = (points) => {
    let div = document.createElement("div");
    div.className = "text-center break-words p-2"
    div.id = "YTCRMain"
    div.innerHTML = `
        <div id="buttons">
            <div class="flex justify-between">
                <btn id="PointsButton" class="p-2 bg-[#fc2a1b] hover:bg-[#af1d12] text-white font-bold rounded-lg cursor-pointer"><span id="ytcr_points_text">${points}</span> points</btn>
                <button id="ClipButton" class="p-2 bg-[#fc2a1b] hover:bg-[#af1d12] text-white font-bold rounded-lg cursor-pointer disabled:bg-gray2 disabled:pointer-events-none"><i class="fa-solid fa-clapperboard mr-1"></i>Clip</button>
            </div>
        </div>
        <div id="YTCRDropdown" class="py-3 mt-2 grid grid-cols-4 gap-2">
        </div>
    `
    return div;
}
export default { AddDiv, notification_new }




