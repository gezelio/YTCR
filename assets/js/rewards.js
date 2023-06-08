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
                $("#toast-container-works-message").html("Updated");
                $("#toast-container-works").fadeIn(400, function () {
                    $(this).delay(5000).fadeOut(400);
                });
                RefreshData();
            }
            if (data.status == "fail") {
                $("#toast-container-fail-message").html("Error");
                $("#toast-container-fail").fadeIn(400, function () {
                    $(this).delay(5000).fadeOut(400);
                });
            }
        })
        .catch(function (error) {
            loggingPerm({ "error UpdateSend": error });
            $("#toast-container-fail-message").html("Error");
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
    document.getElementById("reward_folder").value = "";
    document.getElementById("reward_color").value = "#c9574e";
    document.getElementById("create-btn").classList.add("hidden");
    document.getElementById("edit-btn").classList.add("hidden");
    document.getElementById("clear-btn").classList.add("hidden");
    document.getElementById("reward-table").innerHTML = "";
    data.rewards.map(function (reward) {
        document.getElementById("reward-table").innerHTML += `
        <tr>
            <th class="bg-gray2">${reward.reward_name}</th>
            <td class="bg-gray2">${reward.reward_points}</td>
            <td class="bg-gray2">${reward.reward_action_id == null ? "N/A" : reward.reward_action_id}</td>
            <td class="bg-gray2" data-tippy-content="This reward was built in StreamerBot and you would need to modify the action from there" >StreamerBot</td>
            <td class="bg-gray2">${reward.reward_folder == undefined || reward.reward_folder.length == 0 ? "N/A" : reward.reward_folder}</td>
            <td class="bg-gray2">${reward?.reward_color?.background ? `<div class="rounded-full w-9 h-9 bg-[${reward?.reward_color?.background}]"></div>` : `<div class="rounded-full w-9 h-9 bg-botred"></div>`}</td>
            <td class="bg-gray2">N/A</td>
        </tr>
        `;
    });
    data.user_rewards.map(function (reward) {
        document.getElementById("reward-table").innerHTML += `
        <tr>
            <th class="bg-gray2">${reward.reward_name}</th>
            <td class="bg-gray2">${reward.reward_points}</td>
            <td class="bg-gray2">${reward.reward_action_id == null ? "N/A" : reward.reward_action_id}</td>
            <td class="bg-gray2">YTCR</td>
            <td class="bg-gray2">${reward.reward_folder == undefined || reward.reward_folder.length == 0 ? "N/A" : reward.reward_folder}</td>
            <td class="bg-gray2">${reward?.reward_color?.background ? `<div class="rounded-full w-9 h-9" style="background:${reward?.reward_color?.background}"></div>` : `<div class="rounded-full w-9 h-9 bg-botred"></div>`}</td>
            <td class="bg-gray2 flex gap-2">
                <button onclick="Edit('${reward.reward_id}')" class="bg-green-500 btn btn-block text-white w-1/2">Edit</button>
                <button onclick="DeleteSend('${reward.reward_id}')" class="bg-red-500 btn text-white w-1/2"><i class="fa-solid fa-trash-can"></i></button>
            </td>
        </tr>
        `;
    });
    tippy("[data-tippy-content]", {
        arrow: true,
        allowHTML: true
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
function validateString(str) {
    var regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return regex.test(str);
}
function CheckActionID(inputString) {
    if (inputString.length == 0) {
        return true;
    }
    if (inputString.length === 36 && inputString.split("-").length - 1 === 4 && validateString(inputString)) {
        return true;
    } else {
        return false;
    }
}
function Create() {
    if (!CheckActionID(document.getElementById("reward_action").value)) {
        $("#toast-container-fail-message").html(`Error Only required if you want this reward to a StreamerBot action. To connect an action, right click on the action on StreamerBot and click <span class='font-bold underline'>Copy Action Id</span>`);
        return $("#toast-container-fail").fadeIn(400, function () {
            $(this).delay(5000).fadeOut(400);
        });
    }
    UpdateSend("/post/update/rewards/create", {
        name: document.getElementById("reward_name").value,
        points: document.getElementById("reward_cost").value,
        action_id: document.getElementById("reward_action").value,
        folder: document.getElementById("reward_folder").value,
        color: document.getElementById("reward_color").value
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
    document.getElementById("reward_folder").value = found.reward_folder == undefined ? "" : found.reward_folder;
    document.getElementById("reward_color").value = found.reward_color?.background || "#c9574e";
    document.getElementById("edit-btn").classList.remove("hidden");
    document.getElementById("clear-btn").classList.remove("hidden");
}
function EditSend() {
    if (!CheckActionID(document.getElementById("reward_action").value)) {
        $("#toast-container-fail-message").html(`Error Only required if you want this reward to a StreamerBot action. To connect an action, right click on the action on StreamerBot and click <span class='font-bold underline'>Copy Action Id</span>`);
        return $("#toast-container-fail").fadeIn(400, function () {
            $(this).delay(5000).fadeOut(400);
        });
    }
    UpdateSend("/post/update/rewards/edit", {
        id: edit.id,
        name: document.getElementById("reward_name").value,
        points: document.getElementById("reward_cost").value,
        action_id: document.getElementById("reward_action").value,
        folder: document.getElementById("reward_folder").value,
        color: document.getElementById("reward_color").value
    });
}
function DeleteSend(id) {
    UpdateSend("/post/update/rewards/delete", {
        id
    });
}
