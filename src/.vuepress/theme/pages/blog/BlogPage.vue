<template>
  <section aria-labelledby="main">
    <Content class="theme-default-content custom" />

    <BlogPostContainer
      :posts="posts"
      :posts-per-page="postsPerPage"
      @page-selected="onPageSelected"
    />
  </section>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue';
import BlogPostContainer from '@theme/pages/blog/BlogPostContainer.vue';

function* chunk(arr, chunkSize) {
  for (let i = 0; i < arr.length; i += chunkSize) {
    yield arr.slice(i, i + chunkSize);
  }
}
const POSTS_PER_PAGE = 5;
export default {
  components: { BlogPostContainer },
  props: {
    postsToRender: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedPage: 0,
    };
  },
  computed: {
    postsPerPage() {
      return Math.ceil(this.basePosts.length / POSTS_PER_PAGE);
    },
    frontmatter() {
      return this.$page.frontmatter;
    },

    actionLink() {
      return {
        link: this.frontmatter.actionLink,
        text: this.frontmatter.actionText,
      };
    },

    sortedPosts() {
      return this.$site.pages
        .filter(
          (page) =>
            page.path.startsWith('/blog/') && !page.frontmatter.blog_index
        )
        .sort(
          (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
        );
    },
    basePosts() {
      return this.postsToRender.length ? this.postsToRender : this.sortedPosts;
    },
    posts() {
      return [...chunk(this.basePosts, POSTS_PER_PAGE)][this.selectedPage];
    },
  },
  methods: {
    onPageSelected(pageIndex) {
      this.selectedPage = pageIndex;
    },
  },
};
</script>

<style lang="stylus"></style>
