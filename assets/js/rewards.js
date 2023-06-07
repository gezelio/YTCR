var Data = [];
RefreshData();
function RefreshData() {
    fetch("/get/dashboard/data", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.status == "success") {
                Data = data.data;
                ShowData(data.data);
            }
        })
        .catch(function (error) {
            loggingPerm({ "error RefreshData": error });
            $("#toast-container-fail").fadeIn(400, function () {
                $(this).delay(5000).fadeOut(400);
            });
        });
}
function ShowData(data) {
    document.getElementById("reward-table").innerHTML = "";
    data.rewards.map(function (reward) {
        document.getElementById("reward-table").innerHTML += `
        <tr>
            <th class="bg-gray2">${reward.reward_name}</th>
            <td class="bg-gray2">${reward.reward_points}</td>
            <td class="bg-gray2">StreamerBot</td>
        </tr>
        `;
    });
    data.user_rewards.map(function (reward) {
        document.getElementById("reward-table").innerHTML += `
        <tr>
            <th class="bg-gray2">${reward.reward_name}</th>
            <td class="bg-gray2">${reward.reward_points}</td>
            <td class="bg-gray2">YTCR</td>
        </tr>
        `;
    });
}
