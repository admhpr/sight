<template>
  <section class="bg-indigo-700 h-50 p-8">
    <div class="container mx-auto py-8">
      <nav class="flex">
        <a
          v-for="tag in Object.keys(tags)"
          :key="tag"
          class="no-underline text-white py-3 px-4 font-medium mr-3 bg-indigo-600 hover:bg-indigo-800 active:bg-indigo-800"
          :class="selectedTag === tag ? 'bg-indigo-800 ' : ''"
          @click="onTagSelect(tag)"
        >
          {{ tag }}
        </a>
      </nav>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      selectedTag: "",
    };
  },
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
  methods: {
    onTagSelect(tag) {
      this.selectedTag = tag;
    },
  },
};
</script>

<style lang="scss" scoped></style>
