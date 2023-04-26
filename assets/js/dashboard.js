var Channel_points_template = [
    {
        "points": 10,
        "current": false,
    },
    {
        "points": 25,
        "current": false,
    },
    {
        "points": 50,
        "current": false,
    },
    {
        "points": 75,
        "current": false,
    },
    {
        "points": 100,
        "current": false,
    },
    {
        "points": 125,
        "current": false,
    },
    {
        "points": 150,
        "current": false,
    },
    {
        "points": 200,
        "current": false,
    },
]
var Data = []
RefreshData()
function RefreshData() {
    fetch('/get/dashboard/data', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        if (data.status == "success") {
            Data = data.data
            ShowData(data.data)
        }
    }).catch(function (error) {
        console.log('error: ', error)
        $('#toast-container-fail').fadeIn(400, function () {
            $(this).delay(200).fadeOut(400);
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
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        if (data.status == "success") {
            $('#toast-container-works').fadeIn(400, function () {
                $(this).delay(200).fadeOut(400);
            });
            RefreshData()
        }
        if (data.status == "fail") {
            $('#toast-container-fail').fadeIn(400, function () {
                $(this).delay(200).fadeOut(400);
            });
        }
    }).catch(function (error) {
        console.log('error: ', error)
        $('#toast-container-fail').fadeIn(400, function () {
            $(this).delay(200).fadeOut(400);
        });
    });
}
document.getElementById("select_points").addEventListener("change", function () {
    UpdateSend("/post/update/ChannelAmount", this.value)
})
function ShowData(data) {
    document.getElementById("select_points").innerHTML = ""
    document.getElementById("channel_id").innerHTML = data.channel_id
    //ANCHOR - Channel points select how many
    Channel_points_template.map(function (item) {
        CLASS = "";
        if (item.points == data.channel_options.channel_amount) {
            CLASS = "bg-botred"
        }
        document.getElementById("select_points").innerHTML += `
        <option class="${CLASS}">${item.points}</option>
        `
        document.getElementById("select_points").value = data.channel_options.channel_amount
    })
    //ANCHOR - Clip stuff
    document.getElementById("clip_enable").addEventListener("click", function () {
        var clip_button_data1
        if (document.querySelector('input[name="radio-10"]:checked').value == 'off') {
            clip_button_data1 = false
        }
        if (document.querySelector('input[name="radio-10"]:checked').value == 'on') {
            clip_button_data1 = true
        }
        if (clip_button_data1 != data.ext.clip_button) {
            UpdateSend("/post/update/Clip", true)
        }
    });
    document.getElementById("clip_disable").addEventListener("click", function () {
        var clip_button_data11
        if (document.querySelector('input[name="radio-10"]:checked').value == 'off') {
            clip_button_data11 = false
        }
        if (document.querySelector('input[name="radio-10"]:checked').value == 'on') {
            clip_button_data11 = true
        }
        if (clip_button_data11 != data.ext.clip_button) {
            UpdateSend("/post/update/Clip", false)
        }
    });
    if (data.ext.clip_button) {
        document.getElementById('clip_disable').removeAttribute('checked', false);
        document.getElementById('clip_enable').setAttribute('checked', true);
    } else {
        document.getElementById('clip_disable').setAttribute('checked', true);
        document.getElementById('clip_enable').removeAttribute('checked', false);
    }
}
//ANCHOR - User Search and add or remove points
const searchInput = document.getElementById("user-search-input");
const searchResults = document.getElementById("user-search-results");
const userList = document.getElementById("user-list");

function searchUsers() {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm.length === 0) {
        searchResults.style.display = "none";
    } else {
        const filteredUsers = Data.users.filter(user => user.user.toLowerCase().includes(searchTerm));
        displayResults(filteredUsers);
    }
}

function displayResults(users) {
    userList.innerHTML = "";
    if (users.length > 0) {
        searchResults.style.display = "block";
        users.forEach(user => {
            if (user.points == "%") return;
            const li = document.createElement("li");
            li.className = "flex justify-between"
            li.innerHTML = `
                <span>${user.user}</span> <span>Points:${user.points}</span>
            `;
            li.addEventListener("click", () => selectUser(user));
            userList.appendChild(li);
        });
    } else {
        searchResults.style.display = "none";
    }
}

function selectUser(user) {
    document.getElementById('ytcr_name').value = user.user;
    document.getElementById('user_points').value = user.points;
    document.getElementById('users_id').value = user.user_id;
    searchResults.style.display = "none";
}
searchInput.addEventListener("keyup", searchUsers);
user_points.addEventListener("input", function () {
    found = Data.users.find(e => e.user_id == document.getElementById('users_id').value);
    if (found) {
        if (found.points == this.value) {
            document.getElementById("update_user_search_points").classList.add("hidden");
        } else {
            document.getElementById("update_user_search_points").classList.remove("hidden");
        }
    }
})
function UpdateUserPoints() {
    document.getElementById("update_user_search_points").classList.add("hidden");
    UpdateSend("/post/update/UserPoints", data = {
        user_id: document.getElementById("users_id").value,
        points: document.getElementById("user_points").value
    })
}