import loging from './log.js'
var ytcr_image;
if (localStorage.getItem('ytcr_image') === null) {
    setTimeout(() => {
        ytcr_image = localStorage.getItem('ytcr_image');
        if (!document.getElementById('ytcr_topnav_div')) {
            set_top_nav()
        }
    }, 1000);
} else {
    ytcr_image = localStorage.getItem('ytcr_image');
    if (!document.getElementById('ytcr_topnav_div')) {
        set_top_nav()
    }
}
var IframeDivElement;
function set_top_nav() {
    // image
    let youtube_topnav = document.getElementById('masthead').children.container.children.end
    let ytcr_topnav_div = document.createElement('yt-icon-button')
    ytcr_topnav_div.id = 'ytcr_topnav_div'
    ytcr_topnav_div.setAttribute('class', 'style-scope ytd-masthead')
    ytcr_topnav_div.setAttribute('style', ' filter: grayscale(100%);')
    ytcr_topnav_div.label = "YTCR Channel Rewards rank"
    let ytcr_topnave_button = document.createElement('button')
    ytcr_topnave_button.id = 'ytcr_topnave_button'
    ytcr_topnave_button.setAttribute('aria-label', 'YTCR Channel Rewards rank')
    ytcr_topnave_button.setAttribute('class', 'style-scope yt-icon-button')
    let ytcr_topnave_img = document.createElement('img')
    ytcr_topnave_img.id = 'ytcr_topnave_img'
    ytcr_topnave_img.setAttribute('class', 'style-scope ytd-masthead')
    ytcr_topnave_img.setAttribute('style', 'width: 34px;border-radius: 50%;position: relative; top: -4.9px; left: -4.9px;')
    ytcr_topnave_img.src = ytcr_image
    // put them all together
    ytcr_topnave_button.appendChild(ytcr_topnave_img)
    ytcr_topnav_div.appendChild(ytcr_topnave_button)
    youtube_topnav.prepend(ytcr_topnav_div)
    IframeDivElement = document.createElement("div");
    IframeDivElement.innerHTML = `<iframe id="ytcr_iframe_ytcr" src="https://beta.ytcr.gezel.io" style="width: 520px; height: 84vh; position: fixed; top: 56px; right: 0px; z-index: 9999; display: none;"></iframe>`
    document.body.appendChild(IframeDivElement)
}
let indexfdsfdsfs = 0
let mystlink = null;
window.addEventListener('message', function (event) {
    indexfdsfdsfs += 1
    if (event.data.type == "ytcr_channel_link" && event.data.data != null && event.data.data != undefined && event.data.data != "none") {
        mystlink = event.data.mystlink
        if (document.getElementById("YTCR_MYSTLINK")) {
        } else if (mystlink) {
            loging.log("Mystl.ink: " + mystlink)
            let NewDiv = this.document.createElement("div")
            NewDiv.id = "YTCR_MYSTLINK"
            NewDiv.innerHTML = `
            <div id="mystlink" style="height: 500px;" class="style-scope ytd-watch-flexy" modern-buttons="" rounded-container="">
            <iframe style="width:100%;height:100%;border-radius: 12px;" src="https://mystl.ink/${mystlink}?extension=true"></iframe>
            </div>
            `
            document.getElementById("related").prepend(NewDiv)
        }
        document.getElementById('ytcr_iframe_ytcr').src = 'http://localhost:82/u/' + event.data.data
        document.getElementById('ytcr_topnav_div').setAttribute('style', "filter: grayscale(0%);")
        document.getElementById('ytcr_topnave_button').onclick = function () {
            if (document.getElementById('ytcr_iframe_ytcr').style.display == 'none') {
                document.getElementById('ytcr_iframe_ytcr').style.display = 'block'
                document.getElementById('ytcr_iframe_ytcr').onmouseout = function () {
                    document.getElementById('ytcr_iframe_ytcr').style.display = 'none'
                    loging.log("mouse " + document.getElementById('ytcr_iframe_ytcr').style.display)
                }
            }
            else {
                document.getElementById('ytcr_iframe_ytcr').style.display = 'none'
            }
            loging.log(document.getElementById('ytcr_iframe_ytcr').style.display)
        }
    }
})