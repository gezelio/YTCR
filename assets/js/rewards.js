var Data = [];
var edit = {
    edit: false,
    id: null
};
var created = false;
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
    ClearRewardModalValues();
    edit = {
        edit: false,
        id: null
    };
    document.getElementById("DeleteButton").dataset.id = "";
    document.getElementById("reward-table").innerHTML = "";
    data.rewards.map(function (reward) {
        document.getElementById("reward-table").innerHTML += `
        <tr id="reward_${reward.reward_id}">
            <td class="bg-accent">N/A</td>
            <td class="bg-accent">
            ${reward.reward_name}
            </td>
            <td class="bg-accent">
            ${reward.reward_points}
            </td>
            <td class="bg-accent">
                <div class="rounded-full w-9 h-9" style="background:${reward?.reward_color?.background};"></div>
            </td>
            <td class="bg-accent">N/A</td>
        </tr>
        `;
    });
    data.user_rewards.map(function (reward) {
        document.getElementById("reward-table").innerHTML += `
        <tr id="reward_${reward.reward_id}">
            <td class="bg-accent">
                <input class="toggle toggle-success bg-red-500 border-0" type="checkbox" name="active" placeholder="" data-id="${reward.reward_id}" ${reward.active == undefined ? "checked" : "" || reward.active ? "checked" : ""} onchange="activechange(this)" ></input>
            </td>
            <td class="bg-accent">
            ${reward.reward_name}
            </td>
            <td class="bg-accent">
            ${reward.reward_points}
            </td>
            <td class="bg-accent">
                <div class="rounded-full w-9 h-9" style="background:${reward?.reward_color?.background};"></div>
            </td>
            <td class="bg-accent flex gap-2">
                <button onclick="Edit('${reward.reward_id}')" class="bg-green-500 btn text-white w-1/2">Edit</button>
                <button onclick="DeleteReward('${reward.reward_id}')" class="bg-red-500 btn text-white w-1/2"><i class="fa-solid fa-trash-can"></i></button>
            </td>
        </tr>
        `;
    });
    tippy("[data-tippy-content]", {
        arrow: true,
        allowHTML: true
    });
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
    UpdateSend("/post/update/rewards/create", {
        name: "",
        points: "",
        action_id: "",
        folder: "",
        color: "#c9574e",
        active: true
    });
    setTimeout(() => {
        Reward_modal.showModal();
        found = Data.user_rewards[Data.user_rewards.length - 1];
        if (!found) return;
        let Element = document.getElementById("Reward_modal").children[0];
        Element.children[2].children[1].value = found.reward_name;
        Element.children[3].children[1].value = found.reward_points;
        Element.children[4].children[1].value = found.reward_color.background;
        Element.children[7].children[1].children[0].value = found.reward_cooldown || "";
        Element.children[9].children[1].children[0].value = found.per_stream || "";
        Element.children[12].children[1].children[0].value = found.reward_folder == undefined || found.reward_folder.length == 0 ? "" : found.reward_folder || "";
        Element.children[14].children[1].children[0].value = found.reward_action_id == null ? "" : found.reward_action_id;
        Element.children[15].children[0].dataset.id = found.reward_id;
        Element.children[15].children[1].dataset.id = found.reward_id;
    }, 1000);
    created = true;
}
function Edit(id) {
    Reward_modal.showModal();
    found = Data.user_rewards.find((e) => e.reward_id == id);
    if (!found) return;
    let Element = document.getElementById("Reward_modal").children[0];
    Element.children[2].children[1].value = found.reward_name;
    Element.children[3].children[1].value = found.reward_points;
    Element.children[4].children[1].value = found.reward_color.background;
    Element.children[7].children[1].children[0].value = found.reward_cooldown || "";
    Element.children[9].children[1].children[0].value = found.per_stream || "";
    Element.children[12].children[1].children[0].value = found.reward_folder == undefined || found.reward_folder.length == 0 ? "" : found.reward_folder || "";
    Element.children[14].children[1].children[0].value = found.reward_action_id == null ? "" : found.reward_action_id;
    Element.children[15].children[0].dataset.id = id;
    Element.children[15].children[1].dataset.id = id;
}
function EditSave(element) {
    data = {
        id: null,
        name: null,
        points: null,
        action_id: null,
        folder: null,
        color: null,
        cooldown: null,
        per_stream: null
    };
    let Element = document.getElementById("Reward_modal").children[0];
    data.id = element.dataset.id;
    if (!CheckActionID(Element.children[14].children[1].children[0].value)) {
        $("#toast-container-fail-message").html(`Error Only required if you want this reward to a StreamerBot action. To connect an action, right click on the action on StreamerBot and click <span class='font-bold underline'>Copy Action Id</span>`);
        return $("#toast-container-fail").fadeIn(400, function () {
            $(this).delay(5000).fadeOut(400);
        });
    } else {
        data.action_id = Element.children[14].children[1].children[0].value;
    }
    data.name = Element.children[2].children[1].value;
    data.points = Element.children[3].children[1].value;
    data.folder = Element.children[12].children[1].children[0].value;
    data.color = Element.children[4].children[1].value;
    data.cooldown = Element.children[7].children[1].children[0].value;
    data.per_stream = Element.children[9].children[1].children[0].value;
    UpdateSend("/post/update/rewards/edit", data);
    document.getElementById("create-btn").classList.remove("hidden");
    created = false;
}
function DeleteSend(data) {
    UpdateSend("/post/update/rewards/delete", {
        id: data.dataset.id
    });
    document.getElementById("create-btn").classList.remove("hidden");
}
function DeleteReward(id) {
    delete_reward.showModal();
    document.getElementById("DeleteButton").dataset.id = id;
}
function Cancel(element) {
    if (created) {
        UpdateSend("/post/update/rewards/delete", {
            id: element.dataset.id
        });
        created = false;
        return;
    }
    document.getElementById("create-btn").classList.remove("hidden");
    RefreshData();
}
function activechange(element) {
    UpdateSend("/post/update/rewards/active", {
        id: element.dataset.id,
        active: element.checked
    });
}
function ClearRewardModalValues() {
    let Element = document.getElementById("Reward_modal").children[0];
    Element.children[2].children[1].value = "";
    Element.children[3].children[1].value = "";
    Element.children[4].children[1].value = "#c9574e";
    Element.children[7].children[1].children[0].value = "";
    Element.children[9].children[1].children[0].value = "";
    Element.children[12].children[1].children[0].value = "";
    Element.children[14].children[1].children[0].value = "";
    Element.children[15].children[0].dataset.id = "";
    Element.children[15].children[1].dataset.id = "";
}
