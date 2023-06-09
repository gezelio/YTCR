var ytcr_image = localStorage.getItem("ytcr_image");
const notification_new = () => {
    let div = document.createElement("div");
    div.className = "text-center break-words p-2";
    div.id = "YTCRMain";
    div.innerHTML = `This streamer doesn't use YTCR. If you want to inform them about the extension, send them over to <a href="https://github.com/gezelio/ytcr" class="underline">our GitHub</a>`;
    return div;
};

const AddDiv = (points) => {
    let div = document.createElement("div");
    div.className = "text-center break-words p-2";
    div.id = "YTCRMain";
    div.innerHTML = `
        <div id ="buttons">
            <div class="flex justify-between p-2 col-span-full font-bold">
                <btn id="PointsButton" class="bg-primary px-2 rounded-lg pointer-events-none hover cursor-pointer"><span id="button-points" class="hidden">${points}</span> <span id="button-loading" class="mt-1 mr-2 loading loading-spinner text-white"></span> Points</btn>
                <button id="ClipButton" class="bg-primary px-2 rounded-lg text-white hover cursor-pointer disabled:bg-background disabled:pointer-events-none"><i class="fa-solid fa-clapperboard mr-1"></i>Clip</button>
            </div>
        </div >
    <div id="YTCRDropdown" class="m-2 col-span-full grid grid-cols-4 gap-3">
    </div>
`;
    return div;
};
export default { AddDiv, notification_new };
