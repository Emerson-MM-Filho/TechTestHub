/** 
 * @type {import("tailwindcss").Config}
 * @type {import("@types/tailwindcss/tailwind-config").TailwindConfig}
 * */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.html",
    "./node_modules/flowbite-react/**/*.js",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  theme: {},
  plugins: [
    require("flowbite/plugin"),
  ]
}
