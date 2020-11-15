module.exports = {
  title: '{AH}',
  themeConfig: {
    // Assumes GitHub. Can also be a full GitLab url.
    repo: 'https://github.com/DavidCouronne/vuepress-tailwind',
    repoLabel: 'Contribute!',
    // if your docs are not at the root of the repo:
    docsDir: 'src',
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: 'master',
    // defaults to false, set to true to enable
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: 'Help us improve this page!',
    nav: [
      { text: 'Blog', link: '/blog/' },
      { text: 'Tags', link: '/tags/' },
      { text: 'Guide', link: '/guide/' },
    ],
    sidebar: {
      '/guide/': ['', 'custom'],
    },
  },
  plugins: ['vuepress-plugin-reading-time'],
  postcss: {
    plugins: [
      require('tailwindcss')('./tailwind.config.js'),
      require('autoprefixer'),
    ],
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@img': 'img',
      },
    },
  },
};
