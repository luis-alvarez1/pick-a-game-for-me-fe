/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/ui/**/*.{js,ts,jsx,tsx}",
        "./src/components/layout/**/*.{js,ts,jsx,tsx}",
        "./src/components/games/**/*.{js,ts,jsx,tsx}",
        "./src/components/platforms/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
    safelist: [
        {
            pattern: /.*/,
        },
    ],
    future: {
        hoverOnlyWhenSupported: true,
    },
    important: true,
};
