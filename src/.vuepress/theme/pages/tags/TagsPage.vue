<template>
  <section>
    <div class="flex justify-center mx-auto pt-24">
      <nav>
        <a
          v-for="tag in Object.keys(tags)"
          :key="tag"
          class="tag py-3 px-4 font-medium mr-3 hover:bg-gray-100"
          :class="selectedTag === tag ? 'tag-selected ' : ''"
          @click="onTagSelect(tag)"
        >
          {{ tag }} <span>{{ tags[tag].length }}</span>
        </a>
      </nav>
    </div>
    <section class="main m-10">
      <BlogPage :posts-to-render="selectedPosts" />
    </section>
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

<style scoped>
.tag {
  border-style: solid;
  border-width: 3px;
  border-color: var(--border-colors);
}
.tag-selected {
  box-shadow: 5px 5px var(--font-color);
  color: black !important;
}
</style>
