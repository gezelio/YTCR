var nav_links = [
    {
        "id": 0,
        "name": "Dashboard",
        "link": "/dashboard",
        "disabled": false,
        "current": false
    },
    {
        "id": 1,
        "name": "Change Youtube Account",
        "link": "/dashboard/select/youtube",
        "disabled": false,
        "current": false
    },
    {
        "id": 2,
        "name": "Staff",
        "link": "/dashboard/staff",
        "disabled": false,
        "current": false,
        "type": "staff"
    },
]
let nav1 = document.createElement("div");
nav1.className = "navbar bg-gray2";
nav1.innerHTML = `
<div class="flex-1">
    <a href="/dashboard" class="btn btn-ghost normal-case text-xl text-white"><img src="/favicon.ico" class="mr-4 h-9 sm:h-9" alt="YTCR Logo">YTCR</a>
</div>
<div class="flex-none">
    <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
                <img class="w-8 h-8 rounded-full" id="user_profile_header" src="${user.profile_pic}"
                    alt="user photo">
            </div>
        </label>
        <ul tabindex="0"
            class="menu menu-compact dropdown-content mt-5 p-1 shadow bg-myst_main rounded-box w-52">
            <li><a class="text-white hover:bg-myst_dark" href="/creds/logout">Logout</a></li>
        </ul>
    </div>
</div>
    `;
var account = user.account;
let nav = document.createElement("div");
nav.className = "bg-gray1 p-2 px-4";
nav.innerHTML = `
<div class="grid md:flex flex-row gap-4 text-lg md:text-md font-bold">
    ${nav_links.map(link => {
    if (link.disabled) {
        return
    }
    if (account.type == "staff" && link?.type == "staff") {
        if (window.location.pathname == link.link) {
            link.current = true;
        }
        if (!link.current) {
            return `
        <a class="text-white hover:text-myst_main" href="${link.link}">${link.name}</a>
        `    } else {
            return `
        <a class="text-myst_main" href="${link.link}">${link.name}</a>
        `
        }
    } else if (!link?.type) {
        if (window.location.pathname == link.link) {
            link.current = true;
        }
        if (!link.current) {
            return `
        <a class="text-white hover:text-myst_main" href="${link.link}">${link.name}</a>
        `    } else {
            return `
        <a class="text-myst_main" href="${link.link}">${link.name}</a>
        `
        }
    }
}).join("")}
</div >
    `;
document.documentElement.prepend(nav);
document.documentElement.prepend(nav1);

(async () => {
    const response = await fetch(user.profile_pic)
    if (!response.ok) {
        document.getElementById('user_profile_header').src = "https://img.mystl.ink/profile_pics/default.png";
    }
})()
