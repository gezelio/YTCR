var ytcr_image = localStorage.getItem('ytcr_image');
const notification_new = () => {
    let div = document.createElement("div");
    div.className = "text-center break-words p-2"
    div.id = "YTCRMain"
    div.innerHTML = `This streamer doesn't use YTCR. If you want to inform them about the extension, send them over to <a href="https://github.com/gezelio/ytcr" class="underline">our GitHub</a>`
    return div;
}

const AddDiv = (points) => {
    let div = document.createElement("div");
    div.className = "text-center break-words p-2"
    div.id = "YTCRMain"
    div.innerHTML = `
        <div id ="buttons">
            <div class="flex justify-between">
                <btn id="PointsButton" class="p-2 bg-[#fc2a1b] hover:bg-[#af1d12] text-white font-bold rounded-lg cursor-pointer"><span id="ytcr_points_text">${points}</span> points</btn>
                <button id="ClipButton" class="p-2 bg-[#fc2a1b] hover:bg-[#af1d12] text-white font-bold rounded-lg cursor-pointer disabled:bg-gray2 disabled:pointer-events-none"><i class="fa-solid fa-clapperboard mr-1"></i>Clip</button>
            </div>
        </div >
    <div id="YTCRDropdown" class="py-3 mt-2 grid grid-cols-4 gap-2">
    </div>
`
    return div;
}
export default { AddDiv, notification_new }