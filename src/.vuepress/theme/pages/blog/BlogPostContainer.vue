<template>
  <div>
    <div class="flex justify-center">
      <div
        v-for="post in posts"
        :key="post.key"
        class="mb-12 bg-content p-4 rounded-lg shadow-lg"
      >
        <BlogPost :post="post" />
      </div>
    </div>
    <BlogPagination :posts-per-page="postsPerPage" v-on="$listeners" />
  </div>
</template>

<script>
import BlogPost from "@theme/pages/blog/BlogPost.vue";
import BlogPagination from "@theme/pages/blog/BlogPagination.vue";
export default {
  components: { BlogPost, BlogPagination },
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
    postsPerPage: {
      type: Number,
      default: 1,
    },
  },
};
</script>

<style lang="scss" scoped></style>
