<template>
  <section class="bg-indigo-800 h-50 p-8">
    <div class="container mx-auto py-8">
      <nav class="flex">
        <a
          v-for="tag in Object.keys(tags)"
          :key="tag"
          class="py-3 px-4 font-medium text-white"
        >
          {{ tag }}
        </a>
      </nav>
    </div>
  </section>
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
