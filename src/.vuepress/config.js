module.exports = {
  title: "{AH}",
  description: "web back garden",
  themeConfig: {
    nav: [
      { text: "Blog", link: "/blog/" },
      { text: "README", link: "/readme/" },
    ],
    postcss: {
      plugins: [
        require("tailwindcss")("./tailwind.config.js"),
        require("autoprefixer"),
      ],
    },
  },
}
