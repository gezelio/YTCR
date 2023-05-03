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
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    if (order == "desc")
        return function (a, b) {
            /* next line works with strings and numbers, 
             * and you may want to customize it to your needs
             */
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
}
// users = users.filter(user => user.points !== "%");
// function GetUserPointsUpdate() {
//     fetch(`/api/u/points/${channel_link}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }).then(function (response) {
//         return response.json();
//     }).then(function (data) {
//         if (data.status == "success") {
//             console.log(data)
//             users = data.users
//             users.forEach(function (element, index) {
//                 element.points = parseInt(element.points)
//             });
//             users.sort(dynamicSort("points", pointsSortOrder))
//             document.getElementById("users").innerHTML = ""
//             users.forEach(function (element, index) {
//                 if (!parseInt(element.points)) {
//                     points = `<i class="fa-solid fa-infinity"></i>`
//                 } else {
//                     points = element.points
//                 }
//                 document.getElementById("users").innerHTML += `
//                 <tr>
//                     <td data-name="${element.user}" class="px-4 py-2 border border-[#1f2428]">${element.user}</td>
//                     <td data-points="${element.points}" class="px-4 py-2 border border-[#1f2428]">${points}</td>
//                 </tr>
//                 `
//             });
//         } else {
//             console.log(data)
//         }
//     }).catch(function (error) {
//         loggingPerm({ "error UpdateSend": error })
//     });
// }
users.forEach(function (element, index) {
    element.points = parseInt(element.points)
    if (!parseInt(element.points)) {
        points = `<i class="fa-solid fa-infinity"></i>`
    } else {
        points = element.points
    }
    document.getElementById("users").innerHTML += `
    <tr>
        <td data-name="${element.user}" class="px-4 py-2 border border-[#1f2428]">${element.user}</td>
        <td data-points="${element.points}" class="px-4 py-2 border border-[#1f2428]">${points}</td>
    </tr>
    `
});
const sortByNameBtn = document.getElementById('sortByName');
const sortByPointsBtn = document.getElementById('sortByPoints');
const tableBody = document.querySelector('tbody');
let nameSortOrder = 'asc';
let pointsSortOrder = 'asc';
sortByNameBtn.addEventListener('click', () => {
    sortTable('name', nameSortOrder);
    nameSortOrder = nameSortOrder === 'asc' ? 'desc' : 'asc';
    sortByNameBtn.innerHTML = `A - Z (${nameSortOrder === 'asc' ? '<i class="fas fa-arrow-down"></i>' : '<i class="fas fa-arrow-up"></i>'})`;
});
sortByPointsBtn.addEventListener('click', () => {
    users.sort(dynamicSort("points", pointsSortOrder))
    pointsSortOrder = pointsSortOrder === 'asc' ? 'desc' : 'asc';
    sortByPointsBtn.innerHTML = `Sort (${pointsSortOrder === 'asc' ? '<i class="fas fa-arrow-down"></i>' : '<i class="fas fa-arrow-up"></i>'})`;
    document.getElementById("users").innerHTML = ""
    users.forEach(function (element, index) {
        if (!parseInt(element.points)) {
            points = `<i class="fa-solid fa-infinity"></i>`
        } else {
            points = element.points
        }
        document.getElementById("users").innerHTML += `
        <tr>
            <td data-name="${element.user}" class="px-4 py-2 border border-[#1f2428]">${element.user}</td>
            <td data-points="${element.points}" class="px-4 py-2 border border-[#1f2428]">${points}</td>
        </tr>
        `
    });
});
function sortTable(column, order) {
    const rows = Array.from(tableBody.querySelectorAll('tr'));
    rows.sort((a, b) => {
        let aValue, bValue;
        if (column == 'name') {
            aValue = a.querySelector('td:first-child').dataset.name;
            bValue = b.querySelector('td:first-child').dataset.name;
        }
        if (order === 'asc') {
            return String(aValue).localeCompare(String(bValue));
        } else if (order === 'desc') {
            return String(bValue).localeCompare(String(aValue));
        }
    });
    rows.forEach(row => {
        tableBody.appendChild(row);
    });
}