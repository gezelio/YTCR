var Data = [];
var edit = {
    edit: false,
    id: null
};
function dynamicSort(property, order) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    if (order == "asc")
        return function (b, a) {
            /* next line works with strings and numbers,
             * and you may want to customize it to your needs
             */
            var result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
            return result * sortOrder;
        };
    if (order == "desc")
        return function (a, b) {
            /* next line works with strings and numbers,
             * and you may want to customize it to your needs
             */
            var result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
            return result * sortOrder;
        };
}
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
            console.error("error: ", error);
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
        </tr>
        `;
    });
}
function activechange(element) {
    UpdateSend("/post/update/rewards/active", {
        id: element.dataset.id,
        active: element.checked
    });
}
setInterval(() => {
    RefreshData();
}, 20000);
setInterval(() => {
    CheckUser();
}, 10000);
CheckUser();
function CheckUser() {
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
                data = data.data;
                document.getElementById("user-table").innerHTML = "";
                data.users.forEach(function (element, index) {
                    element.points = parseInt(element.points);
                });
                data.users.sort(dynamicSort("points", "asc"));
                data.users.forEach(function (element, index) {
                    if (isNaN(element.points)) {
                        points = `<i class="fa-solid fa-infinity"></i>`;
                    } else {
                        points = element.points;
                    }
                    document.getElementById("user-table").innerHTML += `
                        <tr>
                            <td data-name="${element.user}" class="px-4 py-2 border border-[#1f2428]">${element.user}</td>
                            <td data-points="${element.points}" class="px-4 py-2 border border-[#1f2428]">${points}</td>
                        </tr>
                        `;
                });
                tippy("[data-tippy-content]", {
                    arrow: true,
                    allowHTML: true
                });
            }
        })
        .catch(function (error) {
            console.error("error: ", error);
        });
}
