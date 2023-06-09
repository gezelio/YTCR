const toDataURL = (url) =>
    fetch(url)
        .then((response) => response.blob())
        .then(
            (blob) =>
                new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                })
        );
chrome.runtime.sendMessage(
    {
        type: "get_ext_id"
    },
    (response) => {
        if (!document.URL.includes("is_popout=1")) {
            localStorage.removeItem("channel_points");
            localStorage.removeItem("ytcr_user_channel_id");
            localStorage.removeItem("ytcr_broadcater_channel_id");
            localStorage.removeItem("ytcr_viewerName");
            localStorage.setItem("ytcr-notification", "YTCR_notification_on_No_Channel");
            localStorage.setItem("ext_id_ytcr", response.data);
            toDataURL(`chrome-extension://${chrome.runtime.id}/icons/ytcr.png`).then((dataUrl) => {
                localStorage.setItem("ytcr_image", dataUrl);
                load();
            });
        } else {
            localStorage.setItem("ytcr-notification", "on");
            toDataURL(`chrome-extension://${chrome.runtime.id}/icons/ytcr.png`).then((dataUrl) => {
                localStorage.setItem("ytcr_image", dataUrl);
                load();
            });
        }
    }
);
function load() {
    const head = document.getElementsByTagName("head")[0];
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = chrome.runtime.getURL("main.js");
    script.id = "gezel_youtube";
    head.appendChild(script);
    // const css = document.createElement('link');
    // css.rel = 'stylesheet';
    // css.href = chrome.runtime.getURL('reward.css');
    // css.id = 'gezel_youtube_css';
    // head.appendChild(css);
    const css_tailwind = document.createElement("link");
    css_tailwind.rel = "stylesheet";
    css_tailwind.href = chrome.runtime.getURL("tailwind.css");
    css_tailwind.id = "gezel_youtube_tailwind";
    head.appendChild(css_tailwind);
    const css_fontawesome = document.createElement("link");
    css_fontawesome.rel = "stylesheet";
    css_fontawesome.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
    css_fontawesome.id = "gezel_youtube_fontawesome";
    head.appendChild(css_fontawesome);
}
