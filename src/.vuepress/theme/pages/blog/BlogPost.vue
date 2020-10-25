<template>
  <div>
    <div class="w-full px-24 py-2">
      <span class="text-3xl font-bold">
        <router-link :to="post.path" class="text-primary pb-1">{{
          post.title
        }}</router-link>
      </span>
      <div class="mb-4 opacity-75 pt-1">
        <span>{{ formateDate(post.frontmatter.date) }}</span>
        <span>&middot;</span>
        <span>{{ post.readingTime.text }}</span>
        <span class="px-6 py-4">
          <span
            v-for="tag in post.frontmatter.tags"
            :key="tag"
            class="inline-block` rounded-full px-3 py-1 text-sm font-semibold text-primary mr-2"
            >#{{ tag }}</span
          >
        </span>
      </div>
      <div class="text-lg p-5 mb-4">{{ post.frontmatter.description }}</div>
    </div>
    <div class="flex justify-end post-footer">
      <router-link
        :to="post.path"
        class="border bg-white text-primary rounded p-1 font-bold"
        >Read More</router-link
      >
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    post: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    formateDate(date) {
      return moment(date).format("MMM Do YYYY");
    },
  },
};
</script>

<style scoped>
.post-footer {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23000000' fill-opacity='0.3' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
}
</style>
