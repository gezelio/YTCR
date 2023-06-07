var Data = [];
var edit = {
    edit: false,
    id: null
};
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
function UpdateSend(url, data) {
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            data: data
        })
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("data: ", data);
            if (data.status == "success") {
                $("#toast-container-works").fadeIn(400, function () {
                    $(this).delay(5000).fadeOut(400);
                });
                RefreshData();
            }
            if (data.status == "fail") {
                $("#toast-container-fail").fadeIn(400, function () {
                    $(this).delay(5000).fadeOut(400);
                });
            }
        })
        .catch(function (error) {
            loggingPerm({ "error UpdateSend": error });
            $("#toast-container-fail").fadeIn(400, function () {
                $(this).delay(5000).fadeOut(400);
            });
        });
}
function ShowData(data) {
    edit = {
        edit: false,
        id: null
    };
    document.getElementById("reward_name").value = "";
    document.getElementById("reward_cost").value = "";
    document.getElementById("reward_action").value = "";
    document.getElementById("create-btn").classList.add("hidden");
    document.getElementById("edit-btn").classList.add("hidden");
    document.getElementById("clear-btn").classList.add("hidden");
    document.getElementById("reward-table").innerHTML = "";
    data.rewards.map(function (reward) {
        document.getElementById("reward-table").innerHTML += `
        <tr>
            <th class="bg-gray2">${reward.reward_name}</th>
            <td class="bg-gray2">${reward.reward_points}</td>
            <td class="bg-gray2">${reward.reward_action_id == null ? "No ID" : reward.reward_action_id}</td>
            <td class="bg-gray2" data-tippy-content="This reward was built in StreamerBot and you would need to modify the action from there" >StreamerBot</td>
            <td class="bg-gray2">StreamerBot Edit</td>
        </tr>
        `;
    });
    data.user_rewards.map(function (reward) {
        document.getElementById("reward-table").innerHTML += `
        <tr>
            <th class="bg-gray2">${reward.reward_name}</th>
            <td class="bg-gray2">${reward.reward_points}</td>
            <td class="bg-gray2">${reward.reward_action_id == null ? "No ID" : reward.reward_action_id}</td>
            <td class="bg-gray2">YTCR</td>
            <td class="bg-gray2">
                <button onclick="Edit('${reward.reward_id}')" class="bg-green-500 btn btn-block text-white w-1/2">Edit</button>
                <button onclick="DeleteSend('${reward.reward_id}')" class="bg-red-500 btn btn-block text-white w-1/2"><i class="fa-solid fa-trash-can"></i></button>
            </td>
        </tr>
        `;
    });
    tippy("[data-tippy-content]", {
        arrow: true
    });
}
document.getElementById("reward_name").addEventListener("input", function () {
    CheckInputs();
});
document.getElementById("reward_cost").addEventListener("input", function () {
    CheckInputs();
});
function CheckInputs() {
    if (document.getElementById("reward_name").value.length != 0 && document.getElementById("reward_cost").value.length != 0 && !edit.edit) {
        document.getElementById("create-btn").classList.remove("hidden");
    }
}
function Create() {
    UpdateSend("/post/update/rewards/create", {
        name: document.getElementById("reward_name").value,
        points: document.getElementById("reward_cost").value,
        action_id: document.getElementById("reward_action").value
    });
}
function Edit(id) {
    found = Data.user_rewards.find((e) => e.reward_id == id);
    if (!found) return;
    edit.edit = true;
    edit.id = id;
    document.getElementById("reward_name").value = found.reward_name;
    document.getElementById("reward_cost").value = found.reward_points;
    document.getElementById("reward_action").value = found.reward_action_id;
    document.getElementById("edit-btn").classList.remove("hidden");
    document.getElementById("clear-btn").classList.remove("hidden");
}
function EditSend() {
    UpdateSend("/post/update/rewards/edit", {
        id: edit.id,
        name: document.getElementById("reward_name").value,
        points: document.getElementById("reward_cost").value,
        action_id: document.getElementById("reward_action").value
    });
}
function DeleteSend(id) {
    UpdateSend("/post/update/rewards/delete", {
        id
    });
}
