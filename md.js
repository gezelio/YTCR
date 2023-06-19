const marked = require("marked");
const path = require("path");
const fs = require("fs");
const cheerio = require("cheerio");

marked.use({
    mangle: false,
    headerIds: false
});
fs.writeFileSync("./data/markdown-docs.json", JSON.stringify([], null, 4), function (err) {
    if (err) {
        console.error("Error writing to log file:", err);
    }
});
function readFilesInDirectory(directoryPath) {
    const files = fs.readdirSync(directoryPath);

    files.forEach((file) => {
        const filePath = path.join(directoryPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isFile()) {
            const folder = path.basename(directoryPath);
            const markdownContent = fs.readFileSync(filePath, "utf8");
            const html = marked.parse(markdownContent);
            const $ = cheerio.load(html);

            const h1Regex = /<h1\b[^>]*>(.*?)<\/h1>/;
            const h1Match = html.match(h1Regex);
            const h2Element = $("h2").first();
            const heading = h2Element.text().trim();

            let text = "";
            const nextElements = h2Element.nextAll();
            nextElements.each((index, element) => {
                if ($(element).is("h2")) {
                    return false; // Stop iteration if another h2 element is encountered
                }
                text += $(element).text().trim() + " ";
            });

            text = text.trim();

            let truncatedText;
            if (text) {
                const words = text.split(" ");
                truncatedText = words.slice(0, 20).join(" ");
                if (words.length > 20) {
                    truncatedText += "...";
                }
            } else {
                truncatedText = "No text available.";
            }

            if (h1Match && h1Match[1]) {
                const h1Text = h1Match[1];
                const markdown_json = JSON.parse(fs.readFileSync("./data/markdown-docs.json", { encoding: "utf8" }), null, 2);
                if (folder == "docs") {
                    markdown_json.push({
                        title: h1Text,
                        url: `${file.replace(".md", "")}`,
                        description: truncatedText
                    });
                } else {
                    markdown_json.push({
                        title: h1Text,
                        url: `${folder}/${file.replace(".md", "")}`,
                        description: truncatedText
                    });
                }

                fs.writeFileSync("./data/markdown-docs.json", JSON.stringify(markdown_json, null, 4), (err) => {
                    if (err) {
                        console.error("Error writing to log file:", err);
                    }
                });
            }
        } else if (stat.isDirectory()) {
            readFilesInDirectory(filePath);
        }
    });
}

readFilesInDirectory(path.resolve("assets/docs"));
