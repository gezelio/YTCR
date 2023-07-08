let nav = document.createElement("div");
nav.className = "navbar sticky top-0 z-50 bg-primary hover:bg-nav_bg";
nav.id = "nav";
nav.innerHTML = `
<div class="navbar-start">
    <a href="/#home" class="btn btn-ghost normal-case text-white text-xl">Redeems.live</a>
</div>
<div class="navbar-end gap-3">
    <a href="https://redeems.live/download" class="btn bg-neutral-500 hover:bg-neutral-700 border-0 text-white font-bold"><i class="fa-brands fa-chrome"></i></a>
    <a href="https://gezel.io/discord" class="btn bg-discord hover:bg-discord2 border-0 text-white font-bold"><i class="fa-brands fa-discord"></i></a>
    <a href="https://github.com/gezelio/ytcr" class="btn bg-accent hover:bg-background border-0 text-white font-bold"><i class="fa-brands fa-github"></i></a>
    <a href="/creds/login" class="btn hover:bg-button2 border-0 text-white font-bold">Login</a>
</div>
    `;
document.documentElement.prepend(nav);
