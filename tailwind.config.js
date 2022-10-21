module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                roboto: ["Roboto", "sans-serif"]
            },
            fontSize: {
                xs: ".75rem",
                sm: ".875rem",
                tiny: ".875rem",
                base: "1.1rem",
                lg: "1.25rem", // Standard H5 Size
                xl: "1.563rem", // Standard H4 Size
                "2xl": "1.953rem", // Standard H3 Size
                "3xl": "2.441rem", // Standard H2 Size
                "4xl": "3.052rem", // Standard H1 Size
                "5xl": "3.375rem",
                "6xl": "5.063rem",
                "7xl": "7.594rem"
            },
            colors: {
                thxBlue: "#0019FC"
            },
            scale: {
                100: "1",
                101: "1.01"
            },

            gridTemplateColumns: {
                dashboard: "7rem 1fr",
                createArticle: "3fr 1fr",
                articleFeeds: "2fr 1fr"
            },
            gridTemplateRows: {
                singlArticle: "1fr 50vh 3fr"
            }
        }
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                thxlight: {
                    primary: "#0070FF",

                    "primary-focus": "#0166e9" /* Primary color - focused */,
                    "primary-content":
                        "#ffffff" /* Foreground content color to use on primary color */,

                    secondary: "#0019FC" /* Secondary color */,
                    "secondary-focus":
                        "#033797" /* Secondary color - focused */,
                    "secondary-content":
                        "#ffffff" /* Foreground content color to use on secondary color */,

                    accent: "#2ec935" /* Accent color */,
                    "accent-focus": "#27b32e" /* Accent color - focused */,
                    "accent-content":
                        "#ffffff" /* Foreground content color to use on accent color */,

                    neutral: "#ffffff" /* Neutral color */,
                    "neutral-focus": "#ffffff" /* Neutral color - focused */,
                    "neutral-content":
                        "#1f2937" /* Foreground content color to use on neutral color */,

                    "base-100":
                        "#f3f3f3" /* Base color of page, used for blank backgrounds */,
                    "base-200": "#e9e9e9" /* Base color, a little darker */,
                    "base-300": "#d3d3d3" /* Base color, even more darker */,
                    "base-content":
                        "#1f2937" /* Foreground content color to use on base color */,

                    info: "#008cff" /* Info */,
                    success: "#00ac81" /* Success */,
                    warning: "#ffe600" /* Warning */,
                    error: "#ff0000" /* Error */
                }
            },
            "dark",
            "light"
        ],
        styled: true,
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        prefix: "",
        darkTheme: "thxlight"
    }
}
