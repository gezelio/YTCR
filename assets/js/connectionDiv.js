moment_js_script = document.createElement("script");
moment_js_script.src = "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js";
document.head.appendChild(moment_js_script);
CheckSBConnection();
function CheckSBConnection() {
    fetch("/get/check/connection", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (document.getElementById("connectionSB")) document.getElementById("connectionSB").remove();
            connectionDiv = document.createElement("div");
            connectionDiv.id = "connectionSB";
            connectionDiv.className = "grid p-4 my-4 container bg-accent rounded-lg";
            if (data.sb) {
                // Convert the timestamp string to a Moment.js object
                const timestamp = moment(data.reward_updated, "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
                // Calculate the duration between the timestamp and the current time
                const duration = moment.duration(moment().diff(timestamp));
                // Display the duration in a human-readable format
                const durationString = duration.humanize();
                connectionDiv.innerHTML = `
                <h1 class="font-bold">Connections</h1>
                <div class="font-bold flex gap-4 items-center" data-tippy-content="StreamerBot is connected via websocket. Rewards will Action ID's are set.">
                <img src="./assets/images/streamerbot.png"><span class="text-green-600 font-bold"><i class="fa-solid fa-signal"></i></span>
            </div>
            <p>Last update from StreamerBot: ${durationString} ago</p>
            `;
            } else {
                connectionDiv.innerHTML = `
                <h1 class="font-bold mb-2">Connections</h1>
            <div class="font-bold flex gap-4 items-center" data-tippy-content="StreamerBot is not connected. Please connect via the websocket if you need Action ID's in your rewards.">
                <img src="./assets/images/streamerbot.png"><span class="text-primary font-bold"><i class="fa-solid fa-signal"></i></span>
            </div>
            `;
            }
            document.getElementById("main").prepend(connectionDiv);
        })
        .catch(function (error) {
            console.error("error: ", error);
            loggingPerm({ "error UpdateSend": error });
            $("#toast-container-fail-message").html(error);
            $("#toast-container-fail").fadeIn(400, function () {
                $(this).delay(5000).fadeOut(400);
            });
        });
}
setInterval(() => {
    CheckSBConnection();
}, 60000);
