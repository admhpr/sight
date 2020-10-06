<template>
  <section>
    <div class="flex justify-center mx-auto mt-24">
      <nav class="">
        <a
          v-for="tag in Object.keys(tags)"
          :key="tag"
          class="text-white py-3 px-4 font-medium mr-3 bg-indigo-600 hover:bg-indigo-800 active:bg-indigo-800"
          :class="selectedTag === tag ? 'bg-indigo-800 ' : ''"
          @click="onTagSelect(tag)"
        >
          {{ tag }} <span>{{ tags[tag].length }}</span>
        </a>
      </nav>
    </div>
    <BlogPage :posts-to-render="selectedPosts" />
  </section>
</template>

<script>
import BlogPage from "@theme/pages/blog/BlogPage.vue";
export default {
  components: {
    BlogPage,
  },
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
    selectedPosts() {
      return this.tags[this.selectedTag];
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
