module.exports = {
  title: "{AH}",
  description: "web back garden",
  theme: "@vuepress/blog",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Blog", link: "/blog/" },
      { text: "README", link: "/readme/" },
    ],
    directories: [
      {
        id: "blog",
        dirname: "_posts",
        path: "/blog/",
        itemPermalink: "/:year/:month/:day/:slug",
        pagination: {
          perPagePosts: 2,
        },
      },
    ],
    frontmatters: [
      {
        id: "tag",
        keys: ["tag", "tags"],
        path: "/blog/tag/",
        layout: "Tag",
        frontmatter: { title: "Tag" },
        itemlayout: "Tag",
        pagination: {
          perPagePosts: 3,
        },
      },
    ],
  },
}
