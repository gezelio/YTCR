/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./views/**/*", "./assets/js/*", "./assets/json/*"],
    theme: {
        extend: {
            colors: {
                // Main Cols
                gezel: "#7EAAC8",
                gezel2: "#486A90",
                primary: "#c9574e",
                primary: "#d94d49",
                myst_dark: "#8c312f",
                //   BG and asset Cols
                bg: "#111f29",
                navnav: "#1d2225",
                accent: "#24292e",
                background: "#1f2428",
                main: "#183748",
                main_grey: "#232323",
                off_white: "#EBEBEB",
                nav_bar: "#141414",
                // Misc Cols
                input: "#404040",
                discord: "#5165F6",
                discord2: "#3244C9",
                warship: "#abf6ff",
                // YTCR Pallate
                background: "#141416", //prev background
                primary: "#833232", //prev primary OR primary
                primaryhover: "#5F2424",
                secondary: "",
                secondaryhover: "",
                accent: "#1C1D21", //prev accent
                accenthover: "",
                input: "#141416", 
                offtext: "#9B9B9B",
                link: "#cf4f4f"
            }
        }
    },
    plugins: [require("@tailwindcss/aspect-ratio"), require("daisyui"), require("@tailwindcss/typography"), require("tailwindcss-animated")]
};
