<template>
  <main class="home" aria-labelledby="main-title">
    <section>
      <span
        v-for="tag in Object.keys(tags)"
        :key="tag"
        class="text-gray-500 bg-gray-200 h-10 rounded-full px-3 py-1 text-xs select-none"
        >{{ tag }}</span
      >
    </section>
  </main>
</template>

<script>
export default {
  computed: {
    tags() {
      const allTags = {};
      this.postsTags.forEach(({ post, tags }) => {
        for (const tag of tags) {
          if (!Object.keys(allTags).includes(tag)) {
            allTags[tag] = [];
          }
          allTags[tag].push(post);
        }
      });
      return allTags;
    },
    postsTags() {
      return this.$site.pages
        .filter((x) => x.path.startsWith("/blog/") && !x.frontmatter.blog_index)
        .map((post) => ({
          post,
          tags: post.frontmatter.tags
            ? post.frontmatter.tags.map((tag) => `${tag}`.toLowerCase())
            : [],
        }));
    },
  },
};
</script>

<style lang="scss" scoped></style>
