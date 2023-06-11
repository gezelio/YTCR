/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./views/**/*", "./assets/js/*", "./assets/json/*"],
    theme: {
        extend: {
            colors: {
                // Main Cols
                gezel: "#7EAAC8",
                gezel2: "#486A90",
                botred: "#c9574e",
                myst_main: "#d94d49",
                myst_dark: "#8c312f",
                //   BG and asset Cols
                bg: "#111f29",
                navnav: "#1d2225",
                gray1: "#24292e",
                gray2: "#1f2428",
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
                background: "#141416", //prev gray2
                primary: "",
                primaryhover: "",
                secondary: "",
                secondaryhover: "",
                accent: "#1C1D21", //prev gray1
                accenthover: "",
                input: "#141416", 
                text: "",
            }
        }
    },
    plugins: [require("@tailwindcss/aspect-ratio"), require("daisyui"), require("@tailwindcss/typography"), require("tailwindcss-animated")]
};
