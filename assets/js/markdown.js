var md = document.createElement("script"); // is a node
md.src = "https://cdn.jsdelivr.net/npm/marked/marked.min.js";
document.head.appendChild(md);
function MarkDown(file, ElmentID) {
    fetch(`/md/${file}.md`)
        .then((response) => response.text())
        .then((data) => {
            document.getElementById(ElmentID).innerHTML = marked.parse(data);
        });
}