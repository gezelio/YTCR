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
            connectionDiv.className = "grid p-4 my-4 container bg-neutral-900 rounded-lg";
            if (data.sb) {
                // Convert the timestamp string to a Moment.js object
                const timestamp = moment(data.reward_updated, "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
                // Calculate the duration between the timestamp and the current time
                const duration = moment.duration(moment().diff(timestamp));
                // Display the duration in a human-readable format
                const durationString = duration.humanize();
                connectionDiv.innerHTML = `
            <p class="font-bold">
                StreamerBot: <span class="text-green-600 font-bold">Connected</span>
            </p>
            <p>Last update from StreamerBot: ${durationString} ago</p>
            `;
            } else {
                connectionDiv.innerHTML = `
            <p class="font-bold">
                StreamerBot: <span class="text-botred font-bold">Disconnected</span>
            </p>
            <p>
                StreamerBot is currently not connected so YTCR will not act as expected. Please ensure you connect to the websocket and have the actions provided. If you need assistance, please jump into our
                <a href="https://gezel.io/discord" class="text-discord hover:text-discord2 hover:underline">Discord</a>
            </p>
            `;
            }
            document.getElementById("main").prepend(connectionDiv);
        })
        .catch(function (error) {
            loggingPerm({ "error UpdateSend": error });
            $("#toast-container-fail-message").html("Error");
            $("#toast-container-fail").fadeIn(400, function () {
                $(this).delay(5000).fadeOut(400);
            });
        });
}
setInterval(() => {
    CheckSBConnection();
}, 60000);
