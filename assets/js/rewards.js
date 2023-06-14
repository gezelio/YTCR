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
    document.getElementById("DeleteButton").dataset.id = "";
    document.getElementById("reward-table").innerHTML = "";
    data.rewards.map(function (reward) {
        document.getElementById("reward-table").innerHTML += `
        <tr id="reward_${reward.reward_id}">
            <td class="bg-accent">N/A</td>
            <td class="bg-accent">
                <input class="input disabled:bg-transparent border-0 w-full max-w-xs" type="text" name="name" placeholder="My Reward *" value="${reward.reward_name}"disabled></input>
            </td>
            <td class="bg-accent">
                <input class="input disabled:bg-transparent border-0 w-full max-w-xs" type="number" name="points" placeholder="100 *" min="0" value="${reward.reward_points}"disabled></input>
            </td>
            <td class="bg-accent">
                <input class="input disabled:bg-transparent border-0 w-full max-w-xs" type="text" name="Action-ID" placeholder="Action-ID" value="${reward.reward_action_id == null ? "" : reward.reward_action_id}"disabled></input>
            </td>
            <td class="bg-accent" data-tippy-content="This reward was built in StreamerBot and you would need to modify the action from there" >StreamerBot</td>
            <td class="bg-accent">
                <input class="input disabled:bg-transparent border-0 w-full max-w-xs" type="text" name="folder" placeholder="N/A" value="${reward.reward_folder == undefined || reward.reward_folder.length == 0 ? "" : reward.reward_folder}"disabled></input>
            </td>
            <td class="bg-accent">
                <input class="input disabled:bg-transparent border-0 w-full max-w-xs" type="color" name="color" placeholder="Reward Color" value="${reward?.reward_color?.background}"disabled></input>
            </td>
            <td class="bg-accent">N/A</td>
            <td class="bg-accent">N/A</td>
            <td class="bg-accent">N/A</td>
        </tr>
        `;
    });
    data.user_rewards.map(function (reward) {
        document.getElementById("reward-table").innerHTML += `
        <tr id="reward_${reward.reward_id}">
            <td class="bg-accent">
                <input class="toggle toggle-success bg-red-500 border-0 w-full max-w-xs" type="checkbox" name="active" placeholder="" data-id="${reward.reward_id}" ${reward.active == undefined ? "checked" : "" || reward.active ? "checked" : ""} onchange="activechange(this)" ></input>
            </td>
            <td class="bg-accent">
                <input class="input bg-input disabled:bg-transparent border-0 w-full max-w-xs" type="text" name="name" placeholder="My Reward *" value="${reward.reward_name}"disabled></input>
            </td>
            <td class="bg-accent">
                <input class="input bg-input disabled:bg-transparent border-0 w-full max-w-xs" type="number" name="points" placeholder="100 *" min="0" value="${reward.reward_points}"disabled></input>
            </td>
            <td class="bg-accent">
                <input class="input bg-input disabled:bg-transparent border-0 w-full max-w-xs" type="text" name="Action-ID" placeholder="Action-ID" value="${reward.reward_action_id == null ? "" : reward.reward_action_id}"disabled></input>
            </td>
            <td class="bg-accent">YTCR</td>
            <td class="bg-accent">
                <input class="input bg-input disabled:bg-transparent border-0 w-full max-w-xs" type="text" name="folder" placeholder="Folder Name" value="${reward.reward_folder == undefined || reward.reward_folder.length == 0 ? "" : reward.reward_folder}"disabled></input>
            </td>
            <td class="bg-accent">
                <input class="input bg-input disabled:bg-transparent border-0 w-full max-w-xs rounded-xl" type="color" name="color" placeholder="Reward Color" value="${reward?.reward_color?.background}"disabled></input>
            </td>
            <td class="bg-accent">
                <input class="input bg-input disabled:bg-transparent border-0 w-full max-w-xs" type="number" name="cooldown" placeholder="0" min="0" value="${reward.reward_cooldown}"disabled></input>
            </td>
            <td class="bg-accent">
                <input class="input bg-input disabled:bg-transparent border-0 w-full max-w-xs" type="number" name="per_stream" placeholder="0" min="0" value="${reward.per_stream}"disabled></input>
            </td>
            <td class="bg-accent flex gap-2">
                <button onclick="Edit(this)" class="bg-green-500 btn text-white w-1/2">Edit</button>
                <button onclick="DeleteReward('${reward.reward_id}')" class="bg-red-500 btn text-white w-1/2"><i class="fa-solid fa-trash-can"></i></button>
                <button onclick="EditSave(this)" data-id="${reward.reward_id}" class="hidden bg-green-500 btn text-white w-1/2">Save</button>
                <button onclick="Cancel()" data-id="${reward.reward_id}" class="hidden bg-input btn text-white w-1/2">Cancel</button>
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
        let Element = document.getElementById("reward-table").children[document.getElementById("reward-table").children.length - 1];
        Array.from(Element.children).forEach(function (childElement, length) {
            if (!childElement.children[0]) return;
            childElement.children[0].disabled = false;
            if (length == 9) {
                childElement.children[0].classList.add("hidden");
                childElement.children[1].classList.add("hidden");
                childElement.children[2].classList.remove("hidden");
                childElement.children[3].classList.remove("hidden");
            }
        });
    }, 1000);
    document.getElementById("create-btn").classList.add("hidden");
}
function Edit(element) {
    let Element = element.parentElement;
    Element.children[0].classList.add("hidden");
    Element.children[1].classList.add("hidden");
    Element.children[2].classList.remove("hidden");
    Element.children[3].classList.remove("hidden");
    Array.from(Element.parentElement.children).forEach((childElement) => {
        if (!childElement.children[0]) return;
        childElement.children[0].disabled = false;
    });
    document.getElementById("create-btn").classList.add("hidden");
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
    let Element = element.parentElement;
    data.id = element.dataset.id;
    Array.from(Element.parentElement.children).forEach((childElement) => {
        if (!childElement.children[0]) return;
        if (childElement.children[0].name == "Action-ID") {
            if (!CheckActionID(childElement.children[0].value)) {
                $("#toast-container-fail-message").html(`Error Only required if you want this reward to a StreamerBot action. To connect an action, right click on the action on StreamerBot and click <span class='font-bold underline'>Copy Action Id</span>`);
                return $("#toast-container-fail").fadeIn(400, function () {
                    $(this).delay(5000).fadeOut(400);
                });
            } else {
                data.action_id = childElement.children[0].value;
            }
        }
        if (childElement.children[0].name == "name") {
            data.name = childElement.children[0].value;
        }
        if (childElement.children[0].name == "points") {
            data.points = childElement.children[0].value;
        }
        if (childElement.children[0].name == "folder") {
            data.folder = childElement.children[0].value;
        }
        if (childElement.children[0].name == "color") {
            data.color = childElement.children[0].value;
        }
        if (childElement.children[0].name == "cooldown") {
            data.cooldown = childElement.children[0].value;
        }
        if (childElement.children[0].name == "per_stream") {
            data.per_stream = childElement.children[0].value;
        }
    });
    UpdateSend("/post/update/rewards/edit", data);
    document.getElementById("create-btn").classList.remove("hidden");
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
function Cancel() {
    document.getElementById("create-btn").classList.remove("hidden");
    RefreshData();
}
function activechange(element) {
    console.log("element: ", element.dataset.id);
    UpdateSend("/post/update/rewards/active", {
        id: element.dataset.id,
        active: element.checked
    });
}
