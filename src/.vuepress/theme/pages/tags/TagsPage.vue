<template>
  <main class="home" aria-labelledby="main-title">
    <section>TAGS</section>
  </main>
</template>

<script>
export default {
  computed: {
    tags() {
      return [];
    },
    postsTags() {
      return this.$site.pages
        .filter((x) => x.path.startsWith("/blog/") && !x.frontmatter.blog_index)
        .map((post) => post.frontmatter);
    },
  },
};
</script>

<style lang="scss" scoped></style>
