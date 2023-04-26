users.forEach(function (element, index) {
    document.getElementById("table").innerHTML += `
    <div>
    Channel ID: ${element.user_id} ${element.user}: ${element.points}
    </div>
    `
});